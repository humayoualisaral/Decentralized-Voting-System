import { Plus, Eye, EyeOff, Edit, Download, Calendar, Users, Clock, TrendingUp, BarChart3 } from 'lucide-react';

const ElectionManagement = ({ 
  elections, 
  setActiveTab, 
  setElectionStatus, 
  setError, 
  setSuccess, 
  isLoading 
}) => {
  // Helper function to determine if election should be active based on current time
  const getElectionStatus = (election) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const startTime = parseInt(election.startTime);
    const endTime = parseInt(election.endTime);
    
    // Election is active if current time is between start and end time
    return currentTime >= startTime && currentTime <= endTime;
  };

  // Helper function to get status text and styling
  const getStatusDisplay = (election) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const startTime = parseInt(election.startTime);
    const endTime = parseInt(election.endTime);
    
    if (currentTime < startTime) {
      return {
        text: 'Upcoming',
        className: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200',
        icon: Clock
      };
    } else if (currentTime > endTime) {
      return {
        text: 'Ended',
        className: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200',
        icon: BarChart3
      };
    } else {
      return {
        text: 'Active',
        className: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200',
        icon: TrendingUp
      };
    }
  };

  const handleToggleElectionStatus = async (electionId, currentStatus) => {
    try {
      setError('');
      await setElectionStatus(electionId, !currentStatus);
      setSuccess('Election status updated successfully');
    } catch (err) {
      console.error('Error updating election status:', err);
      setError('Failed to update election status: ' + err.message);
    }
  };

  // Helper function to format duration
  const getElectionDuration = (startTime, endTime) => {
    const start = new Date(parseInt(startTime) * 1000);
    const end = new Date(parseInt(endTime) * 1000);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return `${duration} day${duration !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Election Management</h2>
            <p className="text-gray-600">Manage and monitor all elections in your system</p>
          </div>
          <button 
            onClick={() => setActiveTab('create-election')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Election</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Elections</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{elections.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Elections</p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {elections.filter(e => getElectionStatus(e)).length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Votes</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {elections.reduce((sum, e) => sum + parseInt(e.totalVotes || 0), 0)}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elections Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">All Elections</h3>
          <p className="text-sm text-gray-600 mt-1">Monitor and manage election status</p>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Election Details
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Votes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {elections.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <BarChart3 className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Elections Found</h3>
                      <p className="text-gray-500 mb-6">Get started by creating your first election</p>
                      <button 
                        onClick={() => setActiveTab('create-election')}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Plus className="h-5 w-5" />
                        <span>Create Election</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                elections.map((election, index) => {
                  const statusDisplay = getStatusDisplay(election);
                  const isCurrentlyActive = getElectionStatus(election);
                  const StatusIcon = statusDisplay.icon;
                  
                  return (
                    <tr key={election.electionId} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-8 py-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {election.electionId}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              {election.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {election.description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Users className="w-3 h-3 mr-1" />
                              <span>{election.candidatesCount || 0} candidates</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Start</p>
                              <p className="text-xs text-gray-600">
                                {new Date(parseInt(election.startTime) * 1000).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-red-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">End</p>
                              <p className="text-xs text-gray-600">
                                {new Date(parseInt(election.endTime) * 1000).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 px-3 py-1 rounded-lg">
                            <p className="text-xs font-medium text-blue-700">
                              Duration: {getElectionDuration(election.startTime, election.endTime)}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className={`px-3 py-1 text-sm font-semibold rounded-lg ${statusDisplay.className}`}>
                              {statusDisplay.text}
                            </span>
                          </div>
                          

                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Votes Cast</span>
                                <span className="text-lg font-bold text-gray-900">
                                  {election.totalVotes || 0}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                                  style={{ 
                                    width: `${Math.min((parseInt(election.totalVotes || 0) / 100) * 100, 100)}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Turnout Rate</span>
                            <span className="font-medium">
                              {election.totalVotes ? 
                                `${Math.round((parseInt(election.totalVotes) / (election.candidatesCount * 10)) * 100)}%` : 
                                '0%'
                              }
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElectionManagement;