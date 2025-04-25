// // Dashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
// import PromptGenerationStep from '../components/PromptGenerationStep';
// import CharacterGenerationStep from '../components/CharacterGenerationStep';
// import AnimationStep from '../components/AnimationStep';
// import EffectsStep from '../components/EffectsStep';
// import ExportStep from '../components/ExportStep';
// import StepNavigation from '../components/StepNavigation';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(1);
//   const [portraitImage, setPortraitImage] = useState(null);
//   const [portraitPreview, setPortraitPreview] = useState('');
//   const [userData, setUserData] = useState({
//     name: '',
//     age: '',
//     gender: ''
//   });
//   const [generatedPrompt, setGeneratedPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImages, setGeneratedImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [generationSettings, setGenerationSettings] = useState({
//     model: 'Flux Dev',
//     style: 'Dynamic',
//     prompt: '',
//     negativePrompt: '',
//     aspectRatio: '1:1',
//     numberOfImages: 4
//   });

//   // Total number of steps in the process
//   const totalSteps = 5;

//   // Handle moving to the next step
//   const handleNextStep = () => {
//     if (activeStep < totalSteps) {
//       setActiveStep(activeStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Handle moving to the previous step
//   const handlePrevStep = () => {
//     if (activeStep > 1) {
//       setActiveStep(activeStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Progress bar calculation
//   const progressPercentage = (activeStep / totalSteps) * 100;

//   // Track step completion status
//   const [completedSteps, setCompletedSteps] = useState({
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//     5: false
//   });

//   // Update completed steps when relevant state changes
//   useEffect(() => {
//     setCompletedSteps(prev => ({
//       ...prev,
//       1: !!generatedPrompt,
//       2: !!selectedImage
//     }));
//   }, [generatedPrompt, selectedImage]);

//   return (
//     <div className="min-h-screen bg-light py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-chewy text-dark">Create Your Character</h1>
//           <div className="text-gray-500 flex items-center">
//             <Clock size={18} className="mr-2" />
//             <span>Step {activeStep} of {totalSteps}</span>
//           </div>
//         </div>

//         {/* Progress bar */}
//         <div className="w-full h-3 bg-gray-200 rounded-full mb-10">
//           <div 
//             className="h-full bg-primary-500 rounded-full transition-all duration-300"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>

//         {/* Steps navigation - modified to allow any step to be accessed */}
//         <StepNavigation 
//           activeStep={activeStep} 
//           setActiveStep={setActiveStep} 
//           totalSteps={totalSteps}
//           completedSteps={completedSteps}
//         />

//         {/* Step content */}
//         <div className="mt-8">
//           {activeStep === 1 && (
//             <PromptGenerationStep 
//               portraitImage={portraitImage}
//               setPortraitImage={setPortraitImage}
//               portraitPreview={portraitPreview}
//               setPortraitPreview={setPortraitPreview}
//               userData={userData}
//               setUserData={setUserData}
//               generatedPrompt={generatedPrompt}
//               setGeneratedPrompt={setGeneratedPrompt}
//               isGenerating={isGenerating}
//               setIsGenerating={setIsGenerating}
//               handleNextStep={handleNextStep}
//             />
//           )}
          
//           {activeStep === 2 && (
//             <CharacterGenerationStep 
//               generatedPrompt={generatedPrompt}
//               generationSettings={generationSettings}
//               setGenerationSettings={setGenerationSettings}
//               generatedImages={generatedImages}
//               setGeneratedImages={setGeneratedImages}
//               selectedImage={selectedImage}
//               setSelectedImage={setSelectedImage}
//               handleNextStep={handleNextStep}
//             />
//           )}
          
//           {activeStep === 3 && (
//             <AnimationStep 
//               selectedImage={selectedImage || portraitPreview} // Use portrait preview if no selected image
//               handleNextStep={handleNextStep}
//             />
//           )}
          
