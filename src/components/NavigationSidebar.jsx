import { BarChart3, Calendar, Users, Plus } from 'lucide-react';

const NavigationSidebar = ({ activeTab, setActiveTab }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'elections', label: 'Elections', icon: Calendar },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'create-election', label: 'Create Election', icon: Plus },
    { id: 'add-candidate', label: 'Add Candidate', icon: Plus }
  ];

  return (
    <div className="lg:w-64">
      <nav className="bg-white rounded-lg shadow-md p-4">
        <ul className="space-y-2">
          {navigationItems.map(item => {
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
  );
};

export default NavigationSidebar;