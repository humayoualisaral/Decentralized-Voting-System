'use client'
import { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
import CreateElectionForm from '@/components/CreateElectionForm';
import AddCandidateForm from '@/components/AddCandidateForm';
import ElectionManagement from '@/components/ElectionManagement';
import CandidateManagement from '@/components/CandidateManagement';
import LoadingSpinner from '@/components/LoadingSpinner';

// Import icons for enhanced UI
import { 
  Menu, 
  X, 
  AlertCircle, 
  CheckCircle, 
  Vote, 
  Home, 
  Users, 
  Plus, 
  UserPlus,
  Activity,
  Trophy,
  BarChart3
} from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          console.log(election,"this is elec")
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

  // Enhanced Wallet Connection Component
  const EnhancedWalletConnection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Vote className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Election Commission
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Connect your wallet to access the blockchain-based election management system
          </p>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connecting...
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Secure blockchain connection required
          </p>
        </div>
      </div>
    </div>
  );

  // Enhanced Alert Message Component
  const EnhancedAlertMessage = ({ type, message, onClose }) => (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${
      type === 'error' 
        ? 'bg-white border-l-4 border-red-400 shadow-lg' 
        : 'bg-white border-l-4 border-green-400 shadow-lg'
    } rounded-lg overflow-hidden animate-in slide-in-from-right-full duration-300`}>
      <div className={`px-4 py-3 ${
        type === 'error' ? 'bg-red-50' : 'bg-green-50'
      }`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'error' ? (
              <AlertCircle className={`h-5 w-5 text-red-400`} />
            ) : (
              <CheckCircle className={`h-5 w-5 text-green-400`} />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${
              type === 'error' ? 'text-red-800' : 'text-green-800'
            }`}>
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${
                type === 'error' 
                  ? 'text-red-400 hover:bg-red-100 focus:bg-red-100' 
                  : 'text-green-400 hover:bg-green-100 focus:bg-green-100'
              } transition-colors duration-200`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Dashboard Header Component
  const EnhancedDashboardHeader = () => (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center ml-4 lg:ml-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Election Commission</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Blockchain Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-3 py-2 bg-green-50 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Connected</span>
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm font-mono text-gray-700">
                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Enhanced Navigation Sidebar Component
  const EnhancedNavigationSidebar = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Analytics' },
      { id: 'elections', label: 'Elections', icon: Vote, description: 'Manage Elections' },
      { id: 'candidates', label: 'Candidates', icon: Users, description: 'Candidate Management' },
      { id: 'create-election', label: 'Create Election', icon: Plus, description: 'New Election' },
      { id: 'add-candidate', label: 'Add Candidate', icon: UserPlus, description: 'Register Candidate' },
    ];

    return (
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:shadow-lg
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out lg:block border-r border-gray-200 w-[30%] h-full
        `}>
          <div className="h-full flex flex-col">
            {/* Mobile header */}
            <div className="p-6 border-b border-gray-200 lg:hidden bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Vote className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full group flex flex-col items-start px-4 py-4 text-left rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center w-full">
                      <Icon className={`w-5 h-5 mr-3 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      }`} />
                      <span className="font-semibold">{item.label}</span>
                    </div>
                    <span className={`text-xs mt-1 ml-8 ${
                      isActive ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center text-sm text-gray-600">
                <Activity className="w-4 h-4 mr-2 text-green-500" />
                <span>System Status: Online</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Enhanced Dashboard Overview Component
  const EnhancedDashboardOverview = () => {
    const stats = [
      {
        name: 'Total Elections',
        value: dashboardStats.totalElections,
        icon: Vote,
        color: 'from-blue-500 to-blue-600',
        bgColor: 'from-blue-50 to-blue-100',
        textColor: 'text-blue-700'
      },
      {
        name: 'Active Elections',
        value: dashboardStats.activeElections,
        icon: Activity,
        color: 'from-green-500 to-green-600',
        bgColor: 'from-green-50 to-green-100',
        textColor: 'text-green-700'
      },
      {
        name: 'Total Candidates',
        value: dashboardStats.totalCandidates,
        icon: Users,
        color: 'from-purple-500 to-purple-600',
        bgColor: 'from-purple-50 to-purple-100',
        textColor: 'text-purple-700'
      },
      {
        name: 'Total Votes',
        value: dashboardStats.totalVotes,
        icon: Trophy,
        color: 'from-orange-500 to-orange-600',
        bgColor: 'from-orange-50 to-orange-100',
        textColor: 'text-orange-700'
      }
    ];

    return (
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-2">Welcome to Election Dashboard</h2>
          <p className="text-blue-100 text-lg">
            Manage elections and candidates with blockchain transparency
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${stat.bgColor} p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${stat.textColor} opacity-75`}>
                        {stat.name}
                      </p>
                      <p className={`text-3xl font-bold ${stat.textColor} mt-2`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-white">
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span>Updated now</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('create-election')}
              className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
            >
              <Plus className="w-8 h-8 text-blue-600 mr-4 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Create New Election</h4>
                <p className="text-sm text-gray-600">Set up a new voting process</p>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('add-candidate')}
              className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
            >
              <UserPlus className="w-8 h-8 text-green-600 mr-4 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <h4 className="font-semibold text-gray-900">Add Candidate</h4>
                <p className="text-sm text-gray-600">Register new candidates</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Content renderer
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <EnhancedDashboardOverview />
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
          <EnhancedDashboardOverview />
        );
    }
  };

  // Show wallet connection if not connected
  if (!isConnected) {
    return <EnhancedWalletConnection />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Alert Messages */}
      {error && (
        <EnhancedAlertMessage 
          type="error" 
          message={error} 
          onClose={() => setError('')} 
        />
      )}
      {success && (
        <EnhancedAlertMessage 
          type="success" 
          message={success} 
          onClose={() => setSuccess('')} 
        />
      )}

      {/* Header */}
      <EnhancedDashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <EnhancedNavigationSidebar />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isLoading && activeTab !== 'dashboard' ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-lg">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                {renderContent()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCommissionDashboard;