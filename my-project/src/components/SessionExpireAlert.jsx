// /src/components/SessionExpireAlert.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SessionExpireAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds warning
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  
  useEffect(() => {
    if (!authStatus) return;
    
    // Check if user was redirected due to auth expiry
    const authExpired = localStorage.getItem('authExpired');
    if (authExpired) {
      localStorage.removeItem('authExpired');
      // Show notification or handle as needed
    }
    
    // Calculate when token will expire (55 minutes after login)
    // In a real app, you might want to store token issue time
    const warningTime = 55 * 60 * 1000; // 55 minutes in milliseconds
    
    const warningTimer = setTimeout(() => {
      setShowAlert(true);
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdownInterval);
    }, warningTime);
    
    return () => clearTimeout(warningTimer);
  }, [authStatus, dispatch, navigate]);
  
  const handleStayLoggedIn = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/refresh-token`,
        {},
        { withCredentials: true }
      );
      setShowAlert(false);
      setCountdown(60);
    } catch (error) {
      console.error('Failed to refresh session:', error);
      // Handle failure - maybe redirect to login
      navigate('/login');
    }
  };
  
  const handleLogout = () => {
    // Dispatch logout action
    // You already have this implemented
    navigate('/login');
  };
  
  if (!showAlert) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md shadow-xl">
        <h3 className="text-xl font-bold text-dark mb-4">Session Expiring Soon</h3>
        <p className="text-gray-600 mb-6">
          Your session will expire in {countdown} seconds. Would you like to stay logged in?
        </p>
        <div className="flex justify-between">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Log Out
          </button>
          <button 
            onClick={handleStayLoggedIn}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpireAlert;