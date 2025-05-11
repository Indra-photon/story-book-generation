// src/components/payment/TokenPurchase.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import RazorpayCheckout from './useRazorpayCheckout';

const TokenPurchase = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Define token packages
  const tokenPackages = [
    { tokenCount: 10, amount: 99, label: '10 Tokens', popular: false },
    { tokenCount: 25, amount: 199, label: '25 Tokens', popular: true },
    { tokenCount: 50, amount: 349, label: '50 Tokens', popular: false }
  ];
  
  const handleTokenPurchase = async (tokenPackage) => {
    setLoading(true);
    
    const { handlePayment } = RazorpayCheckout({
      orderType: 'token_purchase',
      itemDetails: {
        tokenCount: tokenPackage.tokenCount,
        amount: tokenPackage.amount
      },
      onSuccess: () => {
        setLoading(false);
        navigate('/profile?tab=tokens');
      },
      onFailure: () => {
        setLoading(false);
        toast.error('Token purchase failed. Please try again.');
      }
    });
    
    await handlePayment();
    setLoading(false);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-dark mb-4">Purchase Tokens</h3>
      <p className="text-gray-600 mb-6">Select a token package to enhance your story creation experience:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tokenPackages.map((pkg, index) => (
          <div 
            key={index}
            className={`border rounded-xl p-4 ${pkg.popular ? 'border-primary-500 bg-primary-50' : 'border-gray-200'} relative`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                Popular
              </span>
            )}
            <div className="text-center mb-3">
              <h4 className="text-lg font-bold text-dark">{pkg.tokenCount} Tokens</h4>
              <p className="text-2xl font-bold text-primary-600">₹{pkg.amount}</p>
              <p className="text-xs text-gray-500">
                {(pkg.amount / pkg.tokenCount).toFixed(2)} per token
              </p>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p>Create {Math.floor(pkg.tokenCount / 7)} complete stories</p>
              <p>({pkg.tokenCount} tokens total)</p>
            </div>
            <button
              onClick={() => handleTokenPurchase(pkg)}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium 
                ${pkg.popular 
                  ? 'bg-primary-500 text-white hover:bg-primary-600' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} 
                transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Purchase Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenPurchase;