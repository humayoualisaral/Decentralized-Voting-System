'use client'
import { useState, useEffect } from "react";
import { User, MapPin, Hash, Calendar } from "lucide-react";

export default function NadraRegistrationForm() {
  const [formData, setFormData] = useState({
    cnicNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    province: "",
    constituency: "",
  });

  const [errors, setErrors] = useState({});
  const [constituencies, setConstituencies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Biometric states
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [registeredCredential, setRegisteredCredential] = useState(null);
  const [biometricData, setBiometricData] = useState(null);

  // API Response states
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Province → Constituency data map
  const constituenciesData = {
    Punjab: [
      "Lahore", "Multan", "Rawalpindi", "Faisalabad", "Gujranwala", 
      "Sialkot", "Gujrat", "Bahawalpur", "Sargodha"
    ],
    Sindh: [
      "Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpurkhas", 
      "Nawabshah", "Thatta"
    ],
    "Khyber Pakhtunkhwa": [
      "Peshawar", "Swat", "Abbottabad", "Mardan", 
      "Dera Ismail Khan", "Bannu", "Kohat"
    ],
    Balochistan: [
      "Quetta", "Gwadar", "Khuzdar", "Sibi", 
      "Zhob", "Kalat", "Lasbella"
    ],
    "Gilgit": [
      "Gilgit", "Skardu", "Hunza", "Ghizer", 
      "Ghanche", "Diamer", "Astore", "Nagar", 
      "Shigar", "Kharmang"
    ]
  };

  // Initialize biometric support check
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  // Update constituencies when province changes
  useEffect(() => {
    if (formData.province && constituenciesData[formData.province]) {
      setConstituencies(constituenciesData[formData.province]);
      setFormData(prev => ({ ...prev, constituency: "" }));
    } else {
      setConstituencies([]);
      setFormData(prev => ({ ...prev, constituency: "" }));
    }
  }, [formData.province]);

  // Biometric helper functions
  const checkBiometricSupport = async () => {
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



  // Fixed handleBiometricVerification function for CandidateList component

const handleBiometricVerification = async () => {
  try {
    if (!window.PublicKeyCredential) {
      throw new Error('WebAuthn not supported in this browser');
    }

    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    if (!available) {
      throw new Error('No biometric authenticator detected on this device');
    }

    setIsBiometricLoading(true);
    setBiometricStatus('🔐 Authenticating with your registered fingerprint...');

    // Generate challenge for authentication
    const challenge = generateSecureChallenge();

    // FIXED: For authentication, we need to allow any registered credential
    // Since we're doing user verification, we don't need to specify exact credentials
    const allowCredentials = [];
    
    // If we have the user's registered credential ID, we can optionally specify it
    if (userRegistration?.biometricData?.rawId) {
      try {
        // Convert the stored base64 rawId back to ArrayBuffer
        const credentialIdBuffer = base64ToArrayBuffer(userRegistration.biometricData.rawId);
        
        allowCredentials.push({
          id: credentialIdBuffer,
          type: "public-key",
          transports: ["internal"] // Platform authenticator
        });
        
        console.log('Using specific credential ID for authentication');
      } catch (error) {
        console.warn('Could not parse stored credential ID, will allow any credential:', error);
        // Continue without specifying credentials - let the authenticator choose
      }
    }

    // Authentication options
    const authenticationOptions = {
      challenge: challenge,
      timeout: 60000,
      userVerification: "required",
      // FIXED: Only specify allowCredentials if we successfully parsed the stored credential
      ...(allowCredentials.length > 0 && { allowCredentials: allowCredentials })
    };

    console.log('Starting biometric authentication...');
    console.log('Challenge:', arrayBufferToBase64(challenge));
    console.log('Expected credential ID:', userRegistration?.biometricData?.id);

    // USE GET() for authentication
    const assertion = await navigator.credentials.get({
      publicKey: authenticationOptions
    });

    if (!assertion) {
      throw new Error('No assertion returned from biometric authentication');
    }

    console.log('Authentication successful!');
    console.log('Received credential ID:', assertion.id);
    console.log('Expected credential ID:', userRegistration?.biometricData?.id);

    // FIXED: Verify credential ID matches - handle URL-safe base64 conversion
    const receivedCredentialId = assertion.id;
    const storedCredentialId = userRegistration?.biometricData?.id;
    
    // Convert between different base64 encodings if needed
    const normalizeCredentialId = (id) => {
      return id.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    
    const normalizedReceived = normalizeCredentialId(receivedCredentialId);
    const normalizedStored = normalizeCredentialId(storedCredentialId);
    
    if (normalizedReceived !== normalizedStored) {
      console.error('Credential ID mismatch:');
      console.error('  Received:', receivedCredentialId);
      console.error('  Stored:', storedCredentialId);
      console.error('  Normalized Received:', normalizedReceived);
      console.error('  Normalized Stored:', normalizedStored);
      
      throw new Error('Credential ID mismatch - this fingerprint does not match your registered biometric data');
    }

    console.log('✅ Credential ID verification successful');

    // Create authentication data for backend verification
    const authenticationData = {
      id: assertion.id,
      rawId: arrayBufferToBase64(assertion.rawId),
      type: assertion.type,
      challenge: arrayBufferToBase64(challenge),
      timestamp: new Date().toISOString(),
      cnicNumber: cnicNumber,
      // Include assertion response data for verification
      authenticatorData: arrayBufferToBase64(assertion.response.authenticatorData),
      signature: arrayBufferToBase64(assertion.response.signature),
      userHandle: assertion.response.userHandle ? arrayBufferToBase64(assertion.response.userHandle) : null,
      // Add client data for additional verification
      clientDataJSON: arrayBufferToBase64(assertion.response.clientDataJSON)
    };

    setBiometricData(authenticationData);
    setBiometricStatus('✅ Fingerprint authenticated successfully!');
    setVerificationStep('verifying');

    // Proceed with vote casting
    await castVoteWithVerification(authenticationData);

  } catch (error) {
    console.error('Biometric authentication failed:', error);
    setBiometricStatus('❌ Fingerprint authentication failed');
    
    let errorMessage = '🚫 FINGERPRINT AUTHENTICATION FAILED\n\n';
    
    if (error.name === 'NotAllowedError') {
      errorMessage += '❌ Authentication cancelled or failed\n\n🔧 Please try again and complete the biometric prompt';
    } else if (error.name === 'SecurityError') {
      errorMessage += '❌ Security requirements not met\n\n🔧 Ensure you\'re using HTTPS and the site is trusted';
    } else if (error.name === 'InvalidStateError') {
      errorMessage += '❌ No registered fingerprint found\n\n🔧 Please complete NADRA registration first or try a different finger';
    } else if (error.name === 'NotSupportedError') {
      errorMessage += '❌ This authenticator does not support the requested operation\n\n🔧 Try using the fingerprint sensor you used during registration';
    } else if (error.message.includes('Credential ID mismatch')) {
      errorMessage += '❌ This fingerprint does not match your registered biometric data\n\n🔧 Please use the same finger you registered with NADRA';
    } else if (error.message.includes('No biometric authenticator detected')) {
      errorMessage += '❌ No fingerprint sensor detected\n\n🔧 Ensure your device has a working fingerprint sensor';
    } else {
      errorMessage += `❌ Error: ${error.message || 'Unknown biometric error'}\n\n🔧 Please try again or contact support if the issue persists`;
    }
    
    alert(errorMessage);
  } finally {
    setIsBiometricLoading(false);
  }
};

// FIXED: Enhanced helper function to convert base64 to ArrayBuffer with error handling
const base64ToArrayBuffer = (base64) => {
  try {
    // Handle URL-safe base64
    const normalizedBase64 = base64
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    
    const binaryString = atob(normalizedBase64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error('Error converting base64 to ArrayBuffer:', error);
    throw new Error('Invalid base64 data format');
  }
};

// Enhanced helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  try {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (error) {
    console.error('Error converting ArrayBuffer to base64:', error);
    throw new Error('Invalid ArrayBuffer data');
  }
};

// Helper function to generate secure challenge
const generateSecureChallenge = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return array;
};
  // Validation function
  const validateForm = () => {
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
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Format CNIC input
  const formatCNIC = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 13);
  };

  // API call to submit registration
  const submitToAPI = async (registrationData) => {
    try {
      const response = await fetch('/api/registration/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);
    setRegistrationResponse(null);

    try {
      const registrationData = {
        cnicNumber: formData.cnicNumber,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        province: formData.province,
        constituency: formData.constituency,
        biometricData: biometricData
      };

      console.log('Submitting registration data:', registrationData);

      const result = await submitToAPI(registrationData);

      setRegistrationResponse(result);
      
      // Show success message
      alert(`✅ NADRA REGISTRATION SUCCESSFUL!\n\n🎉 Registration ID: ${result.data.registrationId}\n👤 Name: ${result.data.fullName}\n📍 Province: ${result.data.province}\n🏛️ Constituency: ${result.data.constituency}\n📅 Submitted: ${new Date().toLocaleString()}\n\n🔒 Your biometric data has been securely stored.`);
      
      // Reset form after successful submission
      setFormData({
        cnicNumber: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        province: "",
        constituency: "",
      });
      setErrors({});
      setRegisteredCredential(null);
      setBiometricData(null);
      setBiometricStatus('');
      
    } catch (error) {
      console.error('Registration failed:', error);
      setApiError(error.message);
      
      // Show error message
      let errorMessage = '❌ REGISTRATION FAILED\n\n';
      
      if (error.message.includes('CNIC already registered')) {
        errorMessage += '🚫 This CNIC number is already registered in the system.\n\n💡 If this is your CNIC, please contact NADRA support.';
      } else if (error.message.includes('Rate limit exceeded')) {
        errorMessage += '⏰ Too many registration attempts.\n\n🔄 Please wait 15 minutes before trying again.';
      } else if (error.message.includes('Biometric data is too old')) {
        errorMessage += '⏱️ Biometric data expired.\n\n🔄 Please re-register your fingerprint and try again.';
      } else {
        errorMessage += `💥 Error: ${error.message}\n\n🔄 Please check your information and try again.`;
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-[100px] rounded-full overflow-hidden h-[100px] mb-4">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAb082NJggC71VykY1zPCSQbib4oNe6Tm2DA&s" alt="NADRA Logo" width={"100px"} height={"100px"} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            NADRA Registration Form
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your National Database and Registration Authority (NADRA) registration with biometric authentication.
          </p>
        </div>

        {/* API Error Display */}
        {apiError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-800">
                  <strong>Registration Error:</strong> {apiError}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Success Response Display */}
        {registrationResponse && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">Registration Successful!</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p><strong>Registration ID:</strong> {registrationResponse.data.registrationId}</p>
                  <p><strong>Full Name:</strong> {registrationResponse.data.fullName}</p>
                  <p><strong>Status:</strong> {registrationResponse.data.status}</p>
                  <p><strong>Province:</strong> {registrationResponse.data.province}</p>
                  <p><strong>Constituency:</strong> {registrationResponse.data.constituency}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-[darkgreen] px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Personal Information & Biometric Registration</h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* CNIC Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Hash className="inline w-4 h-4 mr-2" />
                  CNIC Number
                </label>
                <input
                  type="text"
                  value={formData.cnicNumber}
                  onChange={(e) => handleInputChange('cnicNumber', formatCNIC(e.target.value))}
                  placeholder="Enter 13-digit CNIC number"
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.cnicNumber 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.cnicNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.cnicNumber}</p>
                )}
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.firstName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.lastName 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0]}
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.dateOfBirth 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Province
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                    errors.province 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 focus:border-emerald-500'
                  }`}
                >
                  <option value="">Select Province</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Gilgit">Gilgit-Baltistan</option>
                </select>
                {errors.province && (
                  <p className="mt-1 text-sm text-red-600">{errors.province}</p>
                )}
              </div>

              {/* Constituency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Constituency
                </label>
                <select
                  value={formData.constituency}
                  onChange={(e) => handleInputChange('constituency', e.target.value)}
                  disabled={!formData.province}
                  className={`w-full text-[#000] px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${
                    !formData.province 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : errors.constituency 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 focus:border-emerald-500'
                  }`}
                >
                  <option value="">
                    {formData.province ? 'Select Constituency' : 'Select Province First'}
                  </option>
                  {constituencies.map((constituency) => (
                    <option key={constituency} value={constituency}>
                      {constituency}
                    </option>
                  ))}
                </select>
                {errors.constituency && (
                  <p className="mt-1 text-sm text-red-600">{errors.constituency}</p>
                )}
              </div>

              {/* Biometric Fingerprint Section */}
              <div className="md:col-span-2">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Biometric Fingerprint Authentication
                    </h3>
                    
                    {/* Custom Fingerprint Logo */}
                    <div className="flex justify-center mb-4">
                      <button
                        type="button"
                        onClick={handleBiometricRegistration}
                        disabled={!isBiometricSupported || isBiometricLoading}
                        className={`relative group transition-all duration-300 ${
                          registeredCredential
                            ? 'cursor-default'
                            : isBiometricLoading
                            ? 'cursor-wait'
                            : 'cursor-pointer hover:scale-110'
                        }`}
                      >
                        {/* Fingerprint SVG Logo */}
                        <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="text-white">
                            <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" fill="currentColor"/>
                          </svg>
                        </div>
                      </button>
                    </div>

                    {/* Status Message */}
                    <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                      registeredCredential
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : isBiometricLoading
                        ? 'bg-blue-50 border border-blue-200 text-blue-800'
                        : isBiometricAvailable 
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                        : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                    }`}>
                      {isBiometricLoading ? (
                        <div className="flex items-center justify-center">
                          <span className="animate-spin mr-2">🔄</span>
                          Place your finger on the biometric sensor...
                        </div>
                      ) : registeredCredential ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-2">✅</span>
                          Biometric fingerprint registered successfully!
                        </div>
                      ) : biometricStatus ? (
                        biometricStatus
                      ) : (
                        'Checking biometric capabilities...'
                      )}
                    </div>

                    {/* Instructions */}
                    {!registeredCredential && (
                      <p className="text-sm text-gray-600">
                        {isBiometricAvailable 
                          ? 'Click the fingerprint icon above to register your biometric authentication'
                          : 'Biometric authentication is not available on this device'
                        }
                      </p>
                    )}

                    {/* Biometric Details */}
                    {registeredCredential && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                        <div className="font-medium text-green-800 mb-2">Registered Biometric Details:</div>
                        <div className="text-green-700 space-y-1">
                          <div className="font-mono">ID: {registeredCredential.id.substring(0, 30)}...</div>
                          <div>Type: Hardware Security Platform</div>
                          <div>Registered: {new Date(registeredCredential.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                    )}

                    {/* Error Display */}
                    {errors.biometric && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">{errors.biometric}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 min-w-[200px] ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[darkgreen] hover:bg-green-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting Registration...
                  </div>
                ) : (
                  'Submit NADRA Registration'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By submitting this form, you agree to NADRA's terms and conditions.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            🔒 Your biometric data is encrypted and securely stored according to NADRA protocols.
          </p>
        </div>
      </div>
    </div>
  );
}