//           {activeStep === 4 && (
//             <EffectsStep 
//               selectedImage={selectedImage || portraitPreview}
//               handleNextStep={handleNextStep}
//             />
//           )}
          
//           {activeStep === 5 && (
//             <ExportStep 
//               selectedImage={selectedImage || portraitPreview}
//             />
//           )}
//         </div>

//         {/* Footer navigation buttons */}
//         <div className="mt-10 flex justify-between">
//           <button 
//             onClick={handlePrevStep}
//             className={`px-6 py-3 rounded-full font-bold ${
//               activeStep > 1 
//                 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition' 
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//             disabled={activeStep === 1}
//           >
//             <div className="flex items-center">
//               <ArrowLeft size={16} className="mr-2" />
//               Previous Step
//             </div>
//           </button>
          
//           {activeStep < totalSteps && (
//             <button 
//               onClick={handleNextStep}
//               className="px-6 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
//             >
//               <div className="flex items-center">
//                 Next Step
//                 <ArrowRight size={16} className="ml-2" />
//               </div>
//             </button>
//           )}
          
//           {activeStep === totalSteps && (
//             <button 
//               className="px-6 py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition"
//             >
//               Complete & Download
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
// import PathwaySelection from '../components/PathwaySelection';
// import PromptGenerationStep from '../components/PromptGenerationStep';
// import CharacterGenerationStep from '../components/CharacterGenerationStep';
// import AnimationStep from '../components/AnimationStep';
// import EffectsStep from '../components/EffectsStep';
// import ExportStep from '../components/ExportStep';
// import StepNavigation from '../components/StepNavigation';
// import StoryDetailsStep from '../components/StoryDetailsStep';
// import StoryCharacterSelection from '../components/StoryCharacterSelection';
// import WelcomeDashboard from '../components/WelcomeDashBoard';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [showWelcome, setShowWelcome] = useState(true); // New state for welcome screen
//   const [activeStep, setActiveStep] = useState(0); // Changed to 0 for pathway selection
//   const [selectedPathway, setSelectedPathway] = useState(null); // 'character' or 'story'
  
//   // Character creation state
//   const [portraitImage, setPortraitImage] = useState(null);
//   const [portraitPreview, setPortraitPreview] = useState('');
//   const [userData, setUserData] = useState({
//     name: '',
//     age: '',
//     gender: ''
//   });
//   const [generatedPrompt, setGeneratedPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImages, setGeneratedImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [generationSettings, setGenerationSettings] = useState({
//     model: 'Flux Dev',
//     style: 'Dynamic',
//     prompt: '',
//     negativePrompt: '',
//     aspectRatio: '1:1',
//     numberOfImages: 4
//   });
  
//   // Story creation state
//   const [storyDetails, setStoryDetails] = useState({
//     title: '',
//     ageGroup: '3-6',
//     theme: '',
//     storyType: 'adventure',
//     length: 'short',
//     description: ''
//   });
//   const [storyCharacters, setStoryCharacters] = useState([]);
//   const [storyScenes, setStoryScenes] = useState([]);

//   // Total number of steps in each process
//   const characterSteps = 5; // Existing steps
//   const storySteps = 5; // Placeholder for story steps

//   // Handle starting creation process from welcome screen
//   const handleStartCreating = () => {
//     setShowWelcome(false);
//   };

//   // Handle pathway selection
//   const handleSelectPathway = (pathway) => {
//     setSelectedPathway(pathway);
//     setActiveStep(1); // Move to first step after selection
//     window.scrollTo(0, 0);
//   };

//   // Handle moving to the next step
//   const handleNextStep = () => {
//     const totalSteps = selectedPathway === 'character' ? characterSteps : storySteps;
//     if (activeStep < totalSteps) {
//       setActiveStep(activeStep + 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Handle moving to the previous step
//   const handlePrevStep = () => {
//     if (activeStep > 0) {
//       setActiveStep(activeStep - 1);
//       window.scrollTo(0, 0);
//     }
//   };

