// characterController.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import fs from "fs";
import Replicate from "replicate";
import { User } from "../models/user.models.js";
import { Character } from "../models/character.models.js";
import axios from "axios";
import dotenv from "dotenv";
import { writeFile } from "fs/promises";
import { Readable } from 'stream';


dotenv.config()
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generateCharacterPrompt = asyncHandler(async (req, res) => {
  const { name, age, gender, appearance, personality, expressions, action, speechBubble } = req.body;
  const userId = req.user._id;

  // Basic validation
  if (!appearance || !personality || !expressions) {
    throw new Apierror(400, "Name, age and gender are required");
  }

  // if (!req.file) {
  //   throw new Apierror(400, "Portrait image is required");
  // }

  // Read the uploaded image and convert to base64
  const portraitBuffer = fs.readFileSync(req.file.path);
  const base64Image = `data:${req.file.mimetype};base64,${portraitBuffer.toString('base64')}`;


  const systemPrompt = `Using the portrait image and provided information, analyze and organize the character details into a structured format.

<character_base>
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Appearance: ${appearance}
- Personality: ${personality}
- Expressions: ${expressions}
- Action: ${action}
- Speech: ${speechBubble}
</character_base>

FORMAT INSTRUCTIONS:
Create a structured character description with distinct sections exactly as follows:
Replace all placeholders with the chosen values, leaving the rest of the text intact. 
(Do not add any extra text to the information provided by user)

Character Description Template:
Name: [name]
Age: [age]
Gender: [gender]
Appearance: [appearance]
Personality: [personality]
Expressions: [expressions]
Action: [action]
Speech: In a speechbubble character says [speechBubble].
Hair color: [Hair Color],
Skin Tone: [Skin Tone], 
Dressed in an outfit featuring a [Upper Clothing Color] [Outfit Upper Body] and [Lower Clothing Color] [Outfit Lower Body]
([Upper Clothing Color] [Outfit Upper Body] [Lower Clothing Color] [Outfit Lower Body] GET IT FROM THE IMAGE PROVIDED BY THE USER and replace it with the value)
Style: 3D Pixar Animation comic Style with bright colors, child-friendly aesthetic, detailed textures, and high quality rendering.

IMPORTANT: 
1. Maintain the exact section headers as shown above (Appearance:, Personality:, etc.), Each section in a new line
3. Prioritize information explicitly provided by the user
4. Return ONLY the character description without explanations, notes, or other text`;

  // Initialize Replicate client
  const replicate = new Replicate({ 
    auth: process.env.REPLICATE_API_TOKEN 
  });

  // Prepare input for the model
  const input = {
    prompt: systemPrompt,
    max_tokens: 8192,
    system_prompt: "You are a creative character description generator. Create a description based on the image provided to you and the options in the prompt",
    max_image_resolution: 0.5,
    image: base64Image
  };

  // Store generated prompt
  let generatedPrompt = '';

  // Stream the response
  try {
    for await (const event of replicate.stream("anthropic/claude-3.7-sonnet", { input })) {
      generatedPrompt += event.toString();
    }

    // Return the generated prompt
    return res.status(200).json(
      new Apiresponse(
        200, 
        { generatedPrompt }, 
        "Character prompt generated successfully"
      )
    );

  } catch (error) {
    console.error("Prompt generation error:", error);
    throw new Apierror(500, "Failed to generate character prompt");
  }
});

// Generate character image using Leonardo AI
// const generateCharacterImage = asyncHandler(async (req, res) => {
//   const { prompt, negativePrompt, modelId, style, aspectRatio, numberOfImages } = req.body;
//   const userId = req.user._id;
   
//   // const options = {
//   //   method: 'GET',
//   //   url: 'https://cloud.leonardo.ai/api/rest/v1/me',
//   //   headers: {
//   //     accept: 'application/json',
//   //     authorization: 'Bearer 148e2dd9-df5a-4866-8ef0-ece62ac1ca46'
//   //   }
//   // };
  
//   // axios
//   //   .request(options)
//   //   .then(res => console.log(res.data.user_details))
//   //   .catch(err => console.error(err));

//   // Validation
//   if (!prompt) {
//     throw new Apierror(400, "Prompt is required");
//   }

//   if (!modelId) {
//     throw new Apierror(400, "Model ID is required");
//   }

//   // Check if user can create more characters based on subscription tier
//   const user = await User.findById(userId);
  
//   if (!user) {
//     throw new Apierror(404, "User not found");
//   }

//   // Check generation limits based on subscription tier
//   const charactersThisPeriod = user.generationLimits?.charactersThisPeriod || 0;
//   const maxCharacters = user.generationLimits?.maxCharacters || 3;
  
//   if (charactersThisPeriod >= maxCharacters) {
//     throw new Apierror(403, "You've reached your character generation limit for this period. Please upgrade your subscription or wait until the next reset period.");
//   }

//   // Map style to Leonardo AI preset style
//   const presetStyleMap = {
//     "Dynamic": "DYNAMIC",
//     "Vibrant": "VIBRANT",
//     "Cinematic": "CINEMATIC",
//     "Anime": "ANIME",
//     "Photorealistic": "PHOTO"
//   };

//   const presetStyle = presetStyleMap[style] || "DYNAMIC";

//   // Map model name to Leonardo AI model ID
//   const modelMap = {
//     "Flux Dev": "b24e16ff-06e3-43eb-8d33-4416c2d75876", // Example model ID
//     "Leonardo Creative": "1e7737d7-545e-469f-857f-e4b46eaa151d", // Example model ID
//     "Leonardo Signature": "291be633-cb24-434f-898f-e662799936ad", // Example model ID
//     "Dream Shaper": "ac614f96-1082-45bf-be9d-757f2d31c174", // Example model ID
//     "3D Animation Style": "d69c8273-6b17-4a30-a13e-d6637ae1c644"  // Example model ID
//   };

//   const leonardoModelId = modelMap[modelId] || "b24e16ff-06e3-43eb-8d33-4416c2d75876";

//   // Parse aspect ratio to get width and height
//   let width = 1024;
//   let height = 1024;
  
//   if (aspectRatio) {
//     const [w, h] = aspectRatio.split(':').map(Number);
//     // Keep the longer dimension at 1024 and scale the other
//     if (w > h) {
//       height = Math.floor((h / w) * 1024);
//     } else if (h > w) {
//       width = Math.floor((w / h) * 1024);
//     }
//   }

//   const AUTHORIZATION = `Bearer ${process.env.LEONARDO_API_TOKEN}`;

//   const HEADERS = {
//     accept: "application/json",
//     "content-type": "application/json",
//     authorization: AUTHORIZATION,
//   };

//   try {
//     // Call Leonardo AI API
//     const response = await axios.post("https://cloud.leonardo.ai/api/rest/v1/generations", {
//       prompt,
//       negative_prompt: negativePrompt,
//       modelId: leonardoModelId,
//       width,
//       height,
//       num_images: parseInt(numberOfImages) || 4,
//       presetStyle,
//       public: false,
//       alchemy: true
//     }, {
//       headers: HEADERS
//     });

//     // Get generation ID
//     const generationId = response.data.sdGenerationJob.generationId;
    
//     // Poll for completion (simplified for clarity)
//     let generationResult;
//     let attempts = 0;
//     const maxAttempts = 30; // Adjust based on expected processing time
    
//     while (attempts < maxAttempts) {
//       attempts++;
      
//       const pollResponse = await axios.get(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
//         headers: HEADERS
//       });
      
//       generationResult = pollResponse.data;
      
//       if (generationResult.generations_by_pk.status === "COMPLETE") {
//         break;
//       } else if (generationResult.generations_by_pk.status === "FAILED") {
//         throw new Error("Character generation failed");
//       }
      
//       // Wait before polling again
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
    
//     if (attempts >= maxAttempts) {
//       throw new Error("Character generation timed out");
//     }

//     // Extract image URLs from the result
//     const imageUrls = generationResult.generations_by_pk.generated_images.map(img => img.url);
    
//     // Increment user's character generation count
//     await User.findByIdAndUpdate(userId, {
//       $inc: { "generationLimits.charactersThisPeriod": 1 }
//     });
    
//     // Create a new character record with initial information
//     const character = await Character.create({
//       userId,
//       name: user.username, // Use a default name initially
//       age: 0, // Default age, should be updated later
//       gender: "Other", // Default gender, should be updated later
//       generatedPrompt: prompt,
//       generationSettings: {
//         model: modelId,
//         style,
//         aspectRatio
//       },
//       status: 'ready'
//     });
    
//     return res.status(200).json(
//       new Apiresponse(
//         200, 
//         { character, imageUrls }, 
//         "Character images generated successfully"
//       )
//     );

//   } catch (error) {
//     // console.error("Character generation error:", error);
//     console.error("Character generation error details:", {
//       message: error.message,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       responseData: error.response?.data
//     });
//     throw new Apierror(500, "Failed to generate character images: " + error.message);
//   }
// });

// const generateCharacterImage = asyncHandler(async (req, res) => {
//   const { prompt, negativePrompt, modelId, style, aspectRatio, numberOfImages } = req.body;
//   const userId = req.user._id;
   
//   // Validation
//   if (!prompt) {
//     throw new Apierror(400, "Prompt is required");
//   }

//   if (!modelId) {
//     throw new Apierror(400, "Model ID is required");
//   }

//   // Check if user can create more characters based on subscription tier
//   const user = await User.findById(userId);
  
//   if (!user) {
//     throw new Apierror(404, "User not found");
//   }

//   // Check generation limits based on subscription tier
//   const charactersThisPeriod = user.generationLimits?.charactersThisPeriod || 0;
//   const maxCharacters = user.generationLimits?.maxCharacters || 3;
  
//   if (charactersThisPeriod >= maxCharacters) {
//     throw new Apierror(403, "You've reached your character generation limit for this period. Please upgrade your subscription or wait until the next reset period.");
//   }

//   // Map style to Leonardo AI preset style
//   const presetStyleMap = {
//     "Dynamic": "DYNAMIC",
//     "Vibrant": "VIBRANT",
//     "Cinematic": "CINEMATIC",
//     "Anime": "ANIME",
//     "Photorealistic": "PHOTO"
//   };

//   const presetStyle = presetStyleMap[style] || "DYNAMIC";

//   // Map model name to Leonardo AI model ID
//   const modelMap = {
//     "Flux Dev": "b24e16ff-06e3-43eb-8d33-4416c2d75876", // Example model ID
//     "Leonardo Creative": "1e7737d7-545e-469f-857f-e4b46eaa151d", // Example model ID
//     "Leonardo Signature": "291be633-cb24-434f-898f-e662799936ad", // Example model ID
//     "Dream Shaper": "ac614f96-1082-45bf-be9d-757f2d31c174", // Example model ID
//     "3D Animation Style": "d69c8273-6b17-4a30-a13e-d6637ae1c644"  // Example model ID
//   };

//   const leonardoModelId = modelMap[modelId] || "b24e16ff-06e3-43eb-8d33-4416c2d75876";

//   // Parse aspect ratio to get width and height
//   let width = 1024;
//   let height = 1024;
  
//   if (aspectRatio) {
//     const [w, h] = aspectRatio.split(':').map(Number);
//     // Keep the longer dimension at 1024 and scale the other
//     if (w > h) {
//       height = Math.floor((h / w) * 1024);
//     } else if (h > w) {
//       width = Math.floor((w / h) * 1024);
//     }
//   }

//   const AUTHORIZATION = `Bearer ${process.env.LEONARDO_API_TOKEN}`;

//   const HEADERS = {
//     accept: "application/json",
//     "content-type": "application/json",
//     authorization: AUTHORIZATION,
//   };

//   try {
//     console.log("Sending request to Leonardo AI...");
    
//     // Call Leonardo AI API to initiate generation
//     const response = await axios.post("https://cloud.leonardo.ai/api/rest/v1/generations", {
//       prompt,
//       negative_prompt: negativePrompt,
//       modelId: leonardoModelId,
//       width,
//       height,
//       num_images: parseInt(numberOfImages) || 4,
//       presetStyle,
//       public: false,
//       alchemy: true
//     }, {
//       headers: HEADERS
//     });

//     // Get generation ID
//     const generationId = response.data.sdGenerationJob.generationId;
//     console.log("Generation ID:", generationId);
    
//     // Construct URL for checking generation status
//     const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
    
//     console.log("Waiting for image generation to complete...");
    
//     // Wait for a fixed amount of time (20 seconds) for generation to complete
//     await new Promise((resolve) => setTimeout(resolve, 20000));
    
//     // Fetch the generated images
//     const generationResponse = await axios.get(url, { headers: HEADERS });
//     console.log("Get generated image response:", generationResponse.status);
    
//     if (generationResponse.status !== 200) {
//       throw new Error("Failed to fetch generated image details");
//     }
    
//     console.log("Generated Image Details:", generationResponse.data);
    
//     // Extract image URLs from the result
//     const imageUrls = generationResponse.data.generations_by_pk.generated_images.map(img => img.url);
    
//     // If no images were generated, throw an error
//     if (!imageUrls || imageUrls.length === 0) {
//       throw new Error("No images were generated");
//     }
    
//     // Increment user's character generation count
//     await User.findByIdAndUpdate(userId, {
//       $inc: { "generationLimits.charactersThisPeriod": 1 }
//     });
    
//     // Create a new character record with initial information
//     const character = await Character.create({
//       userId,
//       name: user.username || "New Character", // Use a default name initially
//       age: 30, // Default age, should be updated later
//       gender: "Other", // Default gender, should be updated later
//       generatedPrompt: prompt,
//       generationSettings: {
//         model: modelId,
//         style,
//         aspectRatio
//       },
//       status: 'ready'
//     });
    
//     return res.status(200).json(
//       new Apiresponse(
//         200, 
//         { character, imageUrls }, 
//         "Character images generated successfully"
//       )
//     );

//   } catch (error) {
//     console.error("Character generation error details:", {
//       message: error.message,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       responseData: error.response?.data
//     });
    
//     // Fallback to using sample images in development environment
//     if (process.env.NODE_ENV === 'development') {
//       console.log("Using sample images due to API error");
      
//       const sampleUrls = [
//         "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
//         "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
//         "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
//         "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80"
//       ].slice(0, parseInt(numberOfImages) || 4);
      
//       // Create a character and return sample images
//       try {
//         const character = await Character.create({
//           userId,
//           name: user.username || "New Character",
//           age: 30,
//           gender: "Other",
//           generatedPrompt: prompt,
//           generationSettings: {
//             model: modelId,
//             style,
//             aspectRatio
//           },
//           status: 'ready'
//         });
        
//         // Increment user's character generation count
//         await User.findByIdAndUpdate(userId, {
//           $inc: { "generationLimits.charactersThisPeriod": 1 }
//         });
        
//         return res.status(200).json(
//           new Apiresponse(
//             200, 
//             { character, imageUrls: sampleUrls }, 
//             "Sample character images generated due to API error"
//           )
//         );
//       } catch (innerError) {
//         console.error("Error creating character with sample images:", innerError);
//       }
//     }
    
//     throw new Apierror(500, "Failed to generate character images: " + error.message);
//   }
// });

const generateCharacterImage = asyncHandler(async (req, res) => {
  const { prompt, negativePrompt, modelId, style, aspectRatio, numberOfImages } = req.body;
  const userId = req.user._id;
   
  // Validation
  if (!prompt) {
    throw new Apierror(400, "Prompt is required");
  }

  if (!modelId) {
    throw new Apierror(400, "Model ID is required");
  }

  // Check if user can create more characters based on subscription tier
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Apierror(404, "User not found");
  }

  // Check generation limits based on subscription tier
  const charactersThisPeriod = user.generationLimits?.charactersThisPeriod || 0;
  const maxCharacters = user.generationLimits?.maxCharacters || 3;
  
  if (charactersThisPeriod >= maxCharacters) {
    throw new Apierror(403, "You've reached your character generation limit for this period. Please upgrade your subscription or wait until the next reset period.");
  }

  // Map style to Leonardo AI preset style
  const presetStyleMap = {
    "Dynamic": "DYNAMIC",
    "Vibrant": "VIBRANT",
    "Cinematic": "CINEMATIC",
    "Anime": "ANIME",
    "Photorealistic": "PHOTO"
  };

  const presetStyle = presetStyleMap[style] || "DYNAMIC";

  // Map model name to Leonardo AI model ID
  // const modelMap = {
  //   "Flux Dev": "b2614463-296c-462a-9586-aafdb8f00e36", // Example model ID
  //   "Leonardo Creative": "1e7737d7-545e-469f-857f-e4b46eaa151d", // Example model ID
  //   "Leonardo Signature": "291be633-cb24-434f-898f-e662799936ad", // Example model ID
  //   "Dream Shaper": "ac614f96-1082-45bf-be9d-757f2d31c174", // Example model ID
  //   "3D Animation Style": "d69c8273-6b17-4a30-a13e-d6637ae1c644"  // Example model ID
  // };

  const modelMap = {
    "Leonardo Phoenix 1.0": "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3", 
    "Flux Dev": "b2614463-296c-462a-9586-aafdb8f00e36", 
    "Flux Schnell": "1dd50843-d653-4516-a8e3-f0238ee453ff", 
    "Leonardo Phoenix 0.9": "6b645e3a-d64f-4341-a6d8-7a3690fbf042", 
    "Leonardo Anime XL": "e71a1c2f-4f80-4800-934f-2c68979d8cc8", 
    "Leonardo Lightning XL": "b24e16ff-06e3-43eb-8d33-4416c2d75876", 
    "SDXL 1.0": "16e7060a-803e-4df3-97ee-edcfa5dc9cc8", 
    "Leonardo Kino XL": "aa77f04e-3eec-4034-9c07-d0f619684628", 
    "Leonardo Vision XL": "5c232a9e-9061-4777-980a-ddc8e65647c6", 
    "Leonardo Diffusion XL": "1e60896f-3c26-4296-8ecc-53e2afecc132", 
    "AlbedoBase XL": "2067ae52-33fd-4a82-bb92-c2c55e7d2786", 
    "RPG v5": "f1929ea3-b169-4c18-a16c-5d58b4292c69", 
    "SDXL 0.9": "b63f7119-31dc-4540-969b-2a9df997e173", 
    "3D Animation Style": "d69c8273-6b17-4a30-a13e-d6637ae1c644", 
    "DreamShaper v7": "ac614f96-1082-45bf-be9d-757f2d31c174", 
    "Absolute Reality v1.6": "e316348f-7773-490e-adcd-46757c738eb7", 
    "Anime Pastel Dream": "1aa0f478-51be-4efd-94e8-76bfc8f533af", 
    "DreamShaper v6": "b7aa9939-abed-4d4e-96c4-140b8c65dd92", 
    "DreamShaper v5": "d2fb9cf9-7999-4ae5-8bfe-f0df2d32abf8", 
    "Leonardo Diffusion": "b820ea11-02bf-4652-97ae-9ac0cc00593d", 
    "RPG 4.0": "a097c2df-8f0c-4029-ae0f-8fd349055e61", 
    "Deliberate 1.1": "458ecfff-f76c-402c-8b85-f09f6fb198de", 
    "Vintage Style Photography": "17e4edbf-690b-425d-a466-53c816f0de8a", 
    "DreamShaper 3.2": "f3296a34-9aef-4370-ad18-88daf26862c3", 
    "Leonardo Select": "cd2b2a15-9760-4174-a5ff-4d2925057376", 
    "Leonardo Creative": "6bef9f1b-29cb-40c7-b9df-32b51c1f67d3", 
    "Battle Axes": "47a6232a-1d49-4c95-83c3-2cc5342f82c7", 
    "Pixel Art": "e5a291b6-3990-495a-b1fa-7bd1864510a6", 
    "Magic Items": "2d18c0af-374e-4391-9ca2-639f59837c85", 
    "Crystal Deposits": "102a8ee0-cf16-477c-8477-c76963a0d766", 
    "Magic Potions": "45ab2421-87de-44c8-a07c-3b87e3bfdf84", 
    "Character Portraits": "6c95de60-a0bc-4f90-b637-ee8971caf3b0", 
    "Chest Armor": "302e258f-29b5-4dd8-9a7c-0cd898cb2143", 
    "Spirit Creatures": "5fdadebb-17ae-472c-bf76-877e657f97de", 
    "Cute Animal Characters": "6908bfaf-8cf2-4fda-8c46-03f892d82e06", 
    "Christmas Stickers": "4b2e0f95-f15e-48d8-ada3-c071d6104db8", 
    "Isometric Scifi Buildings": "7a65f0ab-64a7-4be2-bcf3-64a1cc56f627", 
    "Cute Characters": "50c4f43b-f086-4838-bcac-820406244cec", 
    "Amulets": "ff883b60-9040-4c18-8d4e-ba7522c6b71d", 
    "Isometric Fantasy": "ab200606-5d09-4e1e-9050-0b05b839e944", 
    "Shields": "ee0fc1a3-aacb-48bf-9234-ada3cc02748f", 
    "Crystal Deposits Alternate": "5fce4543-8e23-4b77-9c3f-202b3f1c211e", 
    "Isometric Asteroid Tiles": "756be0a8-38b1-4946-ad62-c0ac832422e3", 
    "Leonardo Signature": "291be633-cb24-434f-898f-e662799936ad"
  };

  const leonardoModelId = modelMap[modelId] || "b24e16ff-06e3-43eb-8d33-4416c2d75876";

  // Parse aspect ratio to get width and height
  let width = 1024;
  let height = 1024;
  
  if (aspectRatio) {
    const [w, h] = aspectRatio.split(':').map(Number);
    // Keep the longer dimension at 1024 and scale the other
    if (w > h) {
      height = Math.floor((h / w) * 1024);
    } else if (h > w) {
      width = Math.floor((w / h) * 1024);
    }
  }

  const AUTHORIZATION = `Bearer ${process.env.LEONARDO_API_TOKEN}`;

  const HEADERS = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: AUTHORIZATION,
  };

  try {
    console.log("Sending request to Leonardo AI...");
    
    // Call Leonardo AI API to initiate generation
    const response = await axios.post("https://cloud.leonardo.ai/api/rest/v1/generations", {
      prompt,
      negative_prompt: negativePrompt,
      modelId: leonardoModelId,
      width,
      height,
      num_images: parseInt(numberOfImages) || 4,
      presetStyle,
      public: false,
      alchemy: false
    }, {
      headers: HEADERS
    });

    // Get generation ID
    const generationId = response.data.sdGenerationJob.generationId;
    console.log("Generation ID:", generationId);
    
    // Construct URL for checking generation status
    const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
    
    console.log("Starting to poll for image generation completion...");
    
    // Polling parameters
    const maxAttempts = 24;  // Maximum number of attempts (60 seconds total if 5-second interval)
    const pollingInterval = 5000;  // 5 seconds between each check
    let attempts = 0;
    let generationResponse;
    let generationStatus = "PENDING";
    
    // Poll until generation is complete or fails
    while (attempts < maxAttempts && (generationStatus === "PENDING" || generationStatus === "IN_PROGRESS")) {
      attempts++;
      console.log(`Polling attempt ${attempts}/${maxAttempts}...`);
      
      // Wait before polling
      await new Promise((resolve) => setTimeout(resolve, pollingInterval));
      
      // Fetch current generation status
      generationResponse = await axios.get(url, { headers: HEADERS });
      
      if (generationResponse.status !== 200) {
        throw new Error(`Failed to fetch generation status: ${generationResponse.statusText}`);
      }
      
      generationStatus = generationResponse.data.generations_by_pk.status;
      console.log(`Current generation status: ${generationStatus}`);
      
      // If there are already images, we can break early
      if (generationResponse.data.generations_by_pk.generated_images && 
          generationResponse.data.generations_by_pk.generated_images.length > 0) {
        console.log(`Found ${generationResponse.data.generations_by_pk.generated_images.length} images, breaking early`);
        break;
      }
    }
    
    console.log("Final generation status:", generationStatus);
    // console.log("Generated Image Details:", generationResponse.data);
    
    // Check if generation completed successfully
    if (generationStatus === "FAILED") {
      throw new Error("Character generation failed on Leonardo AI");
    }
    
    // Check if we timed out
    if (attempts >= maxAttempts && generationStatus === "PENDING") {
      throw new Error("Character generation timed out after maximum polling attempts");
    }
    
    // Extract image URLs from the result
    const imageUrls = generationResponse.data.generations_by_pk.generated_images.map(img => img.url);
    
    // If no images were generated, throw an error
    if (!imageUrls || imageUrls.length === 0) {
      throw new Error("No images were generated");
    }
    
    // Increment user's character generation count
    await User.findByIdAndUpdate(userId, {
      $inc: { "generationLimits.charactersThisPeriod": 1 }
    });
    
    // Create a new character record with initial information
    const character = await Character.create({
      userId,
      name: user.username || "New Character", // Use a default name initially
      age: 30, // Default age, should be updated later
      gender: "Other", // Default gender, should be updated later
      generatedPrompt: prompt,
      generationSettings: {
        model: modelId,
        style,
        aspectRatio
      },
      status: 'ready'
    });
    
    return res.status(200).json(
      new Apiresponse(
        200, 
        { character, imageUrls }, 
        "Character images generated successfully"
      )
    );

  } catch (error) {
    console.error("Character generation error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data
    });
    
    // Fallback to using sample images in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log("Using sample images due to API error");
      
      const sampleUrls = [
        "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=1024&q=80"
      ].slice(0, parseInt(numberOfImages) || 4);
      
      // Create a character and return sample images
      try {
        const character = await Character.create({
          userId,
          name: user.username || "New Character",
          age: 30,
          gender: "Other",
          generatedPrompt: prompt,
          generationSettings: {
            model: modelId,
            style,
            aspectRatio
          },
          status: 'ready'
        });
        
        // Increment user's character generation count
        await User.findByIdAndUpdate(userId, {
          $inc: { "generationLimits.charactersThisPeriod": 1 }
        });
        
        return res.status(200).json(
          new Apiresponse(
            200, 
            { character, imageUrls: sampleUrls }, 
            "Sample character images generated due to API error"
          )
        );
      } catch (innerError) {
        console.error("Error creating character with sample images:", innerError);
      }
    }
    
    throw new Apierror(500, "Failed to generate character images: " + error.message);
  }
});

// const generateCharacterImageIdeogram = asyncHandler(async (req, res) => {
//   const { 
//     prompt, 
//     aspectRatio = "1:1", 
//     style, 
//     magicPromptOption = "Auto",
//     seed
//   } = req.body;
  
//   const userId = req.user._id;
   
//   // Validation
//   if (!prompt) {
//     throw new Apierror(400, "Prompt is required");
//   }

//   // Check if user can create more characters based on subscription tier
//   const user = await User.findById(userId);
  
//   if (!user) {
//     throw new Apierror(404, "User not found");
//   }

//   // Check generation limits based on subscription tier
//   const charactersThisPeriod = user.generationLimits?.charactersThisPeriod || 0;
//   const maxCharacters = user.generationLimits?.maxCharacters || 3;
  
//   if (charactersThisPeriod >= maxCharacters) {
//     throw new Apierror(403, "You've reached your character generation limit for this period. Please upgrade your subscription or wait until the next reset period.");
//   }

//   try {
//     console.log("Sending request to Ideogram API...");
    
//     // Prepare input parameters for Ideogram API
//     const input = {
//       prompt,
//       aspect_ratio: aspectRatio,
//     };

//     // Add optional parameters if they are provided
//     if (style && style !== "None") {
//       input.style_type = style;
//     }

//     if (magicPromptOption) {
//       input.magic_prompt_option = magicPromptOption;
//     }

//     if (seed !== undefined && seed !== "") {
//       input.seed = parseInt(seed);
//     }

//     console.log("Ideogram API input:", input);

//     // Initialize Replicate client
//     const replicate = new Replicate({
//       auth: process.env.REPLICATE_API_KEY,
//     });
    
//     // Call Replicate API
//     const output = await replicate.run("ideogram-ai/ideogram-v2a", { input });
//     console.log(output)
//     await writeFile("output.png", output);
//     console.log("Output type:", typeof output);
//     console.log("Output properties:", Object.keys(output));
//     if (typeof output === 'string') {
//       console.log("Output string length:", output.length);
//     }
    
//     // Increment user's character generation count
//     // await User.findByIdAndUpdate(userId, {
//     //   $inc: { "generationLimits.charactersThisPeriod": 1 }
//     // })
    
//     // Get a filename based on the prompt
//     const sanitizedPrompt = prompt.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
//     const filename = `ideogram_${sanitizedPrompt}_${Date.now()}.png`;
    
//     // Set appropriate headers for image content
//     res.setHeader('Content-Type', 'image/png');
//     res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
//     // 1. If output is a Node.js Readable Stream
//     if (output && typeof output.pipe === 'function') {
//       console.log("Streaming directly from Node.js Readable Stream");
//       output.pipe(res);
//       return;
//     }
    
//     // 2. If output is a Web ReadableStream (browser environment)
//     // if (output && typeof output.getReader === 'function') {
//     //   console.log("Converting Web ReadableStream to Node.js stream");
//     //   const reader = output.getReader();
      
//     //   // Create a custom readable stream to pipe to response
//     //   const nodeStream = new Readable({
//     //     async read() {
//     //       try {
//     //         const { done, value } = await reader.read();
//     //         if (done) {
//     //           this.push(null); // End of stream
//     //         } else {
//     //           this.push(Buffer.from(value));
//     //         }
//     //       } catch (error) {
//     //         this.destroy(error);
//     //       }
//     //     }
//     //   });
      
//     //   // Pipe the stream to response
//     //   nodeStream.pipe(res);
//     //   return;
//     // }

//     // For Web ReadableStream
// if (output && typeof output.getReader === 'function') {
//   console.log("Buffering Web ReadableStream");
//   const reader = output.getReader();
//   const chunks = [];
  
//   try {
//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;
//       chunks.push(value);
//       console.log(`Read chunk of size: ${value.length} bytes`);
//     }
    
//     const completeBuffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)));
//     console.log(`Total buffered size: ${completeBuffer.length} bytes`);
    
//     res.setHeader('Content-Length', completeBuffer.length);
//     res.end(completeBuffer);
//   } catch (error) {
//     console.error("Error reading stream:", error);
//     throw error
//   }
// }
    
//     // 3. If output is a URL or array of URLs
//     if (typeof output === 'string' || (Array.isArray(output) && output.length > 0)) {
//       const imageUrl = typeof output === 'string' ? output : output[0];
//       console.log("Fetching and streaming from URL:", imageUrl);
      
//       // Fetch the image and stream it to the client
//       const response = await axios({
//         method: 'GET',
//         url: imageUrl,
//         responseType: 'stream'
//       });
      
//       // Pipe the image data directly to the response
//       response.data.pipe(res);
//       return;
//     }
    
//     // If we get here, we don't know how to handle the response
//     throw new Error("Unsupported response format from Ideogram API");

//   } catch (error) {
//     console.error("Ideogram generation error:", error);
    
//     // If headers haven't been sent yet, send an error response
//     if (!res.headersSent) {
//       throw new Apierror(500, "Failed to generate image with Ideogram: " + error.message);
//     } else {
//       // If headers were already sent, we can't send a proper error response
//       // Just end the response to prevent hanging
//       res.end();
//     }
//   }
// });

