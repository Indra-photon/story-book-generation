// import React, { useState, useRef } from 'react';
// import { Download, ChevronLeft, ChevronRight, Edit, Share, Printer, BookOpen, Book } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import { toast } from 'react-hot-toast';
// import jsPDF from 'jspdf';

// const StoryCanvas = ({ story, scenes }) => {
//   const [currentScene, setCurrentScene] = useState(0);
//   const [viewMode, setViewMode] = useState('reading'); // 'reading', 'editing', or 'fullscreen'
//   const [editableText, setEditableText] = useState('');
  
//   const pageRefs = useRef([]);
  
//   // Navigation handlers
//   const goToPreviousScene = () => {
//     if (currentScene > 0) {
//       setCurrentScene(currentScene - 1);
//     }
//   };
  
//   const goToNextScene = () => {
//     if (currentScene < scenes.length - 1) {
//       setCurrentScene(currentScene + 1);
//     }
//   };
  
//   // Toggle between reading and editing modes
//   const toggleEditMode = () => {
//     if (viewMode === 'reading') {
//       // Enter edit mode and load the current scene text
//       setEditableText(scenes[currentScene].text);
//       setViewMode('editing');
//     } else {
//       // Save the edited text and return to reading mode
//       const updatedScenes = [...scenes];
//       updatedScenes[currentScene] = {
//         ...updatedScenes[currentScene],
//         text: editableText
//       };
//       // In a real implementation, you would save this change to your backend
//       setViewMode('reading');
//     }
//   };
  
//   // Handle text edits
//   const handleTextChange = (e) => {
//     setEditableText(e.target.value);
//   };

//   // Alternative PDF generation method using html2canvas
//   const generatePDF = async () => {
//     toast.loading("Creating your magical storybook...", { id: "pdf-generation" });
  
//     try {
//       // Create PDF with landscape orientation for the immersive layout
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4'
//       });
      
//       // Add title page
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
      
//       // Create colorful cover page
//       pdf.setFillColor(50, 50, 150); // Blue background for cover
//       pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
//       pdf.setFontSize(36);
//       pdf.setTextColor(255, 255, 255); // White text
//       pdf.setFont("times", "bold");
//       const title = story?.title || "Your Storybook";
//       pdf.text(title, pageWidth / 2, pageHeight / 2 - 10, { align: 'center' });
      
//       // Add subtitle if available
//       if (story?.introduction) {
//         pdf.setFontSize(16);
//         pdf.setTextColor(240, 240, 240); // Light gray
//         pdf.setFont("times", "italic");
//         const introLines = pdf.splitTextToSize(story.introduction, pageWidth - 40);
//         pdf.text(introLines, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });
//       }
      
//       // Process each scene
//       for (let i = 0; i < scenes.length; i++) {
//         const scene = scenes[i];
        
//         // Add a new page for each scene
//         pdf.addPage();
        
//         // For scenes with no image, create a colored background page
//         if (!scene.image) {
//           pdf.setFillColor(240, 240, 240); // Light background
//           pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          
//           // Scene number indicator
//           pdf.setFillColor(81, 77, 255); // Primary color for indicator
//           pdf.circle(pageWidth - 20, 15, 10, 'F');
//           pdf.setFontSize(10);
//           pdf.setTextColor(255, 255, 255);
//           pdf.setFont("times", "bold");
//           pdf.text(`${i + 1}/${scenes.length}`, pageWidth - 20, 15, { align: 'center' });
          
//           // Add scene title and text in a box
//           const boxWidth = pageWidth - 40;
//           const boxHeight = pageHeight / 2;
//           const boxX = 20;
//           const boxY = 60;
          
//           // Draw white semi-transparent box
//           pdf.setFillColor(255, 255, 255);
//           pdf.setGState(new pdf.GState({ opacity: 0.8 }));
//           pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'F');
//           pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
//           // Add scene title
//           // pdf.setTextColor(125, 75, 185); // Purple text
//           // pdf.setFontSize(20);
//           // pdf.text(`Scene ${i + 1}: ${scene.title || "Scene"}`, boxX + 10, boxY + 15);
          
//           // Add scene text
//           pdf.setFontSize(14);
//           const textLines = pdf.splitTextToSize(scene.text || "", boxWidth - 20);
//           pdf.text(textLines, boxX + 10, boxY + 30);
          
//           continue;
//         }
        
//         // Create an exact replica of your fullscreen reader layout
//         const tempContainer = document.createElement('div');
//         tempContainer.className = "pdf-scene-container";
//         tempContainer.style.width = "1200px"; // Higher resolution for better quality
//         tempContainer.style.height = "800px"; // Maintain aspect ratio
//         tempContainer.style.position = "fixed";
//         tempContainer.style.top = "-9999px"; // Hide it
//         tempContainer.style.left = "-9999px";
//         tempContainer.style.overflow = "hidden";
        
//         // Add scene content matching your fullscreen reader design
//         tempContainer.innerHTML = `
//           <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
//             <!-- Background Image -->
//             <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
//                         background-image: url('${scene.image}'); 
//                         background-size: cover; 
//                         background-position: center;
//                         filter: brightness(0.9);">
//             </div>
            
//             <!-- Text Overlay - matching your fullscreen reader design -->
//             <div style="position: absolute; bottom: 0; left: 0; width: 100%; display: flex; align-items: flex-end;">
//               <div style="background-color: rgba(255, 255, 255, 0.5); border-radius: 0.75rem; 
//                           width: 100%; padding: 24px; margin: 24px; backdrop-filter: blur(4px); 
//                           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                
//                 <p style="font-size: 26px; margin: 0; font-family: 'Times New Roman', Times, serif; 
//                           line-height: 1.5; color: rgb(0,0,0);">
//                   ${scene.text || ""}
//                 </p>
//               </div>
//             </div>
//           </div>
//         `;
        
//         // Add to document temporarily
//         document.body.appendChild(tempContainer);
        
//         try {
//           // Convert to canvas
//           const canvas = await html2canvas(tempContainer, {
//             scale: 1.5, // Higher scale for better quality
//             useCORS: true, // Allow cross-origin images
//             allowTaint: true, // Allow tainted images
//             logging: false, // Disable logs
//             backgroundColor: null // Transparent background
//           });
          
//           // Get canvas as data URL - explicitly as JPEG
//           const imgData = canvas.toDataURL('image/jpeg', 1.0); // Higher quality
          
//           // Add to PDF - fill the entire page
//           pdf.addImage(
//             imgData,
//             'JPEG', // Explicitly set format
//             0,
//             0,
//             pageWidth,
//             pageHeight
//           );
//         } catch (canvasError) {
//           console.error("Error converting scene to canvas:", canvasError);
          
//           // Fallback that still matches your design
//           pdf.setFillColor(240, 240, 240); // Light background
//           pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          
//           // Scene number indicator
//           pdf.setFillColor(81, 77, 255); // Primary color
//           pdf.circle(pageWidth - 20, 15, 10, 'F');
//           pdf.setFontSize(10);
//           pdf.setTextColor(255, 255, 255);
//           pdf.setFont("times", "bold");
//           pdf.text(`${i + 1}/${scenes.length}`, pageWidth - 20, 15, { align: 'center' });
          
//           // Add scene title and text in a box
//           const boxWidth = pageWidth - 40;
//           const boxHeight = pageHeight / 2;
//           const boxX = 20;
//           const boxY = 60;
          
//           // Draw white semi-transparent box
//           pdf.setFillColor(255, 255, 255);
//           pdf.setGState(new pdf.GState({ opacity: 0.8 }));
//           pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'F');
//           pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
//           // Add scene title
//           pdf.setTextColor(125, 75, 185); // Purple text
//           pdf.setFontSize(20);
//           pdf.text(`Scene ${i + 1}: ${scene.title || "Scene"}`, boxX + 10, boxY + 15);
          
//           // Add scene text
//           pdf.setFontSize(14);
//           const textLines = pdf.splitTextToSize(scene.text || "", boxWidth - 20);
//           pdf.text(textLines, boxX + 10, boxY + 30);
//         }
        
//         // Clean up
//         document.body.removeChild(tempContainer);
//       }
      
//       // Save PDF
//       pdf.save(`${(story?.title || "Your_Storybook").replace(/\s+/g, '_')}.pdf`);
      
//       toast.dismiss("pdf-generation");
//       toast.success("Your storybook is ready!");
      
//     } catch (error) {
//       console.error("PDF generation error:", error);
//       toast.dismiss("pdf-generation");
//       toast.error("Failed to generate PDF. Please try again.");
//     }
//   };


//   // Full Screen Reader Mode with flex-col layout for all pages
// const FullScreenReader = () => {
//   return (
//     <div className="fixed inset-0 z-50 m-28 flex flex-col">
//       {/* Header */}
//       <div className="p-4 flex justify-between items-center shadow-md">
//         <h1 className="text-2xl font-chewy text-gray-800">{story?.title || 'Your Story'}</h1>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={generatePDF}
//             className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
//           >
//             <Download size={16} className="mr-2" />
//             Download PDF
//           </button>
//           <button 
//             onClick={() => setViewMode('reading')}
//             className="flex items-center px-4 py-2 bg-gray-200 text-dark rounded-full hover:bg-gray-300 transition"
//           >
//             <ChevronLeft size={16} className="mr-2" />
//             Back to Editor
//           </button>
//         </div>
//       </div>

//       {/* Scrollable container for all pages */}
//       <div className="flex-grow overflow-y-auto py-8 px-4">
//         <div className="flex flex-col items-center space-y-12 max-w-5xl mx-auto">
//           {/* Map through all scenes and display each one */}
//           {scenes.map((scene, index) => (
//             <div 
//               key={index}
//               className="w-full relative rounded-xl overflow-hidden shadow-xl"
//               style={{ height: '85vh' }}
//             >
              
              
//               {/* Background Image */}
//               <div 
//                 className="absolute inset-0 bg-cover bg-center "
//                 style={{ 
//                   backgroundImage: `url(${scene?.image || ''})`,
//                   filter: 'brightness(0.9)' // Slightly darken for text readability
//                 }}
//               />

//               {/* Text Overlay - styled like the reference image */}
//               <div className="absolute inset-0 flex items-end">
//                 <div className="bg-white/50 rounded-xl w-full p-6 m-6 shadow-lg">
//                   <p className="text-black font-sans text-base">
//                     {scene?.text || ''}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

//   // Render full-screen reader if in fullscreen mode
//   if (viewMode === 'fullscreen') {
//     return <FullScreenReader />;
//   }

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-chewy text-dark">{story?.title || 'Your Story'}</h2>
        
//         <div className="flex space-x-3">
//           <button
//             onClick={generatePDF}
//             className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
//           >
//             <Download size={16} className="mr-2" />
//             Download
//           </button>
          
//           <button
//             onClick={() => setViewMode('fullscreen')}
//             className="flex items-center px-4 py-2 bg-accent text-dark rounded-full hover:bg-accent/90 transition"
//           >
//             <Book size={16} className="mr-2" />
//             Read Storybook
//           </button>
//         </div>
//       </div>
      
//       {/* Scene navigation */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={goToPreviousScene}
//           disabled={currentScene === 0}
//           className={`flex items-center ${
//             currentScene === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
//           }`}
//         >
//           <ChevronLeft size={20} className="mr-1" />
//           Previous Scene
//         </button>
        
//         <div className="text-gray-600">
//           Scene {currentScene + 1} of {scenes.length}
//         </div>
        
//         <button
//           onClick={goToNextScene}
//           disabled={currentScene === scenes.length - 1}
//           className={`flex items-center ${
//             currentScene === scenes.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
//           }`}
//         >
//           Next Scene
//           <ChevronRight size={20} className="ml-1" />
//         </button>
//       </div>
      
//       {/* Main canvas */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
//         {/* Scene header */}
//         <div className="bg-primary-50 p-4 flex justify-between items-center">
//           <h3 className="font-bold text-dark">Scene {currentScene + 1}: {scenes[currentScene]?.title || 'Scene'}</h3>
          
//           <button
//             onClick={toggleEditMode}
//             className="flex items-center text-primary-500 hover:text-primary-600"
//           >
//             {viewMode === 'reading' ? (
//               <>
//                 <Edit size={16} className="mr-1" />
//                 Edit Text
//               </>
//             ) : (
//               <>
//                 <BookOpen size={16} className="mr-1" />
//                 Save Changes
//               </>
//             )}
//           </button>
//         </div>
        
