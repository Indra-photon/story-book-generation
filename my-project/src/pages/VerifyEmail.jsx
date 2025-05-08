import React, { useState, useEffect, useRef  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary-500"></div>
    <p className="ml-4 text-xl">Verifying your email...</p>
  </div>
);

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const verificationAttempted = useRef(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedUser, setVerifiedUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Verification Success Component
  const VerificationSuccess = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg 
            className="mx-auto mb-4 h-16 w-16 text-green-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Email Verified Successfully!
          </h2>
          <p className="mb-6 text-gray-600">
            {verifiedUser 
              ? `${verifiedUser.username}, your email has been verified.` 
              : 'Your email has been verified.'
            } 
            You can now access all features.
          </p>
          <button 
            onClick={() => navigate('/profile')}
            className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600 transition"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  };

  // Verification Error Component
  const VerificationError = ({ errorMessage }) => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg 
            className="mx-auto mb-4 h-16 w-16 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-red-700">
            Email Verification Failed
          </h2>
          <p className="mb-6 text-gray-600">
            {errorMessage || "Unable to verify your email. Please try again."}
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/profile')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Back to Profile
            </button>
            <button 
              onClick={() => {/* Implement resend verification logic */}}
              className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600 transition"
            >
              Resend Verification Email
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    // Only proceed if verification hasn't been attempted yet
    if (verificationAttempted.current) {
      console.log("Verification already attempted, skipping duplicate call");
      return;
    }
    
    // Mark verification as attempted
    verificationAttempted.current = true;
    
    const verifyEmail = async () => {
      try {
        // Extract token from URL
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        console.log("Token from URL:", token);
  
        if (!token) {
          console.log("No token found in URL");
          setVerificationStatus('error');
          setErrorMessage('No verification token found');
          return;
        }
  
        console.log("Making verification API call...");
        // Send token to backend
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/verify-email/${token}`,
          {
            withCredentials: true
          }
        );
        
        console.log("Full API response:", response.data);
  
        // Check the response structure
        if (response.data.success && response.data.data) {
          const verificationData = response.data.data;
          console.log("Verification data extracted:", verificationData);
          
          // Check if email is verified
          if (verificationData.isEmailVerified) {
            console.log("Email is verified, setting success state");
            setVerifiedUser(verificationData.user);
            setVerificationStatus('success');
            toast.success('Email verified successfully!');
          } else {
            console.log("Email not marked as verified in response");
            setVerificationStatus('error');
            setErrorMessage('Verification process failed unexpectedly');
          }
        } else {
          console.log("Response doesn't have success or data property");
          setVerificationStatus('error');
          setErrorMessage('Invalid verification response');
        }
      } catch (error) {
        console.error('Verification error details:', error);
        console.error('Error response data:', error.response?.data);
        
        // Special handling for cases where we already have a success state
        if (verificationStatus === 'success') {
          console.log("Already verified successfully, ignoring error");
          return;
        }
        
        const errorMsg = error.response?.data?.message || 'Invalid or expired verification link';
        
        console.log("Setting error state with message:", errorMsg);
        setVerificationStatus('error');
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
      }
    };
  
    verifyEmail();
  }, []);

  // Render based on verification status
  if (verificationStatus === 'pending') {
    return <LoadingSpinner />;
  }

  if (verificationStatus === 'success') {
    return <VerificationSuccess />;
  }

  return <VerificationError errorMessage={errorMessage} />;
}

export default VerifyEmail;