module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/registration/page.jsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const BiometricFingerprintAuth = ()=>{
    const [isSupported, setIsSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [registeredCredential, setRegisteredCredential] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [authCount, setAuthCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isBiometricAvailable, setIsBiometricAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkBiometricSupport();
    }, []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-5xl animate-pulse",
                            children: "👆"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 274,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-800 mb-2",
                            children: "Biometric Fingerprint"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `mb-6 p-4 rounded-xl border ${isBiometricAvailable ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl mr-3",
                                children: isBiometricAvailable ? '✅' : '⚠️'
                            }, void 0, false, {
                                fileName: "[project]/src/app/registration/page.jsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-semibold ${isBiometricAvailable ? 'text-green-800' : 'text-yellow-800'}`,
                                        children: isBiometricAvailable ? 'Biometric Ready' : 'Limited Support'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/registration/page.jsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleBiometricRegistration,
                            disabled: !isSupported || isLoading,
                            className: "w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: isLoading && !registeredCredential ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleBiometricAuthentication,
                            disabled: !registeredCredential || isLoading,
                            className: "w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: isLoading && registeredCredential ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resetBiometricDemo,
                            disabled: isLoading,
                            className: "w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-4 rounded-xl text-center font-medium ${status.includes('failed') || status.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' : status.includes('successful') || status.includes('✅') || status.includes('🎉') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`,
                    children: status
                }, void 0, false, {
                    fileName: "[project]/src/app/registration/page.jsx",
                    lineNumber: 367,
                    columnNumber: 11
                }, this),
                registeredCredential && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 p-4 bg-gray-50 rounded-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-gray-800 mb-2",
                            children: "🔐 Active Biometric Credential"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 381,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600 space-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        "📅 Registered: ",
                                        new Date(registeredCredential.timestamp).toLocaleString()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/registration/page.jsx",
                                    lineNumber: 388,
                                    columnNumber: 15
                                }, this),
                                authCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center text-xs text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "🔒 Hardware Security • 👆 Biometric • 🛡️ Zero Knowledge"
                        }, void 0, false, {
                            fileName: "[project]/src/app/registration/page.jsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
const __TURBOPACK__default__export__ = BiometricFingerprintAuth;
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__44ffa5a5._.js.map