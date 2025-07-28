import mongoose from 'mongoose';

const BiometricDataSchema = new mongoose.Schema({
  id: { type: String, required: true },
  rawId: { type: String, required: true },
  type: { type: String, required: true, default: 'public-key' },
  challenge: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  deviceInfo: {
    userAgent: String,
    platform: String,
    language: String
  }
}, { _id: false });

const RegistrationSchema = new mongoose.Schema({
  // Personal Information
  cnicNumber: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{13}$/,
    index: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        const age = Math.floor((Date.now() - value) / (365.25 * 24 * 60 * 60 * 1000));
        return age >= 18 && age <= 100;
      },
      message: 'Age must be between 18 and 100 years'
    }
  },
  
  // Location Information
  province: {
    type: String,
    required: true,
    enum: ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit']
  },
  constituency: {
    type: String,
    required: true,
    trim: true
  },
  
  // Biometric Data
  biometricData: {
    type: BiometricDataSchema,
    required: true
  },
  
  // System Information
  registrationId: {
    type: String,
    unique: true,
    default: function() {
      return 'NADRA-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    }
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'active'],
    default: 'pending'
  },
  submissionTime: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,
  
  // Verification Status
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDate: Date,
  verificationNotes: String
  
}, {
  timestamps: true,
  toJSON: { 
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better performance
RegistrationSchema.index({ cnicNumber: 1 });
RegistrationSchema.index({ registrationId: 1 });
RegistrationSchema.index({ submissionTime: -1 });
RegistrationSchema.index({ province: 1, constituency: 1 });
RegistrationSchema.index({ status: 1 });

// Pre-save middleware
RegistrationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Instance methods
RegistrationSchema.methods.verifyRegistration = function(notes) {
  this.isVerified = true;
  this.status = 'verified';
  this.verificationDate = new Date();
  this.verificationNotes = notes || 'Registration verified successfully';
  return this.save();
};

RegistrationSchema.methods.rejectRegistration = function(reason) {
  this.status = 'rejected';
  this.verificationNotes = reason || 'Registration rejected';
  return this.save();
};

// Static methods
RegistrationSchema.statics.findByCNIC = function(cnic) {
  return this.findOne({ cnicNumber: cnic });
};

RegistrationSchema.statics.findByRegistrationId = function(regId) {
  return this.findOne({ registrationId: regId });
};

RegistrationSchema.statics.getRegistrationStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);