//         {/* Scene content */}
//         <div className="p-6">
//           {/* Visual area */}
//           <div className="mb-6 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
//             {scenes[currentScene]?.image ? (
//               <img 
//                 src={scenes[currentScene].image} 
//                 alt={`Scene ${currentScene + 1}: ${scenes[currentScene].title || 'Scene'}`} 
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             ) : (
//               <div className="text-gray-400 text-center">
//                 <p>Scene {currentScene + 1} Illustration</p>
//                 <p className="text-xs">No image generated for this scene</p>
//               </div>
//             )}
//           </div>
          
//           {/* Text area */}
//           <div className="bg-gray-50 rounded-lg p-4">
//             {viewMode === 'reading' ? (
//               <p className="text-gray-700">{scenes[currentScene]?.text || ''}</p>
//             ) : (
//               <textarea
//                 value={editableText}
//                 onChange={handleTextChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 rows="5"
//                 placeholder="Edit the scene text here..."
//               ></textarea>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Story overview */}
//       <div className="bg-gray-50 rounded-lg p-4">
//         <h3 className="font-bold text-dark mb-2">Story Overview</h3>
//         <p className="text-gray-600 text-sm mb-4">{story?.introduction || 'Your interactive story.'}</p>
        
//         <div className="flex flex-wrap gap-2">
//           {scenes.map((scene, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentScene(index)}
//               className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 currentScene === index 
//                   ? 'bg-primary-500 text-white' 
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               Scene {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryCanvas;







import React, { useState, useRef } from 'react';
import { Download, ChevronLeft, ChevronRight, Edit, Share, Printer, BookOpen, Book } from 'lucide-react';
import html2canvas from 'html2canvas';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';

const StoryCanvas = ({ story, scenes }) => {
  const [currentScene, setCurrentScene] = useState('cover'); // Start with cover page
  const [viewMode, setViewMode] = useState('reading'); // 'reading', 'editing', or 'fullscreen'
  const [editableText, setEditableText] = useState('');
  
  const pageRefs = useRef([]);
  
  // Navigation handlers
  const goToPreviousScene = () => {
    if (currentScene === 'end') {
      // If on end page, go to last regular scene
      setCurrentScene(scenes.length - 1);
    } else if (typeof currentScene === 'number' && currentScene > 0) {
      setCurrentScene(currentScene - 1);
    } else if (currentScene === 0) {
      // If on first scene, go to cover
      setCurrentScene('cover');
    }
  };
  
  const goToNextScene = () => {
    if (currentScene === 'cover') {
      // If on cover page, go to first regular scene
      setCurrentScene(0);
    } else if (typeof currentScene === 'number' && currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else if (currentScene === scenes.length - 1) {
      // If on last scene, go to end page
      setCurrentScene('end');
    }
  };

  const getSceneNumber = () => {
    if (currentScene === 'cover') return 'Cover';
    if (currentScene === 'end') return 'End';
    return `${currentScene + 1} of ${scenes.length}`;
  };

  // 4. Create components for Cover Page and End Page
  const CoverPage = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="bg-primary-50 p-4 flex justify-between items-center">
        <h3 className="font-bold text-dark">Cover Page</h3>
      </div>
      
      <div className="p-6">
        <div className="relative rounded-lg overflow-hidden" style={{ height: '400px' }}>
          {story.coverPageImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('${story.coverPageImage}')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl md:text-5xl font-chewy text-white mb-4 text-center shadow-text">{story.title}</h1>
                {story.mainCharacter && (
                  <p className="text-xl text-white text-center shadow-text">
                    A story about {story.mainCharacter.name}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-primary-100 to-primary-500 flex flex-col items-center justify-center p-6">
              <h1 className="text-4xl md:text-5xl font-chewy text-white mb-4 text-center shadow-text">{story.title}</h1>
              {story.mainCharacter && (
                <p className="text-xl text-white text-center shadow-text">
                  A story about {story.mainCharacter.name}
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{story.introduction || ''}</p>
        </div>
      </div>
    </div>
  );

  const EndPage = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="bg-primary-50 p-4 flex justify-between items-center">
        <h3 className="font-bold text-dark">The End</h3>
      </div>
      
      <div className="p-6">
        <div className="relative rounded-lg overflow-hidden" style={{ height: '400px' }}>
          {story.endPageImage ? (
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('${story.endPageImage}')` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center p-6">
                <h2 className="text-4xl font-chewy text-white mb-4 text-center shadow-text">The End</h2>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-accent/50 to-accent flex flex-col items-center justify-center p-6">
              <h2 className="text-4xl font-chewy text-dark mb-4 text-center">The End</h2>
            </div>
          )}
        </div>
        
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{story.conclusion || ''}</p>
        </div>
      </div>
    </div>
  );
  
  // Toggle between reading and editing modes
  const toggleEditMode = () => {
    if (viewMode === 'reading') {
      // Enter edit mode and load the current scene text
      setEditableText(scenes[currentScene].text);
      setViewMode('editing');
    } else {
      // Save the edited text and return to reading mode
      const updatedScenes = [...scenes];
      updatedScenes[currentScene] = {
        ...updatedScenes[currentScene],
        text: editableText
      };
      // In a real implementation, you would save this change to your backend
      setViewMode('reading');
    }
  };
  
  // Handle text edits
  const handleTextChange = (e) => {
    setEditableText(e.target.value);
  };

  // Alternative PDF generation method using html2canvas
  const generatePDF = async () => {
    toast.loading("Creating your magical storybook...", { id: "pdf-generation" });
  
    try {
      // Create PDF with landscape orientation for the immersive layout
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add title page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Create colorful cover page
      pdf.setFillColor(50, 50, 150); // Blue background for cover
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      pdf.setFontSize(36);
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFont("times", "bold");
      const title = story?.title || "Your Storybook";
      pdf.text(title, pageWidth / 2, pageHeight / 2 - 10, { align: 'center' });
      
      // Add subtitle if available
      if (story?.introduction) {
        pdf.setFontSize(16);
        pdf.setTextColor(240, 240, 240); // Light gray
        pdf.setFont("times", "italic");
        const introLines = pdf.splitTextToSize(story.introduction, pageWidth - 40);
        pdf.text(introLines, pageWidth / 2, pageHeight / 2 + 10, { align: 'center' });
      }

      // Add cover page with image if available
      if (story.coverPageImage) {
        pdf.addPage();
        try {
          // Add cover image
          pdf.addImage(
            story.coverPageImage,
            'JPEG',
            0,
            0,
            pageWidth,
            pageHeight
          );
          
          // Add semi-transparent overlay for text
          pdf.setFillColor(0, 0, 0);
          pdf.setGState(new pdf.GState({ opacity: 0.4 }));
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
          // Add title and intro
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(36);
          pdf.setFont("times", "bold");
          pdf.text(story.title, pageWidth / 2, pageHeight / 3, { align: 'center' });
          
          // Add introduction if available
          if (story.introduction) {
            pdf.setFontSize(14);
            pdf.setFont("times", "normal");
            const introLines = pdf.splitTextToSize(story.introduction, pageWidth - 40);
            pdf.text(introLines, pageWidth / 2, pageHeight * 2/3, { align: 'center' });
          }
        } catch (error) {
          console.error("Error adding cover image to PDF:", error);
          // Continue with the rest of the PDF generation
        }
      }
      
      // Process each scene
      for (let i = 0; i < scenes.length; i++) {
        const scene = scenes[i];
        
        // Add a new page for each scene
        pdf.addPage();
        
        // For scenes with no image, create a colored background page
        if (!scene.image) {
          pdf.setFillColor(240, 240, 240); // Light background
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          
          // Scene number indicator
          pdf.setFillColor(81, 77, 255); // Primary color for indicator
          pdf.circle(pageWidth - 20, 15, 10, 'F');
          pdf.setFontSize(10);
          pdf.setTextColor(255, 255, 255);
          pdf.setFont("times", "bold");
          pdf.text(`${i + 1}/${scenes.length}`, pageWidth - 20, 15, { align: 'center' });
          
          // Add scene title and text in a box
          const boxWidth = pageWidth - 40;
          const boxHeight = pageHeight / 2;
          const boxX = 20;
          const boxY = 60;
          
          // Draw white semi-transparent box
          pdf.setFillColor(255, 255, 255);
          pdf.setGState(new pdf.GState({ opacity: 0.8 }));
          pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'F');
          pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
          // Add scene title
          // pdf.setTextColor(125, 75, 185); // Purple text
          // pdf.setFontSize(20);
          // pdf.text(`Scene ${i + 1}: ${scene.title || "Scene"}`, boxX + 10, boxY + 15);
          
          // Add scene text
          pdf.setFontSize(14);
          const textLines = pdf.splitTextToSize(scene.text || "", boxWidth - 20);
          pdf.text(textLines, boxX + 10, boxY + 30);
          
          continue;
        }
        
        // Create an exact replica of your fullscreen reader layout
        const tempContainer = document.createElement('div');
        tempContainer.className = "pdf-scene-container";
        tempContainer.style.width = "1200px"; // Higher resolution for better quality
        tempContainer.style.height = "800px"; // Maintain aspect ratio
        tempContainer.style.position = "fixed";
        tempContainer.style.top = "-9999px"; // Hide it
        tempContainer.style.left = "-9999px";
        tempContainer.style.overflow = "hidden";
        
        // Add scene content matching your fullscreen reader design
        tempContainer.innerHTML = `
          <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
            <!-- Background Image -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
                        background-image: url('${scene.image}'); 
                        background-size: cover; 
                        background-position: center;
                        filter: brightness(0.9);">
            </div>
            
            <!-- Text Overlay - matching your fullscreen reader design -->
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; display: flex; align-items: flex-end;">
              <div style="background-color: rgba(255, 255, 255, 0.5); border-radius: 0.75rem; 
                          width: 100%; padding: 24px; margin: 24px; backdrop-filter: blur(4px); 
                          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                
                <p style="font-size: 26px; margin: 0; font-family: 'Times New Roman', Times, serif; 
                          line-height: 1.5; color: rgb(0,0,0);">
                  ${scene.text || ""}
                </p>
              </div>
            </div>
          </div>
        `;
        
        // Add to document temporarily
        document.body.appendChild(tempContainer);
        
        try {
          // Convert to canvas
          const canvas = await html2canvas(tempContainer, {
            scale: 1.5, // Higher scale for better quality
            useCORS: true, // Allow cross-origin images
            allowTaint: true, // Allow tainted images
            logging: false, // Disable logs
            backgroundColor: null // Transparent background
          });
          
          // Get canvas as data URL - explicitly as JPEG
          const imgData = canvas.toDataURL('image/jpeg', 1.0); // Higher quality
          
          // Add to PDF - fill the entire page
          pdf.addImage(
            imgData,
            'JPEG', // Explicitly set format
            0,
            0,
            pageWidth,
            pageHeight
          );
        } catch (canvasError) {
          console.error("Error converting scene to canvas:", canvasError);
          
          // Fallback that still matches your design
          pdf.setFillColor(240, 240, 240); // Light background
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          
          // Scene number indicator
          pdf.setFillColor(81, 77, 255); // Primary color
          pdf.circle(pageWidth - 20, 15, 10, 'F');
          pdf.setFontSize(10);
          pdf.setTextColor(255, 255, 255);
          pdf.setFont("times", "bold");
          pdf.text(`${i + 1}/${scenes.length}`, pageWidth - 20, 15, { align: 'center' });
          
          // Add scene title and text in a box
          const boxWidth = pageWidth - 40;
          const boxHeight = pageHeight / 2;
          const boxX = 20;
          const boxY = 60;
          
          // Draw white semi-transparent box
          pdf.setFillColor(255, 255, 255);
          pdf.setGState(new pdf.GState({ opacity: 0.8 }));
          pdf.roundedRect(boxX, boxY, boxWidth, boxHeight, 5, 5, 'F');
          pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
          // Add scene title
          pdf.setTextColor(125, 75, 185); // Purple text
          pdf.setFontSize(20);
          pdf.text(`Scene ${i + 1}: ${scene.title || "Scene"}`, boxX + 10, boxY + 15);
          
          // Add scene text
          pdf.setFontSize(14);
          const textLines = pdf.splitTextToSize(scene.text || "", boxWidth - 20);
          pdf.text(textLines, boxX + 10, boxY + 30);
        }
        
        // Clean up
        document.body.removeChild(tempContainer);
      }

      // Add end page with image if available
      if (story.endPageImage) {
        pdf.addPage();
        try {
          // Add end page image
          pdf.addImage(
            story.endPageImage,
            'JPEG',
            0,
            0,
            pageWidth,
            pageHeight
          );
          
          // Add semi-transparent overlay for text
          pdf.setFillColor(0, 0, 0);
          pdf.setGState(new pdf.GState({ opacity: 0.4 }));
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          pdf.setGState(new pdf.GState({ opacity: 1.0 }));
          
          // Add "The End" text
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(36);
          pdf.setFont("times", "bold");
          pdf.text("The End", pageWidth / 2, pageHeight / 3, { align: 'center' });
          
          // Add conclusion if available
          if (story.conclusion) {
            pdf.setFontSize(14);
            pdf.setFont("times", "normal");
            const conclusionLines = pdf.splitTextToSize(story.conclusion, pageWidth - 40);
            pdf.text(conclusionLines, pageWidth / 2, pageHeight * 2/3, { align: 'center' });
          }
        } catch (error) {
          console.error("Error adding end page image to PDF:", error);
          // Continue with the rest of the PDF generation
        }
      }
      
      // Save PDF
      pdf.save(`${(story?.title || "Your_Storybook").replace(/\s+/g, '_')}.pdf`);
      
      toast.dismiss("pdf-generation");
      toast.success("Your storybook is ready!");
      
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.dismiss("pdf-generation");
      toast.error("Failed to generate PDF. Please try again.");
    }
  };


  // Full Screen Reader Mode with flex-col layout for all pages
  // 5. Modify the FullScreenReader component to include cover and end pages
  const FullScreenReader = () => {
    return (
      <div className="fixed inset-0 z-50 m-28 flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-chewy text-gray-800">{story?.title || 'Your Story'}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={generatePDF}
              className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
            >
              <Download size={16} className="mr-2" />
              Download PDF
            </button>
            <button 
              onClick={() => setViewMode('reading')}
              className="flex items-center px-4 py-2 bg-gray-200 text-dark rounded-full hover:bg-gray-300 transition"
            >
              <ChevronLeft size={16} className="mr-2" />
              Back to Editor
            </button>
          </div>
        </div>
        
        {/* Scrollable container for all pages */}
        <div className="flex-grow overflow-y-auto py-8 px-4">
          <div className="flex flex-col items-center space-y-12 max-w-5xl mx-auto">
            {/* Cover Page */}
            <div className="w-full relative rounded-xl overflow-hidden shadow-xl" style={{ height: '85vh' }}>
              {story.coverPageImage ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${story.coverPageImage}')` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-6">
                    <h1 className="text-5xl md:text-6xl font-chewy text-white mb-6 text-center shadow-text">{story.title}</h1>
                    {story.mainCharacter && (
                      <p className="text-2xl text-white text-center shadow-text">
                        A story about {story.mainCharacter.name}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-primary-300 to-primary-600 flex flex-col items-center justify-center p-6">
                  <h1 className="text-5xl md:text-6xl font-chewy text-white mb-6 text-center shadow-text">{story.title}</h1>
                  {story.mainCharacter && (
                    <p className="text-2xl text-white text-center shadow-text">
                      A story about {story.mainCharacter.name}
                    </p>
                  )}
                </div>
              )}
              
              {/* Introduction text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <p className="text-gray-800">{story.introduction}</p>
                </div>
              </div>
            </div>
            
            {/* Map through all scenes and display each one */}
            {scenes.map((scene, index) => (
              <div 
                key={index}
                className="w-full relative rounded-xl overflow-hidden shadow-xl"
                style={{ height: '85vh' }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${scene?.image || ''})`,
                    filter: 'brightness(0.9)' // Slightly darken for text readability
                  }}
                />
  
                {/* Text Overlay - styled like the reference image */}
                <div className="absolute inset-0 flex items-end">
                  <div className="bg-white/50 rounded-xl w-full p-6 m-6 shadow-lg backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-dark mb-2">Scene {index + 1}: {scene.title}</h3>
                    <p className="text-black font-sans text-base">
                      {scene?.text || ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* End Page */}
            <div className="w-full relative rounded-xl overflow-hidden shadow-xl" style={{ height: '85vh' }}>
              {story.endPageImage ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url('${story.endPageImage}')` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-6">
                    <h2 className="text-5xl font-chewy text-white mb-6 text-center shadow-text">The End</h2>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-accent/70 to-accent flex flex-col items-center justify-center p-6">
                  <h2 className="text-5xl font-chewy text-dark mb-6 text-center">The End</h2>
                </div>
              )}
              
              {/* Conclusion text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <p className="text-gray-800">{story.conclusion}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSceneContent = () => {
    if (currentScene === 'cover') {
      return <CoverPage />;
    } else if (currentScene === 'end') {
      return <EndPage />;
    } else if (typeof currentScene === 'number' && scenes[currentScene]) {
      // Render regular scene (existing code)
      return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Scene header */}
          <div className="bg-primary-50 p-4 flex justify-between items-center">
            <h3 className="font-bold text-dark">Scene {currentScene + 1}: {scenes[currentScene]?.title || 'Scene'}</h3>
            
            <button
              onClick={toggleEditMode}
              className="flex items-center text-primary-500 hover:text-primary-600"
            >
              {viewMode === 'reading' ? (
                <>
                  <Edit size={16} className="mr-1" />
                  Edit Text
                </>
              ) : (
                <>
                  <BookOpen size={16} className="mr-1" />
                  Save Changes
                </>
              )}
            </button>
          </div>
          
          {/* Scene content */}
          <div className="p-6">
            {/* Visual area */}
            <div className="mb-6 bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              {scenes[currentScene]?.image ? (
                <img 
                  src={scenes[currentScene].image} 
                  alt={`Scene ${currentScene + 1}: ${scenes[currentScene].title || 'Scene'}`} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p>Scene {currentScene + 1} Illustration</p>
                  <p className="text-xs">No image generated for this scene</p>
                </div>
              )}
            </div>
            
            {/* Text area */}
            <div className="bg-gray-50 rounded-lg p-4">
              {viewMode === 'reading' ? (
                <p className="text-gray-700">{scenes[currentScene]?.text || ''}</p>
              ) : (
                <textarea
                  value={editableText}
                  onChange={handleTextChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="5"
                  placeholder="Edit the scene text here..."
                ></textarea>
              )}
            </div>
          </div>
        </div>
      );
    }

    return <div>No content available</div>;
  };

  // Render full-screen reader if in fullscreen mode
  if (viewMode === 'fullscreen') {
    return <FullScreenReader />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-chewy text-dark">{story?.title || 'Your Story'}</h2>
        
        <div className="flex space-x-3">
          <button
            onClick={generatePDF}
            className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition"
          >
            <Download size={16} className="mr-2" />
            Download
          </button>
          
          <button
            onClick={() => setViewMode('fullscreen')}
            className="flex items-center px-4 py-2 bg-accent text-dark rounded-full hover:bg-accent/90 transition"
          >
            <Book size={16} className="mr-2" />
            Read Storybook
          </button>
        </div>
      </div>
      
      {/* Scene navigation */}
      <div className="flex justify-between items-center mb-4">
      <button
        onClick={goToPreviousScene}
        disabled={currentScene === 'cover'}
        className={`flex items-center ${
          currentScene === 'cover' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        <ChevronLeft size={20} className="mr-1" />
        Previous
      </button>
      
      <div className="text-gray-600">
        Page: {getSceneNumber()}
      </div>
      
      <button
        onClick={goToNextScene}
        disabled={currentScene === 'end'}
        className={`flex items-center ${
          currentScene === 'end' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        Next
        <ChevronRight size={20} className="ml-1" />
      </button>
      </div>
      
      {/* Main canvas */}
      {renderSceneContent()}
      
      {/* Story overview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-dark mb-2">Story Overview</h3>
        <p className="text-gray-600 text-sm mb-4">{story?.introduction || 'Your interactive story.'}</p>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentScene('cover')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentScene === 'cover' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cover
          </button>
          
          {scenes.map((scene, index) => (
            <button
              key={index}
              onClick={() => setCurrentScene(index)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentScene === index 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Scene {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentScene('end')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentScene === 'end' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            End
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCanvas;