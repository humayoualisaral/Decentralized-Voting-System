'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI } from '@/utils/contractABI'; // Import your ABI file

const VotingContext = createContext();

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (!context) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};

export const VotingProvider = ({ children }) => {
  // State variables
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chainId, setChainId] = useState(null);

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  // Initialize contract
  const initializeContract = async (signerOrProvider) => {
    try {
      const votingContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signerOrProvider
      );
      setContract(votingContract);
      return votingContract;
    } catch (error) {
      console.error('Error initializing contract:', error);
      throw new Error('Failed to initialize contract');
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Create provider and signer
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      // Set state
      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(accounts[0]);
      setChainId(network.chainId.toString());
      setIsConnected(true);

      // Initialize contract
      await initializeContract(web3Signer);

      console.log('Wallet connected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setContract(null);
    setIsConnected(false);
    setChainId(null);
  };

  // Election Management Functions
  const createElection = async (title, description, startTime, endTime) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.createElection(title, description, startTime, endTime);
      const receipt = await tx.wait();
      
      console.log('Election created:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error creating election:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addCandidate = async (electionId, name, imageHash, partyName, symbol) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.addCandidate(electionId, name, imageHash, partyName, symbol);
      const receipt = await tx.wait();
      
      console.log('Candidate added:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error adding candidate:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Voter Functions
  const registerVoter = async (electionId, cnicHash, fingerprintHash) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.registerVoter(electionId, cnicHash, fingerprintHash);
      const receipt = await tx.wait();
      
      console.log('Voter registered:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error registering voter:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const castVote = async (electionId, candidateId, fingerprintVerification) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.castVote(electionId, candidateId, fingerprintVerification);
      const receipt = await tx.wait();
      
      console.log('Vote cast:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // View Functions
  const getElectionDetails = async (electionId) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const election = await contract.getElectionDetails(electionId);
      return {
        electionId: election.electionId.toString(),
        title: election.title,
        description: election.description,
        startTime: election.startTime.toString(),
        endTime: election.endTime.toString(),
        isActive: election.isActive,
        totalVotes: election.totalVotes.toString()
      };
    } catch (error) {
      console.error('Error getting election details:', error);
      throw error;
    }
  };

  const getCandidateDetails = async (candidateId) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const candidate = await contract.getCandidateDetails(candidateId);
      return {
        candidateId: candidate.candidateId.toString(),
        name: candidate.name,
        imageHash: candidate.imageHash,
        partyName: candidate.partyName,
        symbol: candidate.symbol,
        isActive: candidate.isActive,
        voteCount: candidate.voteCount.toString(),
        timestamp: candidate.timestamp.toString()
      };
    } catch (error) {
      console.error('Error getting candidate details:', error);
      throw error;
    }
  };

  const getElectionCandidates = async (electionId) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const candidateIds = await contract.getElectionCandidates(electionId);
      return candidateIds.map(id => id.toString());
    } catch (error) {
      console.error('Error getting election candidates:', error);
      throw error;
    }
  };

  const getVoterStatus = async (electionId, voterAddress = null) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const address = voterAddress || account;
      if (!address) throw new Error('No voter address provided');
      
      const status = await contract.getVoterStatus(electionId, address);
      return {
        isRegistered: status.isRegistered,
        hasVoted: status.hasVoted,
        votedCandidateId: status.votedCandidateId.toString()
      };
    } catch (error) {
      console.error('Error getting voter status:', error);
      throw error;
    }
  };

  const getElectionResults = async (electionId) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const results = await contract.getElectionResults(electionId);
      return {
        candidateIds: results.candidateIds.map(id => id.toString()),
        voteCounts: results.voteCounts.map(count => count.toString())
      };
    } catch (error) {
      console.error('Error getting election results:', error);
      throw error;
    }
  };

  const getCurrentElectionId = async () => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      const electionId = await contract.currentElectionId();
      return electionId.toString();
    } catch (error) {
      console.error('Error getting current election ID:', error);
      throw error;
    }
  };

  // Admin Functions
  const setElectionStatus = async (electionId, isActive) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.setElectionStatus(electionId, isActive);
      const receipt = await tx.wait();
      
      console.log('Election status updated:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error setting election status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setCandidateStatus = async (candidateId, isActive) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.setCandidateStatus(candidateId, isActive);
      const receipt = await tx.wait();
      
      console.log('Candidate status updated:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error setting candidate status:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const grantElectionCommissionRole = async (accountAddress) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.grantElectionCommissionRole(accountAddress);
      const receipt = await tx.wait();
      
      console.log('Election commission role granted:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error granting election commission role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const revokeElectionCommissionRole = async (accountAddress) => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.revokeElectionCommissionRole(accountAddress);
      const receipt = await tx.wait();
      
      console.log('Election commission role revoked:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error revoking election commission role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const pauseContract = async () => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.pause();
      const receipt = await tx.wait();
      
      console.log('Contract paused:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error pausing contract:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unpauseContract = async () => {
    try {
      if (!contract) throw new Error('Contract not initialized');
      
      setIsLoading(true);
      const tx = await contract.unpause();
      const receipt = await tx.wait();
      
      console.log('Contract unpaused:', receipt);
      return receipt;
    } catch (error) {
      console.error('Error unpausing contract:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Event listeners for account/chain changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
        window.location.reload(); // Reload to reset the app state
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Cleanup listeners
      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [account]);

  // Auto-connect if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          
          if (accounts.length > 0) {
            await connectWallet();
          }
        }
      } catch (error) {
        console.error('Auto-connect failed:', error);
      }
    };

    autoConnect();
  }, []);

  const contextValue = {
    // State
    account,
    provider,
    signer,
    contract,
    isConnected,
    isLoading,
    chainId,
    
    // Wallet functions
    connectWallet,
    disconnectWallet,
    
    // Election management
    createElection,
    addCandidate,
    
    // Voter functions
    registerVoter,
    castVote,
    
    // View functions
    getElectionDetails,
    getCandidateDetails,
    getElectionCandidates,
    getVoterStatus,
    getElectionResults,
    getCurrentElectionId,
    
    // Admin functions
    setElectionStatus,
    setCandidateStatus,
    grantElectionCommissionRole,
    revokeElectionCommissionRole,
    pauseContract,
    unpauseContract
  };

  return (
    <VotingContext.Provider value={contextValue}>
      {children}
    </VotingContext.Provider>
  );
};