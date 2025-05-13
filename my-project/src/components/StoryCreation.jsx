// // pages/StoryCreation.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import StoryStartPrompt from '../components/StoryStartPrompt';
// import ChildCharacterForm from '../components/ChildCharacterForm';
// import StoryTypeSelector from '../components/StoryTypeSelector';
// import StoryGenerator from '../components/StoryGenerator';
// import StoryCanvas from '../components/StoryCanvas';

// const StoryCreation = () => {
//   const navigate = useNavigate();
  
//   // Current step in the story creation flow
//   const [currentStep, setCurrentStep] = useState(1);
  
//   // Story data state
//   const [storyData, setStoryData] = useState({
//     includeChild: null,
//     childCharacter: {
//       name: '',
//       age: '',
//       gender: '',
//       appearance: '',
//       personality: ''
//     },
//     storyType: '',
//     generatedStory: null,
//     scenes: []
//   });

//   // Handle the initial choice of including child in story
//   const handleChildChoice = (includeChild) => {
//     console.log("handleChildChoice called with:", includeChild);
//     setStoryData({
//       ...storyData,
//       includeChild : false
//     });
    
//     console.log("Setting currentStep to:", includeChild ? 2 : 3);
//     // If user wants to include child, go to character form, otherwise to story type
//     // setCurrentStep(includeChild ? 2 : 3);
//     setCurrentStep(3)
//   };

//   // Handle child character form submission
//   const handleCharacterSubmit = (childCharacter) => {
//     setStoryData({
//       ...storyData,
//       childCharacter
//     });
    
//     // Move to story type selection
//     setCurrentStep(3);
//   };

//   // Handle story type selection
//   const handleStoryTypeSelect = (storyType) => {
//     setStoryData({
//       ...storyData,
//       storyType
//     });
    
//     // Move to story generation
//     setCurrentStep(4);
//   };

//   // Handle generated story
//   const handleStoryGenerated = (generatedStory, scenes) => {
//     setStoryData({
//       ...storyData,
//       generatedStory,
//       scenes
//     });
    
//     // Move to canvas view
//     setCurrentStep(5);
//   };

//   // Go back to previous step or dashboard
//   // const handleBack = () => {
//   //   if (currentStep === 1) {
//   //     navigate('/work-area');
//   //   } else {
//   //     setCurrentStep(currentStep - 1);
//   //   }
//   // };

//   // Go back to previous step or dashboard
//   const handleBack = () => {
//     if (currentStep === 1) {
//       navigate('/work-area');
//     } else if (currentStep === 3) {
//       // If we're at the story type selection step (3), go back to the first step (1)
//       // instead of the child character form (2)
//       setCurrentStep(1);
//     } else {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   // Render the current step
//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <StoryStartPrompt onChoice={handleChildChoice} />;
//       case 2:
//         return <ChildCharacterForm onSubmit={handleCharacterSubmit} />;
//       case 3:
//         return <StoryTypeSelector onSelect={handleStoryTypeSelect} />;
//       case 4:
//         return (
//           <StoryGenerator 
//             includeChild={storyData.includeChild}
//             childCharacter={storyData.childCharacter}
//             storyType={storyData.storyType}
//             onStoryGenerated={handleStoryGenerated}
//           />
//         );
//       case 5:
//         return <StoryCanvas story={storyData.generatedStory} scenes={storyData.scenes} />;
//       default:
//         return <StoryStartPrompt onChoice={handleChildChoice} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-light py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-3xl md:text-4xl font-sans text-dark">Create Your Story</h1>
//           <button 
//             onClick={handleBack}
//             className="flex items-center text-gray-600 hover:text-gray-800"
//           >
//             <ArrowLeft size={18} className="mr-2" />
//             {currentStep === 1 ? 'Back to Dashboard' : 'Previous Step'}
//           </button>
//         </div>
        
//         {/* Main content area */}
//         <div className="bg-white rounded-2xl shadow-lg">
//           {renderStep()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryCreation;

// pages/StoryCreation.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StoryStartPrompt from '../components/StoryStartPrompt';
import ChildCharacterForm from '../components/ChildCharacterForm';
import StoryTypeSelector from '../components/StoryTypeSelector';
import StoryGenerator from '../components/StoryGenerator'

const StoryCreation = () => {
  const navigate = useNavigate();
  
  // Current step in the story creation flow
  const [currentStep, setCurrentStep] = useState(1);
  
  // Story data state
  const [storyData, setStoryData] = useState({
    includeChild: null,
    childCharacter: {
      name: '',
      age: '',
      gender: '',
      appearance: '',
      personality: ''
    },
    storyType: ''
  });

  // Handle the initial choice of including child in story
  const handleChildChoice = (includeChild) => {
    console.log("handleChildChoice called with:", includeChild);
    setStoryData({
      ...storyData,
      includeChild : false
    });
    
    console.log("Setting currentStep to:", includeChild ? 2 : 3);
    // If user wants to include child, go to character form, otherwise to story type
    // setCurrentStep(includeChild ? 2 : 3);
    setCurrentStep(3)
  };

  // Handle child character form submission
  const handleCharacterSubmit = (childCharacter) => {
    setStoryData({
      ...storyData,
      childCharacter
    });
    
    // Move to story type selection
    setCurrentStep(3);
  };

  // Handle story type selection
  const handleStoryTypeSelect = (storyType) => {
    setStoryData({
      ...storyData,
      storyType
    });
    
    // Move to story generation
    setCurrentStep(4);
  };

  // Go back to previous step or dashboard
  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/work-area');
    } else if (currentStep === 3) {
      // If we're at the story type selection step (3), go back to the first step (1)
      // instead of the child character form (2)
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StoryStartPrompt onChoice={handleChildChoice} />;
      case 2:
        return <ChildCharacterForm onSubmit={handleCharacterSubmit} />;
      case 3:
        return <StoryTypeSelector onSelect={handleStoryTypeSelect} />;
      case 4:
        return (
          <StoryGenerator 
            includeChild={storyData.includeChild}
            childCharacter={storyData.childCharacter}
            storyType={storyData.storyType}
          />
        );
      default:
        return <StoryStartPrompt onChoice={handleChildChoice} />;
    }
  };

  return (
    <div className="min-h-screen bg-light py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-sans text-dark">Create Your Story</h1>
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={18} className="mr-2" />
            {currentStep === 1 ? 'Back to Dashboard' : 'Previous Step'}
          </button>
        </div>
        
        {/* Main content area */}
        <div className="bg-white rounded-2xl shadow-lg">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default StoryCreation;