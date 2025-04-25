// // steps/CharacterGenerationStep.jsx
// import React, { useState, useEffect } from 'react';
// import { Wand2, ArrowRight, Eye, Download } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Sample data for generated images as fallback
// const SAMPLE_IMAGES = [
//   "/sample-character-1.jpg",
//   "/sample-character-2.jpg",
//   "/sample-character-3.jpg",
//   "/sample-character-4.jpg"
// ];

// const CharacterGenerationStep = ({
//   generatedPrompt,
//   generationSettings,
//   setGenerationSettings,
//   generatedImages,
//   setGeneratedImages,
//   selectedImage,
//   setSelectedImage,
//   handleNextStep
// }) => {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generationError, setGenerationError] = useState(null);
//   const [seed, setSeed] = useState('');
//   const [magicPromptOption, setMagicPromptOption] = useState('Auto');
  
//   // Initialize prompt with the generated prompt from previous step when component mounts
//   useEffect(() => {
//     if (generatedPrompt && !generationSettings.prompt) {
//       setGenerationSettings({
//         ...generationSettings,
//         prompt: generatedPrompt
//       });
//     }
//   }, [generatedPrompt]);

//   // Models available
//   const models = [
//     "Flux Dev",
//     "Ideogram",
//     "Recraft v3"
//   ];

//   // General styles (for non-Ideogram models)
//   const styles = [
//     "Dynamic",
//     "Vibrant",
//     "Cinematic",
//     "Anime",
//     "Photorealistic"
//   ];
  
//   // Ideogram specific style types
//   const ideogramStyles = [
//     { value: "None", label: "None" },
//     { value: "Auto", label: "Auto" },
//     { value: "General", label: "General" },
//     { value: "Realistic", label: "Realistic" },
//     { value: "Design", label: "Design" },
//     { value: "Render 3D", label: "Render 3D" },
//     { value: "Anime", label: "Anime" }
//   ];
  
//   // Magic prompt options for Ideogram
//   const magicPromptOptions = [
//     { value: "Auto", label: "Auto" },
//     { value: "On", label: "On" },
//     { value: "Off", label: "Off" }
//   ];

//   // Aspect ratios available
//   const aspectRatios = [
//     { value: "1:1", label: "Square" },
//     { value: "2:3", label: "Portrait" },
//     { value: "3:2", label: "Landscape" },
//     { value: "16:9", label: "Widescreen" }
//   ];

//   // Handle settings changes
//   const handleSettingChange = (e) => {
//     const { name, value } = e.target;
//     setGenerationSettings({
//       ...generationSettings,
//       [name]: value
//     });
//   };

//   // Generate images based on the selected model
//   const generateImages = async () => {
//     setIsGenerating(true);
//     setGenerationError(null);
    
//     try {
//       // Different handling based on model
//       if (generationSettings.model === "Ideogram" || generationSettings.model === "Recraft v3") {
//         // Direct streaming approach for Ideogram and Recraft
        
//         // Determine endpoint based on model
//         const endpoint = generationSettings.model === "Ideogram" 
//           ? '/api/v1/character/generate-character-ideogram'
//           : '/api/v1/character/generate-character-recraft';
        
//         // Create a filename based on the prompt
//         const modelPrefix = generationSettings.model === "Ideogram" ? "ideogram" : "recraft";
//         const sanitizedPrompt = generationSettings.prompt.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
//         const filename = `${modelPrefix}_${sanitizedPrompt}_${Date.now()}.png`;
        
//         // Prepare common request data
//         const requestData = {
//           prompt: generationSettings.prompt,
//           aspectRatio: generationSettings.aspectRatio,
//           style: generationSettings.style
//         };
        
//         // Add model-specific parameters
//         if (generationSettings.model === "Ideogram") {
//           // Add Ideogram-specific parameters
//           requestData.magicPromptOption = magicPromptOption;
//           requestData.seed = seed || undefined;
//         } else {
//           // Add Recraft-specific parameters
//           requestData.negativePrompt = generationSettings.negativePrompt;
//         }
        
//         // Show generating toast
//         toast.loading(`Generating image with ${generationSettings.model}...`, { id: 'image-generate' });
        
//         // Use fetch with blob response to handle the streamed image
//         const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(requestData),
//           credentials: 'include'
//         });
        
//         // Check if response is ok
//         if (!response.ok) {
//           throw new Error(`Image generation failed: ${response.statusText}`);
//         }
        
//         // Get the image as a blob
//         const imageBlob = await response.blob();
        
//         // Create a URL for the blob
//         const imageUrl = URL.createObjectURL(imageBlob);
        
//         // Close the loading toast
//         toast.dismiss('image-generate');
        
//         // Show success toast
//         toast.success('Image generated successfully!');
        
//         // Set the generated image in the UI
//         setGeneratedImages([imageUrl]);
        
//       } else {
//         // Regular JSON approach for other models
//         const requestData = {
//           prompt: generationSettings.prompt,
//           negativePrompt: generationSettings.negativePrompt,
//           modelId: generationSettings.model,
//           style: generationSettings.style,
//           aspectRatio: generationSettings.aspectRatio,
//           numberOfImages: generationSettings.numberOfImages
//         };
        
//         // Use regular JSON endpoint
//         const response = await axios.post(
//           `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-image`,
//           requestData,
//           { withCredentials: true }
//         );

//         // Extract the image URLs from the response
//         const { imageUrls } = response.data.data;
        
//         // Store character ID for later use if available
//         if (response.data.data.character) {
//           localStorage.setItem('currentCharacterId', response.data.data.character._id || response.data.data.character);
//         }
        
//         // Set the generated images
//         setGeneratedImages(imageUrls);
        
//         // Show success message
//         toast.success('Character images generated successfully!');
//       }
      
//     } catch (error) {
//       console.error("Error generating images:", error);
      
//       // Handle different types of errors
//       const errorMessage = error.message || error.response?.data?.message || 'Failed to generate images. Please try again.';
//       setGenerationError(errorMessage);
//       toast.error(errorMessage);
      
//       // Use sample images as fallback for development/demo purposes
//       if (process.env.NODE_ENV !== 'production') {
//         setGeneratedImages(SAMPLE_IMAGES);
//       }
//     } finally {
//       setIsGenerating(false);
//     }
//   };


//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6">
//       <h2 className="text-2xl font-chewy text-dark mb-6">Generate Character</h2>
      
//       <div className="mb-8">
//         {generatedPrompt && (
//           <div className="bg-gray-50 p-4 rounded-lg mb-6">
//             <h3 className="font-bold text-dark mb-2">Generated Prompt:</h3>
//             <p className="text-gray-700">{generatedPrompt}</p>
//           </div>
//         )}
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Model</label>
//             <select
//               name="model"
//               value={generationSettings.model}
//               onChange={handleSettingChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               {models.map(model => (
//                 <option key={model} value={model}>{model}</option>
//               ))}
//             </select>
//           </div>
          
//           {/* Display different style options based on selected model */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               {generationSettings.model === "Ideogram" ? "Style Type" : "Style"}
//             </label>
//             <select
//               name="style"
//               value={generationSettings.style}
//               onChange={handleSettingChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               {generationSettings.model === "Ideogram" 
//                 ? ideogramStyles.map(style => (
//                     <option key={style.value} value={style.value}>{style.label}</option>
//                   ))
//                 : styles.map(style => (
//                     <option key={style} value={style}>{style}</option>
//                   ))
//               }
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Aspect Ratio</label>
//             <select
//               name="aspectRatio"
//               value={generationSettings.aspectRatio}
//               onChange={handleSettingChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               {aspectRatios.map(ratio => (
//                 <option key={ratio.value} value={ratio.value}>{ratio.label} ({ratio.value})</option>
//               ))}
//             </select>
//           </div>
//         </div>
        
//         {/* Ideogram-specific options */}
//         {generationSettings.model === "Ideogram" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Magic Prompt Option</label>
//               <select
//                 value={magicPromptOption}
//                 onChange={(e) => setMagicPromptOption(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               >
//                 {magicPromptOptions.map(option => (
//                   <option key={option.value} value={option.value}>{option.label}</option>
//                 ))}
//               </select>
//               <p className="text-xs text-gray-500 mt-1">
//                 Magic Prompt will interpret and optimize your prompt to maximize variety and quality.
//               </p>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Seed (Optional)</label>
//               <input
//                 type="number"
//                 value={seed}
//                 onChange={(e) => setSeed(e.target.value)}
//                 placeholder="Leave empty for random seed"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Set a specific seed for reproducible results (0-2147483647).
//               </p>
//             </div>
//           </div>
//         )}
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Prompt</label>
//             <textarea
//               name="prompt"
//               value={generationSettings.prompt}
//               onChange={handleSettingChange}
//               placeholder="Enter your custom prompt here"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
//             ></textarea>
//             <p className="text-sm text-gray-500 mt-1">
//               Use the prompt you have generated in the previous step and paste it here, or modify it to customize your character.
//             </p>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Negative Prompt (optional)</label>
//             <textarea
//               name="negativePrompt"
//               value={generationSettings.negativePrompt}
//               onChange={handleSettingChange}
//               placeholder="Elements to exclude from the generated image"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
//             ></textarea>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Number of Images</label>
//             <select
//               name="numberOfImages"
//               value={generationSettings.numberOfImages}
//               onChange={handleSettingChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//             >
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//             </select>
//           </div>
//         </div>
        
//         {generationError && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
//             <p className="font-medium">Error generating images:</p>
//             <p>{generationError}</p>
//           </div>
//         )}
        
//         <div className="mt-6">
//           <button
//             onClick={generateImages}
//             disabled={isGenerating || !generationSettings.prompt}
//             className={`w-full py-3 rounded-full font-bold flex items-center justify-center ${
//               isGenerating || !generationSettings.prompt
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                 : 'bg-accent text-dark hover:bg-accent/90 transition'
//             }`}
//           >
//             {isGenerating ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Generating Characters...
//               </>
//             ) : generatedImages.length > 0 ? (
//               <>
//                 <Wand2 size={18} className="mr-2" />
//                 Regenerate Characters
//               </>
//             ) : (
//               <>
//                 <Wand2 size={18} className="mr-2" />
//                 Generate Characters
//               </>
//             )}
//           </button>
//         </div>
//       </div>
      
//       {/* Generated images grid */}
//       {generatedImages.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-xl font-chewy text-dark mb-4">Generated Characters</h3>
//           <p className="text-gray-600 mb-4">Select the character you want to animate:</p>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {generatedImages.map((image, index) => (
//               <div 
//                 key={index} 
//                 className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
//                   selectedImage === image ? 'ring-4 ring-primary-500 shadow-lg scale-105' : 'hover:scale-105 hover:shadow-md'
//                 }`}
//                 onClick={() => setSelectedImage(image)}
//               >
//                 <img 
//                   src={image} 
//                   alt={`Generated character option ${index + 1}`} 
//                   className="w-full h-64 object-cover object-center"
//                 />
                
//                 <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
//                   <div className="flex space-x-2">
//                     <button 
//                       className="p-2 bg-white rounded-full"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent selecting the image
//                         window.open(image, '_blank');
//                       }}
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button 
//                       className="p-2 bg-white rounded-full"
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent selecting the image
                        
//                         // Create a temporary anchor element to download the image
//                         const anchor = document.createElement('a');
//                         anchor.href = image;
//                         anchor.download = `character-${index + 1}.jpg`;
//                         document.body.appendChild(anchor);
//                         anchor.click();
//                         document.body.removeChild(anchor);
//                       }}
//                     >
//                       <Download size={18} />
//                     </button>
//                   </div>
//                 </div>
                
//                 {selectedImage === image && (
//                   <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                     Selected
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {selectedImage && (
//             <div className="mt-6 flex flex-col items-center gap-4">
//               <button
//                 onClick={async () => {
//                   try {
//                     // Get auth token
//                     const token = localStorage.getItem('token') || document.cookie.split('accessToken=')[1]?.split(';')[0];
                    
//                     // Get the character ID from the generation response
//                     // This assumes the generateCharacterImage API returns a character ID
//                     const characterId = localStorage.getItem('currentCharacterId');
                    
//                     if (!characterId) {
//                       toast.error('Character information not found. Please try generating again.');
//                       return;
//                     }
                    
//                     // Save the selected image to the character
//                     await axios.post(
//                       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/characters/save-image`,
//                       {
//                         characterId,
//                         imageUrl: selectedImage
//                       },
//                       {
//                         headers: {
//                           Authorization: `Bearer ${token}`,
//                           'Content-Type': 'application/json'
//                         }
//                       }
//                     );
                    
//                     toast.success('Character saved successfully!');
                    
//                     // Proceed to the next step
//                     handleNextStep();
//                   } catch (error) {
//                     console.error('Error saving character:', error);
//                     toast.error(error.response?.data?.message || 'Failed to save character. Please try again.');
//                   }
//                 }}
//                 className="px-8 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
//               >
//                 Save and Continue to Animation
//                 <ArrowRight size={18} className="ml-2" />
//               </button>
//               <p className="text-sm text-gray-500">
//                 Click to save this character and proceed to the animation step
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CharacterGenerationStep;


// steps/CharacterGenerationStep.jsx
import React, { useState, useEffect } from 'react';
import { Wand2, ArrowRight, Eye, Download } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Sample data for generated images as fallback
const SAMPLE_IMAGES = [
  "/sample-character-1.jpg",
  "/sample-character-2.jpg",
  "/sample-character-3.jpg",
  "/sample-character-4.jpg"
];

// Model-specific style options
// General styles for Flux Dev
const fluxDevStyles = [
  { value: "Dynamic", label: "Dynamic" },
  { value: "Anime", label: "Anime" },
  { value: "General", label: "General" }
];

// Ideogram specific style types
const ideogramStyles = [
  { value: "None", label: "None" },
  { value: "Auto", label: "Auto" },
  { value: "General", label: "General" },
  { value: "Realistic", label: "Realistic" },
  { value: "Design", label: "Design" },
  { value: "Render 3D", label: "Render 3D" },
  { value: "Anime", label: "Anime" }
];

// Recraft specific style types
const recraftStyles = [
  { value: "any", label: "Any" },
  { value: "engraving", label: "Engraving" },
  { value: "line_art", label: "Line Art" },
  { value: "line_circuit", label: "Line Circuit" },
  { value: "linocut", label: "Linocut" }
];

const CharacterGenerationStep = ({
  generatedPrompt,
  generationSettings,
  setGenerationSettings,
  generatedImages,
  setGeneratedImages,
  selectedImage,
  setSelectedImage,
  handleNextStep
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [seed, setSeed] = useState('');
  const [magicPromptOption, setMagicPromptOption] = useState('Auto');
  
  // Initialize prompt with the generated prompt from previous step when component mounts
  useEffect(() => {
    if (generatedPrompt && !generationSettings.prompt) {
      setGenerationSettings({
        ...generationSettings,
        prompt: generatedPrompt
      });
    }
  }, [generatedPrompt]);
  
  // Watch for model changes to update style to a valid option for the selected model
  useEffect(() => {
    // When model changes, reset style to a valid option for that model
    if (generationSettings.model === "Ideogram") {
      // Set default Ideogram style if current style isn't valid for Ideogram
      const validIdeogramValues = ideogramStyles.map(style => style.value);
      if (!validIdeogramValues.includes(generationSettings.style)) {
        setGenerationSettings({
          ...generationSettings,
          style: "Auto" // Default Ideogram style
        });
      }
    } else if (generationSettings.model === "Recraft v3") {
      // Set default Recraft style if current style isn't valid for Recraft
      const validRecraftValues = recraftStyles.map(style => style.value);
      if (!validRecraftValues.includes(generationSettings.style)) {
        setGenerationSettings({
          ...generationSettings,
          style: "any" // Default Recraft style
        });
      }
    } else {
      // Set default Flux style if current style isn't valid for Flux
      const validFluxValues = fluxDevStyles.map(style => style.value);
      if (!validFluxValues.includes(generationSettings.style)) {
        setGenerationSettings({
          ...generationSettings,
          style: "Dynamic" // Default Flux style
        });
      }
    }
  }, [generationSettings.model]);

  // Models available
  const models = [
    "Flux Dev",
    "Ideogram",
    "Recraft v3"
  ];

  // Aspect ratios available
  const aspectRatios = [
    { value: "1:1", label: "Square" },
    { value: "2:3", label: "Portrait" },
    { value: "3:2", label: "Landscape" },
    { value: "16:9", label: "Widescreen" }
  ];

  // Magic prompt options for Ideogram
  const magicPromptOptions = [
    { value: "Auto", label: "Auto" },
    { value: "On", label: "On" },
    { value: "Off", label: "Off" }
  ];

  // Handle settings changes
  const handleSettingChange = (e) => {
    const { name, value } = e.target;
    setGenerationSettings({
      ...generationSettings,
      [name]: value
    });
  };

  // const generateImages = async () => {
  //   setIsGenerating(true);
  //   setGenerationError(null);
    
  //   try {
  //     // Different handling based on model
  //     if (generationSettings.model === "Ideogram" || generationSettings.model === "Recraft v3") {
  //       // Direct streaming approach for Ideogram and Recraft
        
  //       // Determine endpoint based on model
  //       const endpoint = generationSettings.model === "Ideogram" 
  //         ? '/api/v1/character/generate-character-ideogram'
  //         : '/api/v1/character/generate-character-recraft';
        
  //       // Set correct content type based on model
  //       const responseContentType = generationSettings.model === "Ideogram" 
  //         ? 'image/png' 
  //         : 'image/svg+xml';
        
  //       // Prepare common request data
  //       const requestData = {
  //         prompt: generationSettings.prompt,
  //         aspectRatio: generationSettings.aspectRatio,
  //         style: generationSettings.style
  //       };
        
  //       // Add model-specific parameters
  //       if (generationSettings.model === "Ideogram") {
  //         // Add Ideogram-specific parameters
  //         requestData.magicPromptOption = magicPromptOption;
  //         if (seed) requestData.seed = seed;
  //       } else {
  //         // Add Recraft-specific parameters
  //         requestData.negativePrompt = generationSettings.negativePrompt;
  //       }
        
  //       // Show generating toast
  //       toast.loading(`Generating image with ${generationSettings.model}...`, { id: 'image-generate' });
        
  //       // Use axios with blob response type
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_DOMAIN}${endpoint}`,
  //         requestData,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           withCredentials: true,
  //           responseType: 'blob'
  //         }
  //       );
        
  //       // Create a blob URL from the response with the correct content type
  //       const imageBlob = new Blob([response.data], { type: responseContentType });
  //       const imageUrl = URL.createObjectURL(imageBlob);
  //       console.log(imageUrl)

  //       // For debugging only
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         console.log('Blob content (first 100 chars):', reader.result.slice(0, 100));
  //         // Check if it starts with JPEG header bytes
  //         const firstBytes = new Uint8Array(reader.result.slice(0, 4));
  //         console.log('First bytes:', Array.from(firstBytes).map(b => b.toString(16)));
  //       };
  //       reader.readAsArrayBuffer(imageBlob);

  //       // Then proceed with setting the state
  //       setGeneratedImages([imageUrl]);
        
  //       // Dismiss loading toast
  //       toast.dismiss('image-generate');
        
  //       // Show success toast
  //       toast.success('Image generated successfully!');
        
  //       // Set the generated image in the UI
  //       setGeneratedImages([imageUrl]);
        
  //     } else {
  //       // Leonardo AI approach - returns JSON with URLs
  //       const requestData = {
  //         prompt: generationSettings.prompt,
  //         negativePrompt: generationSettings.negativePrompt,
  //         modelId: generationSettings.model,
  //         style: generationSettings.style,
  //         aspectRatio: generationSettings.aspectRatio,
  //         numberOfImages: generationSettings.numberOfImages
  //       };
        
  //       // Show generating toast
  //       toast.loading('Generating images with Leonardo AI...', { id: 'image-generate' });
        
  //       // Use JSON endpoint for Leonardo AI
  //       const response = await axios.post(
  //         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-image`,
  //         requestData,
  //         { withCredentials: true }
  //       );
  
  //       // Dismiss loading toast
  //       toast.dismiss('image-generate');
  
  //       // Extract the image URLs from the response
  //       const { imageUrls } = response.data.data;
        
  //       // Store character ID for later use if available
  //       if (response.data.data.character) {
  //         localStorage.setItem('currentCharacterId', response.data.data.character._id || response.data.data.character);
  //       }
        
  //       // Set the generated images
  //       setGeneratedImages(imageUrls);
        
  //       // Show success message
  //       toast.success('Character images generated successfully!');
  //     }
      
  //   } catch (error) {
  //     console.error("Error generating images:", error);
      
  //     // Handle different types of errors
  //     const errorMessage = error.message || error.response?.data?.message || 'Failed to generate images. Please try again.';
  //     setGenerationError(errorMessage);
  //     toast.error(errorMessage);
      
  //     // Use sample images as fallback for development/demo purposes
  //     if (process.env.NODE_ENV !== 'production') {
  //       setGeneratedImages(SAMPLE_IMAGES);
  //     }
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };


  const generateImages = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      // Different handling based on model
      if (generationSettings.model === "Ideogram") {
        // Show generating toast
        toast.loading(`Generating image with Ideogram...`, { id: 'image-generate' });
        
        // Prepare request data for Ideogram
        const requestData = {
          prompt: generationSettings.prompt,
          aspectRatio: generationSettings.aspectRatio,
          style: generationSettings.style,
          magicPromptOption: magicPromptOption
        };
        
        // Add seed if it's provided
        if (seed) {
          requestData.seed = seed;
        }
        
        // Make request to Ideogram endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-character-ideogram`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            responseType: 'blob' // Ensures binary data handling
          }
        );
        
        console.log("Ideogram response:", response);
        
        // Create a blob URL from the response with PNG content type
        const imageBlob = new Blob([response.data], { type: 'image/png' });
        
        // Debug logging
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('Ideogram Blob size:', imageBlob.size, 'bytes');
          if (imageBlob.size > 0) {
            const firstBytes = new Uint8Array(reader.result.slice(0, 8));
            console.log('First bytes:', Array.from(firstBytes).map(b => b.toString(16).padStart(2, '0')).join(' '));
          }
        };
        reader.readAsArrayBuffer(imageBlob);
        
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log("Generated Ideogram URL:", imageUrl);
        
        // Dismiss loading toast
        toast.dismiss('image-generate');
        
        // Show success toast
        toast.success('Image generated successfully!');
        
        // Set the generated image in the UI
        setGeneratedImages([imageUrl]);
        
      } else if (generationSettings.model === "Recraft v3") {
        // Show generating toast
        toast.loading(`Generating image with Recraft...`, { id: 'image-generate' });
        
        // Prepare request data for Recraft
        const requestData = {
          prompt: generationSettings.prompt,
          aspectRatio: generationSettings.aspectRatio,
          style: generationSettings.style,
          negativePrompt: generationSettings.negativePrompt
        };
        
        // Make request to Recraft endpoint
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-character-recraft`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            responseType: 'blob' // Ensures binary data handling
          }
        );
        
        // Create a blob URL from the response with SVG content type
        const imageBlob = new Blob([response.data], { type: 'image/svg+xml' });
        const imageUrl = URL.createObjectURL(imageBlob);
        
        // Dismiss loading toast
        toast.dismiss('image-generate');
        
        // Show success toast
        toast.success('Image generated successfully!');
        
        // Set the generated image in the UI
        setGeneratedImages([imageUrl]);
        
      } else {
        // Leonardo AI approach - returns JSON with URLs
        const requestData = {
          prompt: generationSettings.prompt,
          negativePrompt: generationSettings.negativePrompt,
          modelId: generationSettings.model,
          style: generationSettings.style,
          aspectRatio: generationSettings.aspectRatio,
          numberOfImages: generationSettings.numberOfImages
        };
        
        // Show generating toast
        toast.loading('Generating images with Leonardo AI...', { id: 'image-generate' });
        
        // Use JSON endpoint for Leonardo AI
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/character/generate-image`,
          requestData,
          { withCredentials: true }
        );
  
        // Dismiss loading toast
        toast.dismiss('image-generate');
  
        // Extract the image URLs from the response
        const { imageUrls } = response.data.data;
        
        // Store character ID for later use if available
        if (response.data.data.character) {
          localStorage.setItem('currentCharacterId', response.data.data.character._id || response.data.data.character);
        }
        
        // Set the generated images
        setGeneratedImages(imageUrls);
        
        // Show success message
        toast.success('Character images generated successfully!');
      }
      
    } catch (error) {
      console.error("Error generating images:", error);
      
      // Handle different types of errors
      const errorMessage = error.message || error.response?.data?.message || 'Failed to generate images. Please try again.';
      setGenerationError(errorMessage);
      toast.error(errorMessage);
      toast.dismiss('image-generate');
      
      // Use sample images as fallback for development/demo purposes
      if (process.env.NODE_ENV !== 'production') {
        setGeneratedImages(SAMPLE_IMAGES);
      }
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-chewy text-dark mb-6">Generate Character</h2>
      
      <div className="mb-8">
        {generatedPrompt && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-dark mb-2">Generated Prompt:</h3>
            <p className="text-gray-700">{generatedPrompt}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Model</label>
            <select
              name="model"
              value={generationSettings.model}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
          
          {/* Display different style options based on selected model */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              {generationSettings.model === "Ideogram" ? "Style Type" : "Style"}
            </label>
            <select
              name="style"
              value={generationSettings.style}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {generationSettings.model === "Ideogram" 
                ? ideogramStyles.map(style => (
                    <option key={style.value} value={style.value}>{style.label}</option>
                  ))
                : generationSettings.model === "Recraft v3"
                  ? recraftStyles.map(style => (
                      <option key={style.value} value={style.value}>{style.label}</option>
                    ))
                  : fluxDevStyles.map(style => (
                      <option key={style.value} value={style.value}>{style.label}</option>
                    ))
              }
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Aspect Ratio</label>
            <select
              name="aspectRatio"
              value={generationSettings.aspectRatio}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {aspectRatios.map(ratio => (
                <option key={ratio.value} value={ratio.value}>{ratio.label} ({ratio.value})</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Ideogram-specific options */}
        {generationSettings.model === "Ideogram" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Magic Prompt Option</label>
              <select
                value={magicPromptOption}
                onChange={(e) => setMagicPromptOption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {magicPromptOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Magic Prompt will interpret and optimize your prompt to maximize variety and quality.
              </p>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Seed (Optional)</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Leave empty for random seed"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Set a specific seed for reproducible results (0-2147483647).
              </p>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Prompt</label>
            <textarea
              name="prompt"
              value={generationSettings.prompt}
              onChange={handleSettingChange}
              placeholder="Enter your custom prompt here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              Use the prompt you have generated in the previous step and paste it here, or modify it to customize your character.
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Negative Prompt (optional)</label>
            <textarea
              name="negativePrompt"
              value={generationSettings.negativePrompt}
              onChange={handleSettingChange}
              placeholder="Elements to exclude from the generated image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Images</label>
            <select
              name="numberOfImages"
              value={generationSettings.numberOfImages}
              onChange={handleSettingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        
        {generationError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            <p className="font-medium">Error generating images:</p>
            <p>{generationError}</p>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={generateImages}
            disabled={isGenerating || !generationSettings.prompt}
            className={`w-full py-3 rounded-full font-bold flex items-center justify-center ${
              isGenerating || !generationSettings.prompt
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-accent text-dark hover:bg-accent/90 transition'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Characters...
              </>
            ) : generatedImages.length > 0 ? (
              <>
                <Wand2 size={18} className="mr-2" />
                Regenerate Characters
              </>
            ) : (
              <>
                <Wand2 size={18} className="mr-2" />
                Generate Characters
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Generated images grid */}
      {generatedImages.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-chewy text-dark mb-4">Generated Characters</h3>
          <p className="text-gray-600 mb-4">Select the character you want to animate:</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generatedImages.map((image, index) => (
              <div 
                key={index} 
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedImage === image ? 'ring-4 ring-primary-500 shadow-lg scale-105' : 'hover:scale-105 hover:shadow-md'
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`Generated character option ${index + 1}`} 
                  className="w-full h-64 object-cover object-center"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 bg-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent selecting the image
                        window.open(image, '_blank');
                      }}
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="p-2 bg-white rounded-full"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent selecting the image
                        
                        // Create a temporary anchor element to download the image
                        const anchor = document.createElement('a');
                        anchor.href = image;
                        anchor.download = `character-${index + 1}.jpg`;
                        document.body.appendChild(anchor);
                        anchor.click();
                        document.body.removeChild(anchor);
                      }}
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
                
                {selectedImage === image && (
                  <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {selectedImage && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                onClick={async () => {
                  try {
                    // Get auth token
                    const token = localStorage.getItem('token') || document.cookie.split('accessToken=')[1]?.split(';')[0];
                    
                    // Get the character ID from the generation response
                    // This assumes the generateCharacterImage API returns a character ID
                    const characterId = localStorage.getItem('currentCharacterId');
                    
                    if (!characterId) {
                      toast.error('Character information not found. Please try generating again.');
                      return;
                    }
                    
                    // Save the selected image to the character
                    await axios.post(
                      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/characters/save-image`,
                      {
                        characterId,
                        imageUrl: selectedImage
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      }
                    );
                    
                    toast.success('Character saved successfully!');
                    
                    // Proceed to the next step
                    handleNextStep();
                  } catch (error) {
                    console.error('Error saving character:', error);
                    toast.error(error.response?.data?.message || 'Failed to save character. Please try again.');
                  }
                }}
                className="px-8 py-3 rounded-full font-bold bg-primary-500 text-white hover:bg-primary-600 transition flex items-center justify-center"
              >
                Save and Continue to Animation
                <ArrowRight size={18} className="ml-2" />
              </button>
              <p className="text-sm text-gray-500">
                Click to save this character and proceed to the animation step
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterGenerationStep;