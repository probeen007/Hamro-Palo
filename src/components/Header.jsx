import { motion } from 'framer-motion';
import { Building2, ArrowLeft, User, Shield, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import userData from '../data/user.json';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = userData.user;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="hidden xs:block">
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900">
                  Nepal Digital Service Portal
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">नेपाल डिजिटल सेवा पोर्टल</p>
              </div>
              <div className="block xs:hidden">
                <h1 className="text-base font-bold text-gray-900">
                  NDSP
                </h1>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <nav className="hidden lg:flex space-x-6">
              <Link 
                to="/get-ticket" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Get Ticket
              </Link>
              <Link 
                to="/queue-status" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Queue Status
              </Link>
              <Link 
                to="/operator" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Operator
              </Link>
              <Link 
                to="/analytics" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Analytics
              </Link>
            </nav>
            
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-2 sm:px-3 py-2 rounded-lg transition-colors duration-200 border border-blue-200"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-24">{user.personalInfo.fullNameEnglish}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <Shield className="h-3 w-3 mr-1" />
                    KYC Verified
                  </div>
                </div>
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 text-sm truncate">{user.personalInfo.fullNameEnglish}</div>
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{user.personalInfo.fullName}</div>
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <Shield className="h-3 w-3 mr-1" />
                          <span className="font-medium">KYC Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-800 hover:bg-blue-50 transition-colors duration-200"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>View Profile</span>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-200 px-4 py-3">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Citizenship: {user.documents.citizenshipNumber}</div>
                      <div>Phone: {user.personalInfo.phoneNumber}</div>
                      {user.healthInsurance.hasInsurance && (
                        <div className="text-green-600 font-medium">
                          Health Insurance: Active
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;