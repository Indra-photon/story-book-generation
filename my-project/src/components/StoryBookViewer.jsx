import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Book, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import './StoryBookViewer.css'; // We'll create this file next

const StoryBookViewer = ({ story, scenes }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Total number of pages (cover + scenes)
  const totalPages = scenes.length + 1;
  
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
  
  // Generate and download PDF
  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add cover page
      const coverPage = document.getElementById('storybook-cover');
      const coverCanvas = await html2canvas(coverPage, { 
        scale: 2, // Higher resolution
        useCORS: true, // To handle cross-origin images
        allowTaint: true
      });
      const coverImgData = coverCanvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(coverImgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      
      // Add scene pages
      for (let i = 0; i < scenes.length; i++) {
        pdf.addPage();
        const scenePage = document.getElementById(`storybook-page-${i}`);
        const sceneCanvas = await html2canvas(scenePage, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        const sceneImgData = sceneCanvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(sceneImgData, 'JPEG', 0, 0, pageWidth, pageHeight);
      }
      
      // Save the PDF
      pdf.save(`${story.title || 'storybook'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating your PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="storybook-viewer">
      {/* Storybook controls */}
      <div className="storybook-controls">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 0 || isGenerating}
          className="control-btn"
        >
          <ChevronLeft />
          <span>Previous</span>
        </button>
        
        <span className="page-indicator">
          Page {currentPage + 1} of {totalPages}
        </span>
        
        <button 
          onClick={nextPage} 
          disabled={currentPage === totalPages - 1 || isGenerating}
          className="control-btn"
        >
          <span>Next</span>
          <ChevronRight />
        </button>
        
        <button 
          onClick={generatePDF} 
          disabled={isGenerating}
          className="download-btn"
        >
          {isGenerating ? (
            <>
              <div className="spinner"></div>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
      
      {/* Storybook content */}
      <div className="storybook-content">
        {/* Cover Page (visible when currentPage is 0) */}
        <div 
          id="storybook-cover" 
          className={`storybook-page cover-page ${currentPage === 0 ? 'visible' : 'hidden'}`}
        >
          <div className="cover-content">
            <h1 className="book-title">{story.title || 'My Storybook'}</h1>
            <div className="book-cover-image">
              {/* Cover image would ideally be the first scene image or a composite */}
              {scenes[0]?.imageUrl && (
                <img src={scenes[0].imageUrl} alt="Story cover" />
              )}
            </div>
            <div className="book-author">
              <p>A story created with CharaFun</p>
              <p className="author-name">By {story.author || 'Anonymous'}</p>
            </div>
          </div>
        </div>
        
        {/* Scene Pages */}
        {scenes.map((scene, index) => (
          <div 
            key={index}
            id={`storybook-page-${index}`}
            className={`storybook-page scene-page ${currentPage === index + 1 ? 'visible' : 'hidden'}`}
          >
            <div className="scene-content">
              <div className="scene-image">
                {scene.imageUrl && (
                  <img src={scene.imageUrl} alt={`Scene ${index + 1}`} />
                )}
              </div>
              
              <div className="scene-text">
                <p>{scene.text}</p>
              </div>
              
              <div className="page-number">{index + 1}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryBookViewer;