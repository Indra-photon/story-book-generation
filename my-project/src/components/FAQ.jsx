// FAQ.jsx
import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  const faqs = [
    {
      question: "How does the portrait-to-cartoon transformation work?",
      answer: "Our technology uses Leonardo AI to analyze your portrait photo, identify facial features, and transform them into a stylized cartoon character while preserving your unique characteristics. The AI has been trained on thousands of portrait-to-cartoon transformations to create accurate and appealing results."
    },
    {
      question: "What type of photos work best?",
      answer: "Clear, front-facing portraits with good lighting produce the best results. We recommend using photos where your face is clearly visible without obstructions like sunglasses or hats. Both professional photos and selfies work well as long as the lighting is decent and your face is in focus."
    },
    {
      question: "Can I customize my cartoon character?",
      answer: "Yes! After the initial transformation, you can customize various aspects of your character including style (cute, anime, comic, pixel), colors, facial expressions, and more. Pro and Business plans offer additional customization options like accessories, backgrounds, and custom color palettes."
    },
    {
      question: "What animation options are available?",
      answer: "Our platform offers a variety of animations powered by Kling AI, including waving, talking, jumping, dancing, and more. Premium plans include advanced animations like lip-syncing to audio, custom movement sequences, and interactive animations that respond to viewer actions."
    },
    {
      question: "Can I use my animated character for commercial purposes?",
      answer: "Yes, with our Pro and Business plans, you receive full commercial usage rights to your animated characters. You can use them for marketing, social media, content creation, presentations, and more. The Free plan is limited to personal use only."
    },
    {
      question: "Is my portrait data secure?",
      answer: "We take your privacy seriously. Your portrait photos are encrypted in transit and at rest, only used for the transformation process, and never shared with third parties. You can request deletion of your original photos at any time while keeping your cartoon characters."
    },
    {
      question: "What file formats can I export my animations in?",
      answer: "The Free plan allows GIF exports only. Pro and Business plans support multiple formats including GIF, MP4, WebM, and transparent PNG sequences. Business plan users can also access lossless quality exports and custom format options."
    },
    {
      question: "How many team members can use a Business account?",
      answer: "The standard Business plan includes 5 team member accounts with separate logins but shared billing. Each team member can create their own characters and animations. Additional team member seats can be added for a per-user monthly fee."
    }
  ];
  
  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Everything you need to know about our service
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`mb-4 rounded-xl overflow-hidden ${openIndex === index ? 'shadow-lg' : 'shadow'}`}
            >
              <button
                className={`w-full p-5 text-left flex justify-between items-center ${openIndex === index ? 'bg-primary-500 text-white' : 'bg-white text-dark'}`}
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-bold">{faq.question}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 bg-white ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 text-gray-600">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Still have questions */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-chewy text-dark mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            We're here to help! Get in touch with our support team.
          </p>
          <button className="px-8 py-3 bg-secondary-500 text-white font-bold rounded-full hover:-translate-y-1 transform transition duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;