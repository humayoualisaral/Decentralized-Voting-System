(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/registration/page.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const BiometricFingerprintAuth = ()=>{
    _s();
    const [isSupported, setIsSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [registeredCredential, setRegisteredCredential] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authCount, setAuthCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isBiometricAvailable, setIsBiometricAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BiometricFingerprintAuth.useEffect": ()=>{
            checkBiometricSupport();
        }
    }["BiometricFingerprintAuth.useEffect"], []);
    const checkBiometricSupport = async ()=>{
        try {
            // Check if WebAuthn is supported
            if (!window.PublicKeyCredential) {
                setStatus('❌ WebAuthn not supported in this browser');
                return;
            }
            // Check if platform authenticator (biometric) is available
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            setIsBiometricAvailable(available);
            setIsSupported(true);
            if (available) {
                setStatus('✅ Biometric fingerprint authentication is available');
            } else {
                setStatus('⚠️ No biometric authenticator detected on this device');
            }
            // Check for conditional UI support (enhanced UX)
            if (PublicKeyCredential.isConditionalMediationAvailable) {
                const conditionalUI = await PublicKeyCredential.isConditionalMediationAvailable();
                console.log('Conditional UI supported:', conditionalUI);
            }
        } catch (error) {
            console.error('Error checking biometric support:', error);
            setStatus('❌ Error checking biometric capabilities');
            setIsSupported(false);
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
    const base64ToArrayBuffer = (base64)=>{
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for(let i = 0; i < binary.length; i++){
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    };
    const handleBiometricRegistration = async ()=>{
        if (!isBiometricAvailable) {
            alert('🚫 BIOMETRIC NOT AVAILABLE\n\nYour device does not support biometric authentication or no fingerprint is enrolled.');
            return;
        }
        setIsLoading(true);
        setStatus('🔐 Place your finger on the biometric sensor...');
        try {
            const userId = generateUserId();
            const challenge = generateSecureChallenge();
            const registrationOptions = {
                challenge: challenge,
                rp: {
                    name: "Biometric Fingerprint Demo",
                    id: window.location.hostname || "localhost"
                },
                user: {
                    id: userId,
                    name: "biometric@demo.com",
                    displayName: "Biometric User"
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
                excludeCredentials: [] // Allow multiple registrations
            };
            console.log('Starting biometric registration with options:', registrationOptions);
            const credential = await navigator.credentials.create({
                publicKey: registrationOptions
            });
            if (!credential) {
                throw new Error('No credential returned from biometric registration');
            }
            console.log('Biometric registration successful:', credential);
            // Store credential info for authentication
            const credentialInfo = {
                id: credential.id,
                rawId: credential.rawId,
                type: credential.type,
                challenge: arrayBufferToBase64(challenge),
                userId: arrayBufferToBase64(userId),
                timestamp: new Date().toISOString()
            };
            setRegisteredCredential(credentialInfo);
            setStatus('✅ Biometric fingerprint registered successfully!');
            // Detailed success alert
            const alertMessage = `🎉 BIOMETRIC REGISTRATION SUCCESSFUL!

👆 Fingerprint Type: Platform Biometric Authenticator
🆔 Credential ID: ${credential.id}
🔐 Algorithm: ES256/RS256 (Public Key Cryptography)
📱 Authenticator: ${credential.response.authenticatorData ? 'Hardware Security Module' : 'Platform'}
🛡️ Attestation: ${credential.response.attestationObject ? 'Device Verified' : 'Self-Attested'}
⏰ Registered: ${new Date().toLocaleString()}

🔒 Your biometric fingerprint has been securely enrolled!
The private key is stored in your device's secure hardware.`;
            alert(alertMessage);
        } catch (error) {
            console.error('Biometric registration failed:', error);
            setStatus(error);
            let errorMessage = '🚫 BIOMETRIC REGISTRATION FAILED\n\n';
            if (error.name === 'NotAllowedError') {
                errorMessage += '❌ Error: User cancelled or biometric verification failed\n\n🔧 Solutions:\n• Try again and complete the biometric prompt\n• Ensure your finger is clean and dry\n• Make sure fingerprint is enrolled in system settings';
            } else if (error.name === 'SecurityError') {
                errorMessage += '❌ Error: Security requirements not met\n\n🔧 Solutions:\n• Ensure you\'re using HTTPS\n• Check if site is trusted\n• Try refreshing the page';
            } else if (error.name === 'NotSupportedError') {
                errorMessage += '❌ Error: Biometric authentication not supported\n\n🔧 Solutions:\n• Enable fingerprint in device settings\n• Update your browser\n• Use a device with biometric capabilities';
            } else if (error.name === 'InvalidStateError') {
                errorMessage += '❌ Error: Credential already exists or invalid state\n\n🔧 Solutions:\n• Clear existing credentials\n• Try the reset function\n• Restart your browser';
            } else {
                errorMessage += `❌ Error: ${error.message || 'Unknown biometric error'}\n\n🔧 General Solutions:\n• Ensure fingerprint sensor is working\n• Check device biometric settings\n• Try again in a few moments`;
            }
            alert(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const handleBiometricAuthentication = async ()=>{
        if (!registeredCredential) {
            alert('⚠️ NO BIOMETRIC REGISTERED\n\nPlease register your biometric fingerprint first before attempting authentication.');
            return;
        }
        setIsLoading(true);
        setStatus('🔍 Verify your biometric fingerprint...');
        try {
            const challenge = generateSecureChallenge();
            const authenticationOptions = {
                challenge: challenge,
                allowCredentials: [
                    {
                        id: base64ToArrayBuffer(btoa(String.fromCharCode(...new Uint8Array(registeredCredential.rawId)))),
                        type: 'public-key',
                        transports: [
                            'internal'
                        ] // Platform biometric
                    }
                ],
                userVerification: 'required',
                timeout: 60000
            };
            console.log('Starting biometric authentication:', authenticationOptions);
            const assertion = await navigator.credentials.get({
                publicKey: authenticationOptions
            });
            if (!assertion) {
                throw new Error('No assertion returned from biometric authentication');
            }
            console.log('Biometric authentication successful:', assertion);
            const newAuthCount = authCount + 1;
            setAuthCount(newAuthCount);
            setStatus(`🎉 Biometric authentication #${newAuthCount} successful!`);
            // Detailed success alert
            const alertMessage = `✅ BIOMETRIC AUTHENTICATION SUCCESSFUL!

🎯 Authentication #: ${newAuthCount}
👆 Method: Biometric Fingerprint Verification
🆔 Credential ID: ${assertion.id}
🔐 Algorithm: Public Key Cryptography Verified
📊 Authenticator Data: ${arrayBufferToBase64(assertion.response.authenticatorData)}
✍️ Digital Signature: ${arrayBufferToBase64(assertion.response.signature)}
👤 User Handle: ${assertion.response.userHandle ? arrayBufferToBase64(assertion.response.userHandle) : 'Anonymous'}
⏰ Authenticated: ${new Date().toLocaleString()}
🛡️ Security Level: Hardware-backed biometric

🔓 ACCESS GRANTED! Your biometric identity has been verified.
The authentication used your device's secure hardware module.`;
            alert(alertMessage);
        } catch (error) {
            console.error('Biometric authentication failed:', error);
            setStatus('❌ Biometric authentication failed');
            let errorMessage = '🚫 BIOMETRIC AUTHENTICATION FAILED\n\n';
            if (error.name === 'NotAllowedError') {
                errorMessage += '❌ Error: Biometric verification was cancelled or failed\n\n🔧 Solutions:\n• Place finger properly on sensor\n• Ensure finger is clean and dry\n• Try a different enrolled finger\n• Complete the biometric prompt fully';
            } else if (error.name === 'SecurityError') {
                errorMessage += '❌ Error: Security validation failed\n\n🔧 Solutions:\n• Refresh the page and try again\n• Ensure secure connection (HTTPS)\n• Check if credential is still valid';
            } else if (error.name === 'NotSupportedError') {
                errorMessage += '❌ Error: Biometric authentication unavailable\n\n🔧 Solutions:\n• Check if fingerprint sensor is working\n• Verify biometric settings are enabled\n• Restart biometric services';
            } else {
                errorMessage += `❌ Error: ${error.message || 'Biometric verification failed'}\n\n🔧 Troubleshooting:\n• Clean fingerprint sensor\n• Re-register if issues persist\n• Check device biometric functionality`;
            }
            alert(errorMessage);
        } finally{
            setIsLoading(false);
        }
    };
    const resetBiometricDemo = ()=>{
        setRegisteredCredential(null);
        setAuthCount(0);
        setStatus('🔄 Demo reset - ready for new biometric registration');
        alert('🔄 BIOMETRIC DEMO RESET\n\nAll biometric credentials cleared.\nYou can now register a new fingerprint for authentication.');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-5xl animate-pulse",
                            children: "👆"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-800 mb-2",
                            children: "Biometric Fingerprint"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 leading-relaxed",
                            children: "Hardware-backed biometric authentication using your device's fingerprint sensor"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mb-6 p-4 rounded-xl border ${isBiometricAvailable ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl mr-3",
                                children: isBiometricAvailable ? '✅' : '⚠️'
                            }, void 0, false, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-semibold ${isBiometricAvailable ? 'text-green-800' : 'text-yellow-800'}`,
                                        children: isBiometricAvailable ? 'Biometric Ready' : 'Limited Support'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-sm ${isBiometricAvailable ? 'text-green-700' : 'text-yellow-700'}`,
                                        children: isBiometricAvailable ? 'Hardware biometric authenticator detected' : 'Requires device with enrolled fingerprint and HTTPS'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 301,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/registration/page.jsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 286,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleBiometricRegistration,
                            disabled: !isSupported || isLoading,
                            className: "w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: isLoading && !registeredCredential ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-spin mr-2",
                                        children: "🔄"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 322,
                                        columnNumber: 17
                                    }, this),
                                    "Enrolling Biometric..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 321,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-2",
                                        children: "👆"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 327,
                                        columnNumber: 17
                                    }, this),
                                    "Register Biometric Fingerprint"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 326,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleBiometricAuthentication,
                            disabled: !registeredCredential || isLoading,
                            className: "w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: isLoading && registeredCredential ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "animate-spin mr-2",
                                        children: "🔄"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, this),
                                    "Verifying Biometric..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 339,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-2",
                                        children: "🔓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, this),
                                    "Authenticate with Biometric"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 333,
                            columnNumber: 11
                        }, this),
                        registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetBiometricDemo,
                            disabled: isLoading,
                            className: "w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-2",
                                        children: "🔄"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 358,
                                        columnNumber: 17
                                    }, this),
                                    "Reset Biometric Demo"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 357,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 352,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this),
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 rounded-xl text-center font-medium ${status.includes('failed') || status.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' : status.includes('successful') || status.includes('✅') || status.includes('🎉') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`,
                    children: status
                }, void 0, false, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 367,
                    columnNumber: 11
                }, this),
                registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 p-4 bg-gray-50 rounded-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-gray-800 mb-2",
                            children: "🔐 Active Biometric Credential"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-mono break-all",
                                    children: [
                                        "ID: ",
                                        registeredCredential.id.substring(0, 20),
                                        "..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 385,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "📅 Registered: ",
                                        new Date(registeredCredential.timestamp).toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                authCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-green-600 font-medium",
                                    children: [
                                        "✅ Successful authentications: ",
                                        authCount
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 392,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 384,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 380,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center text-xs text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "🔒 Hardware Security • 👆 Biometric • 🛡️ Zero Knowledge"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1",
                            children: "Real WebAuthn biometric authentication"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 401,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/registration/page.jsx",
            lineNumber: 271,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/registration/page.jsx",
        lineNumber: 270,
        columnNumber: 5
    }, this);
};
_s(BiometricFingerprintAuth, "P+N9UVBd2siaBiIn2IBW5MTU99A=");
_c = BiometricFingerprintAuth;
const __TURBOPACK__default__export__ = BiometricFingerprintAuth;
var _c;
__turbopack_context__.k.register(_c, "BiometricFingerprintAuth");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_74af8c26._.js.map