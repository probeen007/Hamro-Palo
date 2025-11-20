import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Phone, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  Settings,
  Bell,
  ArrowLeft
} from 'lucide-react';
import queueData from '../data/queue.json';
import ticketsData from '../data/tickets.json';
import { formatTime, playNotificationSound } from '../utils/helpers';

const OperatorDashboard = () => {
  const [queueInfo, setQueueInfo] = useState(queueData);
  const [tickets, setTickets] = useState(ticketsData);
  const [selectedCounter, setSelectedCounter] = useState('counter-1');
  const [lastAction, setLastAction] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const counter = queueInfo.counters.find(c => c.id === selectedCounter);
  const pendingQueue = queueInfo.queue.filter(item => 
    item.department === counter?.department && item.status === 'waiting'
  );

  const callNext = () => {
    if (pendingQueue.length === 0) return;

    const nextTicket = pendingQueue[0];
    
    // Update queue
    setQueueInfo(prev => ({
      ...prev,
      current: { ...nextTicket },
      queue: prev.queue.map(item =>
        item.token === nextTicket.token
          ? { ...item, status: 'in-progress' }
          : item
      ),
      counters: prev.counters.map(c =>
        c.id === selectedCounter
          ? { ...c, currentToken: nextTicket.token }
          : c
      )
    }));

    setLastAction({
      type: 'call',
      token: nextTicket.token,
      time: new Date()
    });

    // Add notification
    addNotification(`Called token ${nextTicket.token}`, 'info');
    playNotificationSound();
  };

  const completeService = () => {
    if (!counter?.currentToken) return;

    const currentToken = counter.currentToken;
    
    // Update tickets
    setTickets(prev => ({
      ...prev,
      history: prev.history.map(ticket =>
        ticket.token === currentToken
          ? {
              ...ticket,
              status: 'completed',
              completeTime: new Date().toISOString(),
              waitTime: Math.floor(Math.random() * 30) + 5 // Simulate wait time
            }
          : ticket
      )
    }));

    // Remove from queue
    setQueueInfo(prev => ({
      ...prev,
      queue: prev.queue.filter(item => item.token !== currentToken),
      counters: prev.counters.map(c =>
        c.id === selectedCounter
          ? { ...c, currentToken: null }
          : c
      )
    }));

    setLastAction({
      type: 'complete',
      token: currentToken,
      time: new Date()
    });

    addNotification(`Completed service for token ${currentToken}`, 'success');
  };

  const markNoShow = () => {
    if (!counter?.currentToken) return;

    const currentToken = counter.currentToken;
    
    // Update tickets
    setTickets(prev => ({
      ...prev,
      history: prev.history.map(ticket =>
        ticket.token === currentToken
          ? { ...ticket, status: 'no-show' }
          : ticket
      )
    }));

    // Remove from queue
    setQueueInfo(prev => ({
      ...prev,
      queue: prev.queue.filter(item => item.token !== currentToken),
      counters: prev.counters.map(c =>
        c.id === selectedCounter
          ? { ...c, currentToken: null }
          : c
      )
    }));

    setLastAction({
      type: 'no-show',
      token: currentToken,
      time: new Date()
    });

    addNotification(`Marked token ${currentToken} as no-show`, 'warning');
  };

  const addNotification = (message, type) => {
    const notification = {
      id: Date.now(),
      message,
      type,
      time: new Date()
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  // Simulate queue updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Occasionally add new tickets to queue
      if (Math.random() > 0.8) {
        const newToken = `A${Math.floor(Math.random() * 99) + 20}`;
        const services = ['Birth Certificate', 'Death Certificate', 'Marriage Certificate'];
        const randomService = services[Math.floor(Math.random() * services.length)];
        
        setQueueInfo(prev => ({
          ...prev,
          queue: [...prev.queue, {
            token: newToken,
            department: 'Civil Registration',
            service: randomService,
            timestamp: new Date().toISOString(),
            status: 'waiting'
          }]
        }));
        
        addNotification(`New ticket ${newToken} joined the queue`, 'info');
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Operator Dashboard</h1>
            <p className="text-base sm:text-lg text-gray-600">Manage queue and serve citizens efficiently</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Counter Selector */}
            <select
              value={selectedCounter}
              onChange={(e) => setSelectedCounter(e.target.value)}
              className="input-field"
            >
              {queueInfo.counters.map((counter) => (
                <option key={counter.id} value={counter.id}>
                  {counter.name} - {counter.department}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Main Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Current Status</h2>
              
              {counter?.currentToken ? (
                <div className="text-center">
                  <div className="bg-blue-600 text-white rounded-2xl p-6 mb-4">
                    <div className="text-3xl font-bold mb-2">{counter.currentToken}</div>
                    <div className="text-blue-100">Now Serving</div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={completeService}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-5 w-5" />
                      <span>Complete Service</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={markNoShow}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
                    >
                      <XCircle className="h-5 w-5" />
                      <span>No Show</span>
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 rounded-2xl p-6 mb-4">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <div className="text-gray-600">No one being served</div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={callNext}
                    disabled={pendingQueue.length === 0}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Call Next</span>
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Queue Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Queue Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Waiting</span>
                  <span className="font-semibold text-gray-900">{pendingQueue.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department</span>
                  <span className="font-semibold text-gray-900">{counter?.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Wait</span>
                  <span className="font-semibold text-gray-900">{pendingQueue.length * 15} min</span>
                </div>
              </div>
            </motion.div>

            {/* Last Action */}
            {lastAction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card border-blue-200 bg-blue-50"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Action</h3>
                <div className="text-sm">
                  <p className="text-gray-700">
                    {lastAction.type === 'call' && `Called token ${lastAction.token}`}
                    {lastAction.type === 'complete' && `Completed service for ${lastAction.token}`}
                    {lastAction.type === 'no-show' && `Marked ${lastAction.token} as no-show`}
                  </p>
                  <p className="text-gray-500 mt-1">{formatTime(lastAction.time)}</p>
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-3 rounded-lg border ${getNotificationColor(notification.type)}`}
                    >
                      <div className="flex items-start space-x-2">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(notification.time)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {notifications.length === 0 && (
                  <p className="text-gray-500 text-center py-4 text-sm">No recent activity</p>
                )}
              </div>
            </div>

          </div>

          {/* Queue List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Pending Queue - {counter?.department}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated: {formatTime(new Date())}</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Token</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Time Issued</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Wait Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingQueue.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-8 text-gray-500">
                          No pending tickets for this department
                        </td>
                      </tr>
                    ) : (
                      pendingQueue.map((ticket, index) => (
                        <motion.tr
                          key={ticket.token}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 text-blue-600 font-bold w-10 h-10 rounded-full flex items-center justify-center text-sm">
                                {ticket.token}
                              </div>
                              <div className="text-sm text-gray-500">#{index + 1}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{ticket.service}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600">
                              {formatTime(ticket.timestamp)}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600">
                              {Math.floor((new Date() - new Date(ticket.timestamp)) / (1000 * 60))} min
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {index === 0 && !counter?.currentToken && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={callNext}
                                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1"
                              >
                                <Phone className="h-4 w-4" />
                                <span>Call</span>
                              </motion.button>
                            )}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {pendingQueue.length > 0 && (
                <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                  <span>Showing {pendingQueue.length} pending tickets</span>
                  <div className="flex items-center space-x-2">
                    <span>Average service time: 15 minutes</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
