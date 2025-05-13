// // components/story/StoryGenerator.jsx
// import React, { useState, useEffect } from 'react';
// import { ArrowRight, RefreshCw, X, Edit, Save, FilePlus, Wand2 } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';

// const StoryGenerator = ({ includeChild, childCharacter, storyType, onStoryGenerated }) => {
//  const [loading, setLoading] = useState(true);
//  const [generationProgress, setGenerationProgress] = useState(0);
//  const [story, setStory] = useState(null);
//  const [scenes, setScenes] = useState([]);
//  const [error, setError] = useState(null);
//  const [coverPageImage, setCoverPageImage] = useState(null);
//  const [endPageImage, setEndPageImage] = useState(null);
//  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
//  const [isGeneratingEndPage, setIsGeneratingEndPage] = useState(false);
//  const [isSavingStory, setIsSavingStory] = useState(false);
//  const [saveError, setSaveError] = useState(null);
//  const [isStorySaved, setIsStorySaved] = useState(false);
//  const [isStoryModified, setIsStoryModified] = useState(false);
 
//  // New states for our improvements
//  const [storyId, setStoryId] = useState(null);
//  const [remainingTokens, setRemainingTokens] = useState(null);
//  const [editingSceneId, setEditingSceneId] = useState(null);
//  const [editableSceneText, setEditableSceneText] = useState('');
//  const [saveCost, setSaveCost] = useState(2); // Default cost for first save
//  const [showTokenWarning, setShowTokenWarning] = useState(false);
 
//  // New states for bulk image generation
//  const [isGeneratingBulkImages, setIsGeneratingBulkImages] = useState(false);
//  const [bulkGenerationProgress, setBulkGenerationProgress] = useState({
//    current: 0,
//    total: 0,
//    currentSceneId: null
//  });
//  const [bulkGenerationResults, setBulkGenerationResults] = useState([]);
 
//  const navigate = useNavigate();


//  useEffect(() => {
//    const generateStory = async () => {
//      setLoading(true);
//      setError(null);
//      try {
//        // Show progress indicator
//        setGenerationProgress(30);
       
//        // Make API call to backend to generate story
//        const response = await axios.post(
//          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-prompt`,
//          {
//            includeChild,
//            childCharacter,
//            storyType
//          },
//          {
//            withCredentials: true,
//            headers: {
//              "Content-Type": "application/json"
//            }
//          }
//        );
       
//        setGenerationProgress(70);
       
//        if (response.data.success) {
//          const generatedContent = response.data.data;
         
//          console.log('Generated Content:', generatedContent);
         
//          // The story content is inside generatedContent.story
//          if (generatedContent.story) {
//            // Update the story with the generated content
//            setStory({
//              title: generatedContent.story.title,
//              mainCharacter: includeChild ? childCharacter : 
//                generatedContent.story.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
//              storyType: storyType,
//              introduction: generatedContent.story.introduction,
//              conclusion: generatedContent.story.conclusion,
//              coverPageVisualDescription: generatedContent.story.coverPagescene?.visualDescription || '',
//              endPageVisualDescription: generatedContent.story.endPagescene?.visualDescription || '',
//              characters: generatedContent.story.characters || [],
//              storyStyleGuide: generatedContent.story.storyStyleGuide || {}
//            });
           
//            // Update the scenes with the generated content
//            setScenes(generatedContent.story.scenes.map((scene, index) => ({
//              id: index + 1,
//              title: scene.title,
//              text: scene.text,
//              image: scene.image || null,
//              visualDescription: scene.visualDescription,
//              isEditing: false
//            })));
           
//            // Store the story ID if it exists
//            if (generatedContent.storedStory && generatedContent.storedStory._id) {
//              setStoryId(generatedContent.storedStory._id);
//              console.log("Stored Story ID:", generatedContent.storedStory._id);
//            }
           
//            // Update token balance if provided
//            if (generatedContent.remainingTokens !== undefined) {
//              setRemainingTokens(generatedContent.remainingTokens);
//            }
           
//            setGenerationProgress(100);
//            setLoading(false);
//            setIsStoryModified(true);
//            setIsStorySaved(false);
//          } else {
//            throw new Error("No story content in the response");
//          }
//        } else {
//          throw new Error("Failed to generate story");
//        }
//      } catch (err) {
//        setError(err.response.data.message)
//        setLoading(false);
//      }
//    };
   
//    generateStory();
//  }, [includeChild, childCharacter, storyType]);

 
//  const handleRegenerateStory = async () => {
//    // Show token cost confirmation
//    if (!window.confirm("Regenerating will cost 5 tokens. Do you want to continue?")) {
//      return;
//    }
   
//    setLoading(true);
//    setGenerationProgress(0);
//    setError(null);
   
//    try {
//      // Show progress indicator
//      setGenerationProgress(30);
     
//      // Make API call to backend to generate story
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/generate-prompt`,
//        {
//          includeChild,
//          childCharacter,
//          storyType
//        },
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );
     
//      setGenerationProgress(70);
     
//      if (response.data.success) {
//        const generatedContent = response.data.data;
       
//        console.log('Generated Content:', generatedContent);
       
//        // The story content is inside generatedContent.story
//        if (generatedContent.story) {
//          setStory({
//            title: generatedContent.story.title,
//            mainCharacter: includeChild ? childCharacter : 
//              generatedContent.story.characters.find(c => c.type === 'hero') || { name: 'Main Character' },
//            storyType: storyType,
//            introduction: generatedContent.story.introduction,
//            conclusion: generatedContent.story.conclusion,
//            coverPageVisualDescription: generatedContent.story.coverPagescene?.visualDescription || '',
//            endPageVisualDescription: generatedContent.story.endPagescene?.visualDescription || '',
//            characters: generatedContent.story.characters || [],
//            storyStyleGuide: generatedContent.story.storyStyleGuide || {}
//          });
         
//          setScenes(generatedContent.story.scenes.map((scene, index) => ({
//            id: index + 1,
//            title: scene.title,
//            text: scene.text,
//            image: scene.image || null,
//            visualDescription: scene.visualDescription,
//            isEditing: false
//          })));
         
//          // Reset images since we have new descriptions
//          setCoverPageImage(null);
//          setEndPageImage(null);
         
//          // Store the story ID if it exists
//          if (generatedContent.storedStory && generatedContent.storedStory._id) {
//            setStoryId(generatedContent.storedStory._id);
//            console.log("Stored Story ID:", generatedContent.storedStory._id);
//          }
         
//          // Update token balance if provided
//          if (generatedContent.remainingTokens !== undefined) {
//            setRemainingTokens(generatedContent.remainingTokens);
//          }
         
//          setGenerationProgress(100);
//          setLoading(false);
//          setIsStoryModified(true);
//          setIsStorySaved(false);
//        } else {
//          throw new Error("No story content in the response");
//        }
//      } else {
//        throw new Error("Failed to generate story");
//      }
//    } catch (err) {
//      console.error('Error generating story:', err);
     
//      // Handle specific error cases
//      if (err.response?.data?.message?.includes('Insufficient tokens')) {
//        setError('You don\'t have enough tokens to regenerate a story. Please purchase more tokens.');
//        setShowTokenWarning(true);
//      } else {
//        setError('Failed to generate story. Please try again.');
//      }
     
//      setLoading(false);
//    }
//  };


//  const handleContinue = () => {
//  // Prevent continuation if story is not saved
//  if (!isStorySaved) {
//    setSaveError("Please save your story before continuing");
//    return;
//  }

//  // Prevent continuation if there are unsaved changes
//  if (isStoryModified) {
//    setSaveError("You have unsaved changes. Please save your story before continuing.");
//    return;
//  }

//  if (story && scenes.length > 0 && storyId) {
//    // Navigate to the story viewer with the storyId
//    navigate(`/story/${storyId}/view`);
//  } else {
//    setSaveError("Story ID is missing. Please save your story first.");
//  }
// };

//  const handleGenerateCoverImage = async () => {
//    if (!story || !story.coverPageVisualDescription) {
//      console.error('Missing cover page description');
//      return;
//    }
   
//    console.log('Starting cover image generation with description:', story.coverPageVisualDescription.substring(0, 50) + '...');
//    setIsGeneratingCover(true);
   
//    try {
//      console.log('Sending request to create-scene endpoint for cover image...');
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
//        {
//          sceneId: 'cover',
//          visualDescription: story.coverPageVisualDescription
//        },
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );
     
//      console.log('Cover image API response status:', response.status);
//      console.log('Cover image API response success:', response.data?.success);
     
//      if (response.data && response.data.success) {
//        setCoverPageImage(response.data.data.imageUrl);
//        setIsStoryModified(true);
//        setIsStorySaved(false);
//        console.log('Cover image state updated successfully');
//      } else {
//        console.error('API response indicated failure:', response.data);
//        throw new Error(response.data?.message || "Failed to generate cover image");
//      }
//    } catch (err) {
//      console.error('Error generating cover image:', err);
//      console.error('Error details:', err.response?.data || err.message);
//    } finally {
//      console.log('Finished cover image generation process');
//      setIsGeneratingCover(false);
//    }
//  };


//  const handleGenerateEndPageImage = async () => {
//    if (!story || !story.endPageVisualDescription) {
//      console.error('Missing end page description');
//      return;
//    }
   
//    setIsGeneratingEndPage(true);
   
//    try {
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
//        {
//          sceneId: 'end',
//          visualDescription: story.endPageVisualDescription
//        },
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );
     
//      if (response.data && response.data.success) {
//        setEndPageImage(response.data.data.imageUrl);
//        setIsStoryModified(true);
//        setIsStorySaved(false);
//      } else {
//        throw new Error(response.data?.message || "Failed to generate end page image");
//      }
//    } catch (err) {
//      console.error('Error generating end page image:', err);
//    } finally {
//      setIsGeneratingEndPage(false);
//    }
//  };

//  const handleGenerateSceneImage = async (sceneId, visualDescription) => {
//    try {
//      const sceneIndex = scenes.findIndex(scene => scene.id === sceneId);
//      if (sceneIndex === -1) return;
     
//      // Create a new copy of scenes with the loading state
//      const updatedScenes = scenes.map((scene, index) => 
//        index === sceneIndex 
//          ? { ...scene, isGeneratingImage: true }
//          : scene
//      );
     
//      // Immediately update the scenes state to show loading
//      setScenes(updatedScenes);
     
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
//        {
//          sceneId,
//          visualDescription
//        },
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );
     
//      // Verify the response structure
//      if (!response.data || !response.data.success) {
//        throw new Error(response.data?.message || "Failed to generate image");
//      }
     
//      const imageUrl = response.data.data.imageUrl;
     
//      // Update the specific scene with the new image and remove loading state
//      const finalUpdatedScenes = scenes.map((scene) => 
//        scene.id === sceneId 
//          ? { 
//              ...scene, 
//              image: imageUrl, 
//              isGeneratingImage: false 
//            }
//          : scene
//      );
     
//      // Set the updated scenes
//      setScenes(finalUpdatedScenes);
//      setIsStoryModified(true);
//      setIsStorySaved(false);
//    } catch (err) {
//      console.error('Full error object:', err);
//      console.error('Error response:', err.response?.data);
     
//      // Update scenes to remove loading state and optionally show an error
//      const finalUpdatedScenes = scenes.map((scene) => 
//        scene.id === sceneId 
//          ? { 
//              ...scene, 
//              isGeneratingImage: false,
//              imageGenerationError: err.message 
//            }
//          : scene
//      );
     
//      setScenes(finalUpdatedScenes);
//    }
//  };

//  // New function for bulk image generation
//  const handleGenerateAllImages = async () => {
//    // Prepare scenes that need images
//    const scenesToGenerate = [];
   
//    // Check cover page
//    if (story.coverPageVisualDescription && !coverPageImage) {
//      scenesToGenerate.push({
//        sceneId: 'cover',
//        visualDescription: story.coverPageVisualDescription
//      });
//    }
   
//    // Check all scenes
//    scenes.forEach(scene => {
//      if (scene.visualDescription && !scene.image) {
//        scenesToGenerate.push({
//          sceneId: scene.id,
//          visualDescription: scene.visualDescription
//        });
//      }
//    });
   
//    // Check end page
//    if (story.endPageVisualDescription && !endPageImage) {
//      scenesToGenerate.push({
//        sceneId: 'end',
//        visualDescription: story.endPageVisualDescription
//      });
//    }
   
//    if (scenesToGenerate.length === 0) {
//      toast.success("All images are already generated!");
//      return;
//    }
   
//    // Set up bulk generation state
//    setIsGeneratingBulkImages(true);
//    setBulkGenerationProgress({
//      current: 0,
//      total: scenesToGenerate.length,
//      currentSceneId: null
//    });
//    setBulkGenerationResults([]);
   
//    try {
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scenes-bulk`,
//        { scenes: scenesToGenerate },
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );

//      // ADD THIS DEBUG LOG
//     console.log('Bulk API Response:', response.data);
//     console.log('Number of results returned:', response.data?.data?.results?.length);
//     console.log('Results array:', response.data?.data?.results);
     
//      if (response.data && response.data.success) {
//        const results = response.data.data.results;
//        setBulkGenerationResults(results);
//        // Add this debug log right before processing results
//       console.log('About to process results. Current scenes:', scenes);
//       console.log('Processing these results:', results);
       
       
//        // Process results and update UI
//       //  results.forEach(result => {
//       //   console.log(`Processing result for sceneId: ${result.sceneId}`, result.success);
//       //    if (result.success) {
//       //      if (result.sceneId === 'cover') {
//       //        setCoverPageImage(result.imageUrl);
//       //      } else if (result.sceneId === 'end') {
//       //        setEndPageImage(result.imageUrl);
//       //      } else {
//       //        // Update scene image
//       //        const updatedScenes = scenes.map(scene => 
//       //          scene.id === result.sceneId
//       //            ? { ...scene, image: result.imageUrl }
//       //            : scene
//       //        );
//       //        setScenes(updatedScenes);
//       //      }
//       //    } else {
//       //      // Handle failed scenes
//       //      if (result.sceneId !== 'cover' && result.sceneId !== 'end') {
//       //        const updatedScenes = scenes.map(scene => 
//       //          scene.id === result.sceneId
//       //            ? { ...scene, imageGenerationError: result.fallbackMessage }
//       //            : scene
//       //        );
//       //        setScenes(updatedScenes);
//       //      }
//       //    }
//       //  });
//       const updatedScenes = [...scenes]; // Create a copy of scenes array
//       let coverUpdated = false;
//       let endUpdated = false;

//       results.forEach(result => {
//         console.log(`Processing result for sceneId: ${result.sceneId}`, result.success);
        
//         if (result.success) {
//           if (result.sceneId === 'cover') {
//             setCoverPageImage(result.imageUrl);
//             coverUpdated = true;
//           } else if (result.sceneId === 'end') {
//             setEndPageImage(result.imageUrl);
//             endUpdated = true;
//           } else {
//             // Find the scene index and update it in the copy
//             const sceneIndex = updatedScenes.findIndex(scene => scene.id === result.sceneId);
//             if (sceneIndex !== -1) {
//               updatedScenes[sceneIndex] = {
//                 ...updatedScenes[sceneIndex],
//                 image: result.imageUrl
//               };
//             }
//           }
//         } else {
//           // Handle failed scenes
//           if (result.sceneId !== 'cover' && result.sceneId !== 'end') {
//             const sceneIndex = updatedScenes.findIndex(scene => scene.id === result.sceneId);
//             if (sceneIndex !== -1) {
//               updatedScenes[sceneIndex] = {
//                 ...updatedScenes[sceneIndex],
//                 imageGenerationError: result.fallbackMessage
//               };
//             }
//           }
//         }
//       });

//       // Set all scenes at once after processing all results
//       setScenes(updatedScenes);

//       setIsStoryModified(true);
//       setIsStorySaved(false);
       
//        // Show summary
//        const successCount = results.filter(r => r.success).length;
//        const failCount = results.filter(r => !r.success).length;
       
//        if (failCount > 0) {
//           toast.error(`${failCount} images failed`, {
//             icon: '⚠️',
//             duration: 5000,
//           });
//           toast.success(`${successCount} images generated successfully!`, {
//             icon: '✅',
//             duration: 5000,
//           });
//         } else {
//           toast.success(`All ${successCount} images generated successfully!`, {
//             icon: '🎉',
//             duration: 4000,
//           });
//         }
//      }
//    } catch (err) {
//      console.error('Error generating bulk images:', err);
//      toast.error('Failed to generate images. Please try again.');
//    } finally {
//      setIsGeneratingBulkImages(false);
//      setBulkGenerationProgress({
//        current: 0,
//        total: 0,
//        currentSceneId: null
//      });
//    }
//  };

//  const handleSaveStory = async () => {
//    // Reset previous save errors
//    setSaveError(null);
   
//    // Validate story and scene readiness
//    if (!story || scenes.length === 0) {
//      setSaveError("Story is not complete. Please generate a story first.");
//      return;
//    }
   
//    // Show token cost confirmation for initial saves
//    if (!storyId && !isStorySaved) {
//      const confirmMessage = `Saving this story will cost ${saveCost} tokens. Do you want to continue?`;
//      if (!window.confirm(confirmMessage)) {
//        return;
//      }
//    }
 
