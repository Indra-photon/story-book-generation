// import React, { useState } from 'react';

// const Pricing = () => {
//   const [isAnnual, setIsAnnual] = useState(false);
  
//   const plans = [
//     {
//       name: "Free",
//       description: "Try out the basic features",
//       monthlyPrice: 0,
//       annualPrice: 0,
//       initialTokens: 10,
//       maxTokens: 20,
//       features: [
//         { text: "10 initial tokens (1-2 stories)", included: true },
//         { text: "Max token balance: 20 tokens", included: true },
//         { text: "Basic story themes", included: true },
//         { text: "Standard illustrations", included: true },
//         { text: "PDF downloads", included: true },
//         { text: "Premium story themes", included: false },
//         { text: "Commercial usage rights", included: false },
//         { text: "Priority generation", included: false }
//       ],
//       cta: "Start Free",
//       popular: false
//     },
//     {
//       name: "Basic",
//       description: "Perfect for regular creators",
//       monthlyPrice: 25,
//       annualPrice: 7.99,
//       initialTokens: 40,
//       maxTokens: 50,
//       features: [
//         { text: "40 tokens upon subscription", included: true },
//         { text: "Max token balance: 50 tokens", included: true },
//         { text: "All story themes", included: true },
//         { text: "High-quality illustrations", included: true },
//         { text: "PDF and digital exports", included: true },
//         { text: "Priority support", included: true },
//         { text: "Story editing tools", included: true },
//         { text: "Commercial usage rights", included: false }
//       ],
//       cta: "Get Basic",
//       popular: true
//     },
//     {
//       name: "Premium",
//       description: "For serious storytellers",
//       monthlyPrice: 40,
//       annualPrice: 15.99,
//       initialTokens: 80,
//       maxTokens: 100,
//       features: [
//         { text: "80 tokens upon subscription", included: true },
//         { text: "Max token balance: 100 tokens", included: true },
//         { text: "Everything in Basic", included: true },
//         { text: "Premium illustrations", included: true },
//         { text: "Commercial usage rights", included: true },
//         { text: "Priority generation", included: true },
//         { text: "Advanced story options", included: true },
//         { text: "Exclusive story themes", included: true }
//       ],
//       cta: "Get Premium",
//       popular: false
//     }
//   ];
  
//   return (
//     <section className="py-20 bg-light">
//       <div className="container mx-auto px-4">
//         {/* Section header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-sans text-dark mb-4">Simple, Transparent Pricing</h2>
//           <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
//             Choose the perfect plan for your storytelling needs. No hidden fees.
//           </p>
          
//           {/* Toggle switch */}
//           {/* <div className="flex items-center justify-center mb-8">
//             <span className={`mr-3 text-lg ${!isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>Monthly</span>
//             <div 
//               onClick={() => setIsAnnual(!isAnnual)} 
//               className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
//             >
//               <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`}></div>
//             </div>
//             <span className={`ml-3 text-lg ${isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>
//               Annual <span className="text-primary-500 font-bold text-sm">Save 20%</span>
//             </span>
//           </div> */}
//         </div>
        
//         {/* Pricing cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => (
//             <div 
//               key={index} 
//               className={`rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative ${plan.popular ? 'transform scale-105 z-10' : ''}`}
//             >
//               {/* Popular badge */}
//               {plan.popular && (
//                 <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
//                   MOST POPULAR
//                 </div>
//               )}
              
//               <div className={`p-6 ${plan.popular ? 'bg-primary-500 text-white' : 'bg-white'}`}>
//                 <h3 className="text-2xl font-sans mb-1">{plan.name}</h3>
//                 <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>{plan.description}</p>
//                 <div className="flex items-baseline mb-6">
//                   <span className="text-4xl font-bold">
//                     ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
//                   </span>
//                   <span className={`text-sm ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
//                     /month
//                   </span>
//                 </div>
//                 <div className={`mb-4 text-center py-2 px-3 rounded-lg ${
//                   plan.popular ? 'bg-white/20' : 'bg-primary-100'
//                 }`}>
//                   <span className={`font-bold ${plan.popular ? 'text-white' : 'text-primary-500'}`}>
//                     {plan.initialTokens} tokens
//                   </span>
//                   <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
//                     {' '}(~{Math.floor(plan.initialTokens/7)} stories)
//                   </span>
//                 </div>
//                 <button className={`w-full py-3 rounded-full font-bold transition-all ${
//                   plan.popular 
//                     ? 'bg-accent text-dark hover:bg-accent/90' 
//                     : 'bg-primary-500 text-white hover:bg-primary-600'
//                 }`}>
//                   {plan.cta}
//                 </button>
//               </div>
              
//               <div className="bg-white p-6">
//                 <p className="font-medium text-dark mb-4">Plan includes:</p>
//                 <ul className="space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start">
//                       {feature.included ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       )}
//                       <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
//                         {feature.text}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Token purchase callout - removed as requested */}
        
//         {/* FAQ */}
//         {/* <div className="mt-20">
//           <h3 className="text-2xl md:text-3xl font-sans text-dark text-center mb-8">Frequently Asked Questions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">How does the token system work?</h4>
//               <p className="text-gray-600">
//                 Our platform uses a token system for creating storybooks. Every new user receives 10 tokens. Creating a story costs 5 tokens, and saving costs 2 tokens. Free users can hold up to 20 tokens, Basic subscribers receive 40 tokens and can hold up to 50, while Premium subscribers receive 80 tokens and can hold up to 100.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">What if I run out of tokens?</h4>
//               <p className="text-gray-600">
//                 If you run out of tokens, you can upgrade your subscription to receive more tokens immediately. If you're already subscribed, you can renew early or upgrade to a higher tier. When upgrading from Basic to Premium, you'll receive 40 additional tokens.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">Do unused tokens expire?</h4>
//               <p className="text-gray-600">
//                 Tokens never expire as long as your account is active. When your subscription expires, you keep your remaining tokens up to the max limit of your new tier. If downgraded to Free, your token balance will be capped at 20.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">Can I change plans mid-subscription?</h4>
//               <p className="text-gray-600">
//                 Yes! You can upgrade anytime to receive more tokens immediately. Your subscription period will reset to a full month from the date of change. Upgrades provide the difference in tokens between tiers, while renewals of the same tier provide the full token amount.
//               </p>
//             </div>
//           </div>
//         </div> */}
//         <div className="mt-20">
//           <h3 className="text-2xl md:text-3xl font-sans text-dark text-center mb-8">Frequently Asked Questions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">How does the token system work?</h4>
//               <p className="text-gray-600">
//                 Our platform uses a token system for storybook creation. Every new user receives 10 tokens upon registration. Creating a story requires 5 tokens, and saving it costs an additional 2 tokens. Different subscription tiers have different token limits: Free (20 max), Basic (50 max), and Premium (100 max). Your token balance is displayed at the top of your dashboard for easy tracking.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">What happens if I run out of tokens?</h4>
//               <p className="text-gray-600">
//                 If you run out of tokens, you can subscribe to get more tokens immediately. Basic subscribers receive 40 tokens and Premium subscribers receive 80 tokens upon subscription. You can also renew your current subscription early or upgrade to a higher tier to receive a fresh allocation of tokens. Your dashboard will alert you when your tokens are running low.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">Do unused tokens expire? What happens during tier changes?</h4>
//               <p className="text-gray-600">
//                 Tokens never expire as long as your account is active, and unused tokens always carry over when you renew your subscription. When upgrading to a higher tier, you'll receive the full token amount for that tier (40 for Basic, 80 for Premium) added to your existing balance. If your subscription expires or you downgrade, you keep your tokens up to the maximum allowed by your new tier.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">How do subscription changes affect my tokens and billing period?</h4>
//               <p className="text-gray-600">
//                 When you change subscription tiers or renew early, your subscription period resets to a full month from the date of change. Upgrading to a higher tier gives you the full token amount for that tier (40 for Basic, 80 for Premium). Renewing the same tier also provides the full token amount. All changes take effect immediately, giving you instant access to your new tokens.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-hot-toast';
// import useRazorpayCheckout from '../pages/useRazorpayCheckout.js';

