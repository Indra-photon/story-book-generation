// steps/AnimationStep.jsx
import React, { useState } from 'react';
import { Play, Pause, ArrowRight, Upload } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AnimationStep = ({ selectedImage, handleNextStep }) => {
  // State for animation settings
  const [prompt, setPrompt] = useState('');
  const [duration, setDuration] = useState('5');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  // State for file upload
  const [characterImage, setCharacterImage] = useState(null);
  const [characterImagePreview, setCharacterImagePreview] = useState(selectedImage || '');
  
  // State for animation preview
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [animatedImageUrl, setAnimatedImageUrl] = useState('');
  const [error, setError] = useState('');

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCharacterImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacterImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle play/pause animation preview
  // const togglePlayAnimation = () => {
  //   setIsPlaying(!isPlaying);
  // };

  const togglePlayAnimation = () => {
    setIsPlaying(!isPlaying);
    // Find the video element and play/pause it
    const videoElement = document.querySelector('video');
    if (videoElement) {
      if (!isPlaying) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  };

  // Generate animation by calling the backend endpoint
  // const generateAnimation = async () => {
  //   // Validation
  //   if (!characterImage && !selectedImage && !characterImagePreview) {
  //     setError('Please select or upload a character image');
  //     return;
  //   }

  //   if (!prompt) {
  //     setError('Please provide an animation prompt');
  //     return;
  //   }

  //   // Hide any previous errors
  //   setError('');
  //   setIsProcessing(true);

  //   try {
  //     // Create form data for the API request
  //     const formData = new FormData();
  //     formData.append('prompt', prompt);
  //     formData.append('duration', duration);
  //     formData.append('aspectRatio', aspectRatio);
      
  //     // Add the character image file
  //     if (characterImage) {
  //       // If user uploaded a new image
  //       formData.append('characterImage', characterImage);
  //     } else if (selectedImage) {
  //       // If using image from previous step
  //       try {
  //         // Fetch the image from the URL
  //         const response = await fetch(selectedImage);
  //         const blob = await response.blob();
          
  //         // Create a File object from the blob
  //         const imageFile = new File([blob], 'character-image.jpg', { type: 'image/jpeg' });
          
  //         // Append the file to the form data
  //         formData.append('characterImage', imageFile);
  //       } catch (fetchError) {
  //         console.error('Error fetching image:', fetchError);
  //         setError('Unable to process the selected image.');
  //         setIsProcessing(false);
  //         return;
  //       }
  //     }

  //     // Call the backend API to animate the character
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/animate-character`,
  //       formData,
  //       { 
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         }
  //       }
  //     );

  //     // Extract the animation URL from the response
  //     if (response.data && response.data.success) {
  //       setAnimatedImageUrl(response.data.data.animationUrl);
  //       toast.success('Animation generated successfully!');
  //     } else {
  //       throw new Error(response.data?.message || 'Failed to generate animation');
  //     }
      
  //   } catch (error) {
  //     console.error('Animation generation error:', error);
  //     setError(error.response?.data?.message || 'Failed to generate animation. Please try again.');
  //     toast.error(error.response?.data?.message || 'Failed to generate animation');
      
  //     // For development/demo purposes only - remove in production
  //     if (process.env.NODE_ENV !== 'production') {
  //       setAnimatedImageUrl(characterImagePreview || selectedImage);
  //     }
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // Generate animation by calling the backend endpoint
const generateAnimation = async () => {
  // Validation
  if (!characterImage && !selectedImage && !characterImagePreview) {
    setError('Please select or upload a character image');
    return;
  }

  if (!prompt) {
    setError('Please provide an animation prompt');
    return;
  }

  // Hide any previous errors
  setError('');
  setIsProcessing(true);

  try {
    // Create form data for the API request
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('duration', duration);
    formData.append('aspectRatio', aspectRatio);
    
    // Add the character image file
    if (characterImage) {
      // If user uploaded a new image
      formData.append('characterImage', characterImage);
    } else if (selectedImage) {
      // If using image from previous step
      try {
        // Fetch the image from the URL
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        
        // Create a File object from the blob
        const imageFile = new File([blob], 'character-image.jpg', { type: 'image/jpeg' });
        
        // Append the file to the form data
        formData.append('characterImage', imageFile);
      } catch (fetchError) {
        console.error('Error fetching image:', fetchError);
        setError('Unable to process the selected image.');
        setIsProcessing(false);
        return;
      }
    }

    // Call the backend API to animate the character
    // Use responseType: 'blob' to handle the streamed video data
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/animate-character`,
      formData,
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob' // Important: This tells axios to handle the response as a blob
      }
    );

    // Create a URL from the video blob
    const videoBlob = new Blob([response.data], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);
    
    // Update state with the video URL
    setAnimatedImageUrl(videoUrl);
    toast.success('Animation generated successfully!');
    
  } catch (error) {
    console.error('Animation generation error:', error);
    setError(error.response?.data?.message || 'Failed to generate animation. Please try again.');
    toast.error(error.response?.data?.message || 'Failed to generate animation');
    
    // For development/demo purposes only - remove in production
    if (process.env.NODE_ENV !== 'production') {
      setAnimatedImageUrl(characterImagePreview || selectedImage);
    }
  } finally {
    setIsProcessing(false);
  }
};

  // Aspect ratios available
  const aspectRatios = [
    { value: "1:1", label: "Square" },
    { value: "4:3", label: "Standard" },
    { value: "16:9", label: "Widescreen" },
    { value: "9:16", label: "Portrait" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-sans text-dark mb-6">Choose Animation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Character Image and Preview */}
        <div>
          {/* Selected Character Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-dark mb-4">Character Image</h3>
            {characterImagePreview || selectedImage ? (
              <div className="relative">
                <img
                  src={characterImagePreview || selectedImage}
                  alt="Character"
                  className="w-full h-64 object-contain rounded-lg"
                />
                <button 
                  onClick={() => {
                    setCharacterImage(null);
                    setCharacterImagePreview('');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500 mb-2">Upload your character image</p>
                <label className="inline-block bg-primary-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-primary-600 transition">
                  Browse Files
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
          
          {/* Preview Animation Section */}
          {/* <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-dark mb-4">Preview Animation</h3>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
              {animatedImageUrl ? (
                <div className="text-center">
                  <img
                    src={animatedImageUrl}
                    alt="Animated character"
                    className={`max-h-56 object-contain mx-auto ${isPlaying ? 'animate-pulse' : ''}`}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {isPlaying ? 'Animation playing...' : 'Animation generated'}
                  </p>
                </div>
              ) : isProcessing ? (
                <div className="text-center">
                  <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Generating animation...</p>
                  <p className="text-xs text-gray-400 mt-2">This may take up to 30 seconds</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Play size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Animation preview will appear here</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center">
              {animatedImageUrl ? (
                <button 
                  onClick={togglePlayAnimation} 
                  className={`px-4 py-2 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-primary-500'} text-white flex items-center gap-2`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={16} />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Play Preview
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div> */}

          {/* Preview Animation Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-dark mb-4">Preview Animation</h3>
            <div className="rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
              {animatedImageUrl ? (
                <div className="text-center">
                  <video 
                    src={animatedImageUrl}
                    className="max-h-56 object-contain mx-auto"
                    controls={true}
                    autoPlay={isPlaying}
                    loop={true}
                    muted={true}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {isPlaying ? 'Animation playing...' : 'Animation generated'}
                  </p>
                </div>
              ) : isProcessing ? (
                <div className="text-center">
                  <div className="animate-spin h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500">Generating animation...</p>
                  <p className="text-xs text-gray-400 mt-2">This may take up to 30 seconds</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Play size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Animation preview will appear here</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center">
              {animatedImageUrl ? (
                <button 
                  onClick={togglePlayAnimation} 
                  className={`px-4 py-2 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-primary-500'} text-white flex items-center gap-2`}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={16} />
                      Stop Preview
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Play Preview
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        
        {/* Right Column: Animation Settings */}
        <div>
          {/* Animation Prompt */}
          <div className="mb-6">
            <h3 className="font-bold text-dark mb-4">Animation Prompt</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe how you want your character to be animated (e.g., 'A cute bunny waving happily with a big smile')"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Your prompt will guide the AI in creating the animation style and movement.
            </p>
          </div>
          
          {/* Animation Settings */}
          <h3 className="font-bold text-dark mb-4">Animation Settings</h3>
          <div className="space-y-4">
            {/* Animation Duration */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Animation Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="5">5 seconds</option>
                <option value="10">10 seconds</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose how long your animation should play.
              </p>
            </div>
            
            {/* Aspect Ratio */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {aspectRatios.map(ratio => (
                  <option key={ratio.value} value={ratio.value}>{ratio.label} ({ratio.value})</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose the shape of your animation output.
              </p>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
          
          {/* Generate Button */}
          <div className="mt-6">
            <button
              onClick={generateAnimation}
              disabled={isProcessing || !prompt || (!characterImage && !selectedImage && !characterImagePreview)}
              className={`w-full py-3 rounded-full font-bold ${
                isProcessing || !prompt || (!characterImage && !selectedImage && !characterImagePreview)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-accent text-dark hover:bg-accent/90 transition'
              } flex items-center justify-center`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : animatedImageUrl ? (
                'Generate New Animation'
              ) : (
                'Generate Animation'
              )}
            </button>
          </div>
          
          {/* Continue Button */}
          <div className="mt-4">
            <button
              onClick={handleNextStep}
              disabled={!animatedImageUrl && !isProcessing}
              className={`w-full py-3 rounded-full font-bold ${
                !animatedImageUrl && !isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-500 text-white hover:bg-primary-600 transition'
              } flex items-center justify-center`}
            >
              Continue to Export
              <ArrowRight size={18} className="ml-2" />
            </button>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {!animatedImageUrl ? 'Generate an animation before continuing' : 'Your animated character is ready for export'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationStep;