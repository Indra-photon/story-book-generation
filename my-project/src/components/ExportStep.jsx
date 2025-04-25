// steps/ExportStep.jsx
import React from 'react';
import { Download, Share } from 'lucide-react';

const ExportStep = ({ selectedImage }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-chewy text-dark mb-6">Export Your Character</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-dark mb-4">Final Character</h3>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-80 flex items-center justify-center relative">
              <img
                src={selectedImage}
                alt="Final character"
                className="h-full object-contain"
              />
              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg p-1">
                <button className="p-1 hover:text-primary-500">
                  <Share size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-dark mb-4">Character Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Style:</span>
                <span className="font-medium">3D Pixar Animation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolution:</span>
                <span className="font-medium">1024 x 1024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Animation:</span>
                <span className="font-medium">Wave</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Effects:</span>
                <span className="font-medium">None</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created On:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-dark mb-4">Export Options</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">File Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="gif">GIF</option>
                <option value="mp4">MP4 Video</option>
                <option value="png">PNG (Static Image)</option>
                <option value="webm">WebM Video</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose GIF for wider compatibility or MP4 for better quality.
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Quality</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="high">High (Larger file size)</option>
                <option value="medium">Medium</option>
                <option value="low">Low (Smaller file size)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Resolution</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="original">Original (1024 x 1024)</option>
                <option value="large">Large (512 x 512)</option>
                <option value="medium">Medium (256 x 256)</option>
                <option value="small">Small (128 x 128)</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Include transparent background (for GIF/PNG)</span>
              </label>
              
              <label className="flex items-center mt-2">
                <input type="checkbox" className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Remove watermark (Pro feature)</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <button className="w-full py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition flex items-center justify-center">
              <Download size={18} className="mr-2" />
              Download Character
            </button>
            
            <button className="w-full py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center">
              <Share size={18} className="mr-2" />
              Share Character
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h4 className="font-bold text-primary-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Pro Tip
            </h4>
            <p className="text-sm text-primary-700 mt-1">
              Upgrade to our Pro plan to unlock higher quality exports, more animation styles, and commercial usage rights!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportStep;