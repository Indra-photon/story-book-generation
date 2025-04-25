// components/story/StoryStartPrompt.jsx
import React from 'react';
import { UserPlus, Book } from 'lucide-react';

const StoryStartPrompt = ({ onChoice }) => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-chewy text-dark mb-6">Do you want your child in the story?</h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We can create a personalized story featuring your child as a character, or we can
        create a story with our own characters. Choose the option that you prefer.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div 
          className="bg-primary-50 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          onClick={() => {
            console.log("Choice made: Include child =", true);
            onChoice(true)}}
        >
          <div className="flex flex-col items-center">
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