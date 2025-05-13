import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import PromptGenerationStep from '../components/PromptGenerationStep';
import CharacterGenerationStep from '../components/CharacterGenerationStep';
import AnimationStep from '../components/AnimationStep';
import ExportStep from '../components/ExportStep';
import StepNavigation from '../components/StepNavigation';

const CharacterCreation = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  
  // Character creation state
  const [portraitImage, setPortraitImage] = useState(null);
  const [portraitPreview, setPortraitPreview] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generationSettings, setGenerationSettings] = useState({
    model: 'Flux Dev',
    style: 'Dynamic',
    prompt: '',
    negativePrompt: '',
    aspectRatio: '1:1',
    numberOfImages: 4
  });

  // Total number of steps
  const totalSteps = 2;

  // Handle moving to the next step
  const handleNextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle moving to the previous step
  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    } else {
      // If we're at the first step, go back to the dashboard
      navigate('/work-area');
    }
  };

  // Progress bar calculation
  const progressPercentage = (activeStep / totalSteps) * 100;

  // Track step completion status
  const [completedSteps, setCompletedSteps] = useState({
    1: false,
    2: false,
    // 3: false,
    // 4: false,
  });

  // Update completed steps when relevant state changes
  useEffect(() => {
    setCompletedSteps(prev => ({
      ...prev,
      1: !!generatedPrompt,
      2: !!selectedImage
    }));
  }, [generatedPrompt, selectedImage]);

  // Get step title based on active step
  const getStepTitle = () => {
    switch (activeStep) {
      case 1:
        return "Create Your Character - Input Data";
      case 2:
        return "Create Your Character - Generate Character";
      // case 3:
      //   return "Create Your Character - Choose Animation";
      // case 4:
      //   return "Create Your Character - Export";
      default:
        return "Create Your Character";
    }
  };

  return (
    <div className="min-h-screen bg-light py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-sans text-dark">{getStepTitle()}</h1>
          <div className="text-gray-500 flex items-center">
            <Clock size={18} className="mr-2" />
            <span>Step {activeStep} of {totalSteps}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full mb-10">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Steps navigation */}
        <StepNavigation 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
          totalSteps={totalSteps}
          completedSteps={completedSteps}
          selectedPathway="character"
        />

        {/* Step content */}
        <div className="mt-8">
          {activeStep === 1 && (
            <PromptGenerationStep 
              portraitImage={portraitImage}
              setPortraitImage={setPortraitImage}
              portraitPreview={portraitPreview}
              setPortraitPreview={setPortraitPreview}
              userData={userData}
              setUserData={setUserData}
              generatedPrompt={generatedPrompt}
              setGeneratedPrompt={setGeneratedPrompt}
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
              handleNextStep={handleNextStep}
            />
          )}
          
          {activeStep === 2 && (
            <CharacterGenerationStep 
              generatedPrompt={generatedPrompt}
              generationSettings={generationSettings}
              setGenerationSettings={setGenerationSettings}
              generatedImages={generatedImages}
              setGeneratedImages={setGeneratedImages}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              handleNextStep={handleNextStep}
            />
          )}
          
          {/* {activeStep === 3 && (
            <AnimationStep 
              selectedImage={selectedImage || portraitPreview}
              handleNextStep={handleNextStep}
            />
          )}
          
          {activeStep === 4 && (
            <ExportStep 
              selectedImage={selectedImage || portraitPreview}
            />
          )} */}
        </div>

        {/* Footer navigation buttons */}
        <div className="mt-10 flex justify-between">
          <button 
            onClick={handlePrevStep}
            className="px-6 py-3 rounded-full font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            <div className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              {activeStep === 1 ? 'Back to Dashboard' : 'Previous Step'}
            </div>
          </button>
          
          {activeStep < totalSteps && (
            <button 
              onClick={handleNextStep}
              className="px-6 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
            >
              <div className="flex items-center">
                Next Step
                <ArrowRight size={16} className="ml-2" />
              </div>
            </button>
          )}
          
          {activeStep === totalSteps && (
            <button 
              className="px-6 py-3 rounded-full font-bold bg-accent text-dark hover:bg-accent/90 transition"
            >
              Complete & Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;