(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/registration/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>NadraRegistrationForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NadraRegistrationForm() {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        cnicNumber: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        province: "",
        constituency: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [constituencies, setConstituencies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFingerprints, setShowFingerprints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Biometric states
    const [isBiometricSupported, setIsBiometricSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBiometricAvailable, setIsBiometricAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [biometricStatus, setBiometricStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isBiometricLoading, setIsBiometricLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [registeredCredential, setRegisteredCredential] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [biometricData, setBiometricData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Province → Constituency data map
    const constituenciesData = {
        Punjab: [
            "Lahore",
            "Multan",
            "Rawalpindi",
            "Faisalabad",
            "Gujranwala",
            "Sialkot",
            "Gujrat",
            "Bahawalpur",
            "Sargodha"
        ],
        Sindh: [
            "Karachi",
            "Hyderabad",
            "Sukkur",
            "Larkana",
            "Mirpurkhas",
            "Nawabshah",
            "Thatta"
        ],
        "Khyber Pakhtunkhwa": [
            "Peshawar",
            "Swat",
            "Abbottabad",
            "Mardan",
            "Dera Ismail Khan",
            "Bannu",
            "Kohat"
        ],
        Balochistan: [
            "Quetta",
            "Gwadar",
            "Khuzdar",
            "Sibi",
            "Zhob",
            "Kalat",
            "Lasbella"
        ],
        "Gilgit": [
            "Gilgit",
            "Skardu",
            "Hunza",
            "Ghizer",
            "Ghanche",
            "Diamer",
            "Astore",
            "Nagar",
            "Shigar",
            "Kharmang"
        ]
    };
    // Initialize biometric support check
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NadraRegistrationForm.useEffect": ()=>{
            checkBiometricSupport();
        }
    }["NadraRegistrationForm.useEffect"], []);
    // Update constituencies when province changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NadraRegistrationForm.useEffect": ()=>{
            if (formData.province && constituenciesData[formData.province]) {
                setConstituencies(constituenciesData[formData.province]);
                setFormData({
                    "NadraRegistrationForm.useEffect": (prev)=>({
                            ...prev,
                            constituency: ""
                        })
                }["NadraRegistrationForm.useEffect"]);
            } else {
                setConstituencies([]);
                setFormData({
                    "NadraRegistrationForm.useEffect": (prev)=>({
                            ...prev,
                            constituency: ""
                        })
                }["NadraRegistrationForm.useEffect"]);
            }
        }
    }["NadraRegistrationForm.useEffect"], [
        formData.province
    ]);
    // Biometric helper functions
    const checkBiometricSupport = async ()=>{
        try {
            if (!window.PublicKeyCredential) {
                setBiometricStatus('❌ WebAuthn not supported in this browser');
                return;
            }
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsBiometricAvailable(available);
            setIsBiometricSupported(true);
            if (available) {
                setBiometricStatus('✅ Biometric fingerprint authentication is available');
            } else {
                setBiometricStatus('⚠️ No biometric authenticator detected on this device');
            }
        } catch (error) {
            console.error('Error checking biometric support:', error);
            setBiometricStatus('❌ Error checking biometric capabilities');
            setIsBiometricSupported(false);
        }
    };
    const generateSecureChallenge = ()=>{
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return array;
    };
    const generateUserId = ()=>{
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return array;
    };
    const arrayBufferToBase64 = (buffer)=>{
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for(let i = 0; i < bytes.byteLength; i++){
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    const handleBiometricRegistration = async ()=>{
        if (!isBiometricAvailable) {
            alert('🚫 BIOMETRIC NOT AVAILABLE\n\nYour device does not support biometric authentication or no fingerprint is enrolled.');
            return;
        }
        setIsBiometricLoading(true);
        setBiometricStatus('🔐 Place your finger on the biometric sensor...');
        try {
            const userId = generateUserId();
            const challenge = generateSecureChallenge();
            const registrationOptions = {
                challenge: challenge,
                rp: {
                    name: "NADRA Registration System",
                    id: window.location.hostname || "localhost"
                },
                user: {
                    id: userId,
                    name: `${formData.firstName || 'User'}.${formData.lastName || 'NADRA'}@nadra.gov.pk`,
                    displayName: `${formData.firstName || 'NADRA'} ${formData.lastName || 'User'}`
                },
                pubKeyCredParams: [
                    {
                        alg: -7,
                        type: "public-key"
                    },
                    {
                        alg: -35,
                        type: "public-key"
                    },
                    {
                        alg: -36,
                        type: "public-key"
                    },
                    {
                        alg: -257,
                        type: "public-key"
                    }
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required",
                    requireResidentKey: true,
                    residentKey: "required"
                },
                timeout: 60000,
                attestation: "direct",
                excludeCredentials: []
            };
            const credential = await navigator.credentials.create({
                publicKey: registrationOptions
            });
            if (!credential) {
                throw new Error('No credential returned from biometric registration');
            }
            const credentialInfo = {
                id: credential.id,
                rawId: credential.rawId,
                type: credential.type,
                challenge: arrayBufferToBase64(challenge),
                userId: arrayBufferToBase64(userId),
                timestamp: new Date().toISOString()
            };
            setRegisteredCredential(credentialInfo);
            setBiometricData(credentialInfo);
            setBiometricStatus('✅ Biometric fingerprint registered successfully!');
            alert(`🎉 BIOMETRIC REGISTRATION SUCCESSFUL!\n\n✅ Your fingerprint has been securely registered with NADRA.\n🔐 Credential ID: ${credential.id.substring(0, 20)}...\n⏰ Registered: ${new Date().toLocaleString()}\n\n🛡️ Your biometric data is encrypted and stored securely.`);
        } catch (error) {
            console.error('Biometric registration failed:', error);
            setBiometricStatus('❌ Biometric registration failed');
            let errorMessage = '🚫 BIOMETRIC REGISTRATION FAILED\n\n';
            if (error.name === 'NotAllowedError') {
                errorMessage += '❌ Registration cancelled or verification failed\n\n🔧 Please try again and complete the biometric prompt';
            } else if (error.name === 'SecurityError') {
                errorMessage += '❌ Security requirements not met\n\n🔧 Ensure you\'re using HTTPS and the site is trusted';
            } else {
                errorMessage += `❌ Error: ${error.message || 'Unknown biometric error'}`;
            }
            alert(errorMessage);
        } finally{
            setIsBiometricLoading(false);
        }
    };
    // Validation function
    const validateForm = ()=>{
        const newErrors = {};
        // CNIC validation
        if (!formData.cnicNumber) {
            newErrors.cnicNumber = "CNIC Number is required";
        } else if (!/^\d{13}$/.test(formData.cnicNumber)) {
            newErrors.cnicNumber = "CNIC must be exactly 13 digits";
        }
        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required";
        }
        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required";
        }
        // Date of birth validation
        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of Birth is required";
        } else {
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18 || age > 100) {
                newErrors.dateOfBirth = "Age must be between 18 and 100 years";
            }
        }
        // Province validation
        if (!formData.province) {
            newErrors.province = "Province is required";
        }
        // Constituency validation
        if (!formData.constituency) {
            newErrors.constituency = "Constituency is required";
        }
        // Fingerprints validation
        if (!biometricData) {
            newErrors.biometric = "Biometric fingerprint registration is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    // Handle input changes
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ""
                }));
        }
    };
    // Format CNIC input
    const formatCNIC = (value)=>{
        const digits = value.replace(/\D/g, '');
        return digits.slice(0, 13);
    };
    // Handle form submission
    const handleSubmit = async ()=>{
        if (!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(()=>{
            const submissionData = {
                ...formData,
                biometricData: biometricData,
                submissionTime: new Date().toISOString()
            };
            console.log("NADRA Registration Data:", submissionData);
            alert("✅ NADRA Registration Successful!\n\nYour application has been submitted with biometric authentication.\nReference ID: " + Math.random().toString(36).substr(2, 9).toUpperCase());
            setIsSubmitting(false);
            // Reset form
            setFormData({
                cnicNumber: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                province: "",
                constituency: ""
            });
            setErrors({});
            setRegisteredCredential(null);
            setBiometricData(null);
            setBiometricStatus('');
        }, 2000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center justify-center w-[100px] rounded-full overflow-hidden h-[100px] mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAb082NJggC71VykY1zPCSQbib4oNe6Tm2DA&s",
                                alt: "NADRA Logo",
                                width: "100px",
                                height: "100px"
                            }, void 0, false, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 310,
                                columnNumber: 12
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl md:text-4xl font-bold text-gray-800 mb-2",
                            children: "NADRA Registration Form"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 max-w-2xl mx-auto",
                            children: "Complete your National Database and Registration Authority (NADRA) registration with biometric authentication."
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[darkgreen] px-6 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-white",
                                children: "Personal Information & Biometric Registration"
                            }, void 0, false, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 323,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 322,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 332,
                                                            columnNumber: 19
                                                        }, this),
                                                        "CNIC Number"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 331,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: formData.cnicNumber,
                                                    onChange: (e)=>handleInputChange('cnicNumber', formatCNIC(e.target.value)),
                                                    placeholder: "Enter 13-digit CNIC number",
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.cnicNumber ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 335,
                                                    columnNumber: 17
                                                }, this),
                                                errors.cnicNumber && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.cnicNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 354,
                                                            columnNumber: 19
                                                        }, this),
                                                        "First Name"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: formData.firstName,
                                                    onChange: (e)=>handleInputChange('firstName', e.target.value),
                                                    placeholder: "Enter first name",
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 357,
                                                    columnNumber: 17
                                                }, this),
                                                errors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.firstName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 369,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 352,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 376,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Last Name"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 375,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: formData.lastName,
                                                    onChange: (e)=>handleInputChange('lastName', e.target.value),
                                                    placeholder: "Enter last name",
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 379,
                                                    columnNumber: 17
                                                }, this),
                                                errors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.lastName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 391,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 374,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 398,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Date of Birth"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 397,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "date",
                                                    value: formData.dateOfBirth,
                                                    onChange: (e)=>handleInputChange('dateOfBirth', e.target.value),
                                                    max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0],
                                                    min: new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0],
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.dateOfBirth ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 401,
                                                    columnNumber: 17
                                                }, this),
                                                errors.dateOfBirth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.dateOfBirth
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 414,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 396,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 421,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Province"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 420,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: formData.province,
                                                    onChange: (e)=>handleInputChange('province', e.target.value),
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${errors.province ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Select Province"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 433,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Punjab",
                                                            children: "Punjab"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 434,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Sindh",
                                                            children: "Sindh"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 435,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Khyber Pakhtunkhwa",
                                                            children: "Khyber Pakhtunkhwa"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 436,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Balochistan",
                                                            children: "Balochistan"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "Gilgit",
                                                            children: "Gilgit-Baltistan"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 438,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 424,
                                                    columnNumber: 17
                                                }, this),
                                                errors.province && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.province
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 441,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 419,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-semibold text-gray-700 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            className: "inline w-4 h-4 mr-2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 448,
                                                            columnNumber: 19
                                                        }, this),
                                                        "Constituency"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 447,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: formData.constituency,
                                                    onChange: (e)=>handleInputChange('constituency', e.target.value),
                                                    disabled: !formData.province,
                                                    className: `w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${!formData.province ? 'bg-gray-100 cursor-not-allowed' : errors.constituency ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-emerald-500'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: formData.province ? 'Select Constituency' : 'Select Province First'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 463,
                                                            columnNumber: 19
                                                        }, this),
                                                        constituencies.map((constituency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: constituency,
                                                                children: constituency
                                                            }, constituency, false, {
                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                lineNumber: 467,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, this),
                                                errors.constituency && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-red-600",
                                                    children: errors.constituency
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 473,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 446,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-semibold text-gray-800 mb-4",
                                                            children: "Biometric Fingerprint Authentication"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 481,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center mb-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: handleBiometricRegistration,
                                                                disabled: !isBiometricSupported || isBiometricLoading,
                                                                className: `relative group transition-all duration-300 ${registeredCredential ? 'cursor-default' : isBiometricLoading ? 'cursor-wait' : 'cursor-pointer hover:scale-110'}`,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    xmlns: "http://www.w3.org/2000/svg",
                                                                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                                                                    viewBox: "0 0 500 500",
                                                                    width: "500",
                                                                    height: "500",
                                                                    preserveAspectRatio: "xMidYMid meet",
                                                                    style: "width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;",
                                                                    id: "Fingerprint Scanning",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                                                id: "__lottie_element_2",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                                    width: "500",
                                                                                    height: "500",
                                                                                    x: "0",
                                                                                    y: "0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 360
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                lineNumber: 499,
                                                                                columnNumber: 326
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                            lineNumber: 499,
                                                                            columnNumber: 320
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                            "clip-path": "url(#__lottie_element_2)",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                    transform: "matrix(1.1984001398086548,0,0,1.1984001398086548,-49.60003662109375,-49.60003662109375)",
                                                                                    opacity: "1",
                                                                                    style: "display: block;",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,135.1219940185547,363.87200927734375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M60.32600021362305,61.332000732421875 C60.32600021362305,61.332000732421875 -60.32600021362305,61.332000732421875 -60.32600021362305,61.332000732421875 C-60.32600021362305,61.332000732421875 -60.32600021362305,-61.33100128173828 -60.32600021362305,-61.33100128173828"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 681
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 601
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,364.4490051269531,363.87200927734375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M60.75400161743164,-61.33100128173828 C60.75400161743164,-61.33100128173828 60.75400161743164,61.332000732421875 60.75400161743164,61.332000732421875 C60.75400161743164,61.332000732421875 -60.755001068115234,61.332000732421875 -60.755001068115234,61.332000732421875"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 1165
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 1085
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,364.4490051269531,136.1280059814453)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-60.75400161743164,-61.33100128173828 C-60.75400161743164,-61.33100128173828 60.755001068115234,-61.33100128173828 60.755001068115234,-61.33100128173828 C60.755001068115234,-61.33100128173828 60.755001068115234,61.33100128173828 60.755001068115234,61.33100128173828"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 1647
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 1568
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,135.1219940185547,136.1280059814453)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-60.32600021362305,61.33100128173828 C-60.32600021362305,61.33100128173828 -60.32600021362305,-61.33100128173828 -60.32600021362305,-61.33100128173828 C-60.32600021362305,-61.33100128173828 60.32600021362305,-61.33100128173828 60.32600021362305,-61.33100128173828"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 2130
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 2051
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 462
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                    transform: "matrix(1,0,0,1.0599199533462524,0,-20.309249877929688)",
                                                                                    opacity: "1",
                                                                                    style: "display: block;",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                        opacity: "1",
                                                                                        transform: "matrix(1,0,0,1,0,0)",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            "stroke-linecap": "round",
                                                                                            "stroke-linejoin": "round",
                                                                                            "fill-opacity": "0",
                                                                                            stroke: "rgb(0,0,0)",
                                                                                            "stroke-opacity": "1",
                                                                                            "stroke-width": "10",
                                                                                            d: " M74.7959976196289,250 C74.7959976196289,250 425.2030029296875,250 425.2030029296875,250"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 2689
                                                                                        }, this)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/registration/page.jsx",
                                                                                        lineNumber: 499,
                                                                                        columnNumber: 2642
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 2536
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                    transform: "matrix(0.8031997084617615,0,0,0.8031997084617615,49.2000732421875,49.2000732421875)",
                                                                                    opacity: "0.1",
                                                                                    style: "display: block;",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,310.6510009765625,203.4720001220703)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-59.374000549316406,-84.99299621582031 C-21.170000076293945,-78.51799774169922 2.950000047683716,-49.89899826049805 14.581000328063965,-31.989999771118164 C27.434999465942383,-12.197999954223633 38.016998291015625,13.866999626159668 44.374000549316406,41.400001525878906 C49.242000579833984,62.5 54.84600067138672,76.31600189208984 59.374000549316406,84.99299621582031"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 3134
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 3055
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,177.43699645996094,231.0469970703125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-38.869998931884766,113.37899780273438 C-44.624000549316406,91.02799987792969 -47.887001037597656,65.95600128173828 -47.41699981689453,37.97999954223633 C-47.14400100708008,21.742000579833984 -46.637001037597656,-8.473999977111816 -37.43199920654297,-37.56399917602539 C-18.402999877929688,-97.70600128173828 24.19099998474121,-110.87899780273438 47.887001037597656,-113.37899780273438"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 3721
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 3641
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,266.54901123046875,223.92799377441406)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-91.5770034790039,-54.6879997253418 C-76.0250015258789,-76.36199951171875 -55.542999267578125,-83.51000213623047 -39.0099983215332,-85.25399780273438 C-36.42300033569336,-85.52400207519531 -33.82600021362305,-85.66000366210938 -31.277000427246094,-85.66000366210938 C6.315999984741211,-85.66000366210938 30.121999740600586,-57.641998291015625 40.96699905395508,-40.94300079345703 C52.513999938964844,-23.163999557495117 62.07699966430664,0.5009999871253967 67.89399719238281,25.69499969482422 C75.22000122070312,57.44499969482422 84.56400299072266,75.8479995727539 91.5770034790039,85.66000366210938"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 4326
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 4245
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,158.90699768066406,282.47698974609375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M8.397000312805176,82.62200164794922 C-1.8509999513626099,56.04800033569336 -8.397000312805176,24.325000762939453 -7.769000053405762,-13.095000267028809 C-7.513999938964844,-28.25200080871582 -7.040999889373779,-56.46500015258789 1.2359999418258667,-82.62200164794922"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 5145
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 5064
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,325.2950134277344,275.47900390625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-21.600000381469727,-53.702999114990234 C-17.524999618530273,-43.558998107910156 -14.071000099182129,-32.529998779296875 -11.434000015258789,-21.104999542236328 C-2.8310000896453857,16.174999237060547 9.664999961853027,40.81399917602539 21.600000381469727,53.702999114990234"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 5627
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 5550
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,231.02999877929688,214.56399536132812)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-58.77299880981445,55.17300033569336 C-58.29399871826172,26.679000854492188 -57.020999908447266,-49.00699996948242 -1.2769999504089355,-54.88199996948242 C0.5559999942779541,-55.07400131225586 2.4130001068115234,-55.17300033569336 4.242000102996826,-55.17300033569336 C18.719999313354492,-55.17300033569336 39.93299865722656,-49.08399963378906 58.77199935913086,-20.073999404907227"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 6121
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 6040
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,184.8979949951172,341.9849853515625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M10.550000190734863,34.643001556396484 C0.8080000281333923,15.35200023651123 -6.9770002365112305,-7.617000102996826 -10.550999641418457,-34.643001556396484"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 6720
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 6641
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,282.2120056152344,260.9859924316406)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-50.24599838256836,-80.2969970703125 C-19.11199951171875,-83.5790023803711 2.243000030517578,-40.095001220703125 11.067999839782715,-1.8609999418258667 C19.98699951171875,36.7859992980957 33.82500076293945,66.46199798583984 50.24599838256836,83.5790023803711"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 7092
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 7013
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,207.677001953125,291.16900634765625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M15.118000030517578,91.16200256347656 C-1.6890000104904175,64.37000274658203 -15.119000434875488,27.607999801635742 -14.300999641418457,-21.07699966430664 C-13.881999969482422,-45.952999114990234 -11.774999618530273,-73.302001953125 -2.2149999141693115,-91.16300201416016"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 7568
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 7489
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,264.8330078125,368.2380065917969)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-6.77400016784668,-9.281999588012695 C-2.434999942779541,-2.1989998817443848 2.190999984741211,3.9679999351501465 6.77400016784668,9.281999588012695"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 8053
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 7977
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,243.64599609375,286.43499755859375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M8.470999717712402,-17.809999465942383 C5.636000156402588,-30.097999572753906 1.843999981880188,-40.31800079345703 -1.843000054359436,-48.07099914550781 C-2.742000102996826,-49.96099853515625 -5.558000087738037,-49.52299880981445 -5.8520002365112305,-47.45100021362305 C-6.923999786376953,-39.90399932861328 -7.796999931335449,-29.597999572753906 -8.031000137329102,-15.633999824523926 C-8.470000267028809,10.493000030517578 -3.8510000705718994,32.1870002746582 3.1700000762939453,49.96099853515625"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 8418
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 8340
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,277.5559997558594,329.8330078125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M19.493999481201172,38.66400146484375 C3.4260001182556152,19.867000579833984 -9.774999618530273,-6.184000015258789 -19.493999481201172,-38.66299819946289"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 9130
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 9054
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,265.59600830078125,262.0469970703125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-49.54800033569336,-19.184999465942383 C-41.5,-94.83200073242188 -5.650000095367432,-53.430999755859375 7.1020002365112305,1.8279999494552612 C15.902999877929688,39.96500015258789 30.20400047302246,73.33499908447266 49.547000885009766,94.83300018310547"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 9501
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 9421
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,230.88999938964844,326.1130065917969)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M17.246999740600586,55.66699981689453 C-0.8799999952316284,31.250999450683594 -17.246999740600586,-4.953000068664551 -16.395000457763672,-55.66699981689453"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 9972
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 9892
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 2918
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                    transform: "matrix(0.8031997084617615,0,0,0.8031997084617615,49.2000732421875,49.2000732421875)",
                                                                                    opacity: "1",
                                                                                    style: "display: block;",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,310.6510009765625,203.4720001220703)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-59.374000549316406,-84.99299621582031 C-59.09199905395508,-84.94499969482422 -58.81100082397461,-84.89600372314453 -58.53099822998047,-84.84600067138672"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 10483
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 10404
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,177.43699645996094,231.0469970703125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-38.999000549316406,112.875 C-39.04399871826172,112.697998046875 -39.0890007019043,112.52100372314453 -39.13399887084961,112.34400177001953"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 10855
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 10775
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,266.54901123046875,223.92799377441406)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-91.24700164794922,-55.14400100708008 C-91.13099670410156,-55.30400085449219 -91.01399993896484,-55.4640007019043 -90.89700317382812,-55.62200164794922"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 11214
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 11133
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,158.90699768066406,282.47698974609375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M8.397000312805176,82.62200164794922 C8.397000312805176,82.62200164794922 8.397000312805176,82.62200164794922 8.397000312805176,82.62200164794922"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 11585
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 11504
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,325.2950134277344,275.47900390625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-21.600000381469727,-53.702999114990234 C-21.542999267578125,-53.5620002746582 -21.48699951171875,-53.42100143432617 -21.430999755859375,-53.279998779296875"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 11945
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 11868
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,231.02999877929688,214.56399536132812)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-58.77299880981445,55.17300033569336 C-58.77299880981445,55.17300033569336 -58.77299880981445,55.17300033569336 -58.77299880981445,55.17300033569336"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 12321
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 12240
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,184.8979949951172,341.9849853515625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M10.550000190734863,34.643001556396484 C10.550000190734863,34.643001556396484 10.550000190734863,34.643001556396484 10.550000190734863,34.643001556396484"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 12687
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 12608
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,282.2120056152344,260.9859924316406)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-50.24599838256836,-80.2969970703125 C-49.983001708984375,-80.32499694824219 -49.72100067138672,-80.3489990234375 -49.45899963378906,-80.37000274658203"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 13057
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 12978
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,207.677001953125,291.16900634765625)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M15.118000030517578,91.16200256347656 C15.118000030517578,91.16200256347656 15.118000030517578,91.16200256347656 15.118000030517578,91.16200256347656"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 13426
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 13347
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,264.8330078125,368.2380065917969)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-6.77400016784668,-9.281999588012695 C-6.77400016784668,-9.281999588012695 -6.77400016784668,-9.281999588012695 -6.77400016784668,-9.281999588012695"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 13789
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 13713
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,243.64599609375,286.43499755859375)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M8.413000106811523,-18.062000274658203 C8.392000198364258,-18.150999069213867 8.371000289916992,-18.239999771118164 8.35099983215332,-18.327999114990234"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 14154
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 14076
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,277.5559997558594,329.8330078125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M19.493999481201172,38.66400146484375 C19.493999481201172,38.66400146484375 19.493999481201172,38.66400146484375 19.493999481201172,38.66400146484375"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 14520
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 14444
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,265.59600830078125,262.0469970703125)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M-49.54800033569336,-19.184999465942383 C-49.51599884033203,-19.48200035095215 -49.48400115966797,-19.777999877929688 -49.45199966430664,-20.07200050354004"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 14887
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 14807
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                                            opacity: "1",
                                                                                            transform: "matrix(1,0,0,1,230.88999938964844,326.1130065917969)",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                                "stroke-linecap": "round",
                                                                                                "stroke-linejoin": "round",
                                                                                                "fill-opacity": "0",
                                                                                                stroke: "rgb(0,0,0)",
                                                                                                "stroke-opacity": "1",
                                                                                                "stroke-width": "10",
                                                                                                d: " M17.246999740600586,55.66699981689453 C17.246999740600586,55.66699981689453 17.246999740600586,55.66699981689453 17.246999740600586,55.66699981689453"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                                                lineNumber: 499,
                                                                                                columnNumber: 15260
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                                            lineNumber: 499,
                                                                                            columnNumber: 15180
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                                    lineNumber: 499,
                                                                                    columnNumber: 10269
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                            lineNumber: 499,
                                                                            columnNumber: 422
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                lineNumber: 487,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 486,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `mb-4 p-3 rounded-lg text-sm font-medium ${registeredCredential ? 'bg-green-50 border border-green-200 text-green-800' : isBiometricLoading ? 'bg-blue-50 border border-blue-200 text-blue-800' : isBiometricAvailable ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'}`,
                                                            children: isBiometricLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "animate-spin mr-2",
                                                                        children: "🔄"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/registration/page.jsx",
                                                                        lineNumber: 515,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Place your finger on the biometric sensor..."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                lineNumber: 514,
                                                                columnNumber: 25
                                                            }, this) : registeredCredential ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "mr-2",
                                                                        children: "✅"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/registration/page.jsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    "Biometric fingerprint registered successfully!"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                lineNumber: 519,
                                                                columnNumber: 25
                                                            }, this) : biometricStatus ? biometricStatus : 'Checking biometric capabilities...'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 504,
                                                            columnNumber: 21
                                                        }, this),
                                                        !registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: isBiometricAvailable ? 'Click the fingerprint icon above to register your biometric authentication' : 'Biometric authentication is not available on this device'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 532,
                                                            columnNumber: 23
                                                        }, this),
                                                        registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-medium text-green-800 mb-2",
                                                                    children: "Registered Biometric Details:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                    lineNumber: 543,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-green-700 space-y-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "font-mono",
                                                                            children: [
                                                                                "ID: ",
                                                                                registeredCredential.id.substring(0, 30),
                                                                                "..."
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                            lineNumber: 545,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: "Type: Hardware Security Platform"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                            lineNumber: 546,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                "Registered: ",
                                                                                new Date(registeredCredential.timestamp).toLocaleString()
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                                            lineNumber: 547,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 542,
                                                            columnNumber: 23
                                                        }, this),
                                                        errors.biometric && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-lg",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-red-600 font-medium",
                                                                children: errors.biometric
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/registration/page.jsx",
                                                                lineNumber: 555,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/registration/page.jsx",
                                                            lineNumber: 554,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 480,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/registration/page.jsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 478,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-8 flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleSubmit,
                                        disabled: isSubmitting,
                                        className: `px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 min-w-[200px] ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[darkgreen] hover:bg-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl'}`,
                                        children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/registration/page.jsx",
                                                    lineNumber: 577,
                                                    columnNumber: 21
                                                }, this),
                                                "Submitting Registration..."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/registration/page.jsx",
                                            lineNumber: 576,
                                            columnNumber: 19
                                        }, this) : 'Submit NADRA Registration'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 565,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 564,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: "By submitting this form, you agree to NADRA's terms and conditions."
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 590,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-400 mt-2",
                            children: "🔒 Your biometric data is encrypted and securely stored according to NADRA protocols."
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 593,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 589,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/registration/page.jsx",
            lineNumber: 306,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/registration/page.jsx",
        lineNumber: 305,
        columnNumber: 5
    }, this);
}
_s(NadraRegistrationForm, "v1RSBBuMuoWcUug4MxLoJ5j4+b4=");
_c = NadraRegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "NadraRegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_registration_page_jsx_62fc2b97._.js.map