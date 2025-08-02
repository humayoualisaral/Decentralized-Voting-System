'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import ElectionCard from '@/components/ElectionCard';
import CandidateList from '@/components/CandidateList';
import { ArrowLeft, Vote, Clock, Users, Loader2, AlertCircle, ExternalLink, Wallet, Shield, CheckCircle, Activity } from 'lucide-react';

const UserPortal = () => {
  const { 
    isConnected, 
    account, 
    isLoading,
    connectWallet,
    getCurrentElectionId,
    getElectionDetails
  } = useVoting();
  
  const [selectedElection, setSelectedElection] = useState(null);
  const [elections, setElections] = useState([]);
  const [loadingElections, setLoadingElections] = useState(false);
  const [error, setError] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Check if MetaMask is installed
  useEffect(() => {
    setIsMetaMaskInstalled(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined');
  }, []);

  // Fetch elections from contract
  useEffect(() => {
    const fetchElections = async () => {
      if (!isConnected) return;
      
      try {
        setLoadingElections(true);
        setError(null);
        
        // Get current election ID to determine how many elections exist
        const currentElectionId = await getCurrentElectionId();
        const totalElections = parseInt(currentElectionId);
        
        // Fetch details for each election
        const electionPromises = [];
        for (let i = 1; i <= totalElections; i++) {
          electionPromises.push(getElectionDetails(i.toString()));
        }
        
        const electionDetails = await Promise.all(electionPromises);
        setElections(electionDetails);
        
      } catch (error) {
        console.error('Error fetching elections:', error);
        setError('Failed to load elections. Please try again.');
        setElections([]);
      } finally {
        setLoadingElections(false);
      }
    };

    if (isConnected) {
      fetchElections();
    }
  }, [isConnected, getCurrentElectionId, getElectionDetails]);

  const handleElectionSelect = (election) => {
    setSelectedElection(election);
  };

  const handleBackToElections = () => {
    setSelectedElection(null);
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const getActiveElections = () => {
    const now = new Date();
    return elections.filter(election => {
      const startDate = new Date(parseInt(election.startTime) * 1000);
      const endDate = new Date(parseInt(election.endTime) * 1000);
      return election.isActive && now >= startDate && now <= endDate;
    });
  };

  const isElectionActive = (election) => {
    const now = new Date();
    const startDate = new Date(parseInt(election.startTime) * 1000);
    const endDate = new Date(parseInt(election.endTime) * 1000);
    return election.isActive && now >= startDate && now <= endDate;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-white/20">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Vote className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto animate-ping opacity-20"></div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Welcome to VoteChain
            </h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Secure, transparent, and decentralized voting powered by blockchain technology.
            </p>

            {!isMetaMaskInstalled ? (
              <div className="space-y-4">
                <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-amber-200 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">MetaMask Required</span>
                  </div>
                  <p className="text-amber-100 text-sm">
                    MetaMask wallet is required to participate in voting. Please install it to continue.
                  </p>
                </div>
                
                <button 
                  onClick={handleInstallMetaMask}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Install MetaMask
                </button>
                
                <p className="text-blue-200 text-xs">
                  After installation, refresh this page to connect your wallet.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-200 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>MetaMask detected</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Secure blockchain voting</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-200 text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Real-time results</span>
                  </div>
                </div>
                
                <button 
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      Connect MetaMask
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const activeElections = getActiveElections();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                  <Vote className="w-6 h-6 text-white" />
                </div>
                Voter Portal
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-blue-200">
                  Connected: <span className="font-mono bg-white/10 px-2 py-1 rounded text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
                </p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-4 border border-purple-400/30">
                <p className="text-purple-200 text-sm font-medium">Active Elections</p>
                <p className="text-3xl font-bold text-white">{activeElections.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg border border-red-400/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-200 mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-100 mb-3">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Main Content */}
        {!selectedElection ? (
          <div className="space-y-8">
            {/* Loading State */}
            {loadingElections ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/20">
                <div className="relative mb-6">
                  <Loader2 className="w-16 h-16 text-purple-400 mx-auto animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 rounded-full mx-auto animate-ping"></div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Loading Elections...
                </h3>
                <p className="text-blue-200">
                  Fetching election data from the blockchain network.
                </p>
              </div>
            ) : (
              <>
                {/* Active Elections */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    Active Elections
                  </h2>
                  
                  {activeElections.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-12 text-center border border-white/20">
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                        <Vote className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">
                        No Active Elections
                      </h3>
                      <p className="text-blue-200">
                        There are currently no active elections. Check back later for new voting opportunities.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeElections.map((election) => (
                        <ElectionCard
                          key={election.electionId}
                          election={election}
                          onSelect={handleElectionSelect}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* All Elections */}
                {elections.length > 0 && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      All Elections
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {elections.map((election) => (
                        <ElectionCard
                          key={election.electionId}
                          election={election}
                          onSelect={handleElectionSelect}
                          showInactive={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          /* Selected Election View */
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToElections}
                className="flex items-center gap-2 text-purple-300 hover:text-white font-medium mb-6 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Elections
              </button>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-3">
                  {selectedElection.title}
                </h2>
                <p className="text-blue-200 mb-6 text-lg">
                  {selectedElection.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-blue-200">
                    <Clock className="w-4 h-4" />
                    <span>
                      Ends: {new Date(parseInt(selectedElection.endTime) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-200">
                    <Users className="w-4 h-4" />
                    <span>{selectedElection.totalVotes} votes cast</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    isElectionActive(selectedElection)
                      ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                      : 'bg-gray-500/20 text-gray-200 border-gray-400/30'
                  }`}>
                    {isElectionActive(selectedElection) ? 'Active' : 'Inactive'}
                  </div>
                </div>
              </div>
            </div>

            <CandidateList 
              electionId={selectedElection.electionId}
              isElectionActive={isElectionActive(selectedElection)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPortal;