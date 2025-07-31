import DashboardStats from './DashboardStats';

const DashboardOverview = ({ dashboardStats, elections, candidates }) => (
  <div className="space-y-6">
    <DashboardStats dashboardStats={dashboardStats} />

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

export default DashboardOverview;