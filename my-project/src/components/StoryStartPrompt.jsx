// components/story/StoryStartPrompt.jsx
import React from 'react';
import { UserPlus, Book, Clock } from 'lucide-react';

const StoryStartPrompt = ({ onChoice }) => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-chewy text-dark mb-6">Choose whether you want to build story with your kids as character</h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We can create a personalized story featuring your child as a character, or we can
        create a story with our own characters. Choose the option that you prefer.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          className="bg-primary-50 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          // onClick={() => {
          //   onChoice(true)}}
        >
          {/* <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mb-4">
              <UserPlus size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-chewy text-dark mb-2">Yes, Include My Child</h3>
            <p className="text-gray-600 text-sm">
              Create a personalized story with your child as the main character. Your child
              will go on adventures and be the hero of their own tale!
            </p>
            <button className="mt-6 px-6 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition">
              Personalize Story
            </button>
          </div> */}
          <div className="flex flex-col items-center relative overflow-hidden p-6 rounded-xl bg-primary-300">
            {/* "Coming Soon" badge */}
            <div className="absolute top-6 right-6 bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm flex items-center z-30 shadow-md animate-pulse">
              <Clock size={16} className="mr-1" />
              Coming Soon
            </div>
            
            {/* Animated background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-100 opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary-100 opacity-50"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mb-4">
                <UserPlus size={32} className="text-gray-500" />
              </div>
              
              <h3 className="text-xl font-chewy text-gray-600 mb-2 text-center">Yes, Include My Child</h3>
              
              <p className="text-gray-600 text-sm text-center">
                Create a personalized story with your child as the main character. Your child
                will go on adventures and be the hero of their own tale!
              </p>
              
              <button className="mt-6 px-6 py-3 bg-gray-300 text-gray-600 font-bold rounded-full cursor-not-allowed flex items-center justify-center">
                Coming Soon
                <UserPlus size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        <div 
          className="bg-accent/20 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => onChoice(false)}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <Book size={32} className="text-dark" />
            </div>
            <h3 className="text-xl font-chewy text-dark mb-2">No, Use Characters</h3>
            <p className="text-gray-600 text-sm">
              Create a story using our library of delightful characters. Perfect for creating
              fun, engaging stories for any child.
            </p>
            <button className="mt-6 px-6 py-3 bg-accent text-dark font-bold rounded-full hover:bg-accent/90 transition">
              Use Our Characters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryStartPrompt;