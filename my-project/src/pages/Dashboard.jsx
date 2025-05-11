import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeDashboard from '../components/WelcomeDashBoard';
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