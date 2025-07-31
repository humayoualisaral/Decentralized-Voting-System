module.exports = {

"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/libs/mongodb.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
let cached = ("TURBOPACK ident replacement", globalThis).mongoose;
if (!cached) {
    cached = ("TURBOPACK ident replacement", globalThis).mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log('✅ Connected to MongoDB');
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectToDatabase;
}),
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
    // Biometric Verification Tracking (for audit trail only)
    lastBiometricVerification: {
        type: BiometricVerificationSchema,
        default: null
    },
    biometricVerifications: [
        BiometricVerificationSchema
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
RegistrationSchema.statics.getVerificationStats = function(electionId) {
    return this.aggregate([
        {
            $match: {
                'biometricVerifications.electionId': electionId
            }
        },
        {
            $group: {
                _id: '$province',
                totalRegistrations: {
                    $sum: 1
                },
                verifiedCount: {
                    $sum: {
                        $size: {
                            $filter: {
                                input: '$biometricVerifications',
                                cond: {
                                    $eq: [
                                        '$this.electionId',
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
"[project]/src/pages/api/registration/[id].js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>handler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mongodb$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/libs/mongodb.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Registration$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Registration.js [api] (ecmascript)");
;
;
async function handler(req, res) {
    const { id } = req.query;
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$libs$2f$mongodb$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"])();
        // Try to find by registration ID first, then by CNIC
        let registration = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Registration$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].findByRegistrationId(id);
        if (!registration && /^\d{13}$/.test(id)) {
            registration = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Registration$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].findByCNIC(id);
        }
        if (!registration) {
            return res.status(404).json({
                success: false,
                error: 'Registration not found',
                message: 'No registration found with the provided ID or CNIC'
            });
        }
        // Return registration data (exclude sensitive biometric raw data)
        const responseData = {
            success: true,
            data: {
                registrationId: registration.registrationId,
                cnicNumber: registration.cnicNumber,
                firstName: registration.firstName,
                lastName: registration.lastName,
                dateOfBirth: registration.dateOfBirth,
                province: registration.province,
                constituency: registration.constituency,
                status: registration.status,
                isVerified: registration.isVerified,
                submissionTime: registration.submissionTime,
                verificationDate: registration.verificationDate,
                biometricRegistered: !!registration.biometricData,
                biometricTimestamp: registration.biometricData?.timestamp
            }
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error('❌ Get Registration Error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to retrieve registration data'
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__29af8ee8._.js.map