import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Ticket, 
  Clock, 
  Shield, 
  Users, 
  ArrowRight, 
  Building2,
  CheckCircle 
} from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: Clock,
      title: 'Reduced Wait Times',
      description: 'Skip physical queues with our digital ticketing system'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Government-grade security for all your transactions'
    },
    {
      icon: Users,
      title: 'Real-time Updates',
      description: 'Get live updates on your queue position and wait time'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-16 pb-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className="bg-blue-600 p-6 rounded-full shadow-2xl">
                <Building2 className="h-16 w-16 text-white" />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              Nepal Digital Service Portal
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4 sm:mb-6"
            >
              नेपाल डिजिटल सेवा पोर्टल
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Streamlined government service delivery through modern digital ticketing system. 
              Access municipal services, healthcare appointments, and official documents digitally.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/get-ticket" 
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Ticket className="h-6 w-6" />
                <span>Get Your Ticket</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link 
                to="/queue-status" 
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Clock className="h-6 w-6" />
                <span>View Queue Status</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Digital Ticketing?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience faster, more efficient government services with our modern approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Service Statistics Today
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">127</div>
                <div className="text-gray-600">Tickets Issued</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">89</div>
                <div className="text-gray-600">Services Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">18</div>
                <div className="text-gray-600">Avg Wait Time (min)</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">4.2</div>
                <div className="text-gray-600">Satisfaction Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Quick Access
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                to="/get-ticket" 
                className="card hover:scale-105 transition-all duration-300 text-center group"
              >
                <Ticket className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Get Ticket</h3>
                <p className="text-gray-600">Generate your service ticket</p>
              </Link>
              
              <Link 
                to="/queue-status" 
                className="card hover:scale-105 transition-all duration-300 text-center group"
              >
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Queue Status</h3>
                <p className="text-gray-600">Check your position</p>
              </Link>
              
              <Link 
                to="/operator" 
                className="card hover:scale-105 transition-all duration-300 text-center group"
              >
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Operator Panel</h3>
                <p className="text-gray-600">Staff dashboard</p>
              </Link>
              
              <Link 
                to="/analytics" 
                className="card hover:scale-105 transition-all duration-300 text-center group"
              >
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">Analytics</h3>
                <p className="text-gray-600">Service insights</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;