//   // Progress bar calculation
//   const getTotalSteps = () => {
//     if (!selectedPathway) return 1; // Only pathway selection
//     return selectedPathway === 'character' ? characterSteps : storySteps;
//   };
  
//   const progressPercentage = (activeStep / getTotalSteps()) * 100;

//   // Track step completion status
//   const [completedSteps, setCompletedSteps] = useState({
//     0: false, // Pathway selection
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//     5: false
//   });

//   // Update completed steps when relevant state changes
//   useEffect(() => {
//     setCompletedSteps(prev => ({
//       ...prev,
//       0: !!selectedPathway, // Pathway selection completed
//       1: selectedPathway === 'character' ? !!generatedPrompt : false,
//       2: selectedPathway === 'character' ? !!selectedImage : false
//     }));
//   }, [selectedPathway, generatedPrompt, selectedImage]);

//   // Get step title based on pathway and active step
//   const getStepTitle = () => {
//     if (showWelcome) return "Creator Dashboard";
//     if (activeStep === 0) return "Choose Your Creation Path";
    
//     if (selectedPathway === 'character') {
//       switch (activeStep) {
//         case 1:
//           return "Create Your Character - Input Data";
//         case 2:
//           return "Create Your Character - Generate Character";
//         case 3:
//           return "Create Your Character - Choose Animation";
//         case 4:
//           return "Create Your Character - Apply Effects";
//         case 5:
//           return "Create Your Character - Export";
//         default:
//           return "Create Your Character";
//       }
//     } else {
//       switch (activeStep) {
//         case 1:
//           return "Create A Story - Story Details";
//         case 2:
//           return "Create A Story - Character Selection";
//         case 3:
//           return "Create A Story - Scene Building";
//         case 4:
//           return "Create A Story - Animation";
//         case 5:
//           return "Create A Story - Export";
//         default:
//           return "Create A Story";
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-light py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl md:text-4xl font-chewy text-dark">{getStepTitle()}</h1>
//           {!showWelcome && (
//             <div className="text-gray-500 flex items-center">
//               <Clock size={18} className="mr-2" />
//               <span>Step {activeStep} of {getTotalSteps()}</span>
//             </div>
//           )}
//         </div>

//         {/* Progress bar - only show if not on welcome screen */}
//         {!showWelcome && (
//           <div className="w-full h-3 bg-gray-200 rounded-full mb-10">
//             <div 
//               className="h-full bg-primary-500 rounded-full transition-all duration-300"
//               style={{ width: `${progressPercentage}%` }}
//             ></div>
//           </div>
//         )}

//         {/* Steps navigation - only show if a pathway is selected */}
//         {!showWelcome && selectedPathway && (
//           <StepNavigation 
//             activeStep={activeStep} 
//             setActiveStep={setActiveStep} 
//             totalSteps={getTotalSteps()}
//             completedSteps={completedSteps}
//             selectedPathway={selectedPathway}
//           />
//         )}

//         {/* Step content */}
//         <div className="mt-8">
//           {/* Welcome dashboard */}
//           {showWelcome && (
//             <WelcomeDashboard onStartCreating={handleStartCreating} />
//           )}
          
//           {/* Initial pathway selection */}
//           {!showWelcome && activeStep === 0 && (
//             <PathwaySelection onSelectPathway={handleSelectPathway} />
//           )}
          
//           {/* Character creation flow */}
//           {!showWelcome && selectedPathway === 'character' && (
//             <>
//               {activeStep === 1 && (
//                 <PromptGenerationStep 
//                   portraitImage={portraitImage}
//                   setPortraitImage={setPortraitImage}
//                   portraitPreview={portraitPreview}
//                   setPortraitPreview={setPortraitPreview}
//                   userData={userData}
//                   setUserData={setUserData}
//                   generatedPrompt={generatedPrompt}
//                   setGeneratedPrompt={setGeneratedPrompt}
//                   isGenerating={isGenerating}
//                   setIsGenerating={setIsGenerating}
//                   handleNextStep={handleNextStep}
//                 />
//               )}
              
