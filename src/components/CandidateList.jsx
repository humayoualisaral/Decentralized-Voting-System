'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import CandidateCard from '@/components/CandidateUserCard';
import { Users, Trophy, BarChart3, Loader2, Hash, Fingerprint, X, AlertCircle, Shield, CheckCircle2, Clock, Zap, Search, Eye } from 'lucide-react';

const CandidateList = ({ electionId, isElectionActive }) => {
  const {
    getElectionCandidates,
    getCandidateDetails,
    castVote,
    getVoteByCNIC, // NEW function for vote verification
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

  // Vote verification states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCnic, setVerificationCnic] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');

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

  // Hash CNIC function (simple hash for demo - use proper hashing in production)
  const hashCNIC = (cnic) => {
    // Simple hash function - replace with proper crypto hash in production
    let hash = 0;
    for (let i = 0; i < cnic.length; i++) {
      const char = cnic.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString();
  };

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
  
      console.log('🔍 Verifying CNIC:', cnicNumber);
  
      // Verify CNIC with backend
      const response = await fetch(`/api/registration/${cnicNumber}`);
      const result = await response.json();
       
      if (!response.ok) {
        throw new Error(result.message || 'CNIC verification failed');
      }
  
      console.log('✅ CNIC verification response:', result);
      
      if (!result.data.isVerified) {
        throw new Error('CNIC is not verified. Please complete your NADRA registration first.');
      }
  
      // Check if biometric data exists
      if (!result.data.biometricData || !result.data.biometricData.id) {
        throw new Error('No biometric data found. Please complete your NADRA registration with fingerprint enrollment first.');
      }
  
      // Store the complete registration data including biometric info
      setUserRegistration(result.data);
      setVerificationStep('fingerprint');
      setBiometricStatus(`✅ CNIC verified! Found biometric registration with ID: ${result.data.biometricData.id.substring(0, 20)}...`);
  
      console.log('🎉 CNIC verification successful, proceeding to biometric authentication');
  
    } catch (error) {
      console.error('❌ CNIC verification error:', error);
      setCnicError(error.message);
      setUserRegistration(null);
    } finally {
      setVotingInProgress(false);
    }
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
  
      if (!userRegistration || !userRegistration.biometricData || !userRegistration.biometricData.id) {
        throw new Error('Missing biometric registration data. Please verify your CNIC first.');
      }
  
      setIsBiometricLoading(true);
      setBiometricStatus('🔐 Authenticating with your registered fingerprint...');
  
      console.log('🔍 Starting biometric authentication...');
  
      // Generate challenge for authentication
      const challenge = generateSecureChallenge();
  
      // Use the registered credential ID from the database
      const allowCredentials = [];
      
      try {
        const credentialId = userRegistration.biometricData.id;
        console.log('🆔 Using credential ID for authentication:', credentialId);
        
        // Convert the credential ID to ArrayBuffer
        const credentialIdBuffer = base64ToArrayBuffer(credentialId);
        
        allowCredentials.push({
          id: credentialIdBuffer,
          type: "public-key",
          transports: ["internal"] // Platform authenticator
        });
        
      } catch (conversionError) {
        console.error('❌ Error converting credential ID:', conversionError);
        throw new Error('Invalid credential ID format from registration data');
      }
  
      // Authentication options
      const authenticationOptions = {
        challenge: challenge,
        timeout: 60000,
        userVerification: "required",
        allowCredentials: allowCredentials
      };
  
      console.log('🚀 Calling navigator.credentials.get...');
  
      // Perform authentication
      const assertion = await navigator.credentials.get({
        publicKey: authenticationOptions
      });
  
      if (!assertion) {
        throw new Error('No assertion returned from biometric authentication');
      }
  
      console.log('✅ Authentication successful!');
  
      // Verify that the credential ID matches the registered one
      if (assertion.id !== userRegistration.biometricData.id) {
        console.error('❌ Credential ID mismatch');
        throw new Error('Credential ID mismatch - this fingerprint does not match your registered biometric data');
      }
  
      // Create authentication data for backend verification
      const authenticationData = {
        id: assertion.id,
        rawId: arrayBufferToBase64(assertion.rawId),
        type: assertion.type,
        challenge: arrayBufferToBase64(challenge),
        timestamp: new Date().toISOString(),
        cnicNumber: cnicNumber,
        authenticatorData: arrayBufferToBase64(assertion.response.authenticatorData),
        signature: arrayBufferToBase64(assertion.response.signature),
        userHandle: assertion.response.userHandle ? arrayBufferToBase64(assertion.response.userHandle) : null,
        clientDataJSON: arrayBufferToBase64(assertion.response.clientDataJSON)
      };
  
      setBiometricData(authenticationData);
      setBiometricStatus('✅ Fingerprint authenticated successfully!');
      setVerificationStep('verifying');
  
      // Proceed with vote casting
      await castVoteWithVerification(authenticationData);
  
    } catch (error) {
      console.error('❌ Biometric authentication failed:', error);
      setBiometricStatus('❌ Fingerprint authentication failed');
      
      let errorMessage = '🚫 FINGERPRINT AUTHENTICATION FAILED\n\n';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += '❌ Authentication cancelled or failed\n\n🔧 Please try again and complete the biometric prompt';
      } else if (error.name === 'SecurityError') {
        errorMessage += '❌ Security requirements not met\n\n🔧 Ensure you\'re using HTTPS and the site is trusted';
      } else if (error.name === 'InvalidStateError') {
        errorMessage += '❌ No registered fingerprint found\n\n🔧 Please complete NADRA registration first';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += '❌ This authenticator does not support the requested operation\n\n🔧 Try using the fingerprint sensor you used during registration';
      } else if (error.message.includes('Credential ID mismatch')) {
        errorMessage += '❌ This fingerprint does not match your registered biometric data\n\n🔧 Please use the same finger you registered with NADRA';
      } else if (error.message.includes('Missing biometric registration data')) {
        errorMessage += '❌ No biometric registration found\n\n🔧 Please verify your CNIC first';
      } else if (error.message.includes('Invalid credential ID format')) {
        errorMessage += '❌ Corrupted biometric registration data\n\n🔧 Please contact support or re-register';
      } else {
        errorMessage += `❌ Error: ${error.message || 'Unknown biometric error'}`;
      }
      
      alert(errorMessage);
    } finally {
      setIsBiometricLoading(false);
    }
  };
  
  // Helper functions
  const base64ToArrayBuffer = (base64) => {
    try {
      let base64String = base64;
      
      if (base64String.includes('-') || base64String.includes('_')) {
        base64String = base64String.replace(/-/g, '+').replace(/_/g, '/');
      }
      
      while (base64String.length % 4) {
        base64String += '=';
      }
      
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    } catch (error) {
      console.error('Error converting base64 to ArrayBuffer:', error);
      throw new Error('Invalid base64 format');
    }
  };
  
  const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  
  const generateSecureChallenge = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return array;
  };

  // FIXED: Updated vote casting function to match contract parameters
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

      // FIXED: Cast vote with correct parameters matching the smart contract
      const cnicHash = hashCNIC(cnicNumber);
      const biometricId = biometricCredential.id; // Use the biometric credential ID

      console.log('Casting vote with parameters:', {
        electionId,
        candidateId: selectedCandidate.candidateId,
        cnicHash,
        biometricId: biometricId.substring(0, 20) + '...'
      });

      const voteReceipt = await castVote(
        electionId,
        selectedCandidate.candidateId,
        cnicHash,
        biometricId
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
      } else if (error.message.includes('CNIC already used')) {
        errorMessage += '🚫 This CNIC has already been used to vote in this election.\n\n💡 Each CNIC can only vote once per election.';
      } else if (error.message.includes('not verified')) {
        errorMessage += '🚫 Your registration is not verified.\n\n💡 Please complete your NADRA verification first.';
      } else if (error.message.includes('Rate limit')) {
        errorMessage += '⏰ Too many verification attempts.\n\n🔄 Please wait a few minutes before trying again.';
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

  // NEW: Vote verification function
  const handleVerifyVote = () => {
    setShowVerificationModal(true);
    setVerificationCnic('');
    setVerificationResult(null);
    setVerificationError('');
  };

  const handleVoteVerification = async () => {
    if (!verificationCnic || verificationCnic.length !== 13) {
      setVerificationError('CNIC must be exactly 13 digits');
      return;
    }

    try {
      setVerificationLoading(true);
      setVerificationError('');

      const cnicHash = hashCNIC(verificationCnic);
      const result = await getVoteByCNIC(electionId, cnicHash);

      if (!result.hasVoted) {
        setVerificationError('No vote found for this CNIC in this election');
        setVerificationResult(null);
        return;
      }

      setVerificationResult(result);

    } catch (error) {
      console.error('Error verifying vote:', error);
      setVerificationError('Error verifying vote: ' + error.message);
      setVerificationResult(null);
    } finally {
      setVerificationLoading(false);
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
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/20">
          <div className="relative mb-6">
            <Loader2 className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 rounded-full mx-auto animate-ping"></div>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            Loading Candidates...
          </h3>
          <p className="text-blue-200">
            Fetching candidate information from the blockchain network.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Election Stats */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-blue-400/25">
              <Users className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{candidates.length}</p>
            <p className="text-blue-200 font-medium">Candidates</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-emerald-400/25">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-white mb-1">{getTotalVotes()}</p>
            <p className="text-emerald-200 font-medium">Total Votes</p>
          </div>
          
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-yellow-400/25">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-bold text-white mb-1 truncate">
              {getLeadingCandidate()?.name || 'No Votes Yet'}
            </p>
            <p className="text-yellow-200 font-medium">Leading</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          Candidates
        </h2>
        
        <div className="flex gap-3">
          {/* Vote Verification Button */}
          <button
            onClick={handleVerifyVote}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-lg hover:scale-105 shadow-lg"
          >
            <Search className="w-5 h-5" />
            Verify Vote
          </button>

          {/* Results Toggle */}
          <button
            onClick={() => setShowResults(!showResults)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-lg border border-white/20 hover:scale-105"
          >
            <BarChart3 className="w-5 h-5" />
            {showResults ? 'Hide Results' : 'Show Results'}
          </button>
        </div>
      </div>

      {/* Candidates Grid */}
      {candidates.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">
            No Candidates Found
          </h3>
          <p className="text-blue-200">
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

      {/* Enhanced CNIC Verification Modal */}
      {showCnicModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-600 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Secure Voter Verification
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowCnicModal(false);
                    resetVerificationState();
                  }}
                  disabled={votingInProgress}
                  className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Selected Candidate Info */}
              <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-4 mb-6 border border-slate-500">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {selectedCandidate.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{selectedCandidate.name}</h4>
                    <p className="text-slate-300">{selectedCandidate.partyName}</p>
                    <p className="text-2xl">{selectedCandidate.symbol}</p>
                  </div>
                </div>
              </div>

              {/* Verification Steps */}
              <div className="space-y-6">
                {/* Step 1: CNIC Verification */}
                {verificationStep === 'cnic' && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <Hash className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Step 1: CNIC Verification</h4>
                        <p className="text-slate-400 text-sm">Verify your voter registration</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={cnicNumber}
                        onChange={(e) => {
                          setCnicNumber(formatCNIC(e.target.value));
                          setCnicError('');
                        }}
                        placeholder="Enter your 13-digit CNIC number"
                        className={`w-full px-4 py-3 bg-slate-700 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          cnicError 
                            ? 'border-red-400 bg-red-900/20' 
                            : 'border-slate-600 focus:border-blue-500'
                        }`}
                        disabled={votingInProgress}
                      />
                      
                      {cnicError && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                          <AlertCircle className="w-4 h-4" />
                          {cnicError}
                        </div>
                      )}
                      
                      <button
                        onClick={handleCnicSubmit}
                        disabled={votingInProgress || !cnicNumber || cnicNumber.length !== 13}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 disabled:transform-none shadow-lg"
                      >
                        {votingInProgress ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Verifying CNIC...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Verify CNIC
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Fingerprint Verification */}
                {verificationStep === 'fingerprint' && userRegistration && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                        <Fingerprint className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">Step 2: Biometric Verification</h4>
                        <p className="text-slate-400 text-sm">Authenticate with your fingerprint</p>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-500/30 rounded-xl p-4 mb-6">
                      <div className="text-emerald-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <p className="font-medium">CNIC Verified Successfully</p>
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-slate-300">Name:</span> {userRegistration.firstName} {userRegistration.lastName}</p>
                          <p><span className="text-slate-300">Province:</span> {userRegistration.province}</p>
                          <p><span className="text-slate-300">Constituency:</span> {userRegistration.constituency}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Fingerprint Button */}
                    <div className="text-center mb-6">
                      <button
                        onClick={handleBiometricVerification}
                        disabled={isBiometricLoading}
                        className={`relative group transition-all duration-500 ${
                          isBiometricLoading ? 'cursor-wait' : 'cursor-pointer hover:scale-110'
                        }`}
                      >
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 via-green-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl mx-auto relative overflow-hidden">
                          <Fingerprint className="w-16 h-16 text-white z-10" />
                          {isBiometricLoading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          )}
                        </div>
                        <div className="absolute inset-0 w-32 h-32 border-4 border-emerald-400/30 rounded-full mx-auto animate-ping"></div>
                      </button>
                      <p className="text-slate-300 mt-4 text-sm">
                        {isBiometricLoading ? 'Scanning fingerprint...' : 'Tap to authenticate'}
                      </p>
                    </div>

                    {/* Status Message */}
                    {biometricStatus && (
                      <div className={`p-4 rounded-xl text-sm font-medium text-center border ${
                        biometricStatus.includes('✅') 
                          ? 'bg-emerald-900/30 border-emerald-500/30 text-emerald-200'
                          : biometricStatus.includes('❌')
                          ? 'bg-red-900/30 border-red-500/30 text-red-200'
                          : 'bg-blue-900/30 border-blue-500/30 text-blue-200'
                      }`}>
                        {biometricStatus}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Processing Vote */}
                {verificationStep === 'verifying' && (
                  <div className="text-center py-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <Zap className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 rounded-full mx-auto animate-spin"></div>
                    </div>
                    <h4 className="font-semibold text-white text-xl mb-3">Processing Your Vote</h4>
                    <p className="text-slate-300 mb-4">
                      Your vote is being securely recorded on the blockchain...
                    </p>
                    {biometricStatus && (
                      <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                        <p className="text-blue-200 text-sm">{biometricStatus}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vote Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-600 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Verify Your Vote
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowVerificationModal(false);
                    setVerificationCnic('');
                    setVerificationResult(null);
                    setVerificationError('');
                  }}
                  className="text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* CNIC Input */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg">Enter Your CNIC</h4>
                      <p className="text-slate-400 text-sm">Check which candidate you voted for</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={verificationCnic}
                      onChange={(e) => {
                        setVerificationCnic(formatCNIC(e.target.value));
                        setVerificationError('');
                      }}
                      placeholder="Enter your 13-digit CNIC number"
                      className={`w-full px-4 py-3 bg-slate-700 border-2 rounded-xl text-white placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                        verificationError 
                          ? 'border-red-400 bg-red-900/20' 
                          : 'border-slate-600 focus:border-cyan-500'
                      }`}
                      disabled={verificationLoading}
                    />
                    
                    {verificationError && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                        <AlertCircle className="w-4 h-4" />
                        {verificationError}
                      </div>
                    )}
                    
                    <button
                      onClick={handleVoteVerification}
                      disabled={verificationLoading || !verificationCnic || verificationCnic.length !== 13}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 disabled:transform-none shadow-lg"
                    >
                      {verificationLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Checking Vote...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Verify Vote
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Verification Result */}
                {verificationResult && (
                  <div className="bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-500/30 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-lg mb-2">Vote Found!</h4>
                    </div>
                    
                    <div className="space-y-3 text-emerald-200">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Candidate:</span>
                        <span className="font-medium">{verificationResult.candidateName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Party:</span>
                        <span className="font-medium">{verificationResult.partyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Symbol:</span>
                        <span className="text-2xl">{verificationResult.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Vote Time:</span>
                        <span className="font-medium">
                          {new Date(parseInt(verificationResult.voteTimestamp) * 1000).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Wallet Address:</span>
                        <span className="font-mono text-xs">
                          {verificationResult.voterAddress.substring(0, 6)}...{verificationResult.voterAddress.substring(-4)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;