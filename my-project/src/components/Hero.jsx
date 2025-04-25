// Hero.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [characterColor, setCharacterColor] = useState('#FFCB2B'); // Default yellow
  
  const handleColorChange = (color) => {
    setCharacterColor(color);
  };
  
  return (
    <section className="relative min-h-screen bg-gradient-primary overflow-hidden pt-16">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 rounded-full bg-white/10 top-[10%] left-[10%] animate-float"/>
        <div className="absolute w-20 h-20 rounded-full bg-white/10 top-[20%] right-[15%] animate-float animation-delay-1000"/>
        <div className="absolute w-32 h-32 rounded-full bg-white/10 bottom-[20%] left-[20%] animate-float animation-delay-2000"/>
        <div className="absolute w-16 h-16 rounded-full bg-white/10 bottom-[15%] right-[25%] animate-float animation-delay-3000"/>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text content */}
        <div className="w-full md:w-1/2 text-white mb-12 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-chewy leading-tight mb-6 text-white drop-shadow-[3px_3px_0px_rgba(61,29,140,1)]">
            Transform Your Portrait into an Animated Cartoon Character!
          </h1>
          
          <p className="text-xl mb-8">
            Upload your photo and watch AI magic turn you into a lively, animated cartoon character in minutes - no design experience needed!
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-dark font-bold">✓</span>
              </div>
              <span>Photo-to-cartoon transformation powered by Leonardo AI</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-dark font-bold">✓</span>
              </div>
              <span>Lifelike animations created with Kling AI technology</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-dark font-bold">✓</span>
              </div>
              <span>Multiple animation styles and export formats (GIF, MP4, WebM)</span>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-dark font-bold">✓</span>
              </div>
              <span>Perfect for social media, presentations, and content creation</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-accent px-8 py-4 rounded-full text-lg font-chewy text-dark shadow-button hover:-translate-y-1 transform transition duration-200">
              Create Your Character - Free Trial
            </button>
            
            <Link to="/demo" className="flex items-center gap-2 text-white hover:underline">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7L0 14V0L12 7Z" fill="#3D1D8C"/>
                </svg>
              </div>
              See it in Action
            </Link>
          </div>
        </div>
        
        {/* Visual content - keeping the visual characters as placeholders for now */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[550px] relative">
          <div className="relative w-full h-full">
            {/* Character 1 (Main) */}
            <div className="absolute w-[200px] h-[200px] rounded-full top-[20%] right-[30%] z-30 animate-bounce animation-delay-500" 
                style={{ backgroundColor: characterColor }}>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white rounded-full flex flex-col items-center justify-center">
                <div className="flex gap-5 mb-2">
                  <div className="w-5 h-5 rounded-full bg-dark"></div>
                  <div className="w-5 h-5 rounded-full bg-dark"></div>
                </div>
                <div className="w-10 h-5 bg-dark rounded-b-full"></div>
              </div>
            </div>
            
            {/* Character 2 */}
            <div className="absolute w-[150px] h-[150px] rounded-full bg-accent2 top-[50%] right-[10%] z-20 animate-bounce animation-delay-1000">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white rounded-full flex flex-col items-center justify-center">
                <div className="flex gap-4 mb-2">
                  <div className="w-4 h-4 rounded-full bg-dark"></div>
                  <div className="w-4 h-4 rounded-full bg-dark"></div>
                </div>
                <div className="w-8 h-4 bg-dark rounded-b-full"></div>
              </div>
            </div>
            
            {/* Character 3 */}
            <div className="absolute w-[180px] h-[180px] rounded-full bg-primary-500 top-[10%] right-0 z-10 animate-bounce animation-delay-1500">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white rounded-full flex flex-col items-center justify-center">
                <div className="flex gap-5 mb-2">
                  <div className="w-4 h-4 rounded-full bg-dark"></div>
                  <div className="w-4 h-4 rounded-full bg-dark"></div>
                </div>
                <div className="w-10 h-4 bg-dark rounded-b-full"></div>
              </div>
            </div>
            
            {/* Customizer label - updated to be more relevant */}
            <div className="absolute bottom-0 right-[10%] md:right-[20%] bg-white/20 backdrop-blur-md rounded-2xl p-4 z-40">
              <h3 className="font-chewy text-xl text-white text-center mb-3">Choose Your Style!</h3>
              <div className="flex justify-center gap-3">
                <button 
                  className="w-8 h-8 rounded-full bg-secondary-500 border-2 border-white focus:ring-2 focus:ring-white"
                  onClick={() => handleColorChange('#5D4DFF')}
                ></button>
                <button 
                  className="w-8 h-8 rounded-full bg-primary-500 border-2 border-white focus:ring-2 focus:ring-white"
                  onClick={() => handleColorChange('#FF47DA')}
                ></button>
                <button 
                  className="w-8 h-8 rounded-full bg-accent border-2 border-white focus:ring-2 focus:ring-white"
                  onClick={() => handleColorChange('#FFCB2B')}
                ></button>
                <button 
                  className="w-8 h-8 rounded-full bg-accent2 border-2 border-white focus:ring-2 focus:ring-white"
                  onClick={() => handleColorChange('#27EEC8')}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;