//               {activeStep === 2 && (
//                 <CharacterGenerationStep 
//                   generatedPrompt={generatedPrompt}
//                   generationSettings={generationSettings}
//                   setGenerationSettings={setGenerationSettings}
//                   generatedImages={generatedImages}
//                   setGeneratedImages={setGeneratedImages}
//                   selectedImage={selectedImage}
//                   setSelectedImage={setSelectedImage}
//                   handleNextStep={handleNextStep}
//                 />
//               )}
              
//               {activeStep === 3 && (
//                 <AnimationStep 
//                   selectedImage={selectedImage || portraitPreview}
//                   handleNextStep={handleNextStep}
//                 />
//               )}
              
//               {activeStep === 4 && (
//                 <EffectsStep 
//                   selectedImage={selectedImage || portraitPreview}
//                   handleNextStep={handleNextStep}
//                 />
//               )}
              
//               {activeStep === 5 && (
//                 <ExportStep 
//                   selectedImage={selectedImage || portraitPreview}
//                 />
//               )}
//             </>
//           )}
          
//           {/* Story creation flow */}
//           {!showWelcome && selectedPathway === 'story' && (
//             <>
//               {activeStep === 1 && (
//                 <StoryDetailsStep handleNextStep={handleNextStep} />
//               )}
              
//               {activeStep === 2 && (
//                 <StoryCharacterSelection handleNextStep={handleNextStep} />
//               )}
              
//               {activeStep > 2 && (
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <h2 className="text-2xl font-chewy text-dark mb-6">Story Creation - Step {activeStep}</h2>
//                   <p className="text-gray-600 mb-6">
//                     This part of the story creation feature is coming soon! We're working on building the complete story creation pathway.
//                   </p>
//                   <div className="flex justify-center">
//                     <button 
//                       onClick={handleNextStep}
//                       className="px-8 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
//                     >
//                       Continue to Next Step
//                       <ArrowRight size={18} className="ml-2" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>

//         {/* Footer navigation buttons - only show if not on welcome screen */}
//         {!showWelcome && (
//           <div className="mt-10 flex justify-between">
//             <button 
//               onClick={handlePrevStep}
//               className={`px-6 py-3 rounded-full font-bold ${
//                 activeStep > 0 
//                   ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 transition' 
//                   : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//               }`}
//               disabled={activeStep === 0}
//             >
//               <div className="flex items-center">
//                 <ArrowLeft size={16} className="mr-2" />
//                 Previous Step
//               </div>
//             </button>
            
//             {activeStep > 0 && activeStep < getTotalSteps() && (
//               <button 
//                 onClick={handleNextStep}
//                 className="px-6 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
//               >
//                 <div className="flex items-center">
//                   Next Step
//                   <ArrowRight size={16} className="ml-2" />
//                 </div>
//               </button>
//             )}
            
//             {activeStep === getTotalSteps() && (
//               <button 
//                 className="px-6 py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition"
//               >
//                 Complete & Download
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeDashboard from '../components/WelcomeDashboard';
import PathwaySelection from '../components/PathwaySelection';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  // Handle starting creation process from welcome screen
  const handleStartCreating = () => {
    setShowWelcome(false);
  };

  // Handle pathway selection
  const handleSelectPathway = (pathway) => {
    if (pathway === 'character') {
      navigate('/character-creation');
    } else if (pathway === 'story') {
      navigate('/story-creation');
    }
  };

  return (
    <div className="min-h-screen bg-light py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-chewy text-dark">
            {showWelcome ? "Creator Dashboard" : "Choose Your Creation Path"}
          </h1>
        </div>

        {/* Content */}
        <div className="mt-8">
          {/* Welcome dashboard */}
          {showWelcome && (
            <WelcomeDashboard onStartCreating={handleStartCreating} />
          )}
          
          {/* Pathway selection */}
          {!showWelcome && (
            <PathwaySelection onSelectPathway={handleSelectPathway} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;