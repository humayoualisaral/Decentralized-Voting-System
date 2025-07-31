import { Settings } from 'lucide-react';

const DashboardHeader = ({ account }) => (
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
);

export default DashboardHeader;