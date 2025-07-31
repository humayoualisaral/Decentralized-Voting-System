'use client';

import React, { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import ElectionCard from '@/components/ElectionCard';
import CandidateList from '@/components/CandidateList';
import { ArrowLeft, Vote, Clock, Users, Loader2, AlertCircle } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <Vote className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access the voting portal and participate in elections.
            </p>
            <button 
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Wallet'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeElections = getActiveElections();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Vote className="w-8 h-8 text-blue-600" />
                Voter Portal
              </h1>
              <p className="text-gray-600 mt-1">
                Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Elections</p>
                <p className="text-2xl font-bold text-blue-600">{activeElections.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-red-700 mt-1">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
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
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Loading Elections...
                </h3>
                <p className="text-gray-500">
                  Fetching election data from the blockchain.
                </p>
              </div>
            ) : (
              <>
                {/* Active Elections */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-green-600" />
                    Active Elections
                  </h2>
                  
                  {activeElections.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                      <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No Active Elections
                      </h3>
                      <p className="text-gray-500">
                        There are currently no active elections. Check back later.
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-gray-600" />
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
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Elections
              </button>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedElection.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {selectedElection.description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Ends: {new Date(parseInt(selectedElection.endTime) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedElection.totalVotes} votes cast</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isElectionActive(selectedElection)
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
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