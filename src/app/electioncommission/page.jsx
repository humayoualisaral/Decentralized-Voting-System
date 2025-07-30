'use client'
import { 
    Plus, 
    Users, 
    Calendar, 
    Settings, 
    Eye, 
    EyeOff, 
    Edit, 
    Trash2, 
    CheckCircle, 
    XCircle,
    Search,
    Filter,
    Download,
    BarChart3,
    Wallet,
    AlertCircle,
    Loader2
  } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useVoting } from '@/context/ContractContext';
  
  const ElectionCommissionDashboard = () => {
    const {
      account,
      isConnected,
      isLoading,
      connectWallet,
      createElection,
      addCandidate,
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
    
    const [newElection, setNewElection] = useState({
      title: '',
      description: '',
      startTime: '',
      endTime: ''
    });
  
    const [newCandidate, setNewCandidate] = useState({
      name: '',
      partyName: '',
      symbol: '',
      imageHash: '',
      electionId: ''
    });
  
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Load data from blockchain
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

    const updateDashboardStats = (electionsList) => {
      const stats = {
        totalElections: electionsList.length,
        activeElections: electionsList.filter(e => e.isActive).length,
        totalCandidates: electionsList.reduce((sum, e) => sum + e.candidatesCount, 0),
        totalVotes: electionsList.reduce((sum, e) => sum + parseInt(e.totalVotes), 0)
      };
      setDashboardStats(stats);
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
  
    // Wallet Connection Component
    const WalletConnection = () => (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <div className="text-center">
            <Wallet className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Please connect your wallet to access the Election Commission Dashboard
            </p>
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );

    // Alert Component
    const AlertMessage = ({ type, message, onClose }) => (
      <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  
    // Dashboard Overview Component
    const DashboardOverview = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Elections</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalElections}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Elections</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeElections}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalVotes}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Elections</h3>
            <div className="space-y-3">
              {elections.slice(0, 3).map(election => (
                <div key={election.electionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{election.title}</p>
                    <p className="text-sm text-gray-600">{election.totalVotes} votes cast</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    election.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {election.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Candidates</h3>
            <div className="space-y-3">
              {candidates
                .sort((a, b) => parseInt(b.voteCount) - parseInt(a.voteCount))
                .slice(0, 3)
                .map(candidate => (
                  <div key={candidate.candidateId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{candidate.symbol}</span>
                      <div>
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-sm text-gray-600">{candidate.partyName}</p>
                      </div>
                    </div>
                    <span className="font-bold text-blue-600">{candidate.voteCount} votes</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  
    // Election Management Component
    const ElectionManagement = () => {
      const handleToggleElectionStatus = async (electionId, currentStatus) => {
        try {
          setError('');
          await setElectionStatus(electionId, !currentStatus);
          setSuccess('Election status updated successfully');
          await loadElections(); // Reload data
        } catch (err) {
          console.error('Error updating election status:', err);
          setError('Failed to update election status: ' + err.message);
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Election Management</h2>
            <button 
              onClick={() => setActiveTab('create-election')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Election</span>
            </button>
          </div>
    
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Election Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {elections.map(election => (
                    <tr key={election.electionId}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{election.title}</div>
                          <div className="text-sm text-gray-500">{election.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>Start: {new Date(parseInt(election.startTime) * 1000).toLocaleDateString()}</div>
                          <div>End: {new Date(parseInt(election.endTime) * 1000).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          election.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {election.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {election.totalVotes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleToggleElectionStatus(election.electionId, election.isActive)}
                            disabled={isLoading}
                            className={`${
                              election.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                            } disabled:opacity-50`}
                          >
                            {election.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
  
    // Candidate Management Component
    const CandidateManagement = () => {
      const filteredCandidates = candidates.filter(candidate => {
        const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             candidate.partyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || 
                             (filterStatus === 'active' && candidate.isActive) ||
                             (filterStatus === 'inactive' && !candidate.isActive);
        return matchesSearch && matchesFilter;
      });

      const handleToggleCandidateStatus = async (candidateId, currentStatus) => {
        try {
          setError('');
          await setCandidateStatus(candidateId, !currentStatus);
          setSuccess('Candidate status updated successfully');
          await loadCandidates(); // Reload data
        } catch (err) {
          console.error('Error updating candidate status:', err);
          setError('Failed to update candidate status: ' + err.message);
        }
      };
  
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Candidate Management</h2>
            <button 
              onClick={() => setActiveTab('add-candidate')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Candidate</span>
            </button>
          </div>
  
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCandidates.map(candidate => (
              <div key={candidate.candidateId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{candidate.symbol}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <p className="text-sm text-gray-600">{candidate.partyName}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    candidate.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {candidate.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vote Count:</span>
                    <span className="font-medium">{candidate.voteCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Image Hash:</span>
                    <span className="font-mono text-xs">{candidate.imageHash.substring(0, 10)}...</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleToggleCandidateStatus(candidate.candidateId, candidate.isActive)}
                    disabled={isLoading}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 ${
                      candidate.isActive 
                        ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {candidate.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    // Create Election Form
    const CreateElectionForm = () => {
      const handleCreateElection = async (e) => {
        e.preventDefault();
        try {
          setError('');
          const startTimestamp = Math.floor(new Date(newElection.startTime).getTime() / 1000);
          const endTimestamp = Math.floor(new Date(newElection.endTime).getTime() / 1000);
          
          await createElection(
            newElection.title,
            newElection.description,
            startTimestamp,
            endTimestamp
          );
          
          setSuccess('Election created successfully!');
          setNewElection({ title: '', description: '', startTime: '', endTime: '' });
          setActiveTab('elections');
          await loadElections(); // Reload data
        } catch (err) {
          console.error('Failed to create election:', err);
          setError('Failed to create election: ' + err.message);
        }
      };

      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Election</h2>
            
            <form onSubmit={handleCreateElection} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election Title
                </label>
                <input
                  type="text"
                  value={newElection.title}
                  onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newElection.description}
                  onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newElection.startTime}
                    onChange={(e) => setNewElection({...newElection, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newElection.endTime}
                    onChange={(e) => setNewElection({...newElection, endTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create Election</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('elections')}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
  
    // Add Candidate Form
    const AddCandidateForm = () => {
      const handleAddCandidate = async (e) => {
        e.preventDefault();
        try {
          setError('');
          await addCandidate(
            parseInt(newCandidate.electionId),
            newCandidate.name,
            newCandidate.imageHash,
            newCandidate.partyName,
            newCandidate.symbol
          );
          
          setSuccess('Candidate added successfully!');
          setNewCandidate({ name: '', partyName: '', symbol: '', imageHash: '', electionId: '' });
          setActiveTab('candidates');
          await loadCandidates(); // Reload data
        } catch (err) {
          console.error('Failed to add candidate:', err);
          setError('Failed to add candidate: ' + err.message);
        }
      };

      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Candidate</h2>
            
            <form onSubmit={handleAddCandidate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Election
                </label>
                <select
                  value={newCandidate.electionId}
                  onChange={(e) => setNewCandidate({...newCandidate, electionId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Election</option>
                  {elections.map(election => (
                    <option key={election.electionId} value={election.electionId}>
                      {election.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Party Name
                </label>
                <input
                  type="text"
                  value={newCandidate.partyName}
                  onChange={(e) => setNewCandidate({...newCandidate, partyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symbol (Emoji)
                  </label>
                  <input
                    type="text"
                    value={newCandidate.symbol}
                    onChange={(e) => setNewCandidate({...newCandidate, symbol: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="🐴"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Hash (IPFS)
                  </label>
                  <input
                    type="text"
                    value={newCandidate.imageHash}
                    onChange={(e) => setNewCandidate({...newCandidate, imageHash: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="QmX123..."
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Adding...</span>
                    </>
                  ) : (
                    <span>Add Candidate</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('candidates')}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    const renderContent = () => {
      switch(activeTab) {
        case 'dashboard':
          return <DashboardOverview />;
        case 'elections':
          return <ElectionManagement />;
        case 'candidates':
          return <CandidateManagement />;
        case 'create-election':
          return <CreateElectionForm />;
        case 'add-candidate':
          return <AddCandidateForm />;
        default:
          return <DashboardOverview />;
      }
    };

    // Show wallet connection if not connected
    if (!isConnected) {
      return <WalletConnection />;
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
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Election Commission Dashboard</h1>
                  <p className="text-sm text-gray-600">Manage elections, candidates, and voting processes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connected</span>
                </div>
                <div className="text-sm text-gray-600">
                  {account?.substring(0, 6)}...{account?.substring(-4)}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <nav className="bg-white rounded-lg shadow-md p-4">
                <ul className="space-y-2">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                    { id: 'elections', label: 'Elections', icon: Calendar },
                    { id: 'candidates', label: 'Candidates', icon: Users },
                    { id: 'create-election', label: 'Create Election', icon: Plus },
                    { id: 'add-candidate', label: 'Add Candidate', icon: Plus }
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === item.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {isLoading && activeTab !== 'dashboard' ? (
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    <span className="text-gray-600">Loading...</span>
                  </div>
                </div>
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