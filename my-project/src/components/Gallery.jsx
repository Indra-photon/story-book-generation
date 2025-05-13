// Gallery.jsx
import React, { useState } from 'react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample gallery items - in a real implementation, these would include actual images
  const galleryItems = [
    { id: 1, type: 'cute', title: 'Fun Character', description: 'Cute cartoon style with bouncy wave animation' },
    { id: 2, type: 'anime', title: 'Anime Style', description: 'Anime-inspired look with expressive movements' },
    { id: 3, type: 'comic', title: 'Comic Hero', description: 'Bold comic book style with dynamic poses' },
    { id: 4, type: 'cute', title: 'Cheerful Avatar', description: 'Bright and cheerful character with a friendly wave' },
    { id: 5, type: 'pixel', title: 'Pixel Character', description: 'Retro pixel art style with classic animations' },
    { id: 6, type: 'anime', title: 'Stylized Portrait', description: 'Detailed anime portrait with subtle animations' }
  ];
  
  const filteredItems = activeFilter === 'all' ? 
    galleryItems : 
    galleryItems.filter(item => item.type === activeFilter);
  
  return (
    <section className="py-20 bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-sans text-dark mb-4">Gallery of Transformations</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            See how people have transformed their portraits into amazing animated characters
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveFilter('all')}
          >
            All Styles
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'cute' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveFilter('cute')}
          >
            Cute
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'anime' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveFilter('anime')}
          >
            Anime
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'comic' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveFilter('comic')}
          >
            Comic
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === 'pixel' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setActiveFilter('pixel')}
          >
            Pixel Art
          </button>
        </div>
        
        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-square bg-gray-100 relative">
                {/* Replace with actual before/after images in production */}
                <div className="absolute inset-0 flex items-center justify-center">
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
                
                {/* Before/After toggle overlay */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 group cursor-pointer">
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                      <span className="bg-white text-dark font-bold text-xs px-2 py-1 rounded">Before</span>
                    </div>
                  </div>
                  <div className="w-1/2 group cursor-pointer">
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                      <span className="bg-white text-dark font-bold text-xs px-2 py-1 rounded">After</span>
                    </div>
                  </div>
                </div>
                
                {/* Style badge */}
                <div className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>
                
                {/* Animation badge */}
                <div className="absolute top-3 right-3 bg-accent text-dark text-xs font-bold px-2 py-1 rounded-full">
                  Animated
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-dark mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-primary-500 font-semibold text-sm hover:underline">
                    View Full Size
                  </button>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="text-xs text-gray-500">98% Liked</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View more button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-secondary-500 text-white font-bold rounded-full shadow-lg hover:-translate-y-1 transform transition duration-200">
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;