const generateCharacterImageIdeogram = asyncHandler(async (req, res) => {
  const { 
    prompt, 
    aspectRatio = "1:1", 
    style, 
    magicPromptOption = "Auto",
    seed
  } = req.body;
  
  const userId = req.user._id;
   
  // Validation
  if (!prompt) {
    throw new Apierror(400, "Prompt is required");
  }

  // Check if user can create more characters based on subscription tier
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Apierror(404, "User not found");
  }

  // Check generation limits based on subscription tier
  const charactersThisPeriod = user.generationLimits?.charactersThisPeriod || 0;
  const maxCharacters = user.generationLimits?.maxCharacters || 3;
  
  if (charactersThisPeriod >= maxCharacters) {
    throw new Apierror(403, "You've reached your character generation limit for this period. Please upgrade your subscription or wait until the next reset period.");
  }

  try {
    console.log("Sending request to Ideogram API...");
    
    // Prepare input parameters for Ideogram API
    const input = {
      prompt,
      aspect_ratio: aspectRatio,
    };

    // Add optional parameters if they are provided
    if (style && style !== "None") {
      input.style_type = style;
    }

    if (magicPromptOption) {
      input.magic_prompt_option = magicPromptOption;
    }

    if (seed !== undefined && seed !== "") {
      input.seed = parseInt(seed);
    }

    console.log("Ideogram API input:", input);

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });
    
    // Create a prediction and wait for its completion
    console.log("Creating prediction with Ideogram...");
    const prediction = await replicate.predictions.create({
      model: "ideogram-ai/ideogram-v2a",
      input
    });
    
    console.log("Prediction created:", prediction.id);
    console.log("Initial status:", prediction.status);
    
    // Poll for completion with timeout
    const maxPollAttempts = 30; // Maximum number of polling attempts
    const pollInterval = 2000; // 2 seconds between polls
    let completedPrediction = null;
    
    for (let attempt = 0; attempt < maxPollAttempts; attempt++) {
      console.log(`Polling attempt ${attempt + 1}/${maxPollAttempts}`);
      
      const latestPrediction = await replicate.predictions.get(prediction.id);
      console.log("Current status:", latestPrediction.status);
      
      if (latestPrediction.status === "succeeded") {
        completedPrediction = latestPrediction;
        break;
      } else if (latestPrediction.status === "failed" || latestPrediction.status === "canceled") {
        throw new Error(`Prediction failed with status: ${latestPrediction.status}`);
      }
      
      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    
    if (!completedPrediction) {
      throw new Error(`Prediction timed out after ${maxPollAttempts} polling attempts`);
    }
    
    console.log("Prediction completed successfully");
    console.log("Output:", completedPrediction.output);
    
    if (!completedPrediction.output) {
      throw new Error("No output was generated");
    }
    
    // Increment user's character generation count
    // await User.findByIdAndUpdate(userId, {
    //   $inc: { "generationLimits.charactersThisPeriod": 1 }
    // });
    
    // Get the image URL from the output
    const imageUrl = completedPrediction.output;
    
    if (typeof imageUrl !== 'string') {
      throw new Error("Unexpected output format: expected URL string");
    }
    
    console.log("Generated image URL:", imageUrl);
    
    // Download the image from the URL
    console.log("Downloading image from URL...");
    const imageResponse = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'arraybuffer'
    });
    
    // Get a filename based on the prompt
    const sanitizedPrompt = prompt.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
    const filename = `ideogram_${sanitizedPrompt}_${Date.now()}.png`;
    
    // Set appropriate headers for image content
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', imageResponse.data.length);
    
    // Send the image data directly to the response
    res.end(imageResponse.data);

  } catch (error) {
    console.error("Ideogram generation error:", error);
    
    // If headers haven't been sent yet, send an error response
    if (!res.headersSent) {
      throw new Apierror(500, "Failed to generate image with Ideogram: " + error.message);
    } else {
      // If headers were already sent, we can't send a proper error response
      // Just end the response to prevent hanging
      res.end();
    }
  }
});