//    // Set saving state
//    setIsSavingStory(true);
 
//    try {
//    const savePayload = {
//      storyId: storyId, // Include the storyId if it exists
//      story: {
//        title: story.title,
//        storyType: story.storyType,
//        introduction: story.introduction,
//        conclusion: story.conclusion,
//        characters: story.characters || [],
//        storyStyleGuide: story.storyStyleGuide || {}
//      },
//      scenes: scenes.map(scene => ({
//        id: scene.id,
//        title: scene.title,
//        text: scene.text,
//        image: scene.image,
//        visualDescription: scene.visualDescription
//      })),
//      // Format cover page properly
//      coverPage: {
//        visualDescription: story.coverPageVisualDescription,
//        imageUrl: coverPageImage
//      },
//      // Format end page properly
//      endPage: {
//        visualDescription: story.endPageVisualDescription,
//        imageUrl: endPageImage
//      }
//    };
     
//      // Add storyId if we're updating an existing story
//      if (storyId) {
//        savePayload.storyId = storyId;
//      }
 
//      // Call backend save story endpoint
//      const response = await axios.post(
//        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/save-story`,
//        savePayload,
//        {
//          withCredentials: true,
//          headers: {
//            "Content-Type": "application/json"
//          }
//        }
//      );
 
//      // Handle successful save
//      if (response.data.success) {
//        setIsStorySaved(true);
//        setIsStoryModified(false);
       
//        // Store story ID for future updates
//        if (response.data.data.story._id) {
//          setStoryId(response.data.data.story._id);
//        }
       
//        // Update token balance
//        if (response.data.data.remainingTokens !== undefined) {
//          setRemainingTokens(response.data.data.remainingTokens);
//        }
       
//        // Update save cost (should be 0 for subsequent saves)
//        setSaveCost(0);
       
//        toast.success('Story saved successfully!');
//      } else {
//        throw new Error(response.data.message || "Failed to save story");
//      }
//    } catch (err) {
//      console.error('Error saving story:', err);
     
//      // Handle specific error types
//      if (err.response?.data?.message?.includes('Insufficient tokens')) {
//        setSaveError("You don't have enough tokens to save this story. Please purchase more tokens.");
//        setShowTokenWarning(true);
//      } else {
//        setSaveError(err.response?.data?.message || "Failed to save story. Please try again.");
//      }
     
//      setIsStorySaved(false);
//    } finally {
//      setIsSavingStory(false);
//    }
//  };

//  // Scene text editing feature
//  const handleEditSceneText = (sceneId) => {
//    const sceneToEdit = scenes.find(scene => scene.id === sceneId);
//    if (!sceneToEdit) return;
   
//    setEditingSceneId(sceneId);
//    setEditableSceneText(sceneToEdit.text);
   
//    // Update scenes to show which one is being edited
//    const updatedScenes = scenes.map(scene => 
//      scene.id === sceneId 
//        ? { ...scene, isEditing: true }
//        : scene
//    );
   
//    setScenes(updatedScenes);
//  };
 
//  const handleCancelEditScene = () => {
//    // Reset editing state
//    setEditingSceneId(null);
//    setEditableSceneText('');
   
//    // Update scenes to cancel edit mode
//    const updatedScenes = scenes.map(scene => ({
//      ...scene,
//      isEditing: false
//    }));
   
//    setScenes(updatedScenes);
//  };
 
//  const handleSaveSceneText = (sceneId) => {
//    // Find the scene being edited
//    const sceneIndex = scenes.findIndex(scene => scene.id === sceneId);
//    if (sceneIndex === -1) return;
   
//    // Update scenes with the new text
//    const updatedScenes = [...scenes];
//    updatedScenes[sceneIndex] = {
//      ...updatedScenes[sceneIndex],
//      text: editableSceneText,
//      isEditing: false
//    };
   
//    setScenes(updatedScenes);
//    setEditingSceneId(null);
//    setEditableSceneText('');
//    setIsStoryModified(true);
//    setIsStorySaved(false);
//  };

//  // Regenerate an image for a specific scene
//  const handleRegenerateSceneImage = async (sceneId, visualDescription) => {
//    // Simply reuse the generate function
//    await handleGenerateSceneImage(sceneId, visualDescription);
//  };

//  // Calculate how many images need to be generated
//  const getImageGenerationCount = () => {
//    let count = 0;
//    if (story?.coverPageVisualDescription && !coverPageImage) count++;
//    scenes.forEach(scene => {
//      if (scene.visualDescription && !scene.image) count++;
//    });
//    if (story?.endPageVisualDescription && !endPageImage) count++;
//    return count;
//  };

//  return (
//    <div className="p-8">
//         <Toaster 
//       position="top-right"
//       toastOptions={{
//         duration: 4000,
//         style: {
//           background: '#363636',
//           color: '#fff',
//         },
//         success: {
//           duration: 3000,
//           style: {
//             background: '#4ade80',
//             color: '#fff',
//           },
//         },
//         error: {
//           duration: 4000,
//           style: {
//             background: '#ef4444',
//             color: '#fff',
//           },
//         },
//       }}
//     />
//      <div className="flex justify-between items-center mb-6">
//        <h2 className="text-2xl font-sans text-dark">Generate Your Story</h2>
       
//        {/* Token balance display */}
//        {remainingTokens !== null && (
//          <div className="bg-primary-50 text-primary-800 px-4 py-2 rounded-full font-medium flex items-center">
//            <FilePlus size={18} className="mr-2" />
//            <span>{remainingTokens} Tokens Available</span>
//          </div>
//        )}
//      </div>
     
