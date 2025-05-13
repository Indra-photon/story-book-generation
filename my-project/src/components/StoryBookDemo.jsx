import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

// Sample story data
const sampleStory = {
  title: "The Little Star's Journey",
  author: "CharaFun AI"
};

// Sample scenes data
const sampleScenes = [
  {
    imageUrl: "/api/placeholder/600/400",
    text: "Once upon a time, in a sky full of twinkling stars, there lived a little star named Stella. She was the smallest star in the night sky, but she had the biggest dreams."
  },
  {
    imageUrl: "/api/placeholder/600/400",
    text: "One night, Stella noticed that the moon was looking sad. 'Why are you so sad?' she asked. 'I'm lonely,' replied the moon. 'I wish I had a friend to talk to.'"
  },
  {
    imageUrl: "/api/placeholder/600/400",
    text: "Stella had an idea. She would gather all the stars to sing a song for the moon. She flew across the night sky, inviting all the stars to join her special concert."
  },
  {
    imageUrl: "/api/placeholder/600/400",
    text: "The stars practiced day and night. Some stars were good at twinkling in rhythm, while others were better at glowing brightly. Stella made sure everyone had a special role."
  },
  {
    imageUrl: "/api/placeholder/600/400",
    text: "Finally, the night of the concert arrived. The moon waited curiously, wondering what the little star had planned. Stella gave the signal, and all the stars began to twinkle and shine in beautiful harmony."
  }
];

const StoryBookDemo = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Total number of pages (cover + scenes)
  const totalPages = sampleScenes.length + 1;
  
  // Navigate to previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Navigate to next page
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Simulate PDF generation
  const generatePDF = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setIsGenerating(false);
      alert("PDF has been generated! In a real implementation, this would download a beautifully formatted PDF storybook.");
    }, 2000);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      {/* Storybook title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-sans text-dark">Interactive Storybook Viewer</h1>
        <p className="text-gray-600">Preview your story and download as PDF</p>
      </div>
      
      {/* Storybook controls */}
      <div className="flex justify-center items-center mb-6 flex-wrap gap-4">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0 || isGenerating}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary-500 
            ${currentPage === 0 || isGenerating 
              ? 'opacity-50 cursor-not-allowed text-gray-400' 
              : 'text-primary-500 hover:bg-primary-500 hover:text-white'} 
            transition-colors`}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>
        
        <span className="px-4 py-2 bg-accent rounded-full text-dark font-bold">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages - 1 || isGenerating}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary-500 
            ${currentPage === totalPages - 1 || isGenerating 
              ? 'opacity-50 cursor-not-allowed text-gray-400' 
              : 'text-primary-500 hover:bg-primary-500 hover:text-white'} 
            transition-colors`}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
        
        <button 
          onClick={generatePDF} 
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-3 bg-accent text-dark font-bold rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download Storybook</span>
            </>
          )}
        </button>
      </div>
      
      {/* Storybook content */}
      <div className="relative w-full h-[650px] md:h-[750px] mt-4 mb-8">
        {/* Cover Page */}
        <div 
          className={`absolute inset-0 rounded-2xl shadow-xl overflow-hidden transition-opacity duration-500 ${
            currentPage === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            background: 'linear-gradient(135deg, #FF47DA 0%, #5D4DFF 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center h-full text-white text-center p-8">
            <h2 className="text-4xl md:text-6xl font-sans mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {sampleStory.title}
            </h2>
            
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-lg overflow-hidden mb-8">
              <img 
                src={sampleScenes[0].imageUrl} 
                alt="Story cover" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-6">
              <p className="text-xl">A story created with CharaFun</p>
              <p className="text-2xl font-sans mt-2">By {sampleStory.author}</p>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
          </div>
        </div>
        
        {/* Scene Pages */}
        {sampleScenes.map((scene, index) => (
          <div 
            key={index}
            className={`absolute inset-0 bg-white rounded-2xl shadow-xl overflow-hidden transition-opacity duration-500 ${
              currentPage === index + 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="h-full flex flex-col p-8">
              {/* Page header */}
              <div className="mb-4">
                <h3 className="text-2xl font-sans text-primary-500">
                  {sampleStory.title} - Page {index + 1}
                </h3>
              </div>
              
              {/* Scene image */}
              <div className="flex-grow mb-6">
                <div className="h-full max-h-[400px] rounded-xl overflow-hidden shadow-md">
                  <img 
                    src={scene.imageUrl} 
                    alt={`Scene ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Scene text */}
              <div className="bg-light rounded-xl p-6 relative mb-4">
                <div className="absolute -top-4 left-8 w-8 h-8 bg-light transform rotate-45"></div>
                <p className="text-lg md:text-xl leading-relaxed text-dark">
                  {scene.text}
                </p>
              </div>
              
              {/* Page number */}
              <div className="self-end mt-auto">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-dark font-bold shadow-sm">
                  {index + 1}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent opacity-10"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-primary-500 opacity-10"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional information */}
      <div className="bg-light rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-sans text-dark mb-3">About PDF Generation</h3>
        <p className="text-gray-700 mb-4">
          In a real implementation, this component would generate a high-quality PDF file of your storybook 
          that maintains all the design elements, typography, and imagery shown in this preview.
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-bold text-primary-500 mb-2">Professional PDF Features:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>Custom typography and fonts</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>High-resolution images</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>Professional page layout</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>Print-ready quality</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>Decorative page elements</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent2"></div>
              <span>Standard book dimensions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryBookDemo;