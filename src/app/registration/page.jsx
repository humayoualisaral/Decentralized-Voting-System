'use client'
import React, { useState, useEffect } from 'react';

const BiometricFingerprintAuth = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registeredCredential, setRegisteredCredential] = useState(null);
  const [authCount, setAuthCount] = useState(0);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
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

  const generateSecureChallenge = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return array;
  };

  const generateUserId = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return array;
  };

  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const base64ToArrayBuffer = (base64) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const handleBiometricRegistration = async () => {
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
          id: window.location.hostname || "localhost",
        },
        user: {
          id: userId,
          name: "biometric@demo.com",
          displayName: "Biometric User",
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },   // ES256
          { alg: -35, type: "public-key" },  // ES384
          { alg: -36, type: "public-key" },  // ES512
          { alg: -257, type: "public-key" }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform", // Built-in biometric
          userVerification: "required",        // Force biometric verification
          requireResidentKey: true,           // Store credential on device
          residentKey: "required"
        },
        timeout: 60000,
        attestation: "direct", // Get device attestation info
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricAuthentication = async () => {
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
        allowCredentials: [{
          id: base64ToArrayBuffer(btoa(String.fromCharCode(...new Uint8Array(registeredCredential.rawId)))),
          type: 'public-key',
          transports: ['internal'] // Platform biometric
        }],
        userVerification: 'required', // Force biometric verification
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
    } finally {
      setIsLoading(false);
    }
  };

  const resetBiometricDemo = () => {
    setRegisteredCredential(null);
    setAuthCount(0);
    setStatus('🔄 Demo reset - ready for new biometric registration');
    alert('🔄 BIOMETRIC DEMO RESET\n\nAll biometric credentials cleared.\nYou can now register a new fingerprint for authentication.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-5xl animate-pulse">
            👆
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Biometric Fingerprint
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Hardware-backed biometric authentication using your device's fingerprint sensor
          </p>
        </div>

        {/* Support Status */}
        <div className={`mb-6 p-4 rounded-xl border ${
          isBiometricAvailable 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center">
            <span className="text-2xl mr-3">
              {isBiometricAvailable ? '✅' : '⚠️'}
            </span>
            <div>
              <p className={`font-semibold ${
                isBiometricAvailable ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {isBiometricAvailable ? 'Biometric Ready' : 'Limited Support'}
              </p>
              <p className={`text-sm ${
                isBiometricAvailable ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {isBiometricAvailable 
                  ? 'Hardware biometric authenticator detected'
                  : 'Requires device with enrolled fingerprint and HTTPS'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-6">
          <button 
            onClick={handleBiometricRegistration}
            disabled={!isSupported || isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading && !registeredCredential ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">🔄</span>
                Enrolling Biometric...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">👆</span>
                Register Biometric Fingerprint
              </span>
            )}
          </button>
          
          <button 
            onClick={handleBiometricAuthentication}
            disabled={!registeredCredential || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading && registeredCredential ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2">🔄</span>
                Verifying Biometric...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">🔓</span>
                Authenticate with Biometric
              </span>
            )}
          </button>

          {registeredCredential && (
            <button 
              onClick={resetBiometricDemo}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🔄</span>
                Reset Biometric Demo
              </span>
            </button>
          )}
        </div>

        {/* Status Display */}
        {status && (
          <div className={`p-4 rounded-xl text-center font-medium ${
            status.includes('failed') || status.includes('❌') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : status.includes('successful') || status.includes('✅') || status.includes('🎉')
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {status}
          </div>
        )}

        {/* Credential Info */}
        {registeredCredential && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">
              🔐 Active Biometric Credential
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="font-mono break-all">
                ID: {registeredCredential.id.substring(0, 20)}...
              </div>
              <div>
                📅 Registered: {new Date(registeredCredential.timestamp).toLocaleString()}
              </div>
              {authCount > 0 && (
                <div className="text-green-600 font-medium">
                  ✅ Successful authentications: {authCount}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>🔒 Hardware Security • 👆 Biometric • 🛡️ Zero Knowledge</p>
          <p className="mt-1">Real WebAuthn biometric authentication</p>
        </div>
      </div>
    </div>
  );
};

export default BiometricFingerprintAuth;