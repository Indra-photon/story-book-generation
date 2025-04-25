// components/story/StoryGenerator.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import axios from 'axios';

const StoryGenerator = ({ includeChild, childCharacter, storyType, onStoryGenerated }) => {
  const [loading, setLoading] = useState(true);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [story, setStory] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [error, setError] = useState(null);
  const [coverPageImage, setCoverPageImage] = useState(null);
  const [endPageImage, setEndPageImage] = useState(null);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [isGeneratingEndPage, setIsGeneratingEndPage] = useState(false);

  useEffect(() => {
    const generateStory = async () => {
      setLoading(true);
      setError(null);
      try {
        // Show progress indicator
        setGenerationProgress(30);
        
        // Make API call to backend to generate story
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-prompt`,
          {
            includeChild,
            childCharacter,
            storyType
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        
        setGenerationProgress(70);
        
        if (response.data.success) {
          const generatedContent = response.data.data;
          
          console.log('Generated Content:', generatedContent);
          setStory({
            title: generatedContent.title,
            mainCharacter: includeChild ? childCharacter : 
              generatedContent.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
            storyType: storyType,
            introduction: generatedContent.introduction,
            conclusion: generatedContent.conclusion,
            // Add these properties:
            coverPageVisualDescription: generatedContent.coverPagescene?.visualDescription || '',
            endPageVisualDescription: generatedContent.endPagescene?.visualDescription || ''
          });
          
          
          setScenes(generatedContent.scenes.map((scene, index) => ({
            id: index + 1,
            title: scene.title,
            text: scene.text,
            image: scene.image || null,
            visualDescription: scene.visualDescription
          })));
          
          setGenerationProgress(100);
          setLoading(false);
        } else {
          throw new Error("Failed to generate story");
        }
      } catch (err) {
        console.error('Error generating story:', err);
        setError('Failed to generate story. Please try again.');
        setLoading(false);
      }
      
      // try {
      //   // This would be replaced with actual API calls in production
      //   // For now, we'll simulate the generation process
        
      //   // Simulate story generation progress
      //   for (let i = 0; i <= 100; i += 10) {
      //     setGenerationProgress(i);
      //     await new Promise(resolve => setTimeout(resolve, 500));
      //   }
        
      //   // Generate sample story based on parameters
      //   const mainCharacterName = includeChild ? childCharacter.name : 'Alex';
      //   const mainCharacterAge = includeChild ? childCharacter.age : '8';
      //   const mainCharacterGender = includeChild ? childCharacter.gender : 'child';
        
      //   // Create story title and introduction based on type and character
      //   let storyTitle, storyIntro;
        
      //   switch (storyType) {
      //     case 'adventure':
      //       storyTitle = `${mainCharacterName}'s Amazing Journey`;
      //       storyIntro = `${mainCharacterName}, a brave ${mainCharacterAge}-year-old ${mainCharacterGender.toLowerCase()}, discovers a magical map that leads to an incredible adventure.`;
      //       break;
      //     case 'fantasy':
      //       storyTitle = `${mainCharacterName} and the Enchanted Forest`;
      //       storyIntro = `${mainCharacterName}, a curious ${mainCharacterAge}-year-old ${mainCharacterGender.toLowerCase()}, stumbles upon a hidden door that leads to an enchanted forest filled with magical creatures.`;
      //       break;
      //     case 'educational':
      //       storyTitle = `${mainCharacterName} Learns About Space`;
      //       storyIntro = `${mainCharacterName}, an inquisitive ${mainCharacterAge}-year-old ${mainCharacterGender.toLowerCase()}, dreams of becoming an astronaut and learns amazing facts about our solar system.`;
      //       break;
      //     case 'bedtime':
      //       storyTitle = `${mainCharacterName}'s Sleepy Adventure`;
      //       storyIntro = `As bedtime approaches, ${mainCharacterName}, a tired but imaginative ${mainCharacterAge}-year-old ${mainCharacterGender.toLowerCase()}, goes on one last adventure before drifting off to sleep.`;
      //       break;
      //     default:
      //       storyTitle = `${mainCharacterName}'s Special Day`;
      //       storyIntro = `${mainCharacterName}, an enthusiastic ${mainCharacterAge}-year-old ${mainCharacterGender.toLowerCase()}, wakes up to discover that today is going to be very special.`;
      //   }
        
      //   // Generate sample scenes (in a real app, this would come from the API)
      //   const generatedScenes = [
      //     {
      //       id: 1,
      //       title: 'The Beginning',
      //       text: storyIntro,
      //       image: '/sample-scene-1.jpg' // This would be a generated image URL in production
      //     },
      //     {
      //       id: 2,
      //       title: 'The Discovery',
      //       text: `${mainCharacterName} discovers something unusual and decides to investigate further.`,
      //       image: '/sample-scene-2.jpg'
      //     },
      //     {
      //       id: 3,
      //       title: 'The Challenge',
      //       text: `A challenge appears, but ${mainCharacterName} is determined to overcome it with courage and creativity.`,
      //       image: '/sample-scene-3.jpg'
      //     },
      //     {
      //       id: 4,
      //       title: 'The Resolution',
      //       text: `After a thrilling adventure, ${mainCharacterName} solves the problem and learns an important lesson.`,
      //       image: '/sample-scene-4.jpg'
      //     }
      //   ];
        
      //   // Create the full story object
      //   const generatedStory = {
      //     title: storyTitle,
      //     mainCharacter: includeChild ? childCharacter : { name: 'Alex', age: '8', gender: 'child' },
      //     storyType: storyType,
      //     introduction: storyIntro,
      //     conclusion: `And so, after an amazing adventure, ${mainCharacterName} returned home with new wisdom and wonderful memories. The End.`
      //   };
        
      //   setStory(generatedStory);
      //   setScenes(generatedScenes);
      //   setLoading(false);
        
      // } catch (err) {
      //   console.error('Error generating story:', err);
      //   setError('Failed to generate story. Please try again.');
      //   setLoading(false);
      // }
    };
    
    generateStory();
  }, [includeChild, childCharacter, storyType]);

  const handleRegenerateStory = async () => {
    setLoading(true);
    setGenerationProgress(0);
    setError(null);
    
    try {
      // Show progress indicator
      setGenerationProgress(30);
      
      // Make API call to backend to generate story
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-prompt`,
        {
          includeChild,
          childCharacter,
          storyType
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      setGenerationProgress(70);
      
      if (response.data.success) {
        const generatedContent = response.data.data;
        
        setStory({
          title: generatedContent.title,
          mainCharacter: includeChild ? childCharacter : 
            generatedContent.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
          storyType: storyType,
          introduction: generatedContent.introduction,
          conclusion: generatedContent.conclusion,
          // Add these properties:
          coverPageVisualDescription: generatedContent.coverPageScene?.visualDescription || '',
          endPageVisualDescription: generatedContent.endPageScene?.visualDescription || ''
        });
        
        setScenes(generatedContent.scenes.map((scene, index) => ({
          id: index + 1,
          title: scene.title,
          text: scene.text,
          image: scene.image || null,
          visualDescription: scene.visualDescription
        })));
        
        setGenerationProgress(100);
        setLoading(false);
      } else {
        throw new Error("Failed to generate story");
      }
    } catch (err) {
      console.error('Error generating story:', err);
      setError('Failed to generate story. Please try again.');
      setLoading(false);
    }
  };
  
  const handleContinue = () => {
    if (story && scenes.length > 0) {
      const completeStory = {
        ...story,
        coverPageImage,
        endPageImage
      };
      
      onStoryGenerated(completeStory, scenes);
    }
  };

  const handleGenerateCoverImage = async () => {
    if (!story || !story.coverPageVisualDescription) {
      console.error('Missing cover page description');
      return;
    }
    
    setIsGeneratingCover(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-illustration`,
        {
          sceneId: 'cover',
          visualDescription: story.coverPageVisualDescription
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      if (response.data && response.data.success) {
        setCoverPageImage(response.data.data.imageUrl);
      } else {
        throw new Error(response.data?.message || "Failed to generate cover image");
      }
    } catch (err) {
      console.error('Error generating cover image:', err);
    } finally {
      setIsGeneratingCover(false);
    }
  };
  
  const handleGenerateEndPageImage = async () => {
    if (!story || !story.endPageVisualDescription) {
      console.error('Missing end page description');
      return;
    }
    
    setIsGeneratingEndPage(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-illustration`,
        {
          sceneId: 'end',
          visualDescription: story.endPageVisualDescription
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      if (response.data && response.data.success) {
        setEndPageImage(response.data.data.imageUrl);
      } else {
        throw new Error(response.data?.message || "Failed to generate end page image");
      }
    } catch (err) {
      console.error('Error generating end page image:', err);
    } finally {
      setIsGeneratingEndPage(false);
    }
  };

const handleGenerateSceneImage = async (sceneId, visualDescription) => {
  
  try {
    const sceneIndex = scenes.findIndex(scene => scene.id === sceneId);
    if (sceneIndex === -1) return;
    
    // Create a new copy of scenes with the loading state
    const updatedScenes = scenes.map((scene, index) => 
      index === sceneIndex 
        ? { ...scene, isGeneratingImage: true }
        : scene
    );
    
    // Immediately update the scenes state to show loading
    setScenes(updatedScenes);
    
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-illustration`,
      {
        sceneId,
        visualDescription
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
    // Verify the response structure
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to generate image");
    }
    
    const imageUrl = response.data.data.imageUrl;
    
    // Update the specific scene with the new image and remove loading state
    const finalUpdatedScenes = scenes.map((scene) => 
      scene.id === sceneId 
        ? { 
            ...scene, 
            image: imageUrl, 
            isGeneratingImage: false 
          }
        : scene
    );
    
    // Set the updated scenes
    setScenes(finalUpdatedScenes);
    console.log('After updating scenes - Updated Scenes:', finalUpdatedScenes);
  } catch (err) {
    console.error('Full error object:', err);
    console.error('Error response:', err.response?.data);
    
    // Update scenes to remove loading state and optionally show an error
    const finalUpdatedScenes = scenes.map((scene) => 
      scene.id === sceneId 
        ? { 
            ...scene, 
            isGeneratingImage: false,
            imageGenerationError: err.message 
          }
        : scene
    );
    
    setScenes(finalUpdatedScenes);
  }
};

// Regenerate an image for a specific scene (reuses the same function but can be extended)
const handleRegenerateSceneImage = async (sceneId, visualDescription) => {
  // For now, simply reuse the generate function
  // In a more advanced implementation, you might want to modify the prompt slightly
  // or send a flag to the backend indicating this is a regeneration request
  await handleGenerateSceneImage(sceneId, visualDescription);
};

  return (
    <div className="p-8">
      <h2 className="text-2xl font-chewy text-dark mb-6">Generate Your Story</h2>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block mx-auto mb-6">
            <svg className="animate-spin h-12 w-12 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-dark mb-2">Creating Your Story</h3>
          <p className="text-gray-600 mb-6">
            Our AI is crafting a unique story based on your selections. This may take a moment...
          </p>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{generationProgress}% complete</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 max-w-md mx-auto">
            <p>{error}</p>
          </div>
          <button
            onClick={handleRegenerateStory}
            className="px-6 py-2 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center mx-auto"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-bold text-dark mb-4">{story.title}</h3>
            <p className="text-gray-700 mb-4">{story.introduction}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">Story Type: <span className="font-medium capitalize">{story.storyType}</span></span>
              <span>Main Character: <span className="font-medium">{story.mainCharacter.name}</span></span>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-dark mb-4">Preview Scenes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {scenes.map((scene) => (
              <div key={scene.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                  {scene.isGeneratingImage ? (
                    <div className="text-center">
                      <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-xs text-gray-500">Generating image...</p>
                    </div>
                  ) : scene.image ? (
                    <img 
                      src={scene.image} 
                      alt={`Scene ${scene.id}: ${scene.title}`} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <p>Scene {scene.id} Image</p>
                      <p className="text-xs">Click Generate to create image</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-dark mb-1">Scene {scene.id}: {scene.title}</h4>
                  <p className="text-sm text-gray-600">{scene.text}</p>
                  {scene.visualDescription && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <h5 className="text-xs font-semibold text-gray-500 mb-1">Visual Prompt:</h5>
                      <p className="text-xs text-gray-500 italic">{scene.visualDescription}</p>
                      
                      <div className="mt-3 flex gap-2">
                        <button 
                          className="px-2 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
                          onClick={() => handleGenerateSceneImage(scene.id, scene.visualDescription)}
                        >
                          Generate Scene
                        </button>
                        <button 
                          className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition flex items-center"
                          onClick={() => handleRegenerateSceneImage(scene.id, scene.visualDescription)}
                        >
                          Regenerate Scene
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Cover Page */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
              {isGeneratingCover ? (
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Generating cover image...</p>
                </div>
              ) : coverPageImage ? (
                <img 
                  src={coverPageImage} 
                  alt="Story Cover Page" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <p className="font-bold">Cover Page</p>
                  <p className="text-xs">Click Generate to create image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-bold text-dark mb-1">Cover Page</h4>
              {story.coverPageVisualDescription && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 italic line-clamp-3">{story.coverPageVisualDescription}</p>
                  <button 
                    className="mt-3 px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
                    onClick={handleGenerateCoverImage}
                    disabled={isGeneratingCover}
                  >
                    {coverPageImage ? 'Regenerate Cover' : 'Generate Cover'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* End Page */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-100 flex items-center justify-center relative">
              {isGeneratingEndPage ? (
                <div className="text-center">
                  <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-xs text-gray-500">Generating end page image...</p>
                </div>
              ) : endPageImage ? (
                <img 
                  src={endPageImage} 
                  alt="Story End Page" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <p className="font-bold">End Page</p>
                  <p className="text-xs">Click Generate to create image</p>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-bold text-dark mb-1">End Page</h4>
              {story.endPageVisualDescription && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 italic line-clamp-3">{story.endPageVisualDescription}</p>
                  <button 
                    className="mt-3 px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
                    onClick={handleGenerateEndPageImage}
                    disabled={isGeneratingEndPage}
                  >
                    {endPageImage ? 'Regenerate End Page' : 'Generate End Page'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleRegenerateStory}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Regenerate Story
            </button>
            
            <button
              onClick={handleContinue}
              className="px-8 py-3 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center"
            >
              Continue to Story Canvas
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;