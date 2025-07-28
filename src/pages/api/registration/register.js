import connectToDatabase from '@/libs/mongodb.js';
import Registration from '@/models/Registration';
import { NextResponse } from 'next/server';

// Rate limiting setup (simple in-memory store - use Redis in production)
const registrationAttempts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  if (!registrationAttempts.has(ip)) {
    registrationAttempts.set(ip, []);
  }
  
  const attempts = registrationAttempts.get(ip);
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  recentAttempts.push(now);
  registrationAttempts.set(ip, recentAttempts);
  return true;
}

function validateBiometricData(biometricData) {
  const required = ['id', 'rawId', 'type', 'challenge', 'userId', 'timestamp'];
  
  if (!biometricData || typeof biometricData !== 'object') {
    return { valid: false, error: 'Biometric data is required' };
  }
  
  for (const field of required) {
    if (!biometricData[field]) {
      return { valid: false, error: `Missing biometric field: ${field}` };
    }
  }
  
  // Validate timestamp (should be within last 10 minutes)
  const biometricTime = new Date(biometricData.timestamp);
  const now = new Date();
  const timeDiff = now - biometricTime;
  
  if (timeDiff > 10 * 60 * 1000) { // 10 minutes
    return { valid: false, error: 'Biometric data is too old, please re-register fingerprint' };
  }
  
  return { valid: true };
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
        message: 'Too many registration attempts. Please try again in 15 minutes.',
        retryAfter: 900 // 15 minutes in seconds
      });
    }
    
    // Connect to database
    await connectToDatabase();
    
    // Extract and validate request data
    const {
      cnicNumber,
      firstName,
      lastName,
      dateOfBirth,
      province,
      constituency,
      biometricData
    } = req.body;
    
    // Basic validation
    if (!cnicNumber || !firstName || !lastName || !dateOfBirth || !province || !constituency || !biometricData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'All fields including biometric data are required'
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
    
    // Check if CNIC already exists
    const existingRegistration = await Registration.findByCNIC(cnicNumber);
    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        error: 'CNIC already registered',
        message: 'This CNIC number is already registered in the system',
        registrationId: existingRegistration.registrationId
      });
    }
    
    // Validate biometric data
    const biometricValidation = validateBiometricData(biometricData);
    if (!biometricValidation.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid biometric data',
        message: biometricValidation.error
      });
    }
    
    // Validate age
    const birthDate = new Date(dateOfBirth);
    const age = Math.floor((Date.now() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (age < 18 || age > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid age',
        message: 'Age must be between 18 and 100 years'
      });
    }
    
    // Add device information to biometric data
    const enhancedBiometricData = {
      ...biometricData,
      deviceInfo: {
        userAgent: req.headers['user-agent'] || 'Unknown',
        platform: req.headers['sec-ch-ua-platform'] || 'Unknown',
        language: req.headers['accept-language'] || 'Unknown'
      }
    };
    
    // Create new registration
    const newRegistration = new Registration({
      cnicNumber,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: new Date(dateOfBirth),
      province,
      constituency,
      biometricData: enhancedBiometricData,
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'] || 'Unknown'
    });
    
    // Save to database
    const savedRegistration = await newRegistration.save();
    
    // Log successful registration
    console.log(`✅ New NADRA Registration: ${savedRegistration.registrationId} for CNIC: ${cnicNumber}`);
    
    // Return success response (exclude sensitive biometric data from response)
    const responseData = {
      success: true,
      message: 'NADRA registration completed successfully',
      data: {
        registrationId: savedRegistration.registrationId,
        cnicNumber: savedRegistration.cnicNumber,
        fullName: `${savedRegistration.firstName} ${savedRegistration.lastName}`,
        province: savedRegistration.province,
        constituency: savedRegistration.constituency,
        status: savedRegistration.status,
        submissionTime: savedRegistration.submissionTime,
        biometricRegistered: true
      }
    };
    
    res.status(201).json(responseData);
    
  } catch (error) {
    console.error('❌ Registration Error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: 'Duplicate entry',
        message: `This ${field} is already registered in the system`
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Please check your input data',
        details: errors
      });
    }
    
    // Generic error response
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Registration failed due to server error. Please try again.',
      timestamp: new Date().toISOString()
    });
  }
}