const generateCharacterImageRecraft = asyncHandler(async (req, res) => {
  const { 
    prompt, 
    aspectRatio = "1:1", 
    style = "any", 
    negativePrompt
  } = req.body;
  
  // Enhanced logging of incoming request
  console.log('------- Recraft Image Generation Request -------');
  console.log('Request Body:', {
    prompt,
    aspectRatio,
    style,
    negativePrompt
  });
  
  // Log the full request details
  console.log('Full Request Headers:', {
    contentType: req.headers['content-type'],
    authorization: req.headers['authorization'],
    // Add any other relevant headers
  });

  const userId = req.user._id;
   
  // Validation logging
  if (!prompt) {
    console.error('Validation Error: Prompt is required');
    throw new Apierror(400, "Prompt is required");
  }

  try {
    // Prepare input parameters logging
    const input = {
      prompt,
      aspect_ratio: aspectRatio !== "Not set" ? aspectRatio : null,
      size: "1024x1024", // Default size
      style
    };

    console.log('Prepared Recraft API Input:', JSON.stringify(input, null, 2));

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    console.log('Attempting to run Recraft model');
    
    // Extensive logging around API call
    console.time('Replicate API Call');
    const output = await replicate.run("recraft-ai/recraft-v3-svg", { input });
    console.timeEnd('Replicate API Call');

    // Log the output type and initial details
    console.log('Replicate API Output Type:', typeof output);
    console.log('Output Inspection:', {
      isStream: typeof output.pipe === 'function',
      isWebReadableStream: typeof output.getReader === 'function',
      isString: typeof output === 'string',
      isArray: Array.isArray(output)
    });

    // Detailed output logging (be careful with large outputs)
    if (typeof output === 'string') {
      console.log('Output URL:', output);
    } else if (Array.isArray(output)) {
      console.log('Output URLs:', output);
    }

    // Prepare response headers with detailed logging
    console.log('Setting Response Headers');
    res.setHeader('X-Generation-Timestamp', Date.now());
    res.setHeader('X-Prompt-Length', prompt.length);
    res.setHeader('X-Aspect-Ratio', aspectRatio);
    res.setHeader('X-Style', style);
    res.setHeader('Content-Type', 'image/svg+xml');
    

    // If the output is already a Node.js readable stream, pipe it directly
    if (typeof output.pipe === 'function') {
      console.log(`inside Node.js readable stream`)
      output.pipe(res);
      return;
    }
    
    // If it's a web ReadableStream, convert it to Node.js stream
    if (typeof output.getReader === 'function') {
      console.log(`inside  web ReadableStream`)
      const reader = output.getReader();
      
      // Create a custom readable stream to pipe to response
      const nodeStream = new Readable({
        async read() {
          try {
            const { done, value } = await reader.read();
            if (done) {
              this.push(null); // End of stream
            } else {
              this.push(Buffer.from(value));
            }
          } catch (error) {
            this.destroy(error);
          }
        }
      });
      
      // Pipe the stream to response
      nodeStream.pipe(res);
      return;
    }
    
    // If the output is a URL string, fetch the video and stream it
    if (typeof output === 'string' || (Array.isArray(output) && output.length > 0)) {
      const videoUrl = typeof output === 'string' ? output : output[0];
      const response = await axios({
        method: 'GET',
        url: videoUrl,
        responseType: 'stream'
      });
      
      response.data.pipe(res);

      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return;
    }

    // Add a final success log
    console.log('------- Recraft Image Generation Successful -------');
    
    // If we get here, we don't know how to handle the response
    throw new Error("Unsupported response format from AI service");

  } catch (error) {
    // Enhanced error logging
    console.error('------- Recraft Generation Error -------');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    // Log full error object
    console.error('Complete Error Object:', JSON.stringify({
      name: error.name,
      message: error.message,
      stack: error.stack,
      responseStatus: error.response?.status,
      responseData: error.response?.data
    }, null, 2));

    // If it's a Replicate-specific error, log additional details
    if (error.response) {
      console.error('Replicate API Error Details:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    }

    // Rethrow with more context
    throw new Apierror(
      500, 
      `Recraft generation error: ${error.message}`, 
      error.response?.data
    );
  }
});


const animateCharacterImage = asyncHandler(async (req, res) => {
  const { prompt, duration, aspectRatio } = req.body;
  const userId = req.user._id;

  // Check if a file was uploaded
  if (!req.file) {
    throw new Apierror(400, "Character Image is required");
  }

  // Validate required fields
  if (!prompt || !duration || !aspectRatio) {
    throw new Apierror(400, "All fields are required");
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw new Apierror(404, "User not found");
  }

  try {
    // Convert the file to base64
    const fileBuffer = req.file.buffer || fs.readFileSync(req.file.path);
    const base64Image = fileBuffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // Prepare input for Replicate API
    const input = {
      "enable_safety_checker": true,
      "guidance_scale": 5,
      "negative_prompt": "",
      "num_inference_steps": 30,
      "prompt": prompt,
      "seed": -1,
      "size": "832*480",
      "image": dataURI
    };
    
    // Call Replicate API
    const outputStream = await replicate.run("wavespeedai/wan-2.1-i2v-480p", { input });
    
    // Check if we have a stream
    if (!outputStream) {
      throw new Error("Invalid response from AI service");
    }

    // Set appropriate headers for streaming video
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', 'attachment; filename="animated-character.mp4"');
    
    // If the output is already a Node.js readable stream, pipe it directly
    if (typeof outputStream.pipe === 'function') {
      outputStream.pipe(res);
      return;
    }
    
    // If it's a web ReadableStream, convert it to Node.js stream
    if (typeof outputStream.getReader === 'function') {
      const reader = outputStream.getReader();
      
      // Create a custom readable stream to pipe to response
      const nodeStream = new Readable({
        async read() {
          try {
            const { done, value } = await reader.read();
            if (done) {
              this.push(null); // End of stream
            } else {
              this.push(Buffer.from(value));
            }
          } catch (error) {
            this.destroy(error);
          }
        }
      });
      
      // Pipe the stream to response
      nodeStream.pipe(res);
      return;
    }
    
    // If the output is a URL string, fetch the video and stream it
    if (typeof outputStream === 'string' || (Array.isArray(outputStream) && outputStream.length > 0)) {
      const videoUrl = typeof outputStream === 'string' ? outputStream : outputStream[0];
      const response = await axios({
        method: 'GET',
        url: videoUrl,
        responseType: 'stream'
      });
      
      response.data.pipe(res);

      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return;
    }
    
    // If we get here, we don't know how to handle the response
    throw new Error("Unsupported response format from AI service");

  } catch (error) {
    // Clean up any temporary files
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error("Animation error:", error);
    
    // If headers haven't been sent yet, send an error response
    if (!res.headersSent) {
      throw new Apierror(500, "Failed to animate character image: " + error.message);
    }
  }
});

const saveCharacterImage = asyncHandler(async (req, res) => {
  const { characterId, imageUrl } = req.body;
  const userId = req.user._id;

  // Validation
  if (!characterId) {
    throw new Apierror(400, "Character ID is required");
  }

  if (!imageUrl) {
    throw new Apierror(400, "Image URL is required");
  }

  // Find the character
  const character = await Character.findById(characterId);
  
  if (!character) {
    throw new Apierror(404, "Character not found");
  }

  // Check if the character belongs to the user
  if (character.userId.toString() !== userId.toString()) {
    throw new Apierror(403, "You don't have permission to modify this character");
  }

  // Update the character with the selected image
  character.characterImage = {
    url: imageUrl
  };
  character.status = 'ready';
  
  await character.save();

  // Add to user's characters array if not already there
  const user = await User.findById(userId);
  if (!user.characters.includes(characterId)) {
    user.characters.push(characterId);
    await user.save();
  }

  return res.status(200).json(
    new Apiresponse(
      200, 
      { character }, 
      "Character image saved successfully"
    )
  );
});


// Additional character-related controllers would go here
// createCharacter, getAllCharacters, getCharacterById, etc.

export {
  generateCharacterPrompt,
  generateCharacterImage,
  saveCharacterImage,
  animateCharacterImage,
  generateCharacterImageIdeogram,
  generateCharacterImageRecraft
  // Export other controllers as needed
};