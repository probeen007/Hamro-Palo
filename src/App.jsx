import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingFeedbackButton from './components/FloatingFeedbackButton';

// Page Components
import LandingPage from './pages/LandingPage';
import GetTicketPage from './pages/GetTicketPage';
import QueueStatusPage from './pages/QueueStatusPage';
import OperatorDashboard from './pages/OperatorDashboard';
import FeedbackPage from './pages/FeedbackPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/get-ticket" element={<GetTicketPage />} />
              <Route path="/queue-status" element={<QueueStatusPage />} />
              <Route path="/operator" element={<OperatorDashboard />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
        <FloatingFeedbackButton />
      </div>
    </Router>
  );
}

export default App;
