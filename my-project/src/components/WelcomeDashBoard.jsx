// components/WelcomeDashboard.jsx
import React from 'react';
import { ArrowRight, Zap, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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
                Ready to create? Click and go to the dashboard
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
                Go to your profile to get back your creations
              </p>
            </div>
          </div>
          <Link to='/profile'>
            <button className="mt-2 w-full py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition flex items-center justify-center">
              View My Creations
              <ArrowRight size={18} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;