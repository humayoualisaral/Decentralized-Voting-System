module.exports = {

"[project]/src/models/Registration.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// models/Registration.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const BiometricDataSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    id: {
        type: String,
        required: true
    },
    rawId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'public-key'
    },
    challenge: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    deviceInfo: {
        userAgent: String,
        platform: String,
        language: String
    }
}, {
    _id: false
});
const BiometricVerificationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    timestamp: {
        type: Date,
        required: true
    },
    biometricId: {
        type: String,
        required: true
    },
    electionId: {
        type: String,
        required: true
    },
    verificationHash: {
        type: String,
        required: true
    },
    ipAddress: String,
    userAgent: String
}, {
    _id: false
});
const VotingHistorySchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    electionId: {
        type: String,
        required: true
    },
    candidateId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    verificationHash: {
        type: String,
        required: true
    },
    biometricId: {
        type: String,
        required: true
    },
    blockchainTxHash: String,
    ipAddress: String
}, {
    _id: false
});
const RegistrationSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
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
        enum: [
            'Punjab',
            'Sindh',
            'Khyber Pakhtunkhwa',
            'Balochistan',
            'Gilgit'
        ]
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
    // Biometric Verification Tracking
    lastBiometricVerification: {
        type: BiometricVerificationSchema,
        default: null
    },
    biometricVerifications: [
        BiometricVerificationSchema
    ],
    // Voting History (for audit purposes)
    votingHistory: [
        VotingHistorySchema
    ],
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
        enum: [
            'pending',
            'verified',
            'rejected',
            'active',
            'suspended'
        ],
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
    verificationNotes: String,
    // Voting Status
    isEligibleToVote: {
        type: Boolean,
        default: true
    },
    votingRestrictions: [
        {
            reason: String,
            imposedDate: Date,
            expiryDate: Date,
            isActive: {
                type: Boolean,
                default: true
            }
        }
    ],
    // Security Features
    lastLoginAttempt: Date,
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    accountLocked: {
        type: Boolean,
        default: false
    },
    lockExpiry: Date
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            delete ret.biometricData.rawId; // Don't expose raw biometric data
            delete ret.biometricData.challenge;
            return ret;
        }
    }
});
// Indexes for better performance
RegistrationSchema.index({
    cnicNumber: 1
});
RegistrationSchema.index({
    registrationId: 1
});
RegistrationSchema.index({
    submissionTime: -1
});
RegistrationSchema.index({
    province: 1,
    constituency: 1
});
RegistrationSchema.index({
    status: 1
});
RegistrationSchema.index({
    isVerified: 1
});
RegistrationSchema.index({
    'lastBiometricVerification.timestamp': -1
});
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
RegistrationSchema.methods.addBiometricVerification = function(verificationData) {
    this.lastBiometricVerification = verificationData;
    this.biometricVerifications.push(verificationData);
    return this.save();
};
RegistrationSchema.methods.recordVote = function(voteData) {
    const voteRecord = {
        electionId: voteData.electionId,
        candidateId: voteData.candidateId,
        timestamp: new Date(),
        verificationHash: voteData.verificationHash,
        biometricId: voteData.biometricId,
        blockchainTxHash: voteData.txHash,
        ipAddress: voteData.ipAddress
    };
    this.votingHistory.push(voteRecord);
    return this.save();
};
RegistrationSchema.methods.hasVotedInElection = function(electionId) {
    return this.votingHistory.some((vote)=>vote.electionId === electionId);
};
RegistrationSchema.methods.canVote = function() {
    if (!this.isVerified || this.status !== 'verified') {
        return {
            canVote: false,
            reason: 'Registration not verified'
        };
    }
    if (!this.isEligibleToVote) {
        return {
            canVote: false,
            reason: 'Voting eligibility suspended'
        };
    }
    if (this.accountLocked && this.lockExpiry > new Date()) {
        return {
            canVote: false,
            reason: 'Account temporarily locked'
        };
    }
    const activeRestrictions = this.votingRestrictions.filter((restriction)=>restriction.isActive && (!restriction.expiryDate || restriction.expiryDate > new Date()));
    if (activeRestrictions.length > 0) {
        return {
            canVote: false,
            reason: `Voting restricted: ${activeRestrictions[0].reason}`
        };
    }
    return {
        canVote: true,
        reason: null
    };
};
RegistrationSchema.methods.lockAccount = function(durationMinutes = 30) {
    this.accountLocked = true;
    this.lockExpiry = new Date(Date.now() + durationMinutes * 60 * 1000);
    return this.save();
};
RegistrationSchema.methods.unlockAccount = function() {
    this.accountLocked = false;
    this.lockExpiry = null;
    this.failedLoginAttempts = 0;
    return this.save();
};
// Static methods
RegistrationSchema.statics.findByCNIC = function(cnic) {
    return this.findOne({
        cnicNumber: cnic
    });
};
RegistrationSchema.statics.findByRegistrationId = function(regId) {
    return this.findOne({
        registrationId: regId
    });
};
RegistrationSchema.statics.getRegistrationStats = function() {
    return this.aggregate([
        {
            $group: {
                _id: '$status',
                count: {
                    $sum: 1
                }
            }
        }
    ]);
};
RegistrationSchema.statics.getVotingStats = function(electionId) {
    return this.aggregate([
        {
            $match: {
                'votingHistory.electionId': electionId
            }
        },
        {
            $group: {
                _id: '$province',
                totalVoters: {
                    $sum: 1
                },
                votedCount: {
                    $sum: {
                        $size: {
                            $filter: {
                                input: '$votingHistory',
                                cond: {
                                    $eq: [
                                        '$$this.electionId',
                                        electionId
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    ]);
};
RegistrationSchema.statics.findEligibleVoters = function(constituency, province) {
    return this.find({
        isVerified: true,
        status: 'verified',
        isEligibleToVote: true,
        constituency: constituency,
        province: province,
        $or: [
            {
                accountLocked: false
            },
            {
                lockExpiry: {
                    $lt: new Date()
                }
            }
        ]
    });
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Registration || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Registration', RegistrationSchema);
}),

};

//# sourceMappingURL=src_models_Registration_26821559.js.map