//      {loading ? (
//        <div className="text-center py-12">
//          <div className="inline-block mx-auto mb-6">
//            <svg className="animate-spin h-12 w-12 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//            </svg>
//          </div>
//          <h3 className="text-xl font-bold text-dark mb-2">Creating Your Story</h3>
//          <p className="text-gray-600 mb-6">
//            Our AI is crafting a unique story based on your selections. This may take a moment...
//          </p>
//          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5">
//            <div 
//              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
//              style={{ width: `${generationProgress}%` }}
//            ></div>
//          </div>
//          <p className="text-xs text-gray-500 mt-2">{generationProgress}% complete</p>
         
//          {/* Token cost information */}
//          <div className="mt-8 text-sm text-gray-500">
//            <p>Story generation costs 5 tokens.</p>
//          </div>
//        </div>
//      ) : error ? (
//        <div className="text-center py-12">
//          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 max-w-md mx-auto">
//            <p>{error}</p>
//          </div>
         
//          {showTokenWarning ? (
//            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg mb-6 max-w-md mx-auto">
//              <p>You need more tokens to continue. Please visit the token purchase page.</p>
//              <button 
//                className="mt-4 px-6 py-2 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition"
//                onClick={() => window.location.href = '/purchase-tokens'}
//              >
//                Buy Tokens
//              </button>
//            </div>
//          ) : (
//            <button
//              onClick={handleRegenerateStory}
//              className="px-6 py-2 bg-primary-500 text-white font-bold rounded-full hover:bg-primary-600 transition flex items-center mx-auto"
//            >
//              <RefreshCw size={16} className="mr-2" />
//              Try Again
//            </button>
//          )}
//        </div>
//      ) : (
//        <div className="max-w-4xl mx-auto">
//          <div className="bg-primary-50 p-6 rounded-xl mb-8">
//            <h3 className="text-xl font-bold text-dark mb-4">{story.title}</h3>
//            <p className="text-gray-700 mb-4">{story.introduction}</p>
//            <div className="flex items-center text-sm text-gray-500">
//              <span className="mr-4">Story Type: <span className="font-medium capitalize">{story.storyType}</span></span>
//              <span>Main Character: <span className="font-medium">{story.mainCharacter.name}</span></span>
//            </div>
//          </div>
         
//          {/* Bulk Generation Section */}
//          {getImageGenerationCount() > 0 && (
//            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//              <div className="flex items-center justify-between mb-2">
//                <h4 className="text-md font-semibold text-gray-800">Generate All Images</h4>
//                <span className="text-sm text-gray-600">{getImageGenerationCount()} images pending</span>
//              </div>
             
//              {isGeneratingBulkImages ? (
//                <div className="text-center py-4">
//                  <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                  </svg>
//                  <p className="text-sm text-gray-600">Generating images in progress...</p>
//                  <p className="text-xs text-gray-500 mt-1">
//                    Processing {bulkGenerationProgress.current} of {bulkGenerationProgress.total}
//                  </p>
//                </div>
//              ) : (
//                <button
//                  onClick={handleGenerateAllImages}
//                  className="px-6 py-2 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition flex items-center"
//                  disabled={isGeneratingBulkImages}
//                >
//                  <Wand2 size={16} className="mr-2" />
//                  Generate All Images
//                </button>
//              )}
//            </div>
//          )}
         
//          <h3 className="text-lg font-bold text-dark mb-4">Preview Scenes</h3>
//          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//            {scenes.map((scene) => (
//              <div key={scene.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                <div className="h-40 bg-gray-100 flex items-center justify-center relative">
//                  {(scene.isGeneratingImage || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === scene.id)) ? (
//                    <div className="text-center">
//                      <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                      </svg>
//                      <p className="text-xs text-gray-500">Generating image...</p>
//                    </div>
//                  ) : scene.image ? (
//                    <img 
//                      src={scene.image} 
//                      alt={`Scene ${scene.id}: ${scene.title}`} 
//                      className="h-full w-full object-cover"
//                    />
//                  ) : (
//                    <div className="text-gray-400 text-center">
//                      <p>Scene {scene.id} Image</p>
//                      <p className="text-xs">Click Generate to create image</p>
//                      {scene.imageGenerationError && (
//                        <p className="text-xs text-red-500 mt-2">Failed to generate. Try again.</p>
//                      )}
//                    </div>
//                  )}
//                </div>
//                <div className="p-4">
//                  <div className="flex justify-between items-start mb-1">
//                    <h4 className="font-bold text-2xl text-dark">{scene.title}</h4>
                   
//                    {/* Edit/Save toggle for scene text */}
//                    {scene.isEditing ? (
//                      <div className="flex space-x-2">
//                        <button 
//                          onClick={() => handleSaveSceneText(scene.id)}
//                          className="text-green-600 hover:text-green-800"
//                          title="Save changes"
//                        >
//                          <Save size={16} />
//                        </button>
//                        <button 
//                          onClick={handleCancelEditScene}
//                          className="text-red-600 hover:text-red-800"
//                          title="Cancel editing"
//                        >
//                          <X size={16} />
//                        </button>
//                      </div>
//                    ) : (
//                      <button 
//                        onClick={() => handleEditSceneText(scene.id)}
//                        className="text-gray-600 hover:text-gray-800"
//                        title="Edit scene text"
//                      >
//                        <Edit size={16} />
//                      </button>
//                    )}
//                  </div>
                 
//                  {/* Scene text - editable or read-only */}
//                  {scene.isEditing && editingSceneId === scene.id ? (
//                    <textarea
//                      value={editableSceneText}
//                      onChange={(e) => setEditableSceneText(e.target.value)}
//                      className="w-full p-2 border border-gray-300 rounded text-sm text-gray-700 min-h-[100px]"
//                    />
//                  ) : (
//                    <p className="text-md text-gray-600">{scene.text}</p>
//                  )}
                 
//                  {scene.visualDescription && (
//                    <div className="mt-3 pt-3 border-t border-gray-200">
//                      {/* Show error message if generation failed */}
//                      {scene.imageGenerationError && (
//                        <p className="text-xs text-red-500 mb-2">{scene.imageGenerationError}</p>
//                      )}
                     
