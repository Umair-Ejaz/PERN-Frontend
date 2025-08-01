import PropTypes from 'prop-types';

const StatsCard = ({ title, value, change, trend, icon }) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };
  
  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        <span className={`ml-2 text-sm font-medium ${trendColors[trend]}`}>
          {trendIcons[trend]} {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              trend === 'up' ? 'bg-green-500' : 
              trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
            }`} 
            style={{ width: `${Math.random() * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']).isRequired,
  icon: PropTypes.string
};

export default StatsCard;