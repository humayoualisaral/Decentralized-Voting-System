'use client'
import { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import CreateElectionForm from '@/components/CreateElectionForm';
import AddCandidateForm from '@/components/AddCandidateForm';

// Import separated components
import WalletConnection from '@/components/WalletConnection';
import AlertMessage from '@/components/AlertMessage';
import DashboardHeader from '@/components/DashboardHeader';
import NavigationSidebar from '@/components/NavigationSidebar';
import DashboardOverview from '@/components/DashboardOverview';
import ElectionManagement from '@/components/ElectionManagement';
import CandidateManagement from '@/components/CandidateManagement';
import LoadingSpinner from '@/components/LoadingSpinner';

const ElectionCommissionDashboard = () => {
  const {
    account,
    isConnected,
    isLoading,
    connectWallet,
    getElectionDetails,
    getCandidateDetails,
    getElectionCandidates,
    getElectionResults,
    getCurrentElectionId,
    setElectionStatus,
    setCandidateStatus
  } = useVoting();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [elections, setElections] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalElections: 0,
    activeElections: 0,
    totalCandidates: 0,
    totalVotes: 0
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update dashboard statistics
  const updateDashboardStats = (electionsList) => {
    const totalElections = electionsList.length;
    const activeElections = electionsList.filter(e => e.isActive).length;
    const totalVotes = electionsList.reduce((sum, e) => sum + parseInt(e.totalVotes || 0), 0);
    
    setDashboardStats({
      totalElections,
      activeElections,
      totalCandidates: candidates.length,
      totalVotes
    });
  };

  // Load elections from blockchain
  const loadElections = async () => {
    try {
      if (!isConnected) return;
      
      const currentId = await getCurrentElectionId();
      const electionsList = [];
      
      for (let i = 1; i <= parseInt(currentId); i++) {
        try {
          const election = await getElectionDetails(i);
          const candidateIds = await getElectionCandidates(i);
          
          electionsList.push({
            ...election,
            candidatesCount: candidateIds.length
          });
        } catch (err) {
          console.log(`Election ${i} not found or error:`, err);
        }
      }
      
      setElections(electionsList);
      updateDashboardStats(electionsList);
    } catch (err) {
      console.error('Error loading elections:', err);
      setError('Failed to load elections');
    }
  };

  // Load candidates from blockchain
  const loadCandidates = async () => {
    try {
      if (!isConnected || elections.length === 0) return;
      
      const allCandidates = [];
      
      for (const election of elections) {
        try {
          const candidateIds = await getElectionCandidates(election.electionId);
          
          for (const candidateId of candidateIds) {
            try {
              const candidate = await getCandidateDetails(candidateId);
              allCandidates.push({
                ...candidate,
                electionId: election.electionId
              });
            } catch (err) {
              console.log(`Candidate ${candidateId} not found:`, err);
            }
          }
        } catch (err) {
          console.log(`Error loading candidates for election ${election.electionId}:`, err);
        }
      }
      
      setCandidates(allCandidates);
    } catch (err) {
      console.error('Error loading candidates:', err);
      setError('Failed to load candidates');
    }
  };

  // Load data when connected
  useEffect(() => {
    if (isConnected) {
      loadElections();
    }
  }, [isConnected]);

  useEffect(() => {
    if (elections.length > 0) {
      loadCandidates();
    }
  }, [elections]);

  // Update stats when candidates change
  useEffect(() => {
    if (elections.length > 0) {
      updateDashboardStats(elections);
    }
  }, [candidates]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Content renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview 
            dashboardStats={dashboardStats}
            elections={elections}
            candidates={candidates}
          />
        );
      case 'elections':
        return (
          <ElectionManagement 
            elections={elections}
            setActiveTab={setActiveTab}
            setElectionStatus={setElectionStatus}
            setError={setError}
            setSuccess={setSuccess}
            isLoading={isLoading}
          />
        );
      case 'candidates':
        return (
          <CandidateManagement 
            candidates={candidates}
            setActiveTab={setActiveTab}
            setCandidateStatus={setCandidateStatus}
            setError={setError}
            setSuccess={setSuccess}
            isLoading={isLoading}
            loadCandidates={loadCandidates}
          />
        );
      case 'create-election':
        return <CreateElectionForm />;
      case 'add-candidate':
        return <AddCandidateForm />;
      default:
        return (
          <DashboardOverview 
            dashboardStats={dashboardStats}
            elections={elections}
            candidates={candidates}
          />
        );
    }
  };

  // Show wallet connection if not connected
  if (!isConnected) {
    return <WalletConnection connectWallet={connectWallet} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Alert Messages */}
      {error && (
        <AlertMessage 
          type="error" 
          message={error} 
          onClose={() => setError('')} 
        />
      )}
      {success && (
        <AlertMessage 
          type="success" 
          message={success} 
          onClose={() => setSuccess('')} 
        />
      )}

      {/* Header */}
      <DashboardHeader account={account} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <NavigationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Content */}
          <div className="flex-1">
            {isLoading && activeTab !== 'dashboard' ? (
              <LoadingSpinner />
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCommissionDashboard;