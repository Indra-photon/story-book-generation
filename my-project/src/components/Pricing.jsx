import React, { useState } from 'react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: "Free",
      description: "Try out the basic features",
      monthlyPrice: 0,
      annualPrice: 0,
      tokenAmount: 10,
      features: [
        { text: "10 tokens (2 stories)", included: true },
        { text: "Basic story themes", included: true },
        { text: "Standard illustrations", included: true },
        { text: "Story sharing", included: true },
        { text: "Community support", included: true },
        { text: "Premium story themes", included: false },
        { text: "High-quality illustrations", included: false },
        { text: "Commercial usage rights", included: false }
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      description: "Perfect for regular creators",
      monthlyPrice: 12.99,
      annualPrice: 9.99,
      tokenAmount: 50,
      features: [
        { text: "50 tokens (10 stories) monthly", included: true },
        { text: "All story themes", included: true },
        { text: "High-quality illustrations", included: true },
        { text: "Customizable characters", included: true },
        { text: "Priority support", included: true },
        { text: "Commercial usage rights", included: true },
        { text: "Story editing tools", included: true },
        { text: "API access", included: false }
      ],
      cta: "Get Pro",
      popular: true
    },
    {
      name: "Business",
      description: "For teams and businesses",
      monthlyPrice: 29.99,
      annualPrice: 24.99,
      tokenAmount: 200,
      features: [
        { text: "200 tokens (40 stories) monthly", included: true },
        { text: "Everything in Pro", included: true },
        { text: "5 team member accounts", included: true },
        { text: "API access", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom branding options", included: true },
        { text: "Advanced analytics", included: true },
        { text: "White-label solutions", included: true }
      ],
      cta: "Get Business",
      popular: false
    }
  ];
  
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 mb-8">
            Choose the perfect plan for your storytelling needs. No hidden fees.
          </p>
          
          {/* Toggle switch */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-lg ${!isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>Monthly</span>
            <div 
              onClick={() => setIsAnnual(!isAnnual)} 
              className="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
            >
              <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : ''}`}></div>
            </div>
            <span className={`ml-3 text-lg ${isAnnual ? 'font-bold text-dark' : 'text-gray-500'}`}>
              Annual <span className="text-primary-500 font-bold text-sm">Save 20%</span>
            </span>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 relative ${plan.popular ? 'transform scale-105 z-10' : ''}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-dark text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? 'bg-primary-500 text-white' : 'bg-white'}`}>
                <h3 className="text-2xl font-chewy mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>{plan.description}</p>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-sm ml-2 ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    /month
                  </span>
                </div>
                <div className={`mb-4 text-center py-2 px-3 rounded-lg ${
                  plan.popular ? 'bg-white/20' : 'bg-primary-100'
                }`}>
                  <span className={`font-bold ${plan.popular ? 'text-white' : 'text-primary-500'}`}>
                    {plan.tokenAmount} tokens
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                    {' '}(~{Math.floor(plan.tokenAmount/5)} stories)
                  </span>
                </div>
                <button className={`w-full py-3 rounded-full font-bold transition-all ${
                  plan.popular 
                    ? 'bg-accent text-dark hover:bg-accent/90' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}>
                  {plan.cta}
                </button>
              </div>
              
              <div className="bg-white p-6">
                <p className="font-medium text-dark mb-4">Plan includes:</p>
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
        
        {/* Token purchase callout */}
        <div className="mt-16 bg-gray-100 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-chewy text-dark mb-2">Need additional tokens?</h3>
              <p className="text-gray-600">
                Purchase token packs anytime to create more stories without changing your subscription.
              </p>
            </div>
            <button className="px-6 py-3 bg-dark text-white font-bold rounded-full hover:-translate-y-1 transform transition duration-200">
              Buy Tokens
            </button>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-chewy text-dark text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-lg text-dark mb-2">How do tokens work?</h4>
              <p className="text-gray-600">
                Each story generation costs 5 tokens. Free accounts start with 10 tokens. Paid subscriptions receive a monthly token allocation on their billing date.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-lg text-dark mb-2">Do unused tokens expire?</h4>
              <p className="text-gray-600">
                Tokens remain in your account until used, up to your plan's maximum token balance. Monthly allocations are added as long as your subscription is active.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-lg text-dark mb-2">Do I own the stories I create?</h4>
              <p className="text-gray-600">
                Yes, you retain full ownership of all stories created on our platform. Pro and Business subscribers also receive commercial usage rights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="font-bold text-lg text-dark mb-2">Can I change plans later?</h4>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;