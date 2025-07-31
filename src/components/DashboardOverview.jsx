import DashboardStats from './DashboardStats';

const DashboardOverview = ({ dashboardStats, elections, candidates }) => {
  // Helper function to get status display based on current time
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

  return (
    <div className="space-y-6">
      <DashboardStats dashboardStats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Elections</h3>
          <div className="space-y-3">
            {elections.slice(0, 3).map(election => {
              const statusDisplay = getStatusDisplay(election);
              
              return (
                <div key={election.electionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{election.title}</p>
                    <p className="text-sm text-gray-600">{election.totalVotes} votes cast</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(parseInt(election.startTime) * 1000).toLocaleDateString()} - 
                      {new Date(parseInt(election.endTime) * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.className}`}>
                      {statusDisplay.text}
                    </span>
                    {/* Show manual override status if different from calculated status */}
                    {election.isActive !== (statusDisplay.text === 'Active') && (
                      <span className="text-xs text-gray-500">
                        (Manual: {election.isActive ? 'On' : 'Off'})
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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
                    {/* IPFS Image with proper gateway conversion */}
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src={
                          candidate.symbol?.startsWith('ipfs://') 
                            ? `https://ipfs.io/ipfs/${candidate.symbol.replace('ipfs://', '')}`
                            : candidate.symbol?.startsWith('Qm') || candidate.symbol?.startsWith('bafy')
                            ? `https://ipfs.io/ipfs/${candidate.symbol}`
                            : candidate.symbol
                        } 
                        alt={`${candidate.name} symbol`}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-200"
                        onError={(e) => {
                          console.log('Image failed to load:', candidate.symbol);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                        onLoad={() => console.log('Image loaded successfully:', candidate.symbol)}
                      />
                      {/* Fallback placeholder */}
                      <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs" style={{display: 'none'}}>
                        <span>👤</span>
                      </div>
                    </div>
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
};

export default DashboardOverview;