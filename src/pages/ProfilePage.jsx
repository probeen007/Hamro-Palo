import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Shield, Phone, Mail, MapPin, Calendar, CreditCard, Heart, Users, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import userData from '../data/user.json';

const ProfilePage = () => {
  const user = userData.user;

  const InfoCard = ({ title, children, icon: Icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const InfoRow = ({ label, value, valueNepali = null }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}:</span>
      <div className="text-right">
        <div className="text-gray-900 font-medium">{value}</div>
        {valueNepali && (
          <div className="text-sm text-gray-600">{valueNepali}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8">
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
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.personalInfo.fullNameEnglish}</h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-2">{user.personalInfo.fullName}</p>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">KYC Verified</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Full KYC Verified</span>
                </div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm text-gray-500">Member Since</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900">
                {new Date(user.accountInfo.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <InfoCard title="Personal Information" icon={User}>
            <div className="space-y-1">
              <InfoRow 
                label="Full Name" 
                value={user.personalInfo.fullNameEnglish} 
                valueNepali={user.personalInfo.fullName}
              />
              <InfoRow 
                label="Date of Birth" 
                value={new Date(user.personalInfo.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              />
              <InfoRow label="Age" value={`${user.personalInfo.age} years`} />
              <InfoRow label="Gender" value={user.personalInfo.gender} />
              <InfoRow label="Blood Group" value={user.personalInfo.bloodGroup} />
            </div>
          </InfoCard>

          {/* Contact Information */}
          <InfoCard title="Contact Information" icon={Phone}>
            <div className="space-y-1">
              <InfoRow label="Phone Number" value={user.personalInfo.phoneNumber} />
              <InfoRow label="Email Address" value={user.personalInfo.email} />
              <InfoRow 
                label="Emergency Contact" 
                value={user.emergencyContact.nameEnglish}
                valueNepali={`${user.emergencyContact.name} (${user.emergencyContact.relationship})`}
              />
              <InfoRow label="Emergency Phone" value={user.emergencyContact.phoneNumber} />
            </div>
          </InfoCard>

          {/* Address Information */}
          <InfoCard title="Address Information" icon={MapPin}>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Permanent Address</h4>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {user.address.permanentAddress.fullAddress}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Temporary Address</h4>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {user.address.temporaryAddress.fullAddress}
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Document Information */}
          <InfoCard title="Document Information" icon={FileText}>
            <div className="space-y-1">
              <InfoRow label="Citizenship Number" value={user.documents.citizenshipNumber} />
              <InfoRow 
                label="Issue Date" 
                value={new Date(user.documents.citizenshipIssueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <InfoRow label="Issue District" value={user.documents.citizenshipIssueDistrict} />
              <InfoRow label="Voter ID" value={user.documents.voterIdNumber} />
              <InfoRow label="PAN Number" value={user.documents.panNumber} />
            </div>
          </InfoCard>

          {/* Family Information */}
          <InfoCard title="Family Information" icon={Users}>
            <div className="space-y-1">
              <InfoRow 
                label="Father's Name" 
                value={user.familyInfo.fatherNameEnglish}
                valueNepali={user.familyInfo.fatherName}
              />
              <InfoRow 
                label="Mother's Name" 
                value={user.familyInfo.motherNameEnglish}
                valueNepali={user.familyInfo.motherName}
              />
              <InfoRow 
                label="Grandfather's Name" 
                value={user.familyInfo.grandFatherNameEnglish}
                valueNepali={user.familyInfo.grandFatherName}
              />
              <InfoRow 
                label="Spouse's Name" 
                value={user.familyInfo.spouseNameEnglish}
                valueNepali={user.familyInfo.spouseName}
              />
            </div>
          </InfoCard>

          {/* Health Insurance */}
          <InfoCard title="Health Insurance" icon={Heart}>
            <div className="space-y-1">
              <InfoRow 
                label="Insurance Status" 
                value={
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.healthInsurance.hasInsurance 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.healthInsurance.hasInsurance ? 'Active' : 'Not Active'}
                  </span>
                }
              />
              {user.healthInsurance.hasInsurance && (
                <>
                  <InfoRow label="Provider" value={user.healthInsurance.insuranceProvider} />
                  <InfoRow label="Insurance Number" value={user.healthInsurance.insuranceNumber} />
                  <InfoRow label="Coverage Type" value={user.healthInsurance.coverageType} />
                  <InfoRow 
                    label="Valid Until" 
                    value={new Date(user.healthInsurance.validUntil).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  />
                </>
              )}
            </div>
          </InfoCard>
        </div>

        {/* Account Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Account Status: Active</h3>
              <p className="text-green-100">
                Your KYC verification is complete. You can access all government services.
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-100 text-sm">Last Login</div>
              <div className="text-xl font-semibold">
                {new Date(user.accountInfo.lastLogin).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;