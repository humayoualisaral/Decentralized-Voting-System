import { Plus, Eye, EyeOff, Edit, Download } from 'lucide-react';

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
        className: 'bg-yellow-100 text-yellow-800'
      };
    } else if (currentTime > endTime) {
      return {
        text: 'Ended',
        className: 'bg-red-100 text-red-800'
      };
    } else {
      return {
        text: 'Active',
        className: 'bg-green-100 text-green-800'
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
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {elections.map(election => {
                const statusDisplay = getStatusDisplay(election);
                const isCurrentlyActive = getElectionStatus(election);
                
                return (
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
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDisplay.className}`}>
                        {statusDisplay.text}
                      </span>
                      {/* Show manual override status if different from calculated status */}
                      {election.isActive !== isCurrentlyActive && (
                        <div className="text-xs text-gray-500 mt-1">
                          (Manually {election.isActive ? 'enabled' : 'disabled'})
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {election.totalVotes}
                    </td>
            
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElectionManagement;