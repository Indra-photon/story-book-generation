// components/story/StoryGenerator.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, X, Edit, Save, FilePlus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [isSavingStory, setIsSavingStory] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [isStorySaved, setIsStorySaved] = useState(false);
  const [isStoryModified, setIsStoryModified] = useState(false);
  
  // New states for our improvements
  const [storyId, setStoryId] = useState(null);
  const [remainingTokens, setRemainingTokens] = useState(null);
  const [editingSceneId, setEditingSceneId] = useState(null);
  const [editableSceneText, setEditableSceneText] = useState('');
  const [saveCost, setSaveCost] = useState(2); // Default cost for first save
  const [showTokenWarning, setShowTokenWarning] = useState(false)
  const navigate = useNavigate();


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
          
          // The story content is inside generatedContent.story
          if (generatedContent.story) {
            // Update the story with the generated content
            setStory({
              title: generatedContent.story.title,
              mainCharacter: includeChild ? childCharacter : 
                generatedContent.story.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
              storyType: storyType,
              introduction: generatedContent.story.introduction,
              conclusion: generatedContent.story.conclusion,
              coverPageVisualDescription: generatedContent.story.coverPagescene?.visualDescription || '',
              endPageVisualDescription: generatedContent.story.endPagescene?.visualDescription || '',
              characters: generatedContent.story.characters || [],
              storyStyleGuide: generatedContent.story.storyStyleGuide || {}
            });
            
            // Update the scenes with the generated content
            setScenes(generatedContent.story.scenes.map((scene, index) => ({
              id: index + 1,
              title: scene.title,
              text: scene.text,
              image: scene.image || null,
              visualDescription: scene.visualDescription,
              isEditing: false
            })));
            
            // Store the story ID if it exists
            if (generatedContent.storedStory && generatedContent.storedStory._id) {
              setStoryId(generatedContent.storedStory._id);
              console.log("Stored Story ID:", generatedContent.storedStory._id);
            }
            
            // Update token balance if provided
            if (generatedContent.remainingTokens !== undefined) {
              setRemainingTokens(generatedContent.remainingTokens);
            }
            
            setGenerationProgress(100);
            setLoading(false);
            setIsStoryModified(true);
            setIsStorySaved(false);
          } else {
            throw new Error("No story content in the response");
          }
        } else {
          throw new Error("Failed to generate story");
        }
      } catch (err) {
        setError(err.response.data.message)
        // if (err.response?.data?.message?.includes('Insufficient tokens')) {
        //   setError('You don\'t have enough tokens to generate a story. Please purchase more tokens.');
        //   setShowTokenWarning(true);
        // } else {
        //   setError('Failed to generate story. Please try again.');
        // }
        setLoading(false);
      }
    };
    
    generateStory();
  }, [includeChild, childCharacter, storyType]);


  // const handleRegenerateStory = async () => {
  //   // Show token cost confirmation
  //   if (!window.confirm("Regenerating will cost 5 tokens. Do you want to continue?")) {
  //     return;
  //   }
    
  //   setLoading(true);
  //   setGenerationProgress(0);
  //   setError(null);
    
  //   try {
  //     // Show progress indicator
  //     setGenerationProgress(30);
      
  //     // Make API call to backend to generate story
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-prompt`,
  //       {
  //         includeChild,
  //         childCharacter,
  //         storyType
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
      
  //     setGenerationProgress(70);
      
  //     if (response.data.success) {
  //       const generatedContent = response.data.data;
        
  //       setStory({
  //         title: generatedContent.title,
  //         mainCharacter: includeChild ? childCharacter : 
  //           generatedContent.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
  //         storyType: storyType,
  //         introduction: generatedContent.introduction,
  //         conclusion: generatedContent.conclusion,
  //         coverPageVisualDescription: generatedContent.coverPagescene?.visualDescription || '',
  //         endPageVisualDescription: generatedContent.endPagescene?.visualDescription || '',
  //         characters: generatedContent.characters || [],
  //         storyStyleGuide: generatedContent.storyStyleGuide || {}
  //       });
        
  //       setScenes(generatedContent.scenes.map((scene, index) => ({
  //         id: index + 1,
  //         title: scene.title,
  //         text: scene.text,
  //         image: scene.image || null,
  //         visualDescription: scene.visualDescription,
  //         isEditing: false
  //       })));
        
  //       // Reset images since we have new descriptions
  //       setCoverPageImage(null);
  //       setEndPageImage(null);
        
  //       // Store the story ID if it exists
  //       if (response.data.data.storedStory && response.data.data.storedStory._id) {
  //         setStoryId(response.data.data.storedStory._id);
  //       }
        
  //       // Update token balance if provided
  //       if (response.data.data.remainingTokens !== undefined) {
  //         setRemainingTokens(response.data.data.remainingTokens);
  //       }
        
  //       setGenerationProgress(100);
  //       setLoading(false);
  //       setIsStoryModified(true);
  //       setIsStorySaved(false);
  //     } else {
  //       throw new Error("Failed to generate story");
  //     }
  //   } catch (err) {
  //     console.error('Error generating story:', err);
      
  //     // Handle specific error cases
  //     if (err.response?.data?.message?.includes('Insufficient tokens')) {
  //       setError('You don\'t have enough tokens to regenerate a story. Please purchase more tokens.');
  //       setShowTokenWarning(true);
  //     } else {
  //       setError('Failed to generate story. Please try again.');
  //     }
      
  //     setLoading(false);
  //   }
  // };
  
  
  const handleRegenerateStory = async () => {
    // Show token cost confirmation
    if (!window.confirm("Regenerating will cost 5 tokens. Do you want to continue?")) {
      return;
    }
    
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
        
        console.log('Generated Content:', generatedContent);
        
        // The story content is inside generatedContent.story
        if (generatedContent.story) {
          setStory({
            title: generatedContent.story.title,
            mainCharacter: includeChild ? childCharacter : 
              generatedContent.story.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
            storyType: storyType,
            introduction: generatedContent.story.introduction,
            conclusion: generatedContent.story.conclusion,
            coverPageVisualDescription: generatedContent.story.coverPagescene?.visualDescription || '',
            endPageVisualDescription: generatedContent.story.endPagescene?.visualDescription || '',
            characters: generatedContent.story.characters || [],
            storyStyleGuide: generatedContent.story.storyStyleGuide || {}
          });
          
          setScenes(generatedContent.story.scenes.map((scene, index) => ({
            id: index + 1,
            title: scene.title,
            text: scene.text,
            image: scene.image || null,
            visualDescription: scene.visualDescription,
            isEditing: false
          })));
          
          // Reset images since we have new descriptions
          setCoverPageImage(null);
          setEndPageImage(null);
          
          // Store the story ID if it exists
          if (generatedContent.storedStory && generatedContent.storedStory._id) {
            setStoryId(generatedContent.storedStory._id);
            console.log("Stored Story ID:", generatedContent.storedStory._id);
          }
          
          // Update token balance if provided
          if (generatedContent.remainingTokens !== undefined) {
            setRemainingTokens(generatedContent.remainingTokens);
          }
          
          setGenerationProgress(100);
          setLoading(false);
          setIsStoryModified(true);
          setIsStorySaved(false);
        } else {
          throw new Error("No story content in the response");
        }
      } else {
        throw new Error("Failed to generate story");
      }
    } catch (err) {
      console.error('Error generating story:', err);
      
      // Handle specific error cases
      if (err.response?.data?.message?.includes('Insufficient tokens')) {
        setError('You don\'t have enough tokens to regenerate a story. Please purchase more tokens.');
        setShowTokenWarning(true);
      } else {
        setError('Failed to generate story. Please try again.');
      }
      
      setLoading(false);
    }
  };


  // const handleContinue = () => {
  //   // Prevent continuation if story is not saved
  //   if (!isStorySaved) {
  //     setSaveError("Please save your story before continuing");
  //     return;
  //   }

  //   // Prevent continuation if there are unsaved changes
  //   if (isStoryModified) {
  //     setSaveError("You have unsaved changes. Please save your story before continuing.");
  //     return;
  //   }

  //   if (story && scenes.length > 0) {
  //     const completeStory = {
  //       ...story,
  //       coverPageImage,
  //       endPageImage,
  //       storyId // Include the storyId for future updates
  //     };
      
  //     onStoryGenerated(completeStory, scenes);
  //   }
  // };

  const handleContinue = () => {
  // Prevent continuation if story is not saved
  if (!isStorySaved) {
    setSaveError("Please save your story before continuing");
    return;
  }

  // Prevent continuation if there are unsaved changes
  if (isStoryModified) {
    setSaveError("You have unsaved changes. Please save your story before continuing.");
    return;
  }

  if (story && scenes.length > 0 && storyId) {
    // Navigate to the story viewer with the storyId
    navigate(`/story/${storyId}/view`);
  } else {
    setSaveError("Story ID is missing. Please save your story first.");
  }
};

  // const handleGenerateCoverImage = async () => {
  //   if (!story || !story.coverPageVisualDescription) {
  //     console.error('Missing cover page description');
  //     return;
  //   }
    
  //   setIsGeneratingCover(true);
    
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
  //       {
  //         sceneId: 'cover',
  //         visualDescription: story.coverPageVisualDescription
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
      
  //     if (response.data && response.data.success) {
  //       setCoverPageImage(response.data.data.imageUrl);
  //       setIsStoryModified(true);
  //       setIsStorySaved(false);
  //     } else {
  //       throw new Error(response.data?.message || "Failed to generate cover image");
  //     }
  //   } catch (err) {
  //     console.error('Error generating cover image:', err);
  //   } finally {
  //     setIsGeneratingCover(false);
  //   }
  // };
  const handleGenerateCoverImage = async () => {
    if (!story || !story.coverPageVisualDescription) {
      console.error('Missing cover page description');
      return;
    }
    
    console.log('Starting cover image generation with description:', story.coverPageVisualDescription.substring(0, 50) + '...');
    setIsGeneratingCover(true);
    
    try {
      console.log('Sending request to create-scene endpoint for cover image...');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
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
      
      console.log('Cover image API response status:', response.status);
      console.log('Cover image API response success:', response.data?.success);
      
      if (response.data && response.data.success) {
        setCoverPageImage(response.data.data.imageUrl);
        setIsStoryModified(true);
        setIsStorySaved(false);
        console.log('Cover image state updated successfully');
      } else {
        console.error('API response indicated failure:', response.data);
        throw new Error(response.data?.message || "Failed to generate cover image");
      }
    } catch (err) {
      console.error('Error generating cover image:', err);
      console.error('Error details:', err.response?.data || err.message);
    } finally {
      console.log('Finished cover image generation process');
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
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
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
        setIsStoryModified(true);
        setIsStorySaved(false);
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
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
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
      setIsStoryModified(true);
      setIsStorySaved(false);
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

  const handleSaveStory = async () => {
    // Reset previous save errors
    setSaveError(null);
    
    // Validate story and scene readiness
    if (!story || scenes.length === 0) {
      setSaveError("Story is not complete. Please generate a story first.");
      return;
    }
    
    // Show token cost confirmation for initial saves
    if (!storyId && !isStorySaved) {
      const confirmMessage = `Saving this story will cost ${saveCost} tokens. Do you want to continue?`;
      if (!window.confirm(confirmMessage)) {
        return;
      }
    }
  
    // Set saving state
    setIsSavingStory(true);
  
    try {
    const savePayload = {
      storyId: storyId, // Include the storyId if it exists
      story: {
        title: story.title,
        storyType: story.storyType,
        introduction: story.introduction,
        conclusion: story.conclusion,
        characters: story.characters || [],
        storyStyleGuide: story.storyStyleGuide || {}
      },
      scenes: scenes.map(scene => ({
        id: scene.id,
        title: scene.title,
        text: scene.text,
        image: scene.image,
        visualDescription: scene.visualDescription
      })),
      // Format cover page properly
      coverPage: {
        visualDescription: story.coverPageVisualDescription,
        imageUrl: coverPageImage
      },
      // Format end page properly
      endPage: {
        visualDescription: story.endPageVisualDescription,
        imageUrl: endPageImage
      }
    };
      
      // Add storyId if we're updating an existing story
      if (storyId) {
        savePayload.storyId = storyId;
      }
  
      // Call backend save story endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/save-story`,
        savePayload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      // Handle successful save
      if (response.data.success) {
        setIsStorySaved(true);
        setIsStoryModified(false);
        
        // Store story ID for future updates
        if (response.data.data.story._id) {
          setStoryId(response.data.data.story._id);
        }
        
        // Update token balance
        if (response.data.data.remainingTokens !== undefined) {
          setRemainingTokens(response.data.data.remainingTokens);
        }
        
        // Update save cost (should be 0 for subsequent saves)
        setSaveCost(0);
        
        console.log('Story saved successfully', response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to save story");
      }
    } catch (err) {
      console.error('Error saving story:', err);
      
      // Handle specific error types
      if (err.response?.data?.message?.includes('Insufficient tokens')) {
        setSaveError("You don't have enough tokens to save this story. Please purchase more tokens.");
        setShowTokenWarning(true);
      } else {
        setSaveError(err.response?.data?.message || "Failed to save story. Please try again.");
      }
      
      setIsStorySaved(false);
    } finally {
      setIsSavingStory(false);
    }
  };

  // Scene text editing feature
  const handleEditSceneText = (sceneId) => {
    const sceneToEdit = scenes.find(scene => scene.id === sceneId);
    if (!sceneToEdit) return;
    
    setEditingSceneId(sceneId);
    setEditableSceneText(sceneToEdit.text);
    
    // Update scenes to show which one is being edited
    const updatedScenes = scenes.map(scene => 
      scene.id === sceneId 
        ? { ...scene, isEditing: true }
        : scene
    );
    
    setScenes(updatedScenes);
  };
  
  const handleCancelEditScene = () => {
    // Reset editing state
    setEditingSceneId(null);
    setEditableSceneText('');
    
    // Update scenes to cancel edit mode
    const updatedScenes = scenes.map(scene => ({
      ...scene,
      isEditing: false
    }));
    
    setScenes(updatedScenes);
  };
  
  const handleSaveSceneText = (sceneId) => {
    // Find the scene being edited
    const sceneIndex = scenes.findIndex(scene => scene.id === sceneId);
    if (sceneIndex === -1) return;
    
    // Update scenes with the new text
    const updatedScenes = [...scenes];
    updatedScenes[sceneIndex] = {
      ...updatedScenes[sceneIndex],
      text: editableSceneText,
      isEditing: false
    };
    
    setScenes(updatedScenes);
    setEditingSceneId(null);
    setEditableSceneText('');
    setIsStoryModified(true);
    setIsStorySaved(false);
  };

  // Regenerate an image for a specific scene
  const handleRegenerateSceneImage = async (sceneId, visualDescription) => {
    // Simply reuse the generate function
    await handleGenerateSceneImage(sceneId, visualDescription);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-sans text-dark">Generate Your Story</h2>
        
        {/* Token balance display */}
        {remainingTokens !== null && (
          <div className="bg-primary-50 text-primary-800 px-4 py-2 rounded-full font-medium flex items-center">
            <FilePlus size={18} className="mr-2" />
            <span>{remainingTokens} Tokens Available</span>
          </div>
        )}
      </div>
      
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
          
          {/* Token cost information */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Story generation costs 5 tokens.</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 max-w-md mx-auto">
            <p>{error}</p>
          </div>
          
          {showTokenWarning ? (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg mb-6 max-w-md mx-auto">
              <p>You need more tokens to continue. Please visit the token purchase page.</p>
              <button 
                className="mt-4 px-6 py-2 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition"
                onClick={() => window.location.href = '/purchase-tokens'}
              >
                Buy Tokens
              </button>
            </div>
          ) : (
            <button
              onClick={handleRegenerateStory}
              className="px-6 py-2 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center mx-auto"
            >
              <RefreshCw size={16} className="mr-2" />
              Try Again
            </button>
          )}
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
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-dark">Scene {scene.id}: {scene.title}</h4>
                    
                    {/* Edit/Save toggle for scene text */}
                    {scene.isEditing ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleSaveSceneText(scene.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Save changes"
                        >
                          <Save size={16} />
                        </button>
                        <button 
                          onClick={handleCancelEditScene}
                          className="text-red-600 hover:text-red-800"
                          title="Cancel editing"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditSceneText(scene.id)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit scene text"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Scene text - editable or read-only */}
                  {scene.isEditing && editingSceneId === scene.id ? (
                    <textarea
                      value={editableSceneText}
                      onChange={(e) => setEditableSceneText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{scene.text}</p>
                  )}
                  
                  {scene.visualDescription && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      {/* <h5 className="text-xs font-semibold text-gray-500 mb-1">Visual Prompt:</h5> */}
                      {/* <p className="text-xs text-gray-500 italic">{scene.visualDescription}</p> */}
                      
                      <div className="mt-3 flex gap-2">
                        <button 
                          className="px-2 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
                          onClick={() => handleGenerateSceneImage(scene.id, scene.visualDescription)}
                        >
                          Edit Scene Image
                        </button>
                        {scene.image && (
                          <button 
                            className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition flex items-center"
                            onClick={() => handleRegenerateSceneImage(scene.id, scene.visualDescription)}
                          >
                            Regenerate Scene
                          </button>
                        )}
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
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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
          
          {/* Token information callout */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm text-blue-700">
            <p className="font-semibold mb-1">Token Usage Information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Story generation: 5 tokens (one-time)</li>
              <li>First story save: {saveCost} tokens (one-time)</li>
              <li>Subsequent updates: Free</li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              onClick={handleRegenerateStory}
              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition flex items-center"
            >
              <RefreshCw size={16} className="mr-2" />
              Regenerate Story (5 tokens)
            </button>

            {/* Save Story Button */}
            <button
              onClick={handleSaveStory}
              disabled={isSavingStory || (isStorySaved && !isStoryModified)}
              className={`px-6 py-2 rounded-full transition flex items-center 
                ${isSavingStory 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : isStorySaved && !isStoryModified
                    ? 'bg-green-500 text-white' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
            >
              {isSavingStory ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : isStorySaved && !isStoryModified ? (
                '✓ Story Saved'
              ) : storyId && isStorySaved ? (
                'Update Story (Free)'
              ) : (
                `Save Story ${saveCost > 0 ? `(${saveCost} tokens)` : ''}`
              )}
            </button>
            
            <button
              onClick={handleContinue}
              disabled={!isStorySaved || isStoryModified}
              className={`px-8 py-3 rounded-full transition flex items-center 
                ${(!isStorySaved || isStoryModified)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
              Continue to Story Canvas
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          {isStoryModified && (
            <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">
                You have unsaved changes. Please save your story before continuing.
              </span>
            </div>
          )}
          
          {saveError && (
            <div className="mt-4 bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{saveError}</span>
              <button 
                onClick={() => setSaveError(null)} 
                className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;