// components/WelcomeDashboard.jsx
import React from 'react';
import { ArrowRight, Zap, Heart, Star } from 'lucide-react';

const WelcomeDashboard = ({ onStartCreating }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-chewy text-dark mb-4">Welcome to Your Creation Dashboard!</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Turn your ideas into animated characters and stories with our easy-to-use tools powered by AI. 
          Get started by choosing what you'd like to create today.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl p-6">
          <div className="flex items-start mb-4">
            <div className="bg-primary-500 rounded-full p-3 mr-4">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-chewy text-dark mb-2">Quick Start</h3>
              <p className="text-gray-700">
                Ready to create? Click the button below to jump straight into our creation tools.
              </p>
            </div>
          </div>
          <button 
            onClick={onStartCreating}
            className="mt-2 w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
          >
            Start Creating
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-6">
          <div className="flex items-start mb-4">
            <div className="bg-accent rounded-full p-3 mr-4">
              <Star size={24} className="text-dark" />
            </div>
            <div>
              <h3 className="text-xl font-chewy text-dark mb-2">Your Creations</h3>
              <p className="text-gray-700">
                You've created 3 characters and 1 story so far. View and manage your creations.
              </p>
            </div>
          </div>
          <button className="mt-2 w-full py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition flex items-center justify-center">
            View My Creations
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-chewy text-dark mb-4">Featured Creations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-40 bg-gray-100 relative">
                {/* This would be populated with actual content in production */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center">
                      <div className="flex gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-dark"></div>
                        <div className="w-2 h-2 rounded-full bg-dark"></div>
                      </div>
                      <div className="w-4 h-2 bg-dark rounded-b-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                  <Heart size={14} className="text-primary-500" />
                </div>
              </div>
              
              <div className="p-3">
                <h4 className="font-medium text-dark">Featured Character {item}</h4>
                <p className="text-xs text-gray-500">Created 3 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;