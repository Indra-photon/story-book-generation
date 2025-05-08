import React from 'react';
import { Book, UserPlus, ArrowRight, Clock } from 'lucide-react';
import pic1 from '../../public/showcase4.jpg'
import pic2 from '../../public/hero1.jpeg'

const PathwaySelection = ({ onSelectPathway }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-primary-100">
      <h2 className="text-3xl font-chewy text-dark mb-6 text-center drop-shadow-[2px_2px_0px_rgba(61,29,140,0.2)]">
        Choose Your Magical Journey
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        Create enchanting personalized storybooks featuring your child as the hero of their own adventures
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {/* Story Creation Option - Active */}
        <div 
          className="bg-gradient-to-br from-light to-white rounded-xl p-6 border-2 border-primary-300 transition-all duration-300 cursor-pointer hover:shadow-xl transform hover:-translate-y-2 relative overflow-hidden group"
          onClick={() => onSelectPathway('story')}
        >
          {/* Animated background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-100 opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-accent/20 opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="relative z-10">
            <div className="h-64 flex items-center justify-center mb-6">
              {/* Enhanced storybook image */}
              <div className="relative transform rotate-3 transition-transform group-hover:rotate-0 duration-300">
                <div className="bg-primary-500 rounded-lg shadow-lg relative z-20">
                  <div className="bg-white rounded p-3">
                    <div className="aspect-[3/4] bg-gradient-to-br from-accent to-secondary-400 rounded relative overflow-hidden">
                      {/* Story cover image */}
                      <img 
                        src={pic1}
                        alt="Adventure Storybook" 
                        className="inset-0 w-48 h-48 object-cover"
                      />
                      
                      {/* Overlay to ensure text is readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            
            <div className="relative z-20">
              <h3 className="text-2xl font-chewy text-dark mb-3 text-center">
                Create Magical Storybooks
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Transform your child's photo into an enchanting personalized storybook where they become the hero of their own magical adventure.
              </p>
              <button 
                className="w-full py-4 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center shadow-button hover:-translate-y-1 transform"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPathway('story');
                }}
              >
                Create Your Storybook
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Character Creation Option - Coming Soon */}
        <div 
          className="bg-gradient-to-br from-primary-500 to-white rounded-xl p-6 border-2 border-gray-200 transition-all duration-300 relative overflow-hidden opacity-90"
        >
          {/* "Coming Soon" badge */}
          <div className="absolute top-6 right-6 bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm flex items-center z-30 shadow-md animate-pulse">
            <Clock size={16} className="mr-1" />
            Coming Soon
          </div>
          
          {/* Animated background elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gray-100 opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gray-100 opacity-70"></div>
          
          <div className="relative z-10">
            <div className="h-64 flex items-center justify-center mb-6">
              <div className="relative">
                  <img src={pic2} className='w-48 h-48 rounded-3xl'></img>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-chewy text-dark mb-3 text-center">
                Create Fun Characters with your kid's image
              </h3>
              <p className="text-gray-900 text-center mb-6">
                Soon you'll be able to transform photos into animated cartoon characters with custom styles and animations. We're working hard to bring this feature to you!
              </p>
              <button 
                className="w-full py-4 rounded-full font-bold bg-gray-300 text-gray-600 flex items-center justify-center cursor-not-allowed opacity-80"
                disabled
              >
                Coming Soon
                <UserPlus size={18} className="ml-2" />
              </button>
            </div>
          </div>
          
          {/* Semi-transparent overlay */}
          {/* <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-20 pointer-events-none"></div> */}
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100 max-w-2xl mx-auto">
        <h4 className="font-bold text-dark flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Make Your Child's Day Magical!
        </h4>
        <p className="text-gray-600">
          Premium subscribers can create unlimited storybooks, access exclusive story themes, and order professional printed copies delivered right to your door. The perfect personalized gift for birthdays, holidays, or just because!
        </p>
      </div>
    </div>
  );
};

export default PathwaySelection;