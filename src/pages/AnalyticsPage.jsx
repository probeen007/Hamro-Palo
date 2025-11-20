import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Clock, 
  TrendingUp, 
  Star,
  Calendar,
  Award,
  Activity,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import analyticsData from '../data/analytics.json';

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [animatedStats, setAnimatedStats] = useState({
    totalTickets: 0,
    completedTickets: 0,
    avgWaitTime: 0,
    satisfaction: 0
  });

  const stats = analyticsData.today;

  // Animate numbers on load
  useEffect(() => {
    const animateValue = (key, targetValue, duration = 2000) => {
      const startValue = 0;
      const increment = targetValue / (duration / 50);
      let currentValue = startValue;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }
        
        setAnimatedStats(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, 50);

      return timer;
    };

    const timers = [
      animateValue('totalTickets', stats.totalTickets),
      animateValue('completedTickets', stats.completedTickets),
      animateValue('avgWaitTime', stats.averageWaitTime),
      animateValue('satisfaction', stats.satisfaction || 42) // 4.2 * 10 for animation
    ];

    return () => timers.forEach(clearInterval);
  }, [stats]);

  const departmentColors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getCompletionRate = () => {
    return Math.round((stats.completedTickets / stats.totalTickets) * 100);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "government" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === 'string' ? value : value.toLocaleString()}
          </p>
          {subtitle && (
            <p className="text-gray-500 text-sm">{subtitle}</p>
          )}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`h-8 w-8 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
            <p className="text-lg text-gray-600">Service performance and insights</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Tickets"
            value={animatedStats.totalTickets}
            subtitle="Issued today"
          />
          <StatCard
            icon={CheckCircle}
            title="Completed"
            value={animatedStats.completedTickets}
            subtitle={`${getCompletionRate()}% completion rate`}
            color="green"
          />
          <StatCard
            icon={Clock}
            title="Avg Wait Time"
            value={`${animatedStats.avgWaitTime} min`}
            subtitle="Per service"
            color="yellow"
          />
          <StatCard
            icon={Star}
            title="Satisfaction"
            value={`${(animatedStats.satisfaction / 10).toFixed(1)} ★`}
            subtitle="Average rating"
            color="purple"
          />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          
          {/* Weekly Tickets Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
              Weekly Ticket Trends
            </h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="tickets" 
                  fill="#0ea5e9" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Hourly Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-2 text-blue-600" />
              Hourly Distribution
            </h2>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tickets" 
                  stroke="#0ea5e9" 
                  strokeWidth={3}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#0369a1' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </div>

        {/* Department Performance & Satisfaction */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Department Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 card"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Department Performance
            </h2>
            
            <div className="space-y-6">
              {stats.departments.map((dept, index) => (
                <div key={dept.name} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <span className="text-sm font-medium text-blue-600">
                      {Math.round((dept.completed / dept.totalTickets) * 100)}% complete
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <div className="text-gray-600">Total</div>
                      <div className="font-semibold">{dept.totalTickets}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Completed</div>
                      <div className="font-semibold text-green-600">{dept.completed}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Pending</div>
                      <div className="font-semibold text-yellow-600">{dept.pending}</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(dept.completed / dept.totalTickets) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="bg-blue-600 h-2 rounded-full"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>Avg wait: {dept.avgWaitTime} min</span>
                    <span>{dept.pending} in queue</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Satisfaction Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-blue-600" />
              Satisfaction
            </h2>
            
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {analyticsData.feedback.averageRating}★
              </div>
              <div className="text-gray-600">
                Based on {analyticsData.feedback.totalResponses} responses
              </div>
            </div>

            <div className="space-y-3">
              {analyticsData.feedback.ratings.reverse().map((rating, index) => (
                <div key={rating.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm font-medium">{rating.stars}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  </div>
                  
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(rating.count / analyticsData.feedback.totalResponses) * 100}%` 
                      }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${
                        rating.stars >= 4 ? 'bg-green-500' : 
                        rating.stars >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                  
                  <span className="text-sm text-gray-600 w-8">
                    {rating.count}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• {Math.round((analyticsData.feedback.ratings.filter(r => r.stars >= 4).reduce((sum, r) => sum + r.count, 0) / analyticsData.feedback.totalResponses) * 100)}% positive feedback</p>
                <p>• Peak satisfaction at {stats.peakHour}</p>
                <p>• Treasury Dept leads in efficiency</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          
          <div className="card border-green-200 bg-green-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Performance</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">{getCompletionRate()}%</p>
            <p className="text-sm text-gray-600">Services completed successfully</p>
          </div>

          <div className="card border-blue-200 bg-blue-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Efficiency</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">{stats.averageWaitTime} min</p>
            <p className="text-sm text-gray-600">Average processing time</p>
          </div>

          <div className="card border-purple-200 bg-purple-50 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Today's Goal</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600 mb-2">150 tickets</p>
            <p className="text-sm text-gray-600">
              Progress: {stats.totalTickets}/150 ({Math.round((stats.totalTickets/150)*100)}%)
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
