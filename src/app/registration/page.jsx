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
  const [showFingerprints, setShowFingerprints] = useState(false);

  // Biometric states
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState('');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);
  const [registeredCredential, setRegisteredCredential] = useState(null);
  const [biometricData, setBiometricData] = useState(null);

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

  const handleBiometricRegistration = async () => {
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
          id: window.location.hostname || "localhost",
        },
        user: {
          id: userId,
          name: `${formData.firstName || 'User'}.${formData.lastName || 'NADRA'}@nadra.gov.pk`,
          displayName: `${formData.firstName || 'NADRA'} ${formData.lastName || 'User'}`,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },   // ES256
          { alg: -35, type: "public-key" },  // ES384
          { alg: -36, type: "public-key" },  // ES512
          { alg: -257, type: "public-key" }, // RS256
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
    } finally {
      setIsBiometricLoading(false);
    }
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

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
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
        constituency: "",
      });
      setErrors({});
      setRegisteredCredential(null);
      setBiometricData(null);
      setBiometricStatus('');
    }, 2000);
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
                        <img src="/Fingerprint Scanning.gif" width={'200px'} height={"200px"}  alt="" />
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