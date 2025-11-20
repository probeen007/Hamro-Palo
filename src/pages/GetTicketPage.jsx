import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Users, 
  FileText, 
  Ticket, 
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Heart,
  Shield,
  User,
  MapPin,
  Phone,
  CreditCard
} from 'lucide-react';
import servicesData from '../data/services.json';
import userData from '../data/user.json';
import { generateTokenNumber, formatTime, generateQRCode } from '../utils/helpers';

const GetTicketPage = () => {
  const [selectedOffice, setSelectedOffice] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [hasInsurance, setHasInsurance] = useState(null);
  const [generatedTicket, setGeneratedTicket] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const user = userData.user;

  const offices = servicesData.offices;
  const departments = selectedOffice ? offices.find(o => o.id === selectedOffice)?.departments || [] : [];
  const services = selectedDepartment ? departments.find(d => d.id === selectedDepartment)?.services || [] : [];

  const handleOfficeSelect = (officeId) => {
    setSelectedOffice(officeId);
    setSelectedDepartment('');
    setSelectedService('');
    setStep(2);
  };

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartment(departmentId);
    setSelectedService('');
    setStep(3);
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setStep(4);
  };

  const generateTicket = async () => {
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const service = services.find(s => s.id === selectedService);
    const department = departments.find(d => d.id === selectedDepartment);
    const office = offices.find(o => o.id === selectedOffice);
    
    const ticket = {
      token: generateTokenNumber(selectedDepartment),
      service: service.name,
      department: department.name,
      office: office.name,
      estimatedTime: service.estimatedTime,
      issueTime: new Date().toISOString(),
      queuePosition: Math.floor(Math.random() * 5) + 1,
      estimatedWait: (Math.floor(Math.random() * 5) + 1) * service.estimatedTime,
      user: user.personalInfo
    };
    
    // Generate QR code
    const qrData = {
      token: ticket.token,
      office: ticket.office,
      department: ticket.department,
      service: ticket.service,
      issueTime: ticket.issueTime,
      citizen: user.personalInfo.fullName
    };
    
    const qrUrl = await generateQRCode(qrData);
    setQrCodeUrl(qrUrl);
    setGeneratedTicket(ticket);
    setIsGenerating(false);
    setStep(5);
  };

  const resetForm = () => {
    setSelectedOffice('');
    setSelectedDepartment('');
    setSelectedService('');
    setGeneratedTicket(null);
    setStep(1);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Your Service Ticket</h1>
          <p className="text-lg text-gray-600">Follow the steps below to generate your digital queue ticket</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step >= num 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > num ? <CheckCircle className="h-6 w-6" /> : num}
                </div>
                {num < 5 && (
                  <div className={`w-12 h-1 mx-2 transition-colors duration-300 ${
                    step > num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Step {step} of 5: {
                step === 1 ? 'Select Office' :
                step === 2 ? 'Choose Department' :
                step === 3 ? 'Pick Service' :
                step === 4 ? 'Generate Ticket' :
                'Ticket Generated'
              }
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="card max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Select Office */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Office</h2>
                  <p className="text-gray-600">Choose which government office you need to visit</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offices.map((office) => (
                    <motion.div
                      key={office.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOfficeSelect(office.id)}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-blue-300 min-h-[120px]"
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                            {office.id === 'hospitals' ? (
                              <Heart className="h-6 w-6 text-red-500" />
                            ) : (
                              <Building2 className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 truncate">{office.nameEnglish || office.name}</h3>
                          </div>
                        </div>
                        {office.name !== office.nameEnglish && (
                          <p className="text-sm text-gray-600 px-2 truncate">{office.name}</p>
                        )}
                        <p className="text-xs text-blue-600 px-2">{office.departments.length} departments</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Department */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Department</h2>
                  <p className="text-gray-600">Select the department that handles your service</p>
                </div>
                
                <div className="space-y-3">
                  {departments.map((department) => (
                    <motion.button
                      key={department.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDepartmentSelect(department.id)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                    >
                      <h3 className="font-semibold text-gray-900">{department.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {department.services.length} services available
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Service */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick Your Service</h2>
                  <p className="text-gray-600">What service do you need today?</p>
                </div>
                
                <div className="space-y-3">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceSelect(service.id)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Estimated time: {service.estimatedTime} minutes
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Generate Ticket */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <Ticket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to Generate Ticket</h2>
                  
                  {/* Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="font-semibold text-gray-900 mb-4">Service Summary:</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Office:</span> {offices.find(o => o.id === selectedOffice)?.name}</p>
                      <p><span className="font-medium">Department:</span> {departments.find(d => d.id === selectedDepartment)?.name}</p>
                      <p><span className="font-medium">Service:</span> {services.find(s => s.id === selectedService)?.name}</p>
                      <p><span className="font-medium">Est. Time:</span> {services.find(s => s.id === selectedService)?.estimatedTime} minutes</p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateTicket}
                    disabled={isGenerating}
                    className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating Ticket...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Ticket className="h-6 w-6" />
                        <span>Generate My Ticket</span>
                      </div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Ticket Generated */}
            {step === 5 && generatedTicket && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="max-w-md mx-auto"
              >
                {/* Professional Ticket Design */}
                <motion.div
                  initial={{ scale: 0, rotateY: 180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                  className="bg-white border-2 border-dashed border-gray-300 rounded-lg overflow-hidden shadow-2xl mb-6"
                  style={{ fontFamily: 'monospace' }}
                >
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Building2 className="h-6 w-6" />
                      <h3 className="text-lg font-bold">NEPAL GOVERNMENT</h3>
                    </div>
                    <p className="text-blue-100 text-sm">Digital Queue Ticket</p>
                    <div className="mt-2 text-xs text-blue-200">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>

                  {/* Ticket Body */}
                  <div className="px-6 py-6">
                    {/* Token Number - Large Display */}
                    <div className="text-center mb-6">
                      <div className="bg-gray-50 rounded-xl py-4 px-6 border-2 border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">QUEUE TOKEN</p>
                        <div className="text-4xl font-black text-blue-600 tracking-wider">
                          {generatedTicket.token}
                        </div>
                        <div className="flex items-center justify-center mt-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Issued: {formatTime(generatedTicket.issueTime)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Citizen Information */}
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        Citizen Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium text-gray-900">{user.personalInfo.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID:</span>
                          <span className="font-medium text-gray-900">{user.documents.citizenshipNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium text-gray-900">{user.personalInfo.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center">
                        <Building2 className="h-3 w-3 mr-1" />
                        Service Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Office:</span>
                          <span className="font-medium text-gray-900 text-right">{generatedTicket.office}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium text-gray-900 text-right">{generatedTicket.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium text-gray-900 text-right">{generatedTicket.service}</span>
                        </div>
                      </div>
                    </div>

                    {/* Queue Information */}
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Queue Status
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-yellow-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-yellow-600 mb-1">Position</p>
                          <p className="text-xl font-bold text-yellow-700">#{generatedTicket.queuePosition}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-xs text-green-600 mb-1">Est. Wait</p>
                          <p className="text-xl font-bold text-green-700">{generatedTicket.estimatedWait}m</p>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="text-center">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Scan for Verification</h4>
                      {qrCodeUrl ? (
                        <div className="inline-block bg-white p-3 rounded-lg border-2 border-gray-200">
                          <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 mx-auto" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-xs text-gray-500">Loading QR...</div>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Present this ticket at the service counter
                      </p>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                      <p className="text-xs text-gray-500">
                        Keep this ticket safe • Visit Queue Status for updates
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Digital Ticketing System v2.0
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Mobile: Stack buttons vertically */}
                  <div className="flex flex-col xs:hidden space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetForm}
                      className="btn-secondary w-full py-3 text-sm flex items-center justify-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Get New Ticket
                    </motion.button>
                    <Link to="/queue-status" className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        View Queue Status
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.print()}
                      className="btn-outline w-full py-3 text-sm flex items-center justify-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Print Ticket
                    </motion.button>
                  </div>

                  {/* Desktop: Show buttons in a row */}
                  <div className="hidden xs:flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetForm}
                      className="btn-secondary flex-1 py-3 text-sm flex items-center justify-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Get New Ticket</span>
                      <span className="sm:hidden">New</span>
                    </motion.button>
                    <Link to="/queue-status" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary w-full py-3 text-sm flex items-center justify-center"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Queue Status</span>
                        <span className="sm:hidden">Queue</span>
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.print()}
                      className="btn-outline flex-1 py-3 text-sm flex items-center justify-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Print</span>
                      <span className="sm:hidden">Print</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GetTicketPage;