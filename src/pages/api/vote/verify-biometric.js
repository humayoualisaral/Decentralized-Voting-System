// /api/vote/verify-biometric.js
import connectToDatabase from '../../../libs/mongodb';
import Registration from '../../../models/Registration';

// Rate limiting setup
const verificationAttempts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxAttempts = 10;
  
  if (!verificationAttempts.has(ip)) {
    verificationAttempts.set(ip, []);
  }
  
  const attempts = verificationAttempts.get(ip);
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  verificationAttempts.set(ip, recentAttempts);
  return true;
}

function validateBiometricData(biometricData) {
  // Updated required fields for authentication (not registration)
  const required = ['id', 'rawId', 'type', 'challenge', 'timestamp', 'cnicNumber', 'authenticatorData', 'signature'];
  
  if (!biometricData || typeof biometricData !== 'object') {
    return { valid: false, error: 'Biometric data is required' };
  }
  
  for (const field of required) {
    if (!biometricData[field]) {
      return { valid: false, error: `Missing biometric field: ${field}` };
    }
  }
  
  // Validate timestamp (should be within last 5 minutes for voting)
  const biometricTime = new Date(biometricData.timestamp);
  const now = new Date();
  const timeDiff = now - biometricTime;
  
  if (timeDiff > 5 * 60 * 1000) { // 5 minutes
    return { valid: false, error: 'Biometric data is too old, please re-authenticate' };
  }
  
  // Validate CNIC format
  if (!/^\d{13}$/.test(biometricData.cnicNumber)) {
    return { valid: false, error: 'Invalid CNIC format' };
  }
  
  return { valid: true };
}

// Function to verify the credential ID matches the registered one
async function verifyBiometricCredential(cnicNumber, biometricData) {
  try {
    // Get the user's registered biometric data from database
    const registration = await Registration.findOne({ cnicNumber: cnicNumber });
    
    if (!registration || !registration.biometricData) {
      throw new Error('No registered biometric data found for this CNIC');
    }
    
    // Compare the credential ID from authentication with registered credential ID
    const registeredCredentialId = registration.biometricData.id;
    const currentCredentialId = biometricData.id;
    
    if (registeredCredentialId !== currentCredentialId) {
      throw new Error('Biometric credential ID does not match registered fingerprint');
    }
    
    // Additional verification: check if the signature is valid
    // In a production system, you would verify the signature against the stored public key
    // For now, we'll just check that the signature exists and has reasonable length
    if (!biometricData.signature || biometricData.signature.length < 20) {
      throw new Error('Invalid biometric signature');
    }
    
    // Verify authenticator data exists
    if (!biometricData.authenticatorData || biometricData.authenticatorData.length < 20) {
      throw new Error('Invalid authenticator data');
    }
    
    return { valid: true };
    
  } catch (error) {
    console.error('Biometric credential verification failed:', error);
    return { valid: false, error: error.message };
  }
}

