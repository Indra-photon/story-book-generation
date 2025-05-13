import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CheckCircle, RefreshCw, CreditCard, Calendar, ArrowRight } from 'lucide-react';

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const userData = useSelector(state => state.auth.userData);
  
  // Extract payment information from URL or state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const planId = params.get('planId') || localStorage.getItem('selectedPlan');
    
    console.log("PaymentConfirmation received:", { paymentId, planId });
    
    if (!paymentId) {
      toast.error('Payment information not found');
      navigate('/pricing');
      return;
    }
    
    // Fetch payment details from the backend
    const fetchPaymentDetails = async () => {
      setLoading(true);
      try {
        // CORRECTED API ENDPOINT: Use 'payments' (plural) instead of 'payment' (singular)
        // and 'history' instead of 'details'
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/history`,
          { withCredentials: true }
        );
        
        if (response.data.success || (response.data.data && Array.isArray(response.data.data))) {
          // Find the specific payment by ID
          const payment = response.data.data.find(p => p._id === paymentId);
          
          if (payment) {
            setPaymentDetails({
              ...payment,
              planId: planId // Add planId to the payment details
            });
          } else {
            console.log("Payment not found in history, creating simplified version");
            // Create a simplified version if we can't find the specific payment
            setPaymentDetails({
              paymentId,
              planId,
              amount: getPlanPrice(planId),
              createdAt: new Date().toISOString()
            });
          }
          
          // Clear the stored plan since the payment is complete
          localStorage.removeItem('selectedPlan');
        } else {
          throw new Error('Failed to fetch payment details');
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
        // Create a simplified version if there's an error
        setPaymentDetails({
          paymentId,
          planId,
          amount: getPlanPrice(planId),
          createdAt: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, [navigate, location.search]);
  
  // Start countdown after payment details are loaded
  useEffect(() => {
    if (paymentDetails && !loading) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/profile?tab=subscription');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [paymentDetails, loading, navigate]);
  
  // Helper function to get plan price
  const getPlanPrice = (planId) => {
    const prices = {
      'free': 0,
      'basic': 25,
      'premium': 40
    };
    return prices[planId] || 0;
  };
  
  // Get plan details based on planId
  const getPlanDetails = (planId) => {
    const plans = {
      'free': { name: 'Free', price: '0.00', color: 'gray' },
      'basic': { name: 'Basic', price: '25.00', color: 'primary' },
      'premium': { name: 'Premium', price: '40.00', color: 'accent' }
    };
    
    return plans[planId] || { name: 'Unknown Plan', price: '0.00', color: 'gray' };
  };
  
  const plan = paymentDetails ? getPlanDetails(paymentDetails.planId) : null;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center">
            <RefreshCw size={48} className="text-primary-500 animate-spin mb-4" />
            <h2 className="text-2xl font-sans text-dark mb-2">Processing Payment</h2>
            <p className="text-gray-600 text-center">
              Please wait while we confirm your payment details...
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-red-100 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-sans text-dark mb-2">Payment Information Not Found</h2>
            <p className="text-gray-600 text-center mb-6">
              We couldn't find details for this payment. Please try again or contact support.
            </p>
            <button 
              onClick={() => navigate('/pricing')}
              className="px-6 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition"
            >
              Return to Pricing
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/20 rounded-full z-0"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/20 rounded-full z-0"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-sans text-dark mb-2">Payment Successful!</h2>
            <p className="text-gray-600 text-center">
              Your subscription has been activated successfully.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-dark mb-4">Payment Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className={`font-bold text-${plan?.color}-500`}>{plan?.name} Plan</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-bold">
                  ${paymentDetails.metadata?.amount || paymentDetails.amount || plan?.price}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID</span>
                <span className="font-mono text-sm">
                  {(paymentDetails.paymentId || paymentDetails._id)?.substring(0, 12)}...
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{new Date(paymentDetails.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="text-primary-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-dark">Subscription Details</h4>
                <p className="text-sm text-gray-600">
                  Your subscription is now active. You can enjoy all the premium features of the {plan?.name} plan.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Redirecting to your profile in {countdown} seconds...
            </p>
            
            <button 
              onClick={() => navigate('/profile?tab=subscription')}
              className="flex items-center text-primary-500 hover:text-primary-600 font-bold"
            >
              Go Now
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;