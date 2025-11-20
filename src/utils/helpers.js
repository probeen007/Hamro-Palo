// Utility functions for the ticketing system
import QRCode from 'qrcode';

export const generateQRCode = async (data) => {
  try {
    const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(data), {
      width: 200,
      margin: 2,
      color: {
        dark: '#1e40af', // Blue color
        light: '#ffffff' // White background
      }
    });
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const calculateWaitTime = (timestamp, estimatedTime = 15) => {
  const now = new Date();
  const issueTime = new Date(timestamp);
  const elapsedMinutes = Math.floor((now - issueTime) / (1000 * 60));
  const remainingTime = Math.max(estimatedTime - elapsedMinutes, 0);
  return remainingTime;
};

export const generateTokenNumber = (department) => {
  const prefixes = {
    'civil-registration': 'A',
    'licenses-permits': 'B', 
    'treasury': 'C',
    'driver-services': 'D',
    'vehicle-services': 'V'
  };
  
  const prefix = prefixes[department] || 'X';
  const number = Math.floor(Math.random() * 99) + 1;
  return `${prefix}${number.toString().padStart(2, '0')}`;
};

export const getQueuePosition = (token, queue) => {
  const position = queue.findIndex(item => item.token === token);
  return position >= 0 ? position + 1 : 0;
};

export const estimateWaitTime = (position, avgServiceTime = 15) => {
  return position * avgServiceTime;
};

export const getDepartmentColor = (department) => {
  const colors = {
    'Civil Registration': 'bg-blue-100 text-blue-800',
    'Licenses & Permits': 'bg-green-100 text-green-800', 
    'Treasury Department': 'bg-yellow-100 text-yellow-800',
    'Driver Services': 'bg-purple-100 text-purple-800',
    'Vehicle Services': 'bg-red-100 text-red-800'
  };
  return colors[department] || 'bg-gray-100 text-gray-800';
};

export const getStatusColor = (status) => {
  const colors = {
    'waiting': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'no-show': 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const playNotificationSound = () => {
  // Create a simple beep sound
  if (typeof Audio !== 'undefined') {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio notification not available');
    }
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};