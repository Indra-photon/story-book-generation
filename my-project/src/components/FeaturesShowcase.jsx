// FeaturesShowcase.jsx - Modified for Storybook Features
import React from 'react';
import { Sparkles, Palette, PenTool, Wand2, Edit, Download } from 'lucide-react';
import pic1 from '../../public/showcase4.jpg'
import { Link } from 'react-router-dom';

const FeaturesShowcase = () => {
  // Feature data with icons and details
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary-500" />,
      title: "Personalized Stories",
      description: "Include your child's name, appearance, and preferences to make them the hero of their own adventure.",
      benefits: [
        "Multiple story themes to choose from",
        "Custom character traits and preferences",
        "Age-appropriate narratives and adventures"
      ],
      color: "primary"
    },
    {
      icon: <Palette className="w-8 h-8 text-secondary-500" />,
      title: "Vibrant Illustrations",
      description: "Every page features stunning, colorful illustrations that bring the story to life and capture your child's imagination.",
      benefits: [
        "Bright, engaging color palettes",
        "Characters based on your child's appearance",
        "Dynamic scenes that enhance the storytelling"
      ],
      color: "secondary"
    },
    {
      icon: <PenTool className="w-8 h-8 text-accent" />,
      title: "Simple Story Creation",
      description: "Our intuitive interface makes crafting beautiful storybooks easy - no writing or design skills needed.",
      benefits: [
        "AI-powered story generation",
        "Pre-written templates to customize",
        "Simple drag-and-drop interface"
      ],
      color: "accent"
    },
    {
      icon: <Wand2 className="w-8 h-8 text-accent2" />,
      title: "Themed Storybooks",
      description: "Choose from a variety of exciting themes like space adventures, underwater journeys, fairy tales, and more.",
      benefits: [
        "Educational themes with learning opportunities",
        "Seasonal and holiday special themes",
        "Fantasy and adventure narratives"
      ],
      color: "accent2"
    },
    {
      icon: <Edit className="w-8 h-8 text-primary-500" />,
      title: "Easy Editing & Saving",
      description: "Make changes anytime, save multiple versions, and revisit your creations whenever you want.",
      benefits: [
        "Cloud storage for all your storybooks",
        "Real-time preview as you edit",
        "Share drafts with family before finalizing"
      ],
      color: "primary"
    },
    {
      icon: <Download className="w-8 h-8 text-secondary-500" />,
      title: "Multiple Formats",
      description: "Download your storybooks as digital PDFs or order professional printed copies delivered to your door.",
      benefits: [
        "High-quality print options",
        "Digital versions for tablets and e-readers",
        "Gift packaging available for printed books"
      ],
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-primary overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary-300/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-300/20 translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 right-20 w-20 h-20 rounded-full bg-accent/20"></div>
      <div className="absolute bottom-1/4 left-20 w-16 h-16 rounded-full bg-accent2/20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-lg font-bold mb-6 border-2 border-primary-100">
            <Sparkles size={16} className="inline-block mr-2 text-primary-500" />
            Magical Storybook Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4 drop-shadow-[2px_2px_0px_rgba(61,29,140,0.3)]">
            Create Enchanting Stories With Ease
          </h2>
          
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            Our platform makes it simple to create personalized, vibrant storybooks that will delight your child and become treasured keepsakes.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg p-6 transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-chewy text-dark mb-3">{feature.title}</h3>
              
              <p className="text-gray-600 mb-6">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="ml-2 text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Feature highlight - Visual showcase */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-primary-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-chewy text-dark mb-4">
                Watch Your Stories Come To Life
              </h3>
              
              <p className="text-gray-600 mb-6">
                Our magical storybooks blend your child's photos with vibrant illustrations to create a truly personalized reading experience. Each page is designed to engage, delight, and inspire young readers.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">1</div>
                  <span className="text-gray-700">Upload your child's photo</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white font-bold">2</div>
                  <span className="text-gray-700">Choose a story theme and personalize details</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark font-bold">3</div>
                  <span className="text-gray-700">Preview and edit your storybook</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent2 flex items-center justify-center text-dark font-bold">4</div>
                  <span className="text-gray-700">Download or order a printed copy</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Storybook preview with page flipping effect */}
              <div className="relative mx-auto w-full max-w-sm">
                {/* Book cover */}
                <div className="bg-primary-500 rounded-lg shadow-lg p-4 transform rotate-3 relative z-20">
                  <div className="bg-white rounded p-3">
                    <div className="aspect-[3/4] bg-gradient-to-br from-accent to-secondary-400 rounded relative overflow-hidden">
                      {/* Add cover image here as a background */}
                      <img 
                        src={pic1}// Replace with your actual cover image path
                        alt="Space Adventure Cover"
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                      />
                      
                      {/* Semi-transparent overlay to ensure text remains readable */}
                      <div className="absolute inset-0"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <h4 className="text-2xl font-chewy text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.3)] mb-2 z-10">
                          Emma's Space Adventure
                        </h4>
                        <p className="text-white text-sm font-medium drop-shadow-md">A personalized adventure</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Peeking page 1 */}
                <div className="absolute top-2 left-2 right-2 bg-white rounded-lg shadow-lg p-4 transform rotate-1 z-10">
                  <div className="aspect-[3/4] bg-light rounded relative overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <p className="text-xs text-gray-600 font-medium mb-2">Once upon a time...</p>
                    </div>
                  </div>
                </div>
                
                {/* Peeking page 2 */}
                <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 transform rotate-0 z-0">
                  <div className="aspect-[3/4] bg-light rounded"></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-chewy text-dark mb-6">Ready to Create a Magical Storybook?</h3>
          <Link to='/signup'>
            <button className="px-8 py-4 bg-accent text-dark font-chewy text-xl rounded-full shadow-button hover:-translate-y-1 transform transition duration-200">
              Start Creating Now
            </button>
          </Link>
          <p className="mt-4 text-white">No design skills needed — just bring your imagination!</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;