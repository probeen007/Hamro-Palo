import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw,
  Search,
  Bell,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import queueData from '../data/queue.json';
import { formatTime, getDepartmentColor, getStatusColor } from '../utils/helpers';

const QueueStatusPage = () => {
  const [searchToken, setSearchToken] = useState('');
  const [queueInfo, setQueueInfo] = useState(queueData);
  const [userTicket, setUserTicket] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Simulate queue progression
      setQueueInfo(prev => {
        const newQueue = { ...prev };
        
        // Occasionally move the current token forward
        if (Math.random() > 0.7) {
          const currentIndex = newQueue.queue.findIndex(item => item.token === newQueue.current.token);
          if (currentIndex >= 0 && currentIndex < newQueue.queue.length - 1) {
            newQueue.current = { ...newQueue.queue[currentIndex + 1] };
          }
        }
        
        return newQueue;
      });
      setLastUpdated(new Date());
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleTokenSearch = () => {
    if (!searchToken.trim()) {
      setUserTicket(null);
      return;
    }

    const foundTicket = queueInfo.queue.find(
      item => item.token.toLowerCase() === searchToken.toLowerCase()
    );

    if (foundTicket) {
      const position = queueInfo.queue.indexOf(foundTicket) + 1;
      const estimatedWait = position * 15; // Assuming 15 min per ticket
      
      setUserTicket({
        ...foundTicket,
        position,
        estimatedWait
      });
    } else if (queueInfo.current.token.toLowerCase() === searchToken.toLowerCase()) {
      setUserTicket({
        ...queueInfo.current,
        position: 0,
        estimatedWait: 0,
        status: 'being-served'
      });
    } else {
      setUserTicket({ notFound: true });
    }
  };

  const refreshQueue = () => {
    setLastUpdated(new Date());
    // Simulate a refresh with slight variations
    setQueueInfo(prev => ({
      ...prev,
      queue: prev.queue.map(item => ({
        ...item,
        timestamp: item.timestamp // Keep original timestamps
      }))
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 sm:mb-6"
        >
          <Link 
            to="/"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
        </motion.div>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Queue Status</h1>
          <p className="text-base sm:text-lg text-gray-600">Real-time updates on service queues</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Token Search */}
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Find Your Ticket
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchToken}
                  onChange={(e) => setSearchToken(e.target.value.toUpperCase())}
                  placeholder="Enter token (e.g., A12)"
                  className="input-field"
                  onKeyPress={(e) => e.key === 'Enter' && handleTokenSearch()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTokenSearch}
                  className="btn-primary px-4 py-2"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoRefresh" className="text-sm text-gray-700">
                  Auto-refresh
                </label>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshQueue}
                className="btn-outline flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </motion.button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {formatTime(lastUpdated)}
          </div>
        </motion.div>

        {/* User Ticket Status */}
        <AnimatePresence>
          {userTicket && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8"
            >
              {userTicket.notFound ? (
                <div className="card border-red-200 bg-red-50">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800">Ticket Not Found</h3>
                      <p className="text-red-600">
                        No ticket found with token "{searchToken}". Please check your token number.
                      </p>
                    </div>
                  </div>
                </div>
              ) : userTicket.status === 'being-served' ? (
                <div className="card border-green-200 bg-green-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-500 text-white rounded-full p-3">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-800">Your Turn!</h3>
                        <p className="text-green-600">
                          Token {userTicket.token} is now being served
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600">Service</div>
                      <div className="font-semibold text-green-800">{userTicket.service}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card border-blue-200 bg-blue-50">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {userTicket.token}
                      </div>
                      <div className="text-sm text-gray-600">Your Token</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {userTicket.position}
                      </div>
                      <div className="text-sm text-gray-600">People Ahead</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {userTicket.estimatedWait}
                      </div>
                      <div className="text-sm text-gray-600">Est. Wait (min)</div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(userTicket.status)}`}>
                        {userTicket.status || 'waiting'}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Status</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Service Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Service: </span>
                        <span className="font-medium">{userTicket.service}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Department: </span>
                        <span className="font-medium">{userTicket.department}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Serving */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 border-green-200 bg-gradient-to-r from-green-50 to-green-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Now Serving</h2>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {queueInfo.current.token}
              </div>
              <p className="text-green-700">
                {queueInfo.current.service} • {queueInfo.current.department}
              </p>
            </div>
            <div className="text-right">
              <div className="bg-green-500 text-white rounded-full p-4 mb-2">
                <Bell className="h-8 w-8" />
              </div>
              <div className="text-sm text-green-600">Counter 1</div>
            </div>
          </div>
        </motion.div>

        {/* Queue Overview */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Queue List */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Queue</h2>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {queueInfo.queue.map((item, index) => (
                  <motion.div
                    key={item.token}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 text-blue-600 font-bold w-12 h-12 rounded-full flex items-center justify-center">
                        {item.token}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.service}</h4>
                        <p className="text-sm text-gray-600">{item.department}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Position</div>
                      <div className="font-semibold text-gray-900">#{index + 1}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            
            {/* Queue Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total in Queue</span>
                  <span className="font-semibold text-gray-900">{queueInfo.queue.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Wait</span>
                  <span className="font-semibold text-gray-900">18 min</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Counters</span>
                  <span className="font-semibold text-gray-900">{queueInfo.counters.length}</span>
                </div>
              </div>
            </div>

            {/* Active Counters */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Counters</h3>
              
              <div className="space-y-3">
                {queueInfo.counters.map((counter) => (
                  <div key={counter.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{counter.name}</span>
                      <span className="text-sm badge-success">{counter.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">{counter.department}</div>
                    <div className="text-sm font-medium text-blue-600">
                      Serving: {counter.currentToken}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueStatusPage;
