import React from 'react';

const StepNavigation = ({ 
  activeStep, 
  setActiveStep, 
  totalSteps, 
  completedSteps, 
  selectedPathway 
}) => {
  // Define steps based on the selected pathway
  const getSteps = () => {
    if (selectedPathway === 'character') {
      return [
        { number: 1, name: "Input Data" },
        { number: 2, name: "Generate Character" },
        // { number: 3, name: "Choose Animation" },
        // { number: 4, name: "Apply Effects" },
        // { number: 5, name: "Export" }
      ];
    } else if (selectedPathway === 'story') {
      return [
        { number: 1, name: "Story Details" },
        { number: 2, name: "Character Selection" },
        { number: 3, name: "Scene Building" },
        { number: 4, name: "Animation" },
        { number: 5, name: "Export" }
      ];
    }
    return [];
  };

  const steps = getSteps();

  return (
    <div className="flex justify-between mb-10 overflow-x-auto pb-2 gap-2">
      {steps.map((step) => (
        <button 
          key={step.number}
          onClick={() => {
            // Allow navigation to any step
            setActiveStep(step.number);
            window.scrollTo(0, 0);
          }}
          className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
            activeStep === step.number 
              ? 'bg-primary-500 text-white' 
              : completedSteps[step.number]
                ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } cursor-pointer`}
        >
          {step.number}. {step.name}
        </button>
      ))}
    </div>
  );
};

export default StepNavigation;