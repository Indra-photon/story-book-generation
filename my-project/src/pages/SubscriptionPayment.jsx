// src/pages/SubscriptionPayment.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CheckCircle, RefreshCw, CreditCard, Zap, Calendar, Shield, ArrowLeft } from 'lucide-react';
import useRazorpayCheckout from '../pages/useRazorpayCheckout.js';

const SubscriptionPayment = () => {
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [planDetails, setPlanDetails] = useState(null);
  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the Razorpay custom hook
  const { handlePayment } = useRazorpayCheckout();
  
  // Extract plan info from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    
    console.log("SubscriptionPayment received plan:", planId);
    
    if (!planId) {
      toast.error('No plan selected');
      navigate('/');
      return;
    }
    
    // Get plan details based on plan ID
    const getPlanDetails = (planId) => {
      const plans = {
        'free': { 
          id: 'free',
          name: 'Free', 
          price: 0,
          monthlyPrice: 0,
          tokenAmount: 10,
          maxTokens: 10,
          color: 'gray',
          features: [
            'Access to 10 tokens (2 stories)',
            'Basic story themes',
            'Standard illustrations',
            'Story sharing'
          ]
        },
        'basic': { // Changed from 'pro' to 'basic' to match backend expectations
          id: 'basic', 
          name: 'Basic', 
          price: 2500,
          monthlyPrice: 2500,
          tokenAmount: 40,
          maxTokens: 50,
          color: 'primary',
          features: [
            'Access to 40 tokens monthly (8 stories)',
            'All story themes',
            'High-quality illustrations',
            'Customizable characters',
            'Priority support',
            'Commercial usage rights'
          ]
        },
        'premium': { // Changed from 'business' to 'premium' to match backend expectations
          id: 'premium',
          name: 'Premium', 
          price: 4000,
          monthlyPrice: 4000,
          tokenAmount: 80,
          maxTokens: 100,
          color: 'accent',
          features: [
            'Access to 80 tokens monthly (16 stories)',
            'Everything in Basic plan',
            'Commercial usage rights',
            'Priority generation',
            'Advanced story options',
            'Exclusive story themes'
          ]
        }
      };
      
      return plans[planId] || null;
    };
    
    const plan = getPlanDetails(planId);
    if (!plan) {
      console.error("Plan not found:", planId);
      toast.error('Invalid plan selected');
      navigate('/profile');
      return;
    }
    
    setPlanDetails(plan);
  }, [location.search, navigate]);
  
  // Handle payment process using the custom hook
  const handleSubscriptionAction = async () => {
    if (!planDetails || !userData) {
      toast.error('Missing plan details or user information');
      return;
    }
    
    setProcessingPayment(true);
    
    try {
      // Check if it's a renewal
      const isRenewal = userData?.subscription?.tier === planDetails.id && 
                        userData?.subscription?.status === 'active';
      
      console.log('Starting subscription process:', {
        tier: planDetails.id,
        amount: planDetails.price,
        isRenewal,
        userData: userData ? 'Available' : 'Missing'
      });
      
      // Prepare order details for the hook
      const orderDetails = {
        orderType: 'subscription_upgrade',
        itemDetails: {
          tier: planDetails.id,
          amount: planDetails.price,
          isRenewal
        },
        description: `${planDetails.name} Plan ${isRenewal ? 'Renewal' : 'Subscription'}`,
        prefill: {
          email: userData?.email || '',
          name: userData?.fullname || ''
        }
      };
      
      // Use the Razorpay hook to handle payment
      handlePayment(
        orderDetails,
        // Success callback
        (result) => {
          console.log('Payment successful:', result);
          toast.success(`Your ${planDetails.name} subscription has been ${isRenewal ? 'renewed' : 'activated'} successfully!`);
          
          // Navigate to success page
          navigate(`/payment-confirmation?paymentId=${result.paymentId}&planId=${planDetails.id}`);
          setProcessingPayment(false);
        },
        // Failure callback
        (error) => {
          console.error('Subscription payment failed:', error);
          toast.error(error.response?.data?.message || 'Subscription payment failed. Please try again.');
          setProcessingPayment(false);
        }
      );
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Failed to process payment');
      setProcessingPayment(false);
    }
  };
  
  if (!planDetails || !userData) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center justify-center">
            <RefreshCw size={48} className="text-primary-500 animate-spin mb-4" />
            <h2 className="text-2xl font-chewy text-dark mb-2">Loading Plan Details</h2>
            <p className="text-gray-600 text-center">
              Please wait while we fetch your plan information...
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-light py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back to Plans
          </button>
          
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Plan Header */}
          
          <div className={`${
            planDetails.id === 'basic' 
                ? 'bg-primary-500 text-white' 
                : planDetails.id === 'premium' 
                ? 'bg-accent text-dark' 
                : 'bg-gray-500 text-white'
            } p-6`}>
            <div className="flex justify-between items-center">
                
              <div>
                <h2 className="text-2xl font-chewy">{planDetails.name} Plan</h2>
                <p className="opacity-90">Subscription details</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">₹{planDetails.monthlyPrice}</div>
                <p className="text-sm opacity-80">per month</p>
              </div>
            </div>
          </div>
          
          {/* User & Plan Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* User Info */}
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{userData.fullname || userData.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Plan:</span>
                    <span className="font-medium capitalize">{userData.subscription?.tier || 'Free'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Tokens:</span>
                    <span className="font-medium">{userData.tokens?.balance || 0}</span>
                  </div>
                </div>
              </div>
              
              {/* Token Benefits */}
              <div>
                <h3 className="text-lg font-bold text-dark mb-4">Token Benefits</h3>
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Zap size={24} className="text-primary-500 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-dark">
                        {planDetails.tokenAmount} tokens monthly
                      </p>
                      <p className="text-sm text-gray-600">
                        Approximately {Math.floor(planDetails.tokenAmount/5)} stories per month
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg mb-2">
                    <span className="text-gray-600">Current token balance:</span>
                    <span className="font-bold">{userData.tokens?.balance || 0}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600">After subscription:</span>
                    <span className="font-bold text-primary-500">
                        {Math.min(userData.tokens?.balance + planDetails.tokenAmount, planDetails.maxTokens) || planDetails.tokenAmount}
                    </span>
                 </div>
                 {(userData.tokens?.balance + planDetails.tokenAmount > planDetails.maxTokens) && (
                    <div className="mt-2 text-xs text-gray-500 italic">
                        Note: Maximum token balance for {planDetails.name} plan is {planDetails.maxTokens} tokens
                    </div>
                )}
                </div>
              </div>
            </div>
            
            {/* Plan Features */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-dark mb-4">Plan Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {planDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Payment Details */}
            {/* <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="text-lg font-bold text-dark mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{planDetails.name} Plan (Monthly)</span>
                  <span className="font-medium">${planDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-dark">
                    <span>Total Amount</span>
                    <span>${planDetails.price}</span>
                  </div>
                </div>
              </div>
            </div> */}
            
            {/* Secure Payment */}
            {/* <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3 mb-6">
              <Shield size={24} className="text-gray-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark">Secure Payment</p>
                <p className="text-sm text-gray-600">
                  Your payment information is processed securely through Razorpay. We do not store any payment details.
                </p>
              </div>
            </div> */}
            
            {/* Payment Button */}
            <button
              onClick={handleSubscriptionAction}
              disabled={processingPayment}
              className={`w-full py-4 rounded-full font-bold text-lg transition ${
                processingPayment 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : planDetails.id === 'basic' 
                    ? 'bg-primary-500 text-white hover:bg-primary-600' 
                    : planDetails.id === 'premium' 
                        ? 'bg-accent text-dark hover:bg-accent/90' 
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                } flex items-center justify-center`}
            >
              {processingPayment ? (
                <>
                  <RefreshCw size={20} className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={20} className="mr-2" />
                  Confirm Subscription – ₹{planDetails.price}
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Subscription Terms */}
        <div className="text-center text-sm text-gray-500 mb-10">
          <p>
            By subscribing, you agree to our <a href="/terms" className="text-primary-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary-500 hover:underline">Privacy Policy</a>.
          </p>
          <p className="mt-1">
            You can cancel your subscription at any time from your profile page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPayment;