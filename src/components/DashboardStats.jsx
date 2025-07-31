import { Calendar, CheckCircle, Users, BarChart3 } from 'lucide-react';

const DashboardStats = ({ dashboardStats }) => {
  const statsData = [
    {
      label: 'Total Elections',
      value: dashboardStats.totalElections,
      icon: Calendar,
      color: 'blue'
    },
    {
      label: 'Active Elections',
      value: dashboardStats.activeElections,
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Total Candidates',
      value: dashboardStats.totalCandidates,
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Total Votes',
      value: dashboardStats.totalVotes,
      icon: BarChart3,
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-500 text-blue-500',
      green: 'border-green-500 text-green-500',
      purple: 'border-purple-500 text-purple-500',
      orange: 'border-orange-500 text-orange-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getColorClasses(stat.color)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${getColorClasses(stat.color).split(' ')[1]}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;