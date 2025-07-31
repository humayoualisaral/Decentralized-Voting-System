'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import CandidateCard from '@/components/CandidateUserCard';
import { Users, Trophy, BarChart3, Loader2, Hash, Fingerprint, X, AlertCircle } from 'lucide-react';

const CandidateList = ({ electionId, isElectionActive }) => {
  const {
    getElectionCandidates,
    getCandidateDetails,
    castVote,
    isLoading,
    account
  } = useVoting();

  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [votingInProgress, setVotingInProgress] = useState(false);

  // CNIC Verification states
  const [showCnicModal, setShowCnicModal] = useState(false);
  const [cnicNumber, setCnicNumber] = useState('');
  const [cnicError, setCnicError] = useState('');
  const [verificationStep, setVerificationStep] = useState('cnic'); // 'cnic', 'fingerprint', 'verifying'
  const [userRegistration, setUserRegistration] = useState(null);
  const [biometricData, setBiometricData] = useState(null);
  const [biometricStatus, setBiometricStatus] = useState('');
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

  // Fetch candidates from contract
  useEffect(() => {
    const fetchCandidates = async () => {
      if (!electionId) return;
      
      try {
        setLoadingCandidates(true);
        
        const candidateIds = await getElectionCandidates(electionId);
        const candidatePromises = candidateIds.map(async (candidateId) => {
          return await getCandidateDetails(candidateId);
        });
        
        const candidateDetails = await Promise.all(candidatePromises);
        setCandidates(candidateDetails.filter(candidate => candidate.isActive));
        
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setCandidates([]);
      } finally {
        setLoadingCandidates(false);
      }
    };

    fetchCandidates();
  }, [electionId, getElectionCandidates, getCandidateDetails]);

  // CNIC verification functions
  const handleVoteNow = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCnicModal(true);
    setVerificationStep('cnic');
    setCnicNumber('');
    setCnicError('');
    setUserRegistration(null);
    setBiometricData(null);
  };

  const formatCNIC = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.slice(0, 13);
  };

  const handleCnicSubmit = async () => {
    if (!cnicNumber || cnicNumber.length !== 13) {
      setCnicError('CNIC must be exactly 13 digits');
      return;
    }

    try {
      setVotingInProgress(true);
      setCnicError('');

      // Verify CNIC with backend
      const response = await fetch(`/api/registration/${cnicNumber}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'CNIC verification failed');
      }

      if (!result.data.isVerified) {
        throw new Error('CNIC is not verified. Please complete your NADRA registration first.');
      }

      setUserRegistration(result.data);
      setVerificationStep('fingerprint');
      setBiometricStatus('✅ CNIC verified! Now register your fingerprint to proceed.');

    } catch (error) {
      console.error('CNIC verification error:', error);
      setCnicError(error.message);
    } finally {
      setVotingInProgress(false);
    }
  };

  // Biometric helper functions
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
      setBiometricStatus('🔐 Place your finger on the biometric sensor...');

      const userId = generateUserId();
      const challenge = generateSecureChallenge();

      const registrationOptions = {
        challenge: challenge,
        rp: {
          name: "Voting System",
          id: window.location.hostname || "localhost",
        },
        user: {
          id: userId,
          name: `${userRegistration.firstName}.${userRegistration.lastName}@voting.gov.pk`,
          displayName: `${userRegistration.firstName} ${userRegistration.lastName}`,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" },
          { alg: -35, type: "public-key" },
          { alg: -36, type: "public-key" },
          { alg: -257, type: "public-key" },
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
        rawId: arrayBufferToBase64(credential.rawId),
        type: credential.type,
        challenge: arrayBufferToBase64(challenge),
        userId: arrayBufferToBase64(userId),
        timestamp: new Date().toISOString(),
        cnicNumber: cnicNumber
      };

      setBiometricData(credentialInfo);
      setBiometricStatus('✅ Fingerprint verified successfully!');
      setVerificationStep('verifying');

      // Proceed with vote casting
      await castVoteWithVerification(credentialInfo);

    } catch (error) {
      console.error('Biometric verification failed:', error);
      setBiometricStatus('❌ Fingerprint verification failed');
      
      let errorMessage = '🚫 FINGERPRINT VERIFICATION FAILED\n\n';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += '❌ Verification cancelled or failed\n\n🔧 Please try again and complete the biometric prompt';
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

  const castVoteWithVerification = async (biometricCredential) => {
    try {
      setVotingInProgress(true);
      setBiometricStatus('🔐 Verifying biometric data with backend...');

      // First, verify biometric data with backend
      const verificationResponse = await fetch('/api/vote/verify-biometric', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cnicNumber: cnicNumber,
          biometricData: biometricCredential,
          electionId: electionId,
          candidateId: selectedCandidate.candidateId
        }),
      });

      const verificationResult = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(verificationResult.message || 'Biometric verification failed');
      }

      setBiometricStatus('✅ Biometric verified! Casting vote on blockchain...');

      // Use the verification hash from backend for blockchain transaction
      const fingerprintVerification = verificationResult.data.verificationHash;

      // Cast vote directly to smart contract
      const voteReceipt = await castVote(
        electionId,
        selectedCandidate.candidateId,
        fingerprintVerification
      );

      setBiometricStatus('🎉 Vote successfully recorded on blockchain!');

      // Refresh candidates to get updated vote counts from blockchain
      const candidateIds = await getElectionCandidates(electionId);
      const candidatePromises = candidateIds.map(async (candidateId) => {
        return await getCandidateDetails(candidateId);
      });
      const candidateDetails = await Promise.all(candidatePromises);
      setCandidates(candidateDetails.filter(candidate => candidate.isActive));

      setBiometricStatus('✅ Vote cast successfully!');
      
      // Show success message with verification details
      alert(`✅ VOTE CAST SUCCESSFULLY!\n\n🎉 Your vote for ${selectedCandidate.name} has been recorded on the blockchain.\n👤 Voter: ${verificationResult.data.voterName}\n🆔 CNIC: ${verificationResult.data.cnicNumber}\n🔗 Transaction Hash: ${voteReceipt.hash}\n📅 Time: ${new Date().toLocaleString()}\n\n🔒 Your vote is secure, verified, and stored permanently on the blockchain.`);

      // Close modal and reset
      setTimeout(() => {
        setShowCnicModal(false);
        setSelectedCandidate(null);
        resetVerificationState();
      }, 2000);

    } catch (error) {
      console.error('Error in vote verification/casting:', error);
      setBiometricStatus('❌ Vote casting failed');
      
      let errorMessage = '❌ VOTE CASTING FAILED\n\n';
      
      if (error.message.includes('already voted')) {
        errorMessage += '🚫 You have already voted in this election.\n\n💡 Each voter can only vote once per election.';
      } else if (error.message.includes('not verified')) {
        errorMessage += '🚫 Your registration is not verified.\n\n💡 Please complete your NADRA verification first.';
      } else if (error.message.includes('Rate limit')) {
        errorMessage += '⏰ Too many verification attempts.\n\n🔄 Please wait a few minutes before trying again.';
      } else if (error.message.includes('Biometric data is too old')) {
        errorMessage += '⏱️ Biometric data expired.\n\n🔄 Please re-authenticate your fingerprint.';
      } else if (error.message.includes('execution reverted')) {
        errorMessage += '🚫 Smart contract rejected the vote.\n\n💡 You may have already voted or the election may be inactive.';
      } else {
        errorMessage += `💥 Error: ${error.message}\n\n🔄 Please try again or contact support.`;
      }
      
      alert(errorMessage);
    } finally {
      setVotingInProgress(false);
    }
  };

  const resetVerificationState = () => {
    setCnicNumber('');
    setCnicError('');
    setVerificationStep('cnic');
    setUserRegistration(null);
    setBiometricData(null);
    setBiometricStatus('');
    setIsBiometricLoading(false);
  };

  const getTotalVotes = () => {
    return candidates.reduce((total, candidate) => total + parseInt(candidate.voteCount || 0), 0);
  };

  const getLeadingCandidate = () => {
    if (candidates.length === 0) return null;
    return candidates.reduce((leading, candidate) => 
      parseInt(candidate.voteCount || 0) > parseInt(leading.voteCount || 0) ? candidate : leading
    );
  };

  if (loadingCandidates) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Loading Candidates...
          </h3>
          <p className="text-gray-500">
            Fetching candidate information from the blockchain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Election Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
            <p className="text-sm text-gray-600">Candidates</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{getTotalVotes()}</p>
            <p className="text-sm text-gray-600">Total Votes</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-lg font-bold text-gray-900 truncate">
              {getLeadingCandidate()?.name || 'TBD'}
            </p>
            <p className="text-sm text-gray-600">Leading</p>
          </div>
        </div>
      </div>

      {/* Results Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Candidates</h2>
        <button
          onClick={() => setShowResults(!showResults)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          {showResults ? 'Hide Results' : 'Show Results'}
        </button>
      </div>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Candidates Found
          </h3>
          <p className="text-gray-500">
            No candidates have been added to this election yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.candidateId}
              candidate={candidate}
              onVoteNow={handleVoteNow}
              canVote={isElectionActive}
              showResults={showResults}
              totalVotes={getTotalVotes()}
            />
          ))}
        </div>
      )}

      {/* CNIC Verification Modal */}
      {showCnicModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Voter Verification
              </h3>
              <button
                onClick={() => {
                  setShowCnicModal(false);
                  resetVerificationState();
                }}
                disabled={votingInProgress}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Selected Candidate Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{selectedCandidate.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedCandidate.partyName}</p>
                  <p className="text-lg">{selectedCandidate.symbol}</p>
                </div>
              </div>
            </div>

            {/* Verification Steps */}
            <div className="space-y-4">
              {/* Step 1: CNIC Verification */}
              {verificationStep === 'cnic' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Hash className="w-4 h-4 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Step 1: CNIC Verification</h4>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Enter your 13-digit CNIC number to verify your voter registration.
                  </p>
                  
                  <input
                    type="text"
                    value={cnicNumber}
                    onChange={(e) => {
                      setCnicNumber(formatCNIC(e.target.value));
                      setCnicError('');
                    }}
                    placeholder="Enter your CNIC number"
                    className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      cnicError 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                    disabled={votingInProgress}
                  />
                  
                  {cnicError && (
                    <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {cnicError}
                    </div>
                  )}
                  
                  <button
                    onClick={handleCnicSubmit}
                    disabled={votingInProgress || !cnicNumber || cnicNumber.length !== 13}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {votingInProgress ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying CNIC...
                      </>
                    ) : (
                      'Verify CNIC'
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Fingerprint Verification */}
              {verificationStep === 'fingerprint' && userRegistration && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Fingerprint className="w-4 h-4 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Step 2: Fingerprint Verification</h4>
                  </div>

                  {/* User Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="text-green-800">
                      <p className="font-medium">✅ CNIC Verified</p>
                      <p className="text-sm">Name: {userRegistration.firstName} {userRegistration.lastName}</p>
                      <p className="text-sm">Province: {userRegistration.province}</p>
                      <p className="text-sm">Constituency: {userRegistration.constituency}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    Now verify your identity using your fingerprint to cast your vote securely.
                  </p>

                  {/* Fingerprint Button */}
                  <div className="text-center mb-4">
                    <button
                      onClick={handleBiometricVerification}
                      disabled={isBiometricLoading}
                      className={`relative group transition-all duration-300 ${
                        isBiometricLoading ? 'cursor-wait' : 'cursor-pointer hover:scale-110'
                      }`}
                    >
                      <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                        <Fingerprint className="w-16 h-16 text-white" />
                      </div>
                    </button>
                  </div>

                  {/* Status Message */}
                  {biometricStatus && (
                    <div className={`p-3 rounded-lg text-sm font-medium text-center ${
                      biometricStatus.includes('✅') 
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : biometricStatus.includes('❌')
                        ? 'bg-red-50 border border-red-200 text-red-800'
                        : 'bg-blue-50 border border-blue-200 text-blue-800'
                    }`}>
                      {biometricStatus}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Processing Vote */}
              {verificationStep === 'verifying' && (
                <div className="text-center py-8">
                  <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                  <h4 className="font-semibold text-gray-900 mb-2">Processing Your Vote</h4>
                  <p className="text-gray-600">
                    Your vote is being securely recorded on the blockchain...
                  </p>
                  {biometricStatus && (
                    <p className="text-sm text-blue-600 mt-2">{biometricStatus}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;