// const Pricing = () => {
//   const [isAnnual, setIsAnnual] = useState(false);
//   const [processingPlan, setProcessingPlan] = useState(null);
  
//   // Get user authentication status and data from Redux
//   const isAuthenticated = useSelector(state => state.auth.status);
//   console.log(isAuthenticated)
//   const userData = useSelector(state => state.auth.userData);
  
//   const navigate = useNavigate();
  
//   // Use the Razorpay custom hook
//   const { isLoading, handlePayment } = useRazorpayCheckout();
  
//   // Plans configuration
//   const plans = [
//     {
//       id: 'free',
//       name: "Free",
//       description: "Try out the basic features",
//       monthlyPrice: 0,
//       annualPrice: 0,
//       initialTokens: 10,
//       maxTokens: 10,
//       features: [
//         { text: "10 initial tokens (1-2 stories)", included: true },
//         { text: "Max token balance: 10 tokens", included: true },
//         { text: "Basic story themes", included: true },
//         { text: "Standard illustrations", included: true },
//         { text: "PDF downloads", included: true },
//         { text: "Premium story themes", included: false },
//         { text: "Commercial usage rights", included: false },
//         { text: "Priority generation", included: false }
//       ],
//       cta: "Start Free",
//       popular: false
//     },
//     {
//       id: 'basic',
//       name: "Basic",
//       description: "Perfect for regular creators",
//       monthlyPrice: 300,
//       annualPrice: 7.99,
//       initialTokens: 40,
//       maxTokens: 50,
//       features: [
//         { text: "40 tokens upon subscription", included: true },
//         { text: "Max token balance: 50 tokens", included: true },
//         { text: "All story themes", included: true },
//         { text: "High-quality illustrations", included: true },
//         { text: "PDF and digital exports", included: true },
//         { text: "Priority support", included: true },
//         { text: "Story editing tools", included: true },
//         { text: "Commercial usage rights", included: false }
//       ],
//       cta: "Get Basic",
//       popular: true
//     },
//     {
//       id: 'premium',
//       name: "Premium",
//       description: "For serious storytellers",
//       monthlyPrice: 800,
//       annualPrice: 15.99,
//       initialTokens: 80,
//       maxTokens: 100,
//       features: [
//         { text: "80 tokens upon subscription", included: true },
//         { text: "Max token balance: 100 tokens", included: true },
//         { text: "Everything in Basic", included: true },
//         { text: "Premium illustrations", included: true },
//         { text: "Commercial usage rights", included: true },
//         { text: "Priority generation", included: true },
//         { text: "Advanced story options", included: true },
//         { text: "Exclusive story themes", included: true }
//       ],
//       cta: "Get Premium",
//       popular: false
//     }
//   ];
  
//   // Handle subscription purchase
//   // const handleSubscriptionPurchase = async (plan) => {
//   //   // Check if user is logged in
//   //   if (!isAuthenticated) {
//   //     // Store the selected plan in localStorage to redirect back after login
//   //     localStorage.setItem('selectedPlan', plan.id);
      
//   //     // Redirect to login page with redirectUrl
//   //     navigate('/login?redirectUrl=/pricing');
//   //     toast.error('Please log in to continue with subscription purchase');
//   //     return;
//   //   }
    
//   //   // If already on the same plan, check if it's a renewal
//   //   const isRenewal = userData?.subscription?.tier === plan.id && 
//   //                     userData?.subscription?.status === 'active';
    
//   //   // If user is authenticated, proceed with payment
//   //   setProcessingPlan(plan.id);
    
