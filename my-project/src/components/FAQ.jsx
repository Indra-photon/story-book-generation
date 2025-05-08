// // FAQ.jsx
// import React, { useState } from 'react';

// const FAQ = () => {
//   const [openIndex, setOpenIndex] = useState(0);
  
//   const toggleQuestion = (index) => {
//     setOpenIndex(openIndex === index ? -1 : index);
//   };
  
//   const faqs = [
//     {
//       question: "How does the portrait-to-cartoon transformation work?",
//       answer: "Our technology uses Leonardo AI to analyze your portrait photo, identify facial features, and transform them into a stylized cartoon character while preserving your unique characteristics. The AI has been trained on thousands of portrait-to-cartoon transformations to create accurate and appealing results."
//     },
//     {
//       question: "What type of photos work best?",
//       answer: "Clear, front-facing portraits with good lighting produce the best results. We recommend using photos where your face is clearly visible without obstructions like sunglasses or hats. Both professional photos and selfies work well as long as the lighting is decent and your face is in focus."
//     },
//     {
//       question: "Can I customize my cartoon character?",
//       answer: "Yes! After the initial transformation, you can customize various aspects of your character including style (cute, anime, comic, pixel), colors, facial expressions, and more. Pro and Business plans offer additional customization options like accessories, backgrounds, and custom color palettes."
//     },
//     {
//       question: "What animation options are available?",
//       answer: "Our platform offers a variety of animations powered by Kling AI, including waving, talking, jumping, dancing, and more. Premium plans include advanced animations like lip-syncing to audio, custom movement sequences, and interactive animations that respond to viewer actions."
//     },
//     {
//       question: "Can I use my animated character for commercial purposes?",
//       answer: "Yes, with our Pro and Business plans, you receive full commercial usage rights to your animated characters. You can use them for marketing, social media, content creation, presentations, and more. The Free plan is limited to personal use only."
//     },
//     {
//       question: "Is my portrait data secure?",
//       answer: "We take your privacy seriously. Your portrait photos are encrypted in transit and at rest, only used for the transformation process, and never shared with third parties. You can request deletion of your original photos at any time while keeping your cartoon characters."
//     },
//     {
//       question: "What file formats can I export my animations in?",
//       answer: "The Free plan allows GIF exports only. Pro and Business plans support multiple formats including GIF, MP4, WebM, and transparent PNG sequences. Business plan users can also access lossless quality exports and custom format options."
//     },
//     {
//       question: "How many team members can use a Business account?",
//       answer: "The standard Business plan includes 5 team member accounts with separate logins but shared billing. Each team member can create their own characters and animations. Additional team member seats can be added for a per-user monthly fee."
//     }
//   ];
  
//   return (
//     <section className="py-20 bg-light">
//       <div className="container mx-auto px-4">
//         {/* Section header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4">Frequently Asked Questions</h2>
//           <p className="text-xl max-w-3xl mx-auto text-gray-600">
//             Everything you need to know about our service
//           </p>
//         </div>
        