//                      <div className="mt-3 flex gap-2">
//                         {(scene.image || scene.imageGenerationError) && (
//                           <button 
//                             className="px-2 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
//                             onClick={() => handleRegenerateSceneImage(scene.id, scene.visualDescription)}
//                             disabled={scene.isGeneratingImage || isGeneratingBulkImages}
//                           >
//                             {scene.image ? 'Edit Scene Image' : 'Generate Scene Image'}
//                           </button>
//                         )}
//                       </div>
//                    </div>
//                  )}
//                </div>
//              </div>
//            ))}
//          </div>

//          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//            {/* Cover Page */}
//            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
//                {(isGeneratingCover || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === 'cover')) ? (
//                  <div className="text-center">
//                    <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                    </svg>
//                    <p className="text-xs text-gray-500">Generating cover image...</p>
//                  </div>
//                ) : coverPageImage ? (
//                  <img 
//                    src={coverPageImage} 
//                    alt="Story Cover Page" 
//                    className="h-full w-full object-cover"
//                  />
//                ) : (
//                  <div className="text-gray-400 text-center p-4">
//                    <p className="font-bold">Cover Page</p>
//                    <p className="text-xs">Click Generate to create image</p>
//                  </div>
//                )}
//              </div>
//              <div className="p-4">
//                <h4 className="font-bold text-dark mb-1">Cover Page</h4>
//                {story.coverPageVisualDescription && (
//                  <div className="mt-2">
//                    <p className="text-xs text-gray-500 italic line-clamp-3">{story.coverPageVisualDescription}</p>
//                    <button 
//                      className="mt-3 px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
//                      onClick={handleGenerateCoverImage}
//                      disabled={isGeneratingCover || isGeneratingBulkImages}
//                    >
//                      {coverPageImage ? 'Regenerate Cover' : 'Generate Cover'}
//                    </button>
//                  </div>
//                )}
//              </div>
//            </div>
           
//            {/* End Page */}
//            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//              <div className="h-48 bg-gray-100 flex items-center justify-center relative">
//                {(isGeneratingEndPage || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === 'end')) ? (
//                  <div className="text-center">
//                    <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                      </svg>
//                    <p className="text-xs text-gray-500">Generating end page image...</p>
//                  </div>
//                ) : endPageImage ? (
//                  <img 
//                    src={endPageImage} 
//                    alt="Story End Page" 
//                    className="h-full w-full object-cover"
//                  />
//                ) : (
//                  <div className="text-gray-400 text-center p-4">
//                    <p className="font-bold">End Page</p>
//                    <p className="text-xs">Click Generate to create image</p>
//                  </div>
//                )}
//              </div>
//              <div className="p-4">
//                <h4 className="font-bold text-dark mb-1">End Page</h4>
//                {story.endPageVisualDescription && (
//                  <div className="mt-2">
//                    <p className="text-xs text-gray-500 italic line-clamp-3">{story.endPageVisualDescription}</p>
//                    <button 
//                      className="mt-3 px-3 py-1.5 text-sm bg-primary-500 text-white rounded hover:bg-primary-600 transition flex items-center"
//                      onClick={handleGenerateEndPageImage}
//                      disabled={isGeneratingEndPage || isGeneratingBulkImages}
//                    >
//                      {endPageImage ? 'Regenerate End Page' : 'Generate End Page'}
//                    </button>
//                  </div>
//                )}
//              </div>
//            </div>
//          </div>
         
//          {/* Token information callout */}
//          <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm text-blue-700">
//            <p className="font-semibold mb-1">Token Usage Information:</p>
//            <ul className="list-disc pl-5 space-y-1">
//              <li>Story generation: 5 tokens (one-time)</li>
//              <li>First story save: {saveCost} tokens (one-time)</li>
//              <li>Subsequent updates: Free</li>
//            </ul>
//          </div>
         
//          <div className="flex flex-wrap gap-4 justify-between">
//            <button
//              onClick={handleRegenerateStory}
//              className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition flex items-center"
//            >
//              <RefreshCw size={16} className="mr-2" />
//              Regenerate Story (5 tokens)
//            </button>

//            {/* Save Story Button */}
//            <button
//              onClick={handleSaveStory}
//              disabled={isSavingStory || (isStorySaved && !isStoryModified)}
//              className={`px-6 py-2 rounded-full transition flex items-center 
//                ${isSavingStory 
//                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                  : isStorySaved && !isStoryModified
//                    ? 'bg-green-500 text-white' 
//                    : 'bg-primary-500 text-white hover:bg-primary-600'
//                }`}
//            >
//              {isSavingStory ? (
//                <>
//                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                  </svg>
//                  Saving...
//                </>
//              ) : isStorySaved && !isStoryModified ? (
//                '✓ Story Saved'
//              ) : storyId && isStorySaved ? (
//                'Update Story (Free)'
//              ) : (
//                `Save Story ${saveCost > 0 ? `(${saveCost} tokens)` : ''}`
//              )}
//            </button>
           
//            <button
//              onClick={handleContinue}
//              disabled={!isStorySaved || isStoryModified}
//              className={`px-8 py-3 rounded-full transition flex items-center 
//                ${(!isStorySaved || isStoryModified)
//                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                  : 'bg-primary-500 text-white hover:bg-primary-600'
//                }`}
//              >
//              Continue to Story Canvas
//              <ArrowRight size={18} className="ml-2" />
//            </button>
//          </div>
         
//          {isStoryModified && (
//            <div className="mt-4 bg-yellow-50 border border-yellow-300 text-yellow-600 px-4 py-3 rounded relative" role="alert">
//              <span className="block sm:inline">
//                You have unsaved changes. Please save your story before continuing.
//              </span>
//            </div>
//          )}
         