//   //   try {
//   //     // Define order details
//   //     const orderDetails = {
//   //       orderType: 'subscription_upgrade',
//   //       itemDetails: {
//   //         tier: plan.id,
//   //         amount: plan.monthlyPrice,
//   //         isRenewal
//   //       },
//   //       description: `${isRenewal ? 'Renewal of' : 'Upgrade to'} ${plan.name} Plan`,
//   //       prefill: {
//   //         email: userData?.email || '',
//   //         name: userData?.fullname || ''
//   //       }
//   //     };
      
//   //     // Use the Razorpay hook to handle payment
//   //     handlePayment(
//   //       orderDetails,
//   //       // Success callback
//   //       (result) => {
//   //         toast.success(`Your ${plan.name} subscription has been ${isRenewal ? 'renewed' : 'activated'} successfully!`);
          
//   //         // Navigate to success page
//   //         navigate('/profile?tab=subscription');
//   //         setProcessingPlan(null);
//   //       },
//   //       // Failure callback
//   //       (error) => {
//   //         console.error('Subscription payment failed:', error);
//   //         toast.error(error.response?.data?.message || 'Subscription payment failed. Please try again.');
//   //         setProcessingPlan(null);
//   //       }
//   //     );
//   //   } catch (error) {
//   //     console.error('Subscription error:', error);
//   //     toast.error('Something went wrong with the subscription process. Please try again.');
//   //     setProcessingPlan(null);
//   //   }
//   // };

//   // Add this function to handle subscription plan selection
//   const handleSubscriptionSelect = (plan) => {
//   console.log("Button clicked for plan:", plan.id);
  
//   if (!isAuthenticated) {
//     console.log("User not authenticated, redirecting to login");
//     // Store the selected plan in localStorage to redirect back after login
//     localStorage.setItem('selectedPlan', plan.id);
    
//     // Redirect to login page with redirectUrl
//     navigate('/login?redirectUrl=/pricing');
//     toast.error('Please log in to continue with subscription purchase');
//     return;
//   }
  
//   console.log("User authenticated, attempting to navigate to:", `/subscription-payment?plan=${plan.id}`);
//   // If user is authenticated, redirect to payment page with plan ID
//   navigate(`/subscription-payment?plan=${plan.id}`);
// };
  
//   // Check for redirected login
//   useEffect(() => {
//     // Check if user just logged in and has a selected plan
//     if (isAuthenticated) {
//       const selectedPlan = localStorage.getItem('selectedPlan');
//       if (selectedPlan) {
//         // Clear the stored plan
//         localStorage.removeItem('selectedPlan');
        
//         // Find the plan and proceed with purchase
//         const plan = plans.find(p => p.id === selectedPlan);
//         if (plan) {
//           // Show a welcome message
//           toast.success('Login successful! Continuing with your subscription purchase.');
          
//           // Continue with purchase after a short delay
//           setTimeout(() => {
//             handleSubscriptionSelect(plan);
//           }, 1000);
//         }
//       }
//     }
//   }, [isAuthenticated]);
  
//   // Helper to format prices in INR
//   const formatPrice = (price) => {
//     if (price === 0) return 'Free';
//     return `₹${price}`;
//   };
  
//   return (
//     <section className="py-20 bg-light">
//       <div className="container mx-auto px-4">
//         {/* Section header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-sans text-dark mb-4">Simple, Transparent Pricing</h2>
//           <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
//             Choose the perfect plan for your storytelling needs. No hidden fees.
//           </p>
          
//           {/* Toggle switch - commented out as in original code */}
//           {/* <div className="flex items-center justify-center mb-8">
//             <span className={`mr-3 text-lg ${!isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>Monthly</span>
//             <div 
//               onClick={() => setIsAnnual(!isAnnual)} 
//               className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
//             >
//               <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`}></div>
//             </div>
//             <span className={`ml-3 text-lg ${isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>
//               Annual <span className="text-primary-500 font-bold text-sm">Save 20%</span>
//             </span>
//           </div> */}
//         </div>
        
