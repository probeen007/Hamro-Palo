import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 border-t border-gray-200 mt-16"
    >
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">
            © 2025 Government Digital Services. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Modern Ticketing System for Efficient Public Service
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;