// Function to create verification hash for blockchain storage
function createVerificationHash(cnicNumber, biometricData) {
  const verificationObject = {
    cnic: cnicNumber,
    biometricId: biometricData.id,
    timestamp: biometricData.timestamp,
    challenge: biometricData.challenge,
    // Include signature for authentication verification
    signature: biometricData.signature ? biometricData.signature.substring(0, 32) : ''
  };
  
  // Create a deterministic hash
  const dataString = JSON.stringify(verificationObject);
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  
  // Simple hash function (in production, use crypto.subtle.digest)
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to hex and pad with zeros to make it 64 characters
  const hexHash = Math.abs(hash).toString(16).padStart(16, '0');
  return '0x' + hexHash.repeat(4).substring(0, 64);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }
  
  try {
    // Rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many biometric verification attempts. Please try again in 5 minutes.',
        retryAfter: 300
      });
    }
    
    await connectToDatabase();
    
    const { cnicNumber, biometricData, electionId, candidateId } = req.body;
    
    // Basic validation
    if (!cnicNumber || !biometricData || !electionId || !candidateId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'CNIC, biometric data, election ID, and candidate ID are required'
      });
    }
    
    // Validate CNIC format
    if (!/^\d{13}$/.test(cnicNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid CNIC format',
        message: 'CNIC must be exactly 13 digits'
      });
    }
    
    // Check if user is registered and verified
    const registration = await Registration.findOne({ cnicNumber: cnicNumber });
    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'CNIC not found',
        message: 'This CNIC is not registered in the system'
      });
    }
    
    if (!registration.isVerified || registration.status !== 'verified') {
      return res.status(403).json({
        success: false,
        error: 'CNIC not verified',
        message: 'This CNIC is not verified. Please complete your registration verification first.'
      });
    }
    
    // Validate biometric data format
    const biometricValidation = validateBiometricData(biometricData);
    if (!biometricValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid biometric data',
        message: biometricValidation.error
      });
    }
    
    // Ensure CNIC in biometric data matches request CNIC
    if (biometricData.cnicNumber !== cnicNumber) {
      return res.status(400).json({
        success: false,
        error: 'CNIC mismatch',
        message: 'CNIC in biometric data does not match provided CNIC'
      });
    }
    
    // Verify biometric credential matches registered one
    const credentialVerification = await verifyBiometricCredential(cnicNumber, biometricData);
    if (!credentialVerification.valid) {
      return res.status(400).json({
        success: false,
        error: 'Biometric verification failed',
        message: credentialVerification.error
      });
    }
    
    // Create verification hash for blockchain
    const verificationHash = createVerificationHash(cnicNumber, biometricData);
    
    // Update registration with latest biometric verification (for audit trail only)
    registration.lastBiometricVerification = {
      timestamp: new Date(),
      biometricId: biometricData.id,
      electionId: electionId,
      verificationHash: verificationHash,
      authenticationType: 'authentication' // Mark as authentication, not registration
    };
    
    // Add to verification history
    if (!registration.biometricVerifications) {
      registration.biometricVerifications = [];
    }
    
    registration.biometricVerifications.push({
      timestamp: new Date(),
      biometricId: biometricData.id,
      electionId: electionId,
      verificationHash: verificationHash,
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'] || 'Unknown',
      authenticationType: 'authentication',
      signature: biometricData.signature.substring(0, 50) // Store first 50 chars for audit
    });
    
    await registration.save();
    
    // Log successful verification
    console.log(`✅ Biometric Authentication: ${registration.registrationId} for Election: ${electionId} - Ready for blockchain vote`);
    
    // Return verification data for blockchain interaction
    const responseData = {
      success: true,
      message: 'Biometric authentication successful - proceed with blockchain vote',
      data: {
        registrationId: registration.registrationId,
        voterName: `${registration.firstName} ${registration.lastName}`,
        cnicNumber: registration.cnicNumber,
        province: registration.province,
        constituency: registration.constituency,
        verificationHash: verificationHash,
        biometricId: biometricData.id,
        electionId: electionId,
        candidateId: candidateId,
        timestamp: new Date().toISOString(),
        isReadyForVote: true,
        authenticationType: 'fingerprint_authentication'
      }
    };
    
    res.status(200).json(responseData);
    
  } catch (error) {
    console.error('❌ Biometric Authentication Error:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Invalid authentication data',
        details: errors
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate verification',
        message: 'This biometric verification already exists'
      });
    }
    
    if (error.message && error.message.includes('No registered biometric data found')) {
      return res.status(404).json({
        success: false,
        error: 'Biometric not registered',
        message: 'No biometric data found for this CNIC. Please complete NADRA registration first.'
      });
    }
    
    if (error.message && error.message.includes('credential ID does not match')) {
      return res.status(401).json({
        success: false,
        error: 'Biometric mismatch',
        message: 'The fingerprint used does not match the registered biometric data for this CNIC.'
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Biometric authentication failed due to server error',
      timestamp: new Date().toISOString()
    });
  }
}