//         {/* Current subscription info, if logged in */}
//         {isAuthenticated && userData?.subscription && (
//           <div className="bg-white rounded-xl shadow-md p-6 mb-10 max-w-3xl mx-auto">
//             <h3 className="text-xl font-bold text-dark mb-2">Your Current Subscription</h3>
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <p className="text-gray-600">
//                   You're currently on the <span className="font-bold text-primary-500">{userData.subscription.tier.charAt(0).toUpperCase() + userData.subscription.tier.slice(1)}</span> plan
//                 </p>
//                 {userData.subscription.expiryDate && (
//                   <p className="text-sm text-gray-500">
//                     Expires on: {new Date(userData.subscription.expiryDate).toLocaleDateString()}
//                   </p>
//                 )}
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="bg-primary-50 px-3 py-1 rounded-full">
//                   <span className="text-primary-500 font-medium">
//                     {userData.tokens?.balance || 0} / {userData.tokens?.maxBalance || 20} tokens
//                   </span>
//                 </div>
//                 <button 
//                   onClick={() => navigate('/profile?tab=subscription')}
//                   className="text-primary-500 hover:text-primary-600 text-sm font-medium"
//                 >
//                   Manage Subscription
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Pricing cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {plans.map((plan, index) => (
//             <div 
//               key={index} 
//               className={`rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative ${plan.popular ? 'transform scale-105 z-10' : ''}`}
//             >
//               {/* Popular badge */}
//               {plan.popular && (
//                 <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
//                   MOST POPULAR
//                 </div>
//               )}
              
//               {/* Current plan badge */}
//               {isAuthenticated && userData?.subscription?.tier === plan.id && (
//                 <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
//                   CURRENT PLAN
//                 </div>
//               )}
              
//               <div className={`p-6 ${plan.popular ? 'bg-primary-500 text-white' : 'bg-white'}`}>
//                 <h3 className="text-2xl font-sans mb-1">{plan.name}</h3>
//                 <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>{plan.description}</p>
//                 <div className="flex items-baseline mb-6">
//                   <span className="text-4xl font-bold">
//                     {formatPrice(plan.monthlyPrice)}
//                   </span>
//                   {plan.monthlyPrice > 0 && (
//                     <span className={`text-sm ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
//                       /month
//                     </span>
//                   )}
//                 </div>
//                 <div className={`mb-4 text-center py-2 px-3 rounded-lg ${
//                   plan.popular ? 'bg-white/20' : 'bg-primary-100'
//                 }`}>
//                   <span className={`font-bold ${plan.popular ? 'text-white' : 'text-primary-500'}`}>
//                     {plan.initialTokens} tokens
//                   </span>
//                   <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
//                     {' '}(~{Math.floor(plan.initialTokens/7)} stories)
//                   </span>
//                 </div>
//                 <button 
//                   onClick={() => handleSubscriptionSelect(plan)}
//                   disabled={isLoading || processingPlan !== null || (plan.id === 'free')}
//                   className={`w-full py-3 rounded-full font-bold transition-all ${
//                     plan.popular 
//                       ? 'bg-accent text-dark hover:bg-accent/90' 
//                       : 'bg-primary-500 text-white hover:bg-primary-600'
//                   } ${
//                     (isLoading || processingPlan !== null) ? 'opacity-70 cursor-not-allowed' : ''
//                   } ${
//                     (plan.id === 'free') ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {processingPlan === plan.id ? 'Processing...' : 
//                    plan.id === 'free' ? 'Current Free Tier' : 
//                    (isAuthenticated && userData?.subscription?.tier === plan.id) ? 'Renew Plan' : plan.cta}
//                 </button>
//               </div>
              
//               <div className="bg-white p-6">
//                 <p className="font-medium text-dark mb-4">Plan includes:</p>
//                 <ul className="space-y-3">
//                   {plan.features.map((feature, i) => (
//                     <li key={i} className="flex items-start">
//                       {feature.included ? (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                         </svg>
//                       ) : (
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                       )}
//                       <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
//                         {feature.text}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* FAQ section - as per original */}
//         <div className="mt-20">
//           <h3 className="text-2xl md:text-3xl font-sans text-dark text-center mb-8">Frequently Asked Questions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">How does the token system work?</h4>
//               <p className="text-gray-600">
//                 Our platform uses a token system for storybook creation. Every new user receives 10 tokens upon registration. Creating a story requires 5 tokens, and saving it costs an additional 2 tokens. Different subscription tiers have different token limits: Free (20 max), Basic (50 max), and Premium (100 max). Your token balance is displayed at the top of your dashboard for easy tracking.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">What happens if I run out of tokens?</h4>
//               <p className="text-gray-600">
//                 If you run out of tokens, you can subscribe to get more tokens immediately. Basic subscribers receive 40 tokens and Premium subscribers receive 80 tokens upon subscription. You can also renew your current subscription early or upgrade to a higher tier to receive a fresh allocation of tokens. Your dashboard will alert you when your tokens are running low.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">Do unused tokens expire? What happens during tier changes?</h4>
//               <p className="text-gray-600">
//                 Tokens never expire as long as your account is active, and unused tokens always carry over when you renew your subscription. When upgrading to a higher tier, you'll receive the full token amount for that tier (40 for Basic, 80 for Premium) added to your existing balance. If your subscription expires or you downgrade, you keep your tokens up to the maximum allowed by your new tier.
//               </p>
//             </div>
//             <div className="bg-white p-6 rounded-xl shadow-md">
//               <h4 className="font-bold text-lg text-dark mb-2">How do subscription changes affect my tokens and billing period?</h4>
//               <p className="text-gray-600">
//                 When you change subscription tiers or renew early, your subscription period resets to a full month from the date of change. Upgrading to a higher tier gives you the full token amount for that tier (40 for Basic, 80 for Premium). Renewing the same tier also provides the full token amount. All changes take effect immediately, giving you instant access to your new tokens.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Pricing;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import useRazorpayCheckout from '../pages/useRazorpayCheckout.js';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [processingPlan, setProcessingPlan] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  // Get user authentication status and data from Redux
  const isAuthenticated = useSelector(state => state.auth.status);
  console.log(isAuthenticated)
  const userData = useSelector(state => state.auth.userData);
  
  const navigate = useNavigate();
  
  // Use the Razorpay custom hook
  const { isLoading, handlePayment } = useRazorpayCheckout();
  
  // Plans configuration with updated colors
  const plans = [
    {
      id: 'free',
      name: "Free",
      description: "Try out the basic features",
      monthlyPrice: 0,
      annualPrice: 0,
      initialTokens: 10,
      maxTokens: 10,
      cardBg: 'bg-fuchsia-100',
      buttonBg: 'bg-pink-500 hover:bg-pink-600',
      buttonText: 'text-white',
      accentColor: 'bg-pink-500',
      textColor: 'text-blue-900',
      features: [
        { text: "10 initial tokens (1-2 stories)", included: true },
        { text: "Max token balance: 10 tokens", included: true },
        { text: "Basic story themes", included: true },
        { text: "Standard illustrations", included: true },
        { text: "PDF downloads", included: true },
        { text: "Premium story themes", included: false },
        { text: "Commercial usage rights", included: false },
        { text: "Priority generation", included: false }
      ],
      cta: "Start Free",
      popular: false
    },
    {
      id: 'basic',
      name: "Basic",
      description: "Perfect for regular creators",
      monthlyPrice: 300,
      annualPrice: 7.99,
      initialTokens: 40,
      maxTokens: 50,
      cardBg: 'bg-fuchsia-300',
      buttonBg: 'bg-fuchsia-500 hover:bg-fuchsia-700',
      buttonText: 'text-white',
      accentColor: 'bg-white/20',
      textColor: 'text-blue-900',
      features: [
        { text: "40 tokens upon subscription", included: true },
        { text: "Max token balance: 50 tokens", included: true },
        { text: "All story themes", included: true },
        { text: "High-quality illustrations", included: true },
        { text: "PDF and digital exports", included: true },
        { text: "Priority support", included: true },
        { text: "Story editing tools", included: true },
        { text: "Commercial usage rights", included: false }
      ],
      cta: "Get Basic",
      popular: true
    },
    {
      id: 'premium',
      name: "Premium",
      description: "For serious storytellers",
      monthlyPrice: 800,
      annualPrice: 15.99,
      initialTokens: 80,
      maxTokens: 100,
      cardBg: 'bg-fuchsia-600',
      buttonBg: 'bg-fuchsia-500 hover:bg-fuchsia-800',
      buttonText: 'text-gray-100',
      accentColor: 'bg-pink-600',
      textColor: 'text-gray-100',
      features: [
        { text: "80 tokens upon subscription", included: true },
        { text: "Max token balance: 100 tokens", included: true },
        { text: "Everything in Basic", included: true },
        { text: "Premium illustrations", included: true },
        { text: "Commercial usage rights", included: true },
        { text: "Priority generation", included: true },
        { text: "Advanced story options", included: true },
        { text: "Exclusive story themes", included: true }
      ],
      cta: "Get Premium",
      popular: false
    }
  ];
  
  // Handle subscription plan selection
  const handleSubscriptionSelect = (plan) => {
    console.log("Button clicked for plan:", plan.id);
    
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      // Store the selected plan in localStorage to redirect back after login
      localStorage.setItem('selectedPlan', plan.id);
      
      // Redirect to login page with redirectUrl
      navigate('/login?redirectUrl=/pricing');
      toast.error('Please log in to continue with subscription purchase');
      return;
    }
    
    console.log("User authenticated, attempting to navigate to:", `/subscription-payment?plan=${plan.id}`);
    // If user is authenticated, redirect to payment page with plan ID
    navigate(`/subscription-payment?plan=${plan.id}`);
  };
  
  // Check for redirected login
  useEffect(() => {
    // Check if user just logged in and has a selected plan
    if (isAuthenticated) {
      const selectedPlan = localStorage.getItem('selectedPlan');
      if (selectedPlan) {
        // Clear the stored plan
        localStorage.removeItem('selectedPlan');
        
        // Find the plan and proceed with purchase
        const plan = plans.find(p => p.id === selectedPlan);
        if (plan) {
          // Show a welcome message
          toast.success('Login successful! Continuing with your subscription purchase.');
          
          // Continue with purchase after a short delay
          setTimeout(() => {
            handleSubscriptionSelect(plan);
          }, 1000);
        }
      }
    }
  }, [isAuthenticated]);
  
  // Helper to format prices in INR
  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `₹${price}`;
  };
  
  // FAQ data
  const faqData = [
    {
      question: "How does the token system work?",
      answer: "Our platform uses a token system for storybook creation. Every new user receives 10 tokens upon registration. Creating a story requires 5 tokens, and saving it costs an additional 2 tokens. Different subscription tiers have different token limits: Free (10 max), Basic (50 max), and Premium (100 max). Your token balance is displayed at the top of your dashboard for easy tracking."
    },
    {
      question: "What happens if I run out of tokens?",
      answer: "If you run out of tokens, you can subscribe to get more tokens immediately. Basic subscribers receive 40 tokens and Premium subscribers receive 80 tokens upon subscription. You can also renew your current subscription early or upgrade to a higher tier to receive a fresh allocation of tokens. Your dashboard will alert you when your tokens are running low."
    },
    {
      question: "Do unused tokens expire? What happens during tier changes?",
      answer: "Tokens never expire as long as your account is active, and unused tokens always carry over when you renew your subscription. When upgrading to a higher tier, you'll receive the full token amount for that tier (40 for Basic, 80 for Premium) added to your existing balance. If your subscription expires or you downgrade, you keep your tokens up to the maximum allowed by your new tier."
    },
    {
      question: "How do subscription changes affect my tokens and billing period?",
      answer: "When you change subscription tiers or renew early, your subscription period resets to a full month from the date of change. Upgrading to a higher tier gives you the full token amount for that tier (40 for Basic, 80 for Premium). Renewing the same tier also provides the full token amount. All changes take effect immediately, giving you instant access to your new tokens."
    }
  ];
  
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans text-gray-800 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
            Choose the perfect plan for your storytelling needs. No hidden fees.
          </p>
        </div>
        
        {/* Current subscription info, if logged in */}
        {isAuthenticated && userData?.subscription && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-10 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Current Subscription</h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-gray-600">
                  You're currently on the <span className="font-bold text-fuchsia-500">{userData.subscription.tier.charAt(0).toUpperCase() + userData.subscription.tier.slice(1)}</span> plan
                </p>
                {userData.subscription.expiryDate && (
                  <p className="text-sm text-gray-500">
                    Expires on: {new Date(userData.subscription.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-pink-100 px-3 py-1 rounded-full">
                  <span className="text-pink-600 font-medium">
                    {userData.tokens?.balance || 0} / {userData.tokens?.maxBalance || 20} tokens
                  </span>
                </div>
                <button 
                  onClick={() => navigate('/profile?tab=subscription')}
                  className="text-fuchsia-500 hover:text-fuchsia-600 text-sm font-medium"
                >
                  Manage Subscription
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:-translate-y-2 relative ${plan.popular ? 'transform scale-105 z-10' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              {/* Current plan badge */}
              {isAuthenticated && userData?.subscription?.tier === plan.id && (
                <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                  CURRENT PLAN
                </div>
              )}
              
              <div className={`p-6 ${plan.cardBg} ${plan.textColor}`}>
                <h3 className="text-2xl font-sans  font-semibold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-900' : 'opacity-75'}`}>{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.monthlyPrice)}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className={`text-sm ml-2 text-shadow-2xs ${plan.popular ? 'text-blue-900' : 'opacity-75'}`}>
                      /month
                    </span>
                  )}
                </div>
                <div className={`mb-4 text-center py-2 px-3 rounded-lg ${
                  plan.popular ? plan.accentColor : 'bg-white/50'
                }`}>
                  <span className="font-bold">
                    {plan.initialTokens} tokens
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-blue-900' : 'opacity-100'}`}>
                    {' '}(~{Math.floor(plan.initialTokens/7)} stories)
                  </span>
                </div>
                <button 
                  onClick={() => handleSubscriptionSelect(plan)}
                  disabled={isLoading || processingPlan !== null || (plan.id === 'free')}
                  className={`w-full py-3 rounded-full font-bold transition-all ${
                    plan.buttonBg
                  } ${
                    plan.buttonText
                  } ${
                    (isLoading || processingPlan !== null) ? 'opacity-70 cursor-not-allowed' : ''
                  } ${
                    (plan.id === 'free') ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {processingPlan === plan.id ? 'Processing...' : 
                   plan.id === 'free' ? 'Current Free Tier' : 
                   (isAuthenticated && userData?.subscription?.tier === plan.id) ? 'Renew Plan' : plan.cta}
                </button>
              </div>
              
              <div className="bg-white p-6">
                <p className="font-medium text-gray-800 mb-4">Plan includes:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQ section - now as dropdown */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-sans text-gray-800 text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {/* {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center ${openIndex === index ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'bg-white text-dark'}` hover:bg-gradient-primary transition-colors"
                >
                  <h4 className="font-bold text-lg text-gray-800">{faq.question}</h4>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-fuchsia-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'py-4 max-h-64' : 'max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))} */}
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className={`w-full px-6 py-4 text-left flex justify-between items-center ${openFAQ === index ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'bg-white text-dark'} transition-colors`}
                >
                  <h4 className={`font-semibold text-lg ${openFAQ === index ? 'text-dark' : 'text-dark'}`}>{faq.question}</h4>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${openFAQ === index ? 'text-white' : 'text-fuchsia-500'} transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'py-4 max-h-64' : 'max-h-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;