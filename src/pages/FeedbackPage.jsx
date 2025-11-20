import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  Send, 
  ThumbsUp, 
  CheckCircle,
  Heart 
} from 'lucide-react';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Feedback submitted:', {
      rating,
      feedback,
      timestamp: new Date().toISOString(),
      service: 'Birth Certificate', // This would come from session/context
      token: 'A12' // This would come from session/context
    });
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setFeedback('');
    setSubmitted(false);
    setIsSubmitting(false);
  };

  const getRatingText = (stars) => {
    switch (stars) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return 'Rate your experience';
    }
  };

  const getRatingColor = (stars) => {
    if (stars <= 2) return 'text-red-500';
    if (stars === 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="card">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Thank You!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 mb-6"
            >
              Your feedback has been submitted and will help us improve our services.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Your Rating</h3>
              <div className="flex justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-sm font-medium ${getRatingColor(rating)}`}>
                {getRatingText(rating)}
              </p>
              {feedback && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">"{feedback}"</p>
                </div>
              )}
            </motion.div>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="btn-secondary flex-1"
              >
                Submit Another
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="btn-primary flex-1"
              >
                Done
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Feedback</h1>
          <p className="text-lg text-gray-600">
            Help us improve our services by sharing your experience
          </p>
        </motion.div>

        {/* Service Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 border-blue-200 bg-blue-50"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Your Service Today
            </h2>
            <div className="text-2xl font-bold text-blue-600 mb-1">A12</div>
            <p className="text-gray-600">Birth Certificate • Civil Registration</p>
            <p className="text-sm text-gray-500 mt-2">
              Service completed at 10:45 AM • Wait time: 18 minutes
            </p>
          </div>
        </motion.div>

        {/* Feedback Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card"
        >
          
          {/* Rating Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Rate Your Experience
            </h3>
            
            <div className="flex justify-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-2 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <Star
                    className={`h-10 w-10 transition-all duration-200 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current transform scale-110' 
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            
            <div className="text-center">
              <p className={`text-lg font-medium transition-colors duration-200 ${
                (hoveredRating || rating) ? getRatingColor(hoveredRating || rating) : 'text-gray-500'
              }`}>
                {getRatingText(hoveredRating || rating)}
              </p>
            </div>
          </div>

          {/* Feedback Text */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              <MessageCircle className="inline h-5 w-5 mr-2" />
              Tell us more about your experience (optional)
            </label>
            
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What went well? What could we improve? Your feedback helps us serve you better."
              rows={4}
              className="input-field resize-none"
            />
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {feedback.length}/500 characters
              </span>
              {feedback.length > 400 && (
                <span className="text-sm text-yellow-600">
                  {500 - feedback.length} characters remaining
                </span>
              )}
            </div>
          </div>

          {/* Quick Feedback Options */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">Quick feedback (optional)</h4>
            <div className="flex flex-wrap gap-3">
              {[
                'Fast service',
                'Helpful staff',
                'Clear process', 
                'Good facilities',
                'Easy to understand',
                'Professional service'
              ].map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (feedback.includes(option)) {
                      setFeedback(feedback.replace(option + '. ', '').replace(option, ''));
                    } else {
                      setFeedback(feedback ? `${feedback}. ${option}` : option);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    feedback.includes(option)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {feedback.includes(option) && <ThumbsUp className="inline h-4 w-4 mr-1" />}
                  {option}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className="btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Submit Feedback</span>
                </div>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => window.history.back()}
              className="btn-secondary px-8"
            >
              Skip
            </motion.button>
          </div>

          {rating === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please select a rating to submit your feedback
            </p>
          )}
          
        </motion.form>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            Your feedback is anonymous and will be used to improve our services. 
            Thank you for helping us serve you better.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default FeedbackPage;
