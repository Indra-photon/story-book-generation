// TryItNow.jsx
import React, { useState } from 'react';

const TryItNow = () => {
  const [selectedStyle, setSelectedStyle] = useState('cute');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };
  
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-chewy text-dark mb-4">Try It Before You Sign Up</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            See the magic in action with our interactive demo
          </p>
        </div>
        
        {/* Interactive demo */}
        <div className="bg-light rounded-3xl p-6 md:p-10 shadow-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left side - sample image */}
            <div className="flex flex-col items-center">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-chewy text-dark mb-2">Sample Portrait</h3>
                <p className="text-gray-600 text-sm">
                  Try different styles on our sample image or upload your own
                </p>
              </div>
              
              <div className="relative w-full max-w-xs mx-auto">
                {/* Original portrait - in production this would be a real image */}
                <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-md mb-4">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition mb-2">
                  Upload Your Photo
                </button>
                <p className="text-xs text-center text-gray-500">
                  *For demo purposes only. Your photo won't be saved.
                </p>
              </div>
            </div>
            
            {/* Right side - results and controls */}
            <div className="flex flex-col">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-chewy text-dark mb-2">See The Result</h3>
                <p className="text-gray-600 text-sm">
                  Customize your character with different styles and animations
                </p>
              </div>
              
              {/* Character preview */}
              <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-md mb-6">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div 
                    className={`w-40 h-40 rounded-full ${
                      selectedStyle === 'cute' ? 'bg-accent' : 
                      selectedStyle === 'anime' ? 'bg-primary-500' :
                      selectedStyle === 'comic' ? 'bg-secondary-500' : 'bg-accent2'
                    } ${isAnimating ? 'animate-bounce' : ''} transition-colors duration-500`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
                        <div className="flex gap-4 mb-2">
                          <div className="w-3 h-3 rounded-full bg-dark"></div>
                          <div className="w-3 h-3 rounded-full bg-dark"></div>
                        </div>
                        <div className="w-6 h-3 bg-dark rounded-b-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Controls */}
              <div className="bg-white rounded-xl p-4 shadow-md mb-6">
                <p className="font-medium text-dark mb-2">Select Style:</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <button 
                    onClick={() => handleStyleChange('cute')} 
                    className={`p-2 rounded-lg text-center text-xs font-medium transition ${
                      selectedStyle === 'cute' 
                        ? 'bg-accent text-dark' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cute
                  </button>
                  <button 
                    onClick={() => handleStyleChange('anime')} 
                    className={`p-2 rounded-lg text-center text-xs font-medium transition ${
                      selectedStyle === 'anime' 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Anime
                  </button>
                  <button 
                    onClick={() => handleStyleChange('comic')} 
                    className={`p-2 rounded-lg text-center text-xs font-medium transition ${
                      selectedStyle === 'comic' 
                        ? 'bg-secondary-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Comic
                  </button>
                  <button 
                    onClick={() => handleStyleChange('pixel')} 
                    className={`p-2 rounded-lg text-center text-xs font-medium transition ${
                      selectedStyle === 'pixel' 
                        ? 'bg-accent2 text-dark' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Pixel
                  </button>
                </div>
                
                <p className="font-medium text-dark mb-2">Animation:</p>
                <button 
                  onClick={toggleAnimation}
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    isAnimating 
                      ? 'bg-accent text-dark' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isAnimating ? 'Stop Animation' : 'Start Animation'}
                </button>
              </div>
              
              <div className="mt-auto">
                <button className="w-full py-3 bg-accent text-dark font-bold rounded-xl shadow-button hover:-translate-y-1 transform transition duration-200">
                  Create Your Own Character
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features highlight */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-dark mb-2">Instant Transformation</h3>
            <p className="text-gray-600">
              Our AI processes your portrait in seconds, no waiting around for results.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-dark mb-2">Multiple Styles</h3>
            <p className="text-gray-600">
              Choose from various cartoon styles to match your brand or personal preference.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-dark mb-2">Smooth Animations</h3>
            <p className="text-gray-600">
              Lifelike movements bring your character to life with our advanced animation technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryItNow;