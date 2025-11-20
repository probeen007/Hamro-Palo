import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, X, Star } from 'lucide-react';

const FloatingFeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Don't show on feedback page itself
  if (location.pathname === '/feedback') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 mb-4 max-w-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-900">Share Your Experience</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              How was your experience with our digital queue system?
            </p>
            
            <div className="flex space-x-2">
              <Link
                to="/feedback"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center flex items-center justify-center space-x-1"
              >
                <Star className="h-4 w-4" />
                <span>Rate Service</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingFeedbackButton;
