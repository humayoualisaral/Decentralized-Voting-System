// pages/api/registration/register.js
import mongoose from 'mongoose';

// Registration model - adjust the path based on your project structure
// Common paths: '../../../models/Registration' or '../../models/Registration'
let Registration;

async function getRegistrationModel() {
  if (Registration) {
    return Registration;
  }
  
  try {
    // Try different import paths
    const paths = [
      '../../../models/Registration',
      '../../models/Registration', 
      '../../../models/Registration.js',
      '../../models/Registration.js'
    ];
    
    for (const importPath of paths) {
      try {
        const module = await import(importPath);
        Registration = module.default;
        console.log(`✅ Registration model loaded from: ${importPath}`);
        return Registration;
      } catch (err) {
        console.log(`❌ Failed to load from: ${importPath}`);
        continue;
      }
    }
    
    throw new Error('Could not load Registration model from any path');
  } catch (error) {
    console.error('Error loading Registration model:', error);
    throw error;
  }
}

// MongoDB connection
const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connections[0].readyState === 1) {
      console.log('Using existing MongoDB connection');
      return mongoose.connections[0];
    }

    // Check if connecting
    if (mongoose.connections[0].readyState === 2) {
      console.log('MongoDB connection is connecting...');
      // Wait for connection to complete
      await new Promise((resolve) => {
        mongoose.connections[0].on('connected', resolve);
      });
      return mongoose.connections[0];
    }

    console.log('Creating new MongoDB connection...');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    throw error;
  }
};

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userAttempts = rateLimit.get(ip) || [];
  
  // Clean old attempts
  const recentAttempts = userAttempts.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return false;
  }
  
  recentAttempts.push(now);
  rateLimit.set(ip, recentAttempts);
  return true;
};

// Validation helper
const validateRegistrationData = (data) => {
  const errors = {};
  
  // CNIC validation
  if (!data.cnicNumber || !/^\d{13}$/.test(data.cnicNumber)) {
    errors.cnicNumber = 'CNIC must be exactly 13 digits';
  }
  
  // Name validation
  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!data.lastName || !data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  // Date of birth validation
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const birthDate = new Date(data.dateOfBirth);
    const age = Math.floor((Date.now() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18 || age > 100) {
      errors.dateOfBirth = 'Age must be between 18 and 100 years';
    }
  }
  
  // Province validation
  const validProvinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit'];
  if (!data.province || !validProvinces.includes(data.province)) {
    errors.province = 'Valid province is required';
  }
  
  // Constituency validation
  if (!data.constituency || !data.constituency.trim()) {
    errors.constituency = 'Constituency is required';
  }
  
  // Biometric data validation
  if (!data.biometricData) {
    errors.biometricData = 'Biometric data is required';
  } else {
    const { id, rawId, type, challenge, userId, timestamp } = data.biometricData;
    
    if (!id || !rawId || !type || !challenge || !userId || !timestamp) {
      errors.biometricData = 'Complete biometric data is required';
    }
    
    // Check if biometric data is too old (max 10 minutes)
    const biometricAge = Date.now() - new Date(timestamp).getTime();
    if (biometricAge > 10 * 60 * 1000) {
      errors.biometricData = 'Biometric data is too old, please re-register fingerprint';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
    return;
  }

  try {
    console.log('=== REGISTRATION API CALLED ===');
    
    // Connect to database
    await connectDB();
    console.log('Database connected successfully');
    
    // Get Registration model
    const RegistrationModel = await getRegistrationModel();
    
    // Get client IP
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || 
                    req.headers['x-real-ip'] || 
                    req.socket.remoteAddress || 
                    'unknown';

    console.log('Client IP:', clientIP);

    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      console.log('Rate limit exceeded for IP:', clientIP);
      res.status(429).json({
        success: false,
        message: 'Rate limit exceeded. Please wait 15 minutes before trying again.'
      });
      return;
    }

    const registrationData = req.body;
    
    // Log the received data for debugging (without sensitive info)
    console.log('Received registration data:', {
      cnicNumber: registrationData?.cnicNumber?.substring(0, 5) + '********',
      firstName: registrationData?.firstName,
      lastName: registrationData?.lastName,
      province: registrationData?.province,
      constituency: registrationData?.constituency,
      hasBiometricData: !!registrationData?.biometricData,
      biometricDataKeys: registrationData?.biometricData ? Object.keys(registrationData.biometricData) : []
    });
    
    // Basic data check
    if (!registrationData) {
      console.log('No registration data received');
      res.status(400).json({
        success: false,
        message: 'No registration data provided'
      });
      return;
    }
    
    // Validate input data
    const validation = validateRegistrationData(registrationData);
    if (!validation.isValid) {
      console.log('Validation errors:', validation.errors);
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
      return;
    }

    console.log('Validation passed');

    // Check if CNIC already exists
    const existingRegistration = await RegistrationModel.findByCNIC(registrationData.cnicNumber);
    if (existingRegistration) {
      console.log('CNIC already exists:', registrationData.cnicNumber);
      res.status(409).json({
        success: false,
        message: 'CNIC already registered'
      });
      return;
    }

    console.log('CNIC is unique, proceeding with registration');

    // Prepare registration data
    const newRegistration = new RegistrationModel({
      cnicNumber: registrationData.cnicNumber,
      firstName: registrationData.firstName.trim(),
      lastName: registrationData.lastName.trim(),
      dateOfBirth: new Date(registrationData.dateOfBirth),
      province: registrationData.province,
      constituency: registrationData.constituency.trim(),
      biometricData: {
        ...registrationData.biometricData,
        timestamp: new Date(registrationData.biometricData.timestamp),
        deviceInfo: {
          userAgent: req.headers['user-agent'] || '',
          platform: req.headers['sec-ch-ua-platform'] || '',
          language: req.headers['accept-language'] || ''
        }
      },
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'] || '',
      status: 'pending',
      submissionTime: new Date(),
      lastUpdated: new Date()
    });

    console.log('Attempting to save registration to database...');
    
    // Save to database
    const savedRegistration = await newRegistration.save();
    
    console.log('Registration saved successfully with ID:', savedRegistration.registrationId);

    // Return success response (without sensitive data)
    const responseData = {
      registrationId: savedRegistration.registrationId,
      fullName: `${savedRegistration.firstName} ${savedRegistration.lastName}`,
      status: savedRegistration.status,
      province: savedRegistration.province,
      constituency: savedRegistration.constituency,
      submissionTime: savedRegistration.submissionTime,
    };

    console.log('Sending success response');
    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: responseData
    });

  } catch (error) {
    console.error('=== REGISTRATION ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      console.log('Duplicate key error (11000)');
      res.status(409).json({
        success: false,
        message: 'CNIC already registered'
      });
      return;
    }
    
    if (error.name === 'ValidationError') {
      console.log('Mongoose validation error');
      console.log('Validation details:', error.errors);
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      });
      return;
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}