//          {saveError && (
//            <div className="mt-4 bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded relative" role="alert">
//              <span className="block sm:inline">{saveError}</span>
//              <button 
//                onClick={() => setSaveError(null)} 
//                className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-600 hover:text-red-800"
//              >
//                <X size={16} />
//              </button>
//            </div>
//          )}
//        </div>
//      )}
//    </div>
//  );
// };

// export default StoryGenerator;


// components/story/StoryGenerator.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, X, Edit, Save, FilePlus, Wand2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

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
 const [showTokenWarning, setShowTokenWarning] = useState(false);
 
 // New states for bulk image generation
 const [isGeneratingBulkImages, setIsGeneratingBulkImages] = useState(false);
 const [bulkGenerationProgress, setBulkGenerationProgress] = useState({
   current: 0,
   total: 0,
   currentSceneId: null
 });
 const [bulkGenerationResults, setBulkGenerationResults] = useState([]);
 
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
       setLoading(false);
     }
   };
   
   generateStory();
 }, [includeChild, childCharacter, storyType]);

 
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

// Update the handleGenerateSceneImage function
const handleGenerateSceneImage = async (sceneId, visualDescription) => {
  try {
    const sceneIndex = scenes.findIndex(scene => scene.id === sceneId);
    if (sceneIndex === -1) return;
    
    // Get the current scene to check for moderation error
    const currentScene = scenes[sceneIndex];
    
    // Update scene to show loading
    const updatedScenes = scenes.map((scene, index) => 
      index === sceneIndex 
        ? { ...scene, isGeneratingImage: true }
        : scene
    );
    setScenes(updatedScenes);
    
    let response;
    
    // Use appropriate endpoint based on whether there's a moderation error
    if (currentScene.moderationError) {
      console.log("Using sanitized endpoint due to moderation error");
      response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene-sanitized`,
        {
          sceneId,
          visualDescription,
          moderationError: currentScene.moderationError
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } else {
      response = await axios.post(
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
    }
    
    if (!response.data || !response.data.success) {
      throw new Error(response.data?.message || "Failed to generate image");
    }
    
    const imageUrl = response.data.data.imageUrl;
    
    // Update scene with new image and clear any errors
    const finalUpdatedScenes = scenes.map((scene) => 
      scene.id === sceneId 
        ? { 
            ...scene, 
            image: imageUrl, 
            isGeneratingImage: false,
            imageGenerationError: null,
            moderationError: null // Clear moderation error after successful generation
          }
        : scene
    );
    
    setScenes(finalUpdatedScenes);
    setIsStoryModified(true);
    setIsStorySaved(false);
    
    // Show success toast if it was moderated
    if (response.data.data.wasModerated) {
      toast.success('Image generated successfully with safe content!');
    }
    
  } catch (err) {
    console.error('Full error object:', err);
    console.error('Error response:', err.response?.data);
    
    // Check if it's a moderation error
    const isModerationError = err.response?.status === 403 && 
                             err.response?.data?.error?.includes('Content moderated');
    
    // Update scene with error information
    const finalUpdatedScenes = scenes.map((scene) => 
      scene.id === sceneId 
        ? { 
            ...scene, 
            isGeneratingImage: false,
            imageGenerationError: err.message,
            moderationError: isModerationError ? err.response.data.error : null
          }
        : scene
    );
    
    setScenes(finalUpdatedScenes);
    
    // Show appropriate error message
    if (isModerationError) {
      toast.error('Content needs adjustment. Click to generate with safe content.');
    } else {
      toast.error('Failed to generate image. Please try again.');
    }
  }
};

 // New function for bulk image generation
 const handleGenerateAllImages = async () => {
   // Prepare scenes that need images
   const scenesToGenerate = [];
   
   // Check cover page
   if (story.coverPageVisualDescription && !coverPageImage) {
     scenesToGenerate.push({
       sceneId: 'cover',
       visualDescription: story.coverPageVisualDescription
     });
   }
   
   // Check all scenes
   scenes.forEach(scene => {
     if (scene.visualDescription && !scene.image) {
       scenesToGenerate.push({
         sceneId: scene.id,
         visualDescription: scene.visualDescription
       });
     }
   });
   
   // Check end page
   if (story.endPageVisualDescription && !endPageImage) {
     scenesToGenerate.push({
       sceneId: 'end',
       visualDescription: story.endPageVisualDescription
     });
   }
   
   if (scenesToGenerate.length === 0) {
     toast.success("All images are already generated!");
     return;
   }
   
   // Set up bulk generation state
   setIsGeneratingBulkImages(true);
   setBulkGenerationProgress({
     current: 0,
     total: scenesToGenerate.length,
     currentSceneId: null
   });
   setBulkGenerationResults([]);
   
   try {
     const response = await axios.post(
       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scenes-bulk`,
       { scenes: scenesToGenerate },
       {
         withCredentials: true,
         headers: {
           "Content-Type": "application/json"
         }
       }
     );

     // ADD THIS DEBUG LOG
    console.log('Bulk API Response:', response.data);
    console.log('Number of results returned:', response.data?.data?.results?.length);
    console.log('Results array:', response.data?.data?.results);
     
     if (response.data && response.data.success) {
       const results = response.data.data.results;
       setBulkGenerationResults(results);
       // Add this debug log right before processing results
      console.log('About to process results. Current scenes:', scenes);
      console.log('Processing these results:', results);
      const updatedScenes = [...scenes]; // Create a copy of scenes array
      let coverUpdated = false;
      let endUpdated = false;

      results.forEach(result => {
        console.log(`Processing result for sceneId: ${result.sceneId}`, result.success);
        
        if (result.success) {
          if (result.sceneId === 'cover') {
            setCoverPageImage(result.imageUrl);
            coverUpdated = true;
          } else if (result.sceneId === 'end') {
            setEndPageImage(result.imageUrl);
            endUpdated = true;
          } else {
            // Find the scene index and update it in the copy
            const sceneIndex = updatedScenes.findIndex(scene => scene.id === result.sceneId);
            if (sceneIndex !== -1) {
              updatedScenes[sceneIndex] = {
                ...updatedScenes[sceneIndex],
                image: result.imageUrl,
                imageGenerationError: null,
                moderationError: null
              };
            }
          }
        } else {
          // Handle failed scenes
          if (result.sceneId !== 'cover' && result.sceneId !== 'end') {
            const sceneIndex = updatedScenes.findIndex(scene => scene.id === result.sceneId);
            if (sceneIndex !== -1) {
              const isModerationError = result.error && result.error.includes('Content moderated');
              updatedScenes[sceneIndex] = {
                ...updatedScenes[sceneIndex],
                imageGenerationError: result.fallbackMessage,
                moderationError: isModerationError ? result.error : null
              };
              console.log(`Scene ${result.sceneId} moderation error:`, isModerationError);
            }
          }
        }
      });

      // Set all scenes at once after processing all results
      setScenes(updatedScenes);

      setIsStoryModified(true);
      setIsStorySaved(false);
       
       // Show summary
       const successCount = results.filter(r => r.success).length;
       const failCount = results.filter(r => !r.success).length;
       
       if (failCount > 0) {
          toast.error(`${failCount} images failed`, {
            icon: '⚠️',
            duration: 5000,
          });
          toast.success(`${successCount} images generated successfully!`, {
            icon: '✅',
            duration: 5000,
          });
        } else {
          toast.success(`All ${successCount} images generated successfully!`, {
            icon: '🎉',
            duration: 4000,
          });
        }
     }
   } catch (err) {
     console.error('Error generating bulk images:', err);
     toast.error('Failed to generate images. Please try again.');
   } finally {
     setIsGeneratingBulkImages(false);
     setBulkGenerationProgress({
       current: 0,
       total: 0,
       currentSceneId: null
     });
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
       
       toast.success('Story saved successfully!');
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

 // Calculate how many images need to be generated
 const getImageGenerationCount = () => {
   let count = 0;
   if (story?.coverPageVisualDescription && !coverPageImage) count++;
   scenes.forEach(scene => {
     if (scene.visualDescription && !scene.image) count++;
   });
   if (story?.endPageVisualDescription && !endPageImage) count++;
   return count;
 };

 return (
   <div className="p-8">
        <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#4ade80',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
      }}
    />
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
         
         {/* Bulk Generation Section */}
         {getImageGenerationCount() > 0 && (
           <div className="mb-6 p-4 bg-blue-50 rounded-lg">
             <div className="flex items-center justify-between mb-2">
               <h4 className="text-md font-semibold text-gray-800">Generate All Images</h4>
               <span className="text-sm text-gray-600">{getImageGenerationCount()} images pending</span>
             </div>
             
             {isGeneratingBulkImages ? (
               <div className="text-center py-4">
                 <svg className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 <p className="text-sm text-gray-600">Generating images in progress...</p>
                 <p className="text-xs text-gray-500 mt-1">
                   Processing {bulkGenerationProgress.current} of {bulkGenerationProgress.total}
                 </p>
               </div>
             ) : (
               <button
                 onClick={handleGenerateAllImages}
                 className="px-6 py-2 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition flex items-center"
                 disabled={isGeneratingBulkImages}
               >
                 <Wand2 size={16} className="mr-2" />
                 Generate All Images
               </button>
             )}
           </div>
         )}
         
         <h3 className="text-lg font-bold text-dark mb-4">Preview Scenes</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
           {scenes.map((scene) => (
             <div key={scene.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
               <div className="h-40 bg-gray-100 flex items-center justify-center relative">
                 {(scene.isGeneratingImage || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === scene.id)) ? (
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
                     {scene.imageGenerationError && (
                       <p className="text-xs text-red-500 mt-2">Failed to generate. Try again.</p>
                     )}
                   </div>
                 )}
               </div>
               <div className="p-4">
                 <div className="flex justify-between items-start mb-1">
                   <h4 className="font-bold text-2xl text-dark">{scene.title}</h4>
                   
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
                   <p className="text-md text-gray-600">{scene.text}</p>
                 )}
                 
                 {scene.visualDescription && (
                   <div className="mt-3 pt-3 border-t border-gray-200">
                     {/* Show error message if generation failed */}
                     {scene.imageGenerationError && (
                       <p className="text-xs text-red-500 mb-2">{scene.imageGenerationError}</p>
                     )}
                     
                     <div className="mt-3 flex gap-2">
                      {(scene.image || scene.imageGenerationError) && (
                        <button 
                          className={`px-2 py-1 text-xs rounded hover:opacity-90 transition flex items-center
                            ${scene.moderationError 
                              ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                              : 'bg-primary-500 hover:bg-primary-600 text-white'
                            }`}
                          onClick={() => handleGenerateSceneImage(scene.id, scene.visualDescription)}
                          disabled={scene.isGeneratingImage || isGeneratingBulkImages}
                        >
                          {scene.image 
                            ? 'Edit Scene Image' 
                            : scene.moderationError 
                              ? 'Generate Safe Image' 
                              : 'Generate Scene Image'
                          }
                        </button>
                      )}
                    </div>

                      {scene.moderationError && (
                        <p className="text-xs text-yellow-600 mt-1">
                          Content needs adjustment
                        </p>
                      )}
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
               {(isGeneratingCover || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === 'cover')) ? (
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
                     disabled={isGeneratingCover || isGeneratingBulkImages}
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
               {(isGeneratingEndPage || (isGeneratingBulkImages && bulkGenerationProgress.currentSceneId === 'end')) ? (
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
                     disabled={isGeneratingEndPage || isGeneratingBulkImages}
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