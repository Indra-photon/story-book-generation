// components/PathwaySelection.jsx
import React from 'react';
import { Book, User, ArrowRight } from 'lucide-react';

const PathwaySelection = ({ onSelectPathway }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-3xl font-chewy text-dark mb-6 text-center">Choose Your Creation Path</h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Select what you'd like to create today. You can build animated characters for yourself
        or create delightful animated stories for your kids.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Story Creation Option */}
        <div 
          className="bg-light rounded-xl p-6 border-2 border-transparent hover:border-primary-500 transition-all duration-300 cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
          onClick={() => onSelectPathway('story')}
        >
          <div className="h-52 flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-primary-100 absolute -top-6 -left-6"></div>
              <div className="w-40 h-40 rounded-full bg-accent/20 absolute -bottom-8 -right-8"></div>
              <div className="relative bg-white rounded-xl p-4 shadow-md w-48 h-48 flex items-center justify-center">
                <Book size={80} className="text-primary-500" />
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-chewy text-dark mb-3 text-center">
            Build Animated Stories
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Create interactive, animated stories with multiple characters and scenes. Perfect for bedtime stories or educational content for kids.
          </p>
          <button 
            className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onSelectPathway('story');
            }}
          >
            Create Story
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
        
        {/* Character Creation Option */}
        <div 
          className="bg-light rounded-xl p-6 border-2 border-transparent hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
          onClick={() => onSelectPathway('character')}
        >
          <div className="h-52 flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-accent/20 absolute -top-6 -right-6"></div>
              <div className="w-40 h-40 rounded-full bg-primary-100 absolute -bottom-8 -left-8"></div>
              <div className="relative bg-white rounded-xl p-4 shadow-md w-48 h-48 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center animate-pulse">
                  <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center">
                    <div className="flex gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full bg-dark"></div>
                      <div className="w-3 h-3 rounded-full bg-dark"></div>
                    </div>
                    <div className="w-6 h-3 bg-dark rounded-b-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-chewy text-dark mb-3 text-center">
            Build Fun Characters
          </h3>
          <p className="text-gray-600 text-center mb-6">
            Transform your portrait into an animated cartoon character with custom styles and animations. Perfect for social media, presentations, and more.
          </p>
          <button 
            className="w-full py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              onSelectPathway('character');
            }}
          >
            Create Character
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
      
      <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200 max-w-2xl mx-auto">
        <h4 className="font-bold text-dark flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Did you know?
        </h4>
        <p className="text-sm text-gray-600">
          Pro subscribers can create unlimited characters and stories, with access to exclusive animations, styles, and the ability to export in multiple formats.
        </p>
      </div>
    </div>
  );
};

export default PathwaySelection;