//         {/* FAQ Accordion */}
//         <div className="max-w-3xl mx-auto">
//           {faqs.map((faq, index) => (
//             <div 
//               key={index}
//               className={`mb-4 rounded-xl overflow-hidden ${openIndex === index ? 'shadow-lg' : 'shadow'}`}
//             >
//               <button
//                 className={`w-full p-5 text-left flex justify-between items-center ${openIndex === index ? 'bg-primary-500 text-white' : 'bg-white text-dark'}`}
//                 onClick={() => toggleQuestion(index)}
//               >
//                 <span className="font-bold">{faq.question}</span>
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className={`h-5 w-5 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
              
//               <div 
//                 className={`overflow-hidden transition-all duration-300 bg-white ${
//                   openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                 }`}
//               >
//                 <div className="p-5 text-gray-600">
//                   {faq.answer}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Still have questions */}
//         <div className="mt-16 text-center">
//           <h3 className="text-2xl font-chewy text-dark mb-4">Still Have Questions?</h3>
//           <p className="text-gray-600 mb-6">
//             We're here to help! Get in touch with our support team.
//           </p>
//           <button className="px-8 py-3 bg-secondary-500 text-white font-bold rounded-full hover:-translate-y-1 transform transition duration-200">
//             Contact Support
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQ;

// FAQ.jsx
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  
  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  const faqs = [
    {
      question: "How does the AI storybook creation process work?",
      answer: "Our technology uses advanced AI to transform your child's photo into a cartoon character and place them at the center of a personalized storybook. You simply upload a photo, choose a story theme, add your child's name and preferences, and our AI creates a unique storybook featuring your child as the main character. Each page includes vibrant illustrations and engaging text tailored to your selections."
    },
    {
      question: "What makes these storybooks personalized?",
      answer: "Our storybooks are truly personalized in multiple ways. Your child's name appears throughout the story, and their cartoon character (based on their photo) is featured as the main character. You can also customize story elements like favorite colors, animals, hobbies, and friends' names. The storylines adapt based on your child's age to ensure appropriate content and reading level."
    },
    {
      question: "What types of photos work best for creating the character?",
      answer: "Clear, front-facing photos with good lighting produce the best results. We recommend using photos where your child's face is clearly visible without obstructions like sunglasses or hats. Both professional photos and everyday snapshots work well as long as the lighting is decent and your child's face is in focus. Group photos aren't recommended—use a photo with just your child for best results."
    },
    {
      question: "What story themes are available?",
      answer: "We offer a variety of magical themes including space adventures, underwater explorations, fairy tale kingdoms, dinosaur safaris, superhero missions, and enchanted forests. We regularly add new themes based on popular children's interests and seasonal occasions. Premium users get early access to our newest story themes and exclusive limited-edition stories."
    },
    {
      question: "Can I edit the story after it's generated?",
      answer: "Absolutely! Our intuitive editor allows you to modify both text and visual elements after generation. You can change character names, adjust story details, modify scenes, and even rearrange pages. All changes appear in real-time preview, so you can perfect your storybook before finalizing it. Your drafts are automatically saved, allowing you to return and continue editing anytime."
    },
    {
      question: "What formats can I get my storybook in?",
      answer: "All users can download their storybooks as high-quality PDF files perfect for home printing or digital reading on tablets. Premium users can also order professional printed hardcover or softcover books delivered directly to their door. These printed versions feature premium paper quality, vibrant colors, and durable binding to create a keepsake that lasts for years."
    },
    {
      question: "Is my child's photo and data secure?",
      answer: "We take your privacy extremely seriously, especially when it comes to children's data. Photos are encrypted in transit and at rest, used only for storybook creation, and never shared with third parties. We automatically delete original photos after 30 days, though the cartoon versions remain in your account. Our service is fully COPPA-compliant for children's online privacy protection."
    },
    {
      question: "How long does it take to create a storybook?",
      answer: "The initial AI generation typically takes 2-3 minutes to transform your child's photo and generate the personalized story. You can then spend as much time as you like editing and perfecting your storybook. Once finalized, digital PDFs are available for immediate download. If you order printed copies, production takes 2-3 business days plus shipping time, with options for expedited delivery."
    }
  ];
  
  return (
    <section className="py-20 bg-accent/10 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-300/20 rounded-full -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold mb-6 border-2 border-primary-100">
            <HelpCircle size={16} className="inline-block mr-2 text-primary-500" />
            Common Questions
          </div>
          
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4 drop-shadow-[2px_2px_0px_rgba(61,29,140,0.3)]">
            Frequently Asked Questions
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Everything you need to know about creating magical storybooks for your little ones
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`mb-5 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-lg transform -translate-y-1' : 'shadow hover:-translate-y-1'}`}
            >
              <button
                className={`w-full p-5 text-left flex justify-between items-center ${openIndex === index ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'bg-white text-dark'}`}
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-bold pr-8">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 ${openIndex === index ? 'bg-white' : 'bg-light'} flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${openIndex === index ? 'text-primary-500' : 'text-secondary-500'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
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
        
        {/* Book-themed CTA */}
        <div className="mt-16 bg-white rounded-2xl p-8 max-w-3xl mx-auto shadow-xl border border-primary-100 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-accent/20 rounded-full"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-primary-300/10 rounded-full"></div>
          
          <div className="relative text-center">
            <h3 className="text-2xl md:text-3xl font-chewy text-dark mb-4">Have More Questions?</h3>
            
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Our friendly support team is ready to help you create the perfect storybook for your child. Get in touch anytime!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full shadow-button hover:-translate-y-1 transform transition duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </button>
              
              <button className="px-8 py-3 border-2 border-secondary-500 text-secondary-500 font-bold rounded-full hover:bg-secondary-500 hover:text-white hover:-translate-y-1 transform transition duration-200 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;