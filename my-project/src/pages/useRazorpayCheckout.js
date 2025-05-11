// // src/components/payment/RazorpayCheckout.jsx
// import React from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { updateUserData } from '../../src/store/authSlice.js'; 

// const RazorpayCheckout = ({ 
//   orderType, // 'token_purchase' or 'subscription_upgrade'
//   itemDetails, // { tokenCount, amount } or { tier, amount }
//   onSuccess,
//   onFailure 
// }) => {
//   const dispatch = useDispatch();
  
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const createOrder = async () => {
//     try {
//       // Create different API endpoints based on order type
//       const endpoint = orderType === 'token_purchase' 
//         ? `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/create-token-purchase-order`
//         : `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/create-subscription-order`;
      
//       const payload = orderType === 'token_purchase'
//         ? { tokenCount: itemDetails.tokenCount, amount: itemDetails.amount }
//         : { tier: itemDetails.tier, amount: itemDetails.amount };
      
//       const response = await axios.post(endpoint, payload, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       return response.data.data;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       toast.error(error.response?.data?.message || 'Failed to create order');
//       if (onFailure) onFailure(error);
//       return null;
//     }
//   };

//   const verifyPayment = async (paymentData) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/verify-payment`,
//         paymentData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       // Update user data in Redux store
//       dispatch(updateUserData(response.data.data.user));
      
//       return response.data;
//     } catch (error) {
//       console.error('Payment verification error:', error);
//       throw error;
//     }
//   };

//   const handlePayment = async () => {
//     const scriptLoaded = await loadRazorpayScript();
    
//     if (!scriptLoaded) {
//       toast.error('Failed to load Razorpay checkout. Please try again.');
//       if (onFailure) onFailure(new Error('Failed to load Razorpay script'));
//       return;
//     }
    
//     // Create order on backend
//     const orderData = await createOrder();
//     if (!orderData) return;
    
//     // Configure Razorpay options
//     const options = {
//       key: orderData.key,
//       amount: orderData.order.amount,
//       currency: orderData.order.currency,
//       name: 'Cartoonify',
//       description: orderType === 'token_purchase' 
//         ? `Purchase ${itemDetails.tokenCount} tokens`
//         : `${itemDetails.tier.charAt(0).toUpperCase() + itemDetails.tier.slice(1)} Subscription`,
//       order_id: orderData.order.id,
//       handler: async function (response) {
//         try {
//           const data = {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature
//           };
          
//           const result = await verifyPayment(data);
          
//           toast.success(orderType === 'token_purchase' 
//             ? `Successfully purchased ${itemDetails.tokenCount} tokens!` 
//             : `Successfully upgraded to ${itemDetails.tier} subscription!`
//           );
          
//           if (onSuccess) onSuccess(result);
//         } catch (error) {
//           toast.error(error.response?.data?.message || 'Payment verification failed');
//           if (onFailure) onFailure(error);
//         }
//       },
//       prefill: {
//         name: 'User',
//         email: '',
//         contact: ''
//       },
//       theme: {
//         color: '#FF906B' // Use your primary color here
//       }
//     };
    
//     // Open Razorpay checkout
//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return { handlePayment };
// };

// export default RazorpayCheckout;


// useRazorpayCheckout.js - Convert to a proper React custom hook
// useRazorpayCheckout.js - Updated with correct API endpoints
// import { useState, useCallback } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { updateUserData } from '../store/authSlice.js'; // Adjust path as needed

// const useRazorpayCheckout = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();

//   const handlePayment = useCallback(async (orderDetails, onSuccess, onFailure) => {
//     setIsLoading(true);
    
//     try {
//       // Determine the correct endpoint based on order type
//       let endpoint;
//       if (orderDetails.orderType === 'token_purchase') {
//         endpoint = `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/tokens/create-order`;
//       } else if (orderDetails.orderType === 'subscription_upgrade') {
//         endpoint = `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/subscription/create-order`;
//       } else {
//         throw new Error('Invalid order type');
//       }
      
//       // Create order in backend
//       const response = await axios.post(
//         endpoint,
//         {
//           ...orderDetails.itemDetails
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json"
//           }
//         }
//       );
      
//       // Handle the response structure
//       const orderData = response.data.data;
      
//       // Load Razorpay script
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       document.body.appendChild(script);
      
//       script.onload = () => {
//         const options = {
//           key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//           amount: orderData.order.amount,
//           currency: orderData.order.currency || 'INR',
//           name: 'Cartoonify',
//           description: orderDetails.description || `Payment for ${orderDetails.orderType}`,
//           order_id: orderData.order.id,
//           handler: async (paymentResponse) => {
//             try {
//               // Verify payment on backend
//               const verifyResponse = await axios.post(
//                 `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/verify`,
//                 {
//                   orderType: orderDetails.orderType,
//                   ...orderDetails.itemDetails,
//                   razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                   razorpay_order_id: paymentResponse.razorpay_order_id,
//                   razorpay_signature: paymentResponse.razorpay_signature
//                 },
//                 {
//                   withCredentials: true,
//                   headers: {
//                     "Content-Type": "application/json"
//                   }
//                 }
//               );
              
//               // Update user data in Redux
//               if (verifyResponse.data.data.user) {
//                 dispatch(updateUserData(verifyResponse.data.data.user));
//               }
              
//               setIsLoading(false);
              
//               // Show success message based on order type
//               let successMessage = 'Payment successful!';
//               if (orderDetails.orderType === 'token_purchase') {
//                 successMessage = `Successfully purchased ${orderDetails.itemDetails.tokenCount} tokens!`;
//               } else if (orderDetails.orderType === 'subscription_upgrade') {
//                 successMessage = `Successfully ${orderDetails.itemDetails.isRenewal ? 'renewed' : 'upgraded to'} ${orderDetails.itemDetails.tier} subscription!`;
//               }
              
//               toast.success(successMessage);
              
//               if (onSuccess && typeof onSuccess === 'function') {
//                 onSuccess(verifyResponse.data.data);
//               }
//             } catch (error) {
//               setIsLoading(false);
              
//               if (onFailure && typeof onFailure === 'function') {
//                 onFailure(error);
//               } else {
//                 console.error('Payment verification failed:', error);
//                 toast.error(error.response?.data?.message || 'Payment verification failed');
//               }
//             }
//           },
//           prefill: orderDetails.prefill || {},
//           theme: {
//             color: '#FF906B' // Your brand color
//           },
//           modal: {
//             ondismiss: () => {
//               setIsLoading(false);
//               if (onFailure) {
//                 onFailure(new Error('Payment cancelled by user'));
//               }
//             }
//           }
//         };
        
//         const razorpayInstance = new window.Razorpay(options);
//         razorpayInstance.open();
//       };
      
//       script.onerror = () => {
//         setIsLoading(false);
//         toast.error('Failed to load payment gateway. Please try again later.');
        
//         if (onFailure && typeof onFailure === 'function') {
//           onFailure(new Error('Failed to load payment gateway'));
//         }
//       };
      
//     } catch (error) {
//       setIsLoading(false);
      
//       if (onFailure && typeof onFailure === 'function') {
//         onFailure(error);
//       } else {
//         console.error('Payment initiation failed:', error);
//         toast.error(error.response?.data?.message || 'Failed to initiate payment');
//       }
//     }
//   }, [dispatch]);

//   return {
//     isLoading,
//     handlePayment
//   };
// };

// export default useRazorpayCheckout;

import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../store/authSlice.js'; // Adjust path as needed

const useRazorpayCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handlePayment = useCallback(async (orderDetails, onSuccess, onFailure) => {
    setIsLoading(true);
    
    try {
      // Determine the correct endpoint based on order type
      let endpoint;
      if (orderDetails.orderType === 'token_purchase') {
        endpoint = `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/tokens/create-order`;
      } else if (orderDetails.orderType === 'subscription_upgrade') {
        endpoint = `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/subscription/create-order`;
      } else {
        throw new Error('Invalid order type');
      }
      
      // DEBUG: Log the request details
      console.log('🔍 Payment Request:', {
        endpoint,
        orderType: orderDetails.orderType,
        itemDetails: orderDetails.itemDetails,
        fullOrderDetails: orderDetails
      });
      
      // Create order in backend
      const response = await axios.post(
        endpoint,
        {
          ...orderDetails.itemDetails
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      // DEBUG: Log the response
      console.log('✅ Payment Response:', response.data);
      
      // Handle the response structure
      const orderData = response.data.data;
      
      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
      
      script.onload = () => {
        // DEBUG: Log script loaded
        console.log('💡 Razorpay script loaded successfully');
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: orderData.order.amount,
          currency: orderData.order.currency || 'INR',
          name: 'Cartoonify',
          description: orderDetails.description || `Payment for ${orderDetails.orderType}`,
          order_id: orderData.order.id,
          handler: async (paymentResponse) => {
            try {
              // DEBUG: Log payment response
              console.log('💰 Razorpay payment completed:', paymentResponse);

              // Right before sending the verification request
              console.log('Verification payload being sent:', {
                type: orderDetails.orderType,
                orderType: orderDetails.orderType,
                ...orderDetails.itemDetails,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature
              });
              
              // Verify payment on backend
              const verifyResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/payments/verify`,
                {
                  type: orderDetails.orderType,
                  orderType: orderDetails.orderType,
                  ...orderDetails.itemDetails,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_signature: paymentResponse.razorpay_signature
                },
                {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json"
                  }
                }
              );
              
              // DEBUG: Log verification response
              console.log('✅ Payment verification response:', verifyResponse.data);
              
              // Update user data in Redux
              if (verifyResponse.data.data.user) {
                dispatch(updateUserData(verifyResponse.data.data.user));
              }
              
              setIsLoading(false);
              
              // Show success message based on order type
              let successMessage = 'Payment successful!';
              if (orderDetails.orderType === 'token_purchase') {
                successMessage = `Successfully purchased ${orderDetails.itemDetails.tokenCount} tokens!`;
              } else if (orderDetails.orderType === 'subscription_upgrade') {
                successMessage = `Successfully ${orderDetails.itemDetails.isRenewal ? 'renewed' : 'upgraded to'} ${orderDetails.itemDetails.tier} subscription!`;
              }
              
              toast.success(successMessage);
              
              if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(verifyResponse.data.data);
              }
            } catch (error) {
              // DEBUG: Log verification error
              console.error('❌ Payment verification error:', error);
              console.error('Error response:', error.response?.data);
              
              setIsLoading(false);
              
              if (onFailure && typeof onFailure === 'function') {
                onFailure(error);
              } else {
                console.error('Payment verification failed:', error);
                toast.error(error.response?.data?.message || 'Payment verification failed');
              }
            }
          },
          prefill: orderDetails.prefill || {},
          theme: {
            color: '#FF906B' // Your brand color
          },
          modal: {
            ondismiss: () => {
              // DEBUG: Log payment modal dismissed
              console.log('🚫 Payment modal dismissed by user');
              
              setIsLoading(false);
              if (onFailure) {
                onFailure(new Error('Payment cancelled by user'));
              }
            }
          }
        };
        
        // DEBUG: Log Razorpay options
        console.log('⚙️ Razorpay configuration:', {
          key: options.key,
          amount: options.amount,
          order_id: options.order_id,
          prefill: options.prefill
        });
        
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      };
      
      script.onerror = (error) => {
        // DEBUG: Log script loading error
        console.error('❌ Failed to load Razorpay script:', error);
        
        setIsLoading(false);
        toast.error('Failed to load payment gateway. Please try again later.');
        
        if (onFailure && typeof onFailure === 'function') {
          onFailure(new Error('Failed to load payment gateway'));
        }
      };
      
    } catch (error) {
      // DEBUG: Log detailed error
      console.error('❌ Payment initiation error:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response?.data);
      
      setIsLoading(false);
      
      if (onFailure && typeof onFailure === 'function') {
        onFailure(error);
      } else {
        console.error('Payment initiation failed:', error);
        toast.error(error.response?.data?.message || 'Failed to initiate payment');
      }
    }
  }, [dispatch]);

  return {
    isLoading,
    handlePayment
  };
};

export default useRazorpayCheckout;