// steps/EffectsStep.jsx
import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const EffectsStep = ({ selectedImage, handleNextStep }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-chewy text-dark mb-6">Apply Effects</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-dark mb-4">Character Preview</h3>
            <div className="rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected character"
                className="w-full h-64 object-contain"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Background Style</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="transparent">Transparent</option>
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
                <option value="scene">Scene (living room, office, etc.)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#FFFFFF"
                  className="h-10 w-10 rounded border-0"
                />
                <input
                  type="text"
                  defaultValue="#FFFFFF"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-dark mb-4">Visual Effects</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {['Sparkle', 'Glow', 'Shadow', 'Outline', 'Blur', 'None'].map((effect) => (
              <div 
                key={effect}
                className="bg-gray-50 rounded-lg p-4 text-center cursor-pointer hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <div className="text-gray-700 font-medium">{effect}</div>
              </div>
            ))}
          </div>
          
          <h3 className="font-bold text-dark mb-4">Effect Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Effect Intensity</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                defaultValue="50"
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Subtle</span>
                <span>Medium</span>
                <span>Strong</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Effect Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#FFD700"
                  className="h-10 w-10 rounded border-0"
                />
                <input
                  type="text"
                  defaultValue="#FFD700"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
            >
              Continue to Export
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectsStep;