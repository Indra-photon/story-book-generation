// components/story/StoryEditor.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Save, X, RefreshCw, ArrowLeft, Book, FileText, ImageIcon, ChevronDown, ChevronUp, FilePlus } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const StoryEditor = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [expandedScenes, setExpandedScenes] = useState({});
  
  // State for editing components
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingIntroduction, setEditingIntroduction] = useState(false);
  const [editingConclusion, setEditingConclusion] = useState(false);
  const [editingSceneId, setEditingSceneId] = useState(null);
  
  // State for text content being edited
  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [editableSceneText, setEditableSceneText] = useState('');
  
  // State for image generation
  const [generatingImageId, setGeneratingImageId] = useState(null);

  // Add these state variables
const [isStorySaved, setIsStorySaved] = useState(true); // True because we're editing an existing story
const [isSavingStory, setIsSavingStory] = useState(false);
const [saveError, setSaveError] = useState(null);
const [remainingTokens, setRemainingTokens] = useState(null);
const [saveCost, setSaveCost] = useState(0); // Updates are typically free
const [showTokenWarning, setShowTokenWarning] = useState(false);
const [coverPageImage, setCoverPageImage] = useState(null);
const [endPageImage, setEndPageImage] = useState(null);
  
  // Fetch story data
  // useEffect(() => {
  //   const fetchStoryData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-story/${storyId}`,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Content-Type": "application/json"
  //           }
  //         }
  //       );
        
        
  //       if (response.data.success) {
  //         const storyData = response.data.data;
          
  //         // Set the story ID
  //         // setStoryId(storyData._id);
          
  //         // Set main story data
  //         setStory({
  //           _id: storyData._id,
  //           title: storyData.title,
  //           introduction: storyData.introduction,
  //           conclusion: storyData.conclusion,
  //           storyType: storyData.storyType,
  //           ageGroup: storyData.ageGroup,
  //           characters: storyData.characters || [],
  //           coverPage: storyData.coverPage,
  //           endPage: storyData.endPage,
  //           status: storyData.status,
  //           isPublic: storyData.isPublic,
  //           // Add these properties to match StoryGenerator structure
  //           coverPageVisualDescription: storyData.coverPage?.visualDescription || '',
  //           endPageVisualDescription: storyData.endPage?.visualDescription || '',
  //           storyStyleGuide: storyData.storyStyleGuide || {}
  //         });
          
  //         // Set cover and end page images
  //         setCoverPageImage(storyData.coverPage?.imageUrl || null);
  //         setEndPageImage(storyData.endPage?.imageUrl || null);
          
  //         // Set form values
  //         setTitle(storyData.title);
  //         setIntroduction(storyData.introduction);
  //         setConclusion(storyData.conclusion);
          
  //         // Format scenes from the array
  //         if (storyData.scenes && Array.isArray(storyData.scenes)) {
  //           // Sort scenes by order if it exists
  //           const sortedScenes = [...storyData.scenes].sort((a, b) => (a.order || 0) - (b.order || 0));
            
  //           // Map scenes to match the expected structure
  //           const formattedScenes = sortedScenes.map(scene => ({
  //             id: scene._id,
  //             _id: scene._id,
  //             title: scene.title,
  //             text: scene.text,
  //             image: scene.imageUrl,
  //             imageUrl: scene.imageUrl,
  //             visualDescription: scene.visualDescription,
  //             order: scene.order
  //           }));
            
  //           setScenes(formattedScenes);
  //         }
          
  //         // If token balance is returned
  //         if (response.data.data.remainingTokens !== undefined) {
  //           setRemainingTokens(response.data.data.remainingTokens);
  //         }
          
  //         setLoading(false);
  //         setIsStorySaved(true);
  //         setIsModified(false);
  //       } else {
  //         throw new Error("Failed to fetch story data");
  //       }
  //     } catch (err) {
  //       console.error('Error fetching story:', err);
  //       setError('Failed to load story. Please try again.');
  //       setLoading(false);
  //     }
  //   };
    
  //   if (storyId) {
  //     fetchStoryData();
  //   }
  // }, [storyId]);

  useEffect(() => {
    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-story/${storyId}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        
        if (response.data.success) {
          const storyData = response.data.data;
          
          // Set main story data
          setStory({
            _id: storyData._id,
            title: storyData.title,
            introduction: storyData.introduction,
            conclusion: storyData.conclusion,
            storyType: storyData.storyType,
            ageGroup: storyData.ageGroup,
            characters: storyData.characters || [],
            coverPage: storyData.coverPage,
            endPage: storyData.endPage,
            status: storyData.status,
            isPublic: storyData.isPublic,
            // Add these properties for compatibility with save function
            coverPageVisualDescription: storyData.coverPage?.visualDescription || '',
            endPageVisualDescription: storyData.endPage?.visualDescription || '',
            storyStyleGuide: storyData.storyStyleGuide || {}
          });
          
          // Set cover and end page images in separate state variables
          // This ensures both state locations have the image URLs
          setCoverPageImage(storyData.coverPage?.imageUrl);
          setEndPageImage(storyData.endPage?.imageUrl);
          
          // Format scenes consistently
          if (storyData.scenes && Array.isArray(storyData.scenes)) {
            const sortedScenes = [...storyData.scenes].sort((a, b) => (a.order || 0) - (b.order || 0));
            
            // Ensure scenes have both image and imageUrl properties
            const formattedScenes = sortedScenes.map(scene => ({
              id: scene._id,
              _id: scene._id,
              title: scene.title,
              text: scene.text,
              image: scene.imageUrl, // Set both properties
              imageUrl: scene.imageUrl,
              visualDescription: scene.visualDescription,
              order: scene.order
            }));
            
            setScenes(formattedScenes);
          }
          
          setLoading(false);
          setIsStorySaved(true);
          setIsModified(false);
        } else {
          throw new Error("Failed to fetch story data");
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story. Please try again.');
        setLoading(false);
      }
    };
    
    if (storyId) {
      fetchStoryData();
    }
  }, [storyId]);
  
  // Toggle scene expansion
  const toggleSceneExpansion = (sceneId) => {
    setExpandedScenes(prev => ({
      ...prev,
      [sceneId]: !prev[sceneId]
    }));
  };
  
  // Handle edit modes for text content
  const startEditing = (field, data = '') => {
    switch (field) {
      case 'title':
        setEditingTitle(true);
        break;
      case 'introduction':
        setEditingIntroduction(true);
        break;
      case 'conclusion':
        setEditingConclusion(true);
        break;
      case 'scene':
        setEditingSceneId(data._id);
        setEditableSceneText(data.text);
        break;
      default:
        break;
    }
  };
  
  // Cancel editing
  const cancelEditing = (field) => {
    switch (field) {
      case 'title':
        setEditingTitle(false);
        setTitle(story.title);
        break;
      case 'introduction':
        setEditingIntroduction(false);
        setIntroduction(story.introduction);
        break;
      case 'conclusion':
        setEditingConclusion(false);
        setConclusion(story.conclusion);
        break;
      case 'scene':
        setEditingSceneId(null);
        setEditableSceneText('');
        break;
      default:
        break;
    }
  };
  
  // Save edited content
  const saveEdits = (field, sceneId = null) => {
    switch (field) {
      case 'title':
        if (title !== story.title) {
          setStory(prev => ({ ...prev, title }));
          setEditingTitle(false);
          setIsModified(true);
        } else {
          setEditingTitle(false);
        }
        break;
      case 'introduction':
        if (introduction !== story.introduction) {
          setStory(prev => ({ ...prev, introduction }));
          setEditingIntroduction(false);
          setIsModified(true);
        } else {
          setEditingIntroduction(false);
        }
        break;
      case 'conclusion':
        if (conclusion !== story.conclusion) {
          setStory(prev => ({ ...prev, conclusion }));
          setEditingConclusion(false);
          setIsModified(true);
        } else {
          setEditingConclusion(false);
        }
        break;
      case 'scene':
        const updatedScenes = scenes.map(scene => 
          scene._id === sceneId 
            ? { ...scene, text: editableSceneText }
            : scene
        );
        setScenes(updatedScenes);
        setEditingSceneId(null);
        setEditableSceneText('');
        setIsModified(true);
        break;
      default:
        break;
    }
  };
  
  // Generate/regenerate images for scenes
  // const handleGenerateImage = async (sceneId, visualDescription) => {
  //   setGeneratingImageId(sceneId);
    
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/create-scene`,
  //       {
  //         sceneId,
  //         visualDescription
  //       },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
      
  //     if (response.data && response.data.success) {
  //       const imageUrl = response.data.data.imageUrl;
        
  //       // Update specific scene or cover/end page
  //       if (sceneId === 'cover') {
  //         setStory(prev => ({
  //           ...prev,
  //           coverPage: {
  //             ...prev.coverPage,
  //             imageUrl
  //           }
  //         }));
  //       } else if (sceneId === 'end') {
  //         setStory(prev => ({
  //           ...prev,
  //           endPage: {
  //             ...prev.endPage,
  //             imageUrl
  //           }
  //         }));
  //       } else {
  //         // Find and update the specific scene
  //         const updatedScenes = scenes.map(scene => 
  //           scene._id === sceneId 
  //             ? { ...scene, imageUrl }
  //             : scene
  //         );
  //         setScenes(updatedScenes);
  //       }
        
  //       setIsModified(true);
  //       toast.success('Image generated successfully!');
  //     } else {
  //       throw new Error(response.data?.message || "Failed to generate image");
  //     }
  //   } catch (err) {
  //     console.error('Error generating image:', err);
  //     toast.error('Failed to generate image. Please try again.');
  //   } finally {
  //     setGeneratingImageId(null);
  //   }
  // };
  
  // // Save all changes to the database
  // const handleSaveStory = async () => {
  //   // Reset previous save errors
  //   setSaveError(null);
    
  //   // Validate story and scene readiness
  //   if (!story || scenes.length === 0) {
  //     setSaveError("Story is not complete. Please generate a story first.");
  //     return;
  //   }
    
  //   // Show token cost confirmation for initial saves
  //   if (!storyId && !isStorySaved) {
  //     const confirmMessage = `Saving this story will cost ${saveCost} tokens. Do you want to continue?`;
  //     if (!window.confirm(confirmMessage)) {
  //       return;
  //     }
  //   }
  
  //   // Set saving state
  //   setIsSavingStory(true);
  
  //   try {
  //     const savePayload = {
  //       storyId: storyId, // Include the storyId if it exists
  //       story: {
  //         title: story.title,
  //         storyType: story.storyType,
  //         introduction: story.introduction,
  //         conclusion: story.conclusion,
  //         characters: story.characters || [],
  //         storyStyleGuide: story.storyStyleGuide || {}
  //       },
  //       scenes: scenes.map(scene => ({
  //         id: scene.id,
  //         title: scene.title,
  //         text: scene.text,
  //         image: scene.image,
  //         visualDescription: scene.visualDescription
  //       })),
  //       // Format cover page properly
  //       coverPage: {
  //         visualDescription: story.coverPageVisualDescription,
  //         imageUrl: coverPageImage
  //       },
  //       // Format end page properly
  //       endPage: {
  //         visualDescription: story.endPageVisualDescription,
  //         imageUrl: endPageImage
  //       }
  //     };
      
  //     // Add storyId if we're updating an existing story
  //     if (storyId) {
  //       savePayload.storyId = storyId;
  //     }
  
  //     // Call backend save story endpoint
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/save-story`,
  //       savePayload,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "application/json"
  //         }
  //       }
  //     );
  
  //     // Handle successful save
  //     if (response.data.success) {
  //       setIsStorySaved(true);
  //       setIsModified(false);
        
  //       // Store story ID for future updates
  //       if (response.data.data.story._id) {
  //         // setStoryId(response.data.data.story._id);
  //       }
        
  //       // Update token balance
  //       if (response.data.data.remainingTokens !== undefined) {
  //         setRemainingTokens(response.data.data.remainingTokens);
  //       }
        
  //       // Update save cost (should be 0 for subsequent saves)
  //       setSaveCost(0);
        
  //       toast.success('Story saved successfully!');
  //       console.log('Story saved successfully', response.data.data);
  //     } else {
  //       throw new Error(response.data.message || "Failed to save story");
  //     }
  //   } catch (err) {
  //     console.error('Error saving story:', err);
      
  //     // Handle specific error types
  //     if (err.response?.data?.message?.includes('Insufficient tokens')) {
  //       setSaveError("You don't have enough tokens to save this story. Please purchase more tokens.");
  //       setShowTokenWarning(true);
  //     } else {
  //       setSaveError(err.response?.data?.message || "Failed to save story. Please try again.");
  //     }
      
  //     setIsStorySaved(false);
  //   } finally {
  //     setIsSavingStory(false);
  //   }
  // };

  // Fix 1: Update handleGenerateImage to make consistent state updates
  const handleGenerateImage = async (sceneId, visualDescription) => {
    setGeneratingImageId(sceneId);
    
    try {
      console.log("Generating image for:", sceneId, "with description:", visualDescription);
      
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
      
      if (response.data && response.data.success) {
        const imageUrl = response.data.data.imageUrl;
        console.log("Image generated successfully:", imageUrl);
        
        // Update specific scene or cover/end page
        if (sceneId === 'cover') {
          // Update coverPageImage state
          setCoverPageImage(imageUrl);
          
          // Also update the story object for consistency
          setStory(prev => ({
            ...prev,
            coverPage: {
              ...prev.coverPage,
              imageUrl
            }
          }));
          
          console.log("Cover page image updated to:", imageUrl);
        } else if (sceneId === 'end') {
          // Update endPageImage state
          setEndPageImage(imageUrl);
          
          // Also update the story object for consistency
          setStory(prev => ({
            ...prev,
            endPage: {
              ...prev.endPage,
              imageUrl
            }
          }));
          
          console.log("End page image updated to:", imageUrl);
        } else {
          // Find and update the specific scene
          const updatedScenes = scenes.map(scene => 
            scene._id === sceneId 
              ? { 
                  ...scene, 
                  imageUrl, 
                  image: imageUrl // Set both properties for consistency
                }
              : scene
          );
          
          setScenes(updatedScenes);
          console.log("Scene image updated. Updated scenes:", updatedScenes);
        }
        
        setIsModified(true);
        toast.success('Image generated successfully!');
      } else {
        throw new Error(response.data?.message || "Failed to generate image");
      }
    } catch (err) {
      console.error('Error generating image:', err);
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setGeneratingImageId(null);
    }
  };

  // Fix 2: Update handleSaveStory to ensure proper payload structure
  const handleSaveStory = async () => {
    // Reset previous save errors
    setSaveError(null);
    
    // Validate story and scene readiness
    if (!story || scenes.length === 0) {
      setSaveError("Story is not complete.");
      return;
    }
    
    // Set saving state
    setIsSavingStory(true);
    
    // Log the current state for debugging
    console.log("Current state before save:", {
      coverPageImage,
      endPageImage,
      story: {
        coverPage: story.coverPage,
        endPage: story.endPage
      }
    });

    try {
      // For consistency, use the most up-to-date image URLs
      // from either separate state variables or the story object
      const finalCoverPageImage = coverPageImage || story.coverPage?.imageUrl;
      const finalEndPageImage = endPageImage || story.endPage?.imageUrl;
      
      const savePayload = {
        storyId: storyId,
        story: {
          title: story.title,
          storyType: story.storyType,
          introduction: story.introduction,
          conclusion: story.conclusion,
          characters: story.characters || [],
          storyStyleGuide: story.storyStyleGuide || {}
        },
        scenes: scenes.map(scene => ({
          id: scene._id, // Use _id for MongoDB ObjectId
          title: scene.title,
          text: scene.text,
          image: scene.imageUrl || scene.image, // Use imageUrl or fallback to image
          visualDescription: scene.visualDescription
        })),
        // Format cover page properly
        coverPage: {
          visualDescription: story.coverPage?.visualDescription || story.coverPageVisualDescription,
          imageUrl: finalCoverPageImage
        },
        // Format end page properly
        endPage: {
          visualDescription: story.endPage?.visualDescription || story.endPageVisualDescription,
          imageUrl: finalEndPageImage
        }
      };
      
      // Log the payload for debugging
      console.log("Save payload:", JSON.stringify(savePayload, null, 2));
      // Log the save payload for debugging
      console.log("Save payload image fields:", {
        coverImage: savePayload.coverPage.imageUrl,
        endImage: savePayload.endPage.imageUrl,
        firstSceneImage: savePayload.scenes[0]?.image
      });
      
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
      
      console.log("Save response:", response.data);

      // Handle successful save
      if (response.data.success) {
        setIsStorySaved(true);
        setIsModified(false);
        
        // Update token balance if provided
        if (response.data.data.remainingTokens !== undefined) {
          setRemainingTokens(response.data.data.remainingTokens);
        }
        
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => navigate('/profile')}
            className="mt-4 bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Profile
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex items-center mb-6">
        
        
        <div className="flex gap-3 mb-10">
        </div>
      </div>
      
      {isModified && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg mb-6">
          You have unsaved changes. Make sure to save your story before leaving this page.
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          {/* Story Title */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Story Title</h2>
              {!editingTitle && (
                <button 
                  onClick={() => startEditing('title')}
                  className="text-primary-500 hover:text-primary-600"
                >
                  <Edit size={16} />
                </button>
              )}
            </div>
            
            {editingTitle ? (
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => cancelEditing('title')}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveEdits('title')}
                    className="text-primary-500 hover:text-primary-600 flex items-center"
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <h3 className="text-xl font-bold text-dark">{story.title}</h3>
            )}
          </div>
          
          {/* Story Type & Age Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Story Type</h3>
              <p className="text-gray-800 capitalize">{story.storyType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Age Group</h3>
              <p className="text-gray-800">{story.ageGroup}</p>
            </div>
          </div>
          
          {/* Story Introduction */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Introduction</h2>
              {!editingIntroduction && (
                <button 
                  onClick={() => startEditing('introduction')}
                  className="text-primary-500 hover:text-primary-600"
                >
                  <Edit size={16} />
                </button>
              )}
            </div>
            
            {editingIntroduction ? (
              <div>
                <textarea
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2 min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => cancelEditing('introduction')}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveEdits('introduction')}
                    className="text-primary-500 hover:text-primary-600 flex items-center"
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{story.introduction}</p>
            )}
          </div>
          
          {/* Story Conclusion */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">Conclusion</h2>
              {!editingConclusion && (
                <button 
                  onClick={() => startEditing('conclusion')}
                  className="text-primary-500 hover:text-primary-600"
                >
                  <Edit size={16} />
                </button>
              )}
            </div>
            
            {editingConclusion ? (
              <div>
                <textarea
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2 min-h-[100px]"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => cancelEditing('conclusion')}
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button 
                    onClick={() => saveEdits('conclusion')}
                    className="text-primary-500 hover:text-primary-600 flex items-center"
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{story.conclusion}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Cover Page */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-primary p-4">
          <h2 className="text-xl font-chewy text-white">Cover Page</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 md:h-64 flex items-center justify-center relative">
                {generatingImageId === 'cover' ? (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Generating image...</p>
                  </div>
                ) : story.coverPage?.imageUrl ? (
                  <img 
                    src={story.coverPage.imageUrl} 
                    alt="Cover Page" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon size={40} className="mx-auto mb-2" />
                    <p>No cover image</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleGenerateImage('cover', story.coverPage?.visualDescription)}
                disabled={generatingImageId === 'cover'}
                className="mt-4 w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center justify-center"
              >
                <RefreshCw size={16} className="mr-2" />
                {story.coverPage?.imageUrl ? 'Regenerate Image' : 'Generate Image'}
              </button>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Cover Page Details</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
                <p className="text-gray-800 font-bold">{story.title}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-700">{story.coverPage?.text || story.introduction}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Visual Prompt</h4>
                <p className="text-gray-600 text-sm italic">{story.coverPage?.visualDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Story Scenes */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-primary p-4">
          <h2 className="text-xl font-chewy text-white">Story Scenes</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {scenes.map((scene) => (
              <div key={scene._id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSceneExpansion(scene._id)}
                >
                  <h3 className="font-bold text-gray-800">
                    Scene {scene.order}: {scene.title}
                  </h3>
                  <div className="flex items-center">
                    {expandedScenes[scene._id] ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedScenes[scene._id] && (
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <div className="bg-gray-100 rounded-lg overflow-hidden h-40 md:h-56 flex items-center justify-center relative">
                          {generatingImageId === scene._id ? (
                            <div className="text-center">
                              <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                              <p className="text-sm text-gray-500">Generating image...</p>
                            </div>
                          ) : scene.imageUrl ? (
                            <img 
                              src={scene.imageUrl} 
                              alt={`Scene ${scene.order}: ${scene.title}`} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-gray-400">
                              <ImageIcon size={40} className="mx-auto mb-2" />
                              <p>No scene image</p>
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleGenerateImage(scene._id, scene.visualDescription)}
                          disabled={generatingImageId === scene._id}
                          className="mt-4 w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center justify-center"
                        >
                          <RefreshCw size={16} className="mr-2" />
                          {scene.imageUrl ? 'Regenerate Image' : 'Generate Image'}
                        </button>
                      </div>
                      
                      <div className="w-full md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-700">Scene Text</h3>
                          {editingSceneId !== scene._id && (
                            <button 
                              onClick={() => startEditing('scene', scene)}
                              className="text-primary-500 hover:text-primary-600"
                            >
                              <Edit size={16} />
                            </button>
                          )}
                        </div>
                        
                        {editingSceneId === scene._id ? (
                          <div>
                            <textarea
                              value={editableSceneText}
                              onChange={(e) => setEditableSceneText(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2 min-h-[150px]"
                            />
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => cancelEditing('scene')}
                                className="text-gray-500 hover:text-gray-700 flex items-center"
                              >
                                <X size={16} className="mr-1" />
                                Cancel
                              </button>
                              <button 
                                onClick={() => saveEdits('scene', scene._id)}
                                className="text-primary-500 hover:text-primary-600 flex items-center"
                              >
                                <Save size={16} className="mr-1" />
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 mb-4">{scene.text}</p>
                        )}
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Visual Prompt</h4>
                          <p className="text-gray-600 text-sm italic">{scene.visualDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* End Page */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-primary p-4">
          <h2 className="text-xl font-chewy text-white">End Page</h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-48 md:h-64 flex items-center justify-center relative">
                {generatingImageId === 'end' ? (
                  <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Generating image...</p>
                  </div>
                ) : story.endPage?.imageUrl ? (
                  <img 
                    src={story.endPage.imageUrl} 
                    alt="End Page" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <ImageIcon size={40} className="mx-auto mb-2" />
                    <p>No end page image</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleGenerateImage('end', story.endPage?.visualDescription)}
                disabled={generatingImageId === 'end'}
                className="mt-4 w-full py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center justify-center"
              >
                <RefreshCw size={16} className="mr-2" />
                {story.endPage?.imageUrl ? 'Regenerate Image' : 'Generate Image'}
              </button>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">End Page Details</h3>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Text</h4>
                <p className="text-gray-700">{story.endPage?.text || story.conclusion}</p>
              </div>
              
              <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Visual Prompt</h4>
                <p className="text-gray-600 text-sm italic">{story.endPage?.visualDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      {/* <div className="flex justify-between mb-8">
        <button 
          onClick={() => navigate('/profile')}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Profile
        </button>
        
        <button
          onClick={handleSaveStory}
          disabled={isSavingStory || !isModified}
          className={`px-6 py-2 rounded-full transition flex items-center ${
            isSavingStory 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : !isModified
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          {isSavingStory ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              {isStorySaved ? 'Save Changes' : 'Save Story'}
            </>
          )}
        </button>
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
      </div> */}
      {/* Action buttons */}
      <div className="flex justify-between mb-8">
        <button 
          onClick={() => navigate('/profile')}
          className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-300 transition flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Profile
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={handleSaveStory}
            disabled={isSavingStory || !isModified}
            className={`px-6 py-2 rounded-full transition flex items-center ${
              isSavingStory 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : !isModified
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isSavingStory ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                {isStorySaved ? 'Save Changes' : 'Save Story'}
              </>
            )}
          </button>
          
          {/* View Story button - appears after successful save */}
          {isStorySaved && !isModified && (
            <button
              onClick={() => navigate(`/story/${storyId}/view`)}
              className="px-6 py-2 bg-accent text-dark rounded-full hover:bg-accent/90 transition flex items-center"
            >
              <Book size={16} className="mr-2" />
              View Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryEditor;