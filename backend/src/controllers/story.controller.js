import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { Story } from "../models/story.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios";
import Replicate from "replicate";

const createStory = asyncHandler(async (req, res) => {
  const { 
    title, 
    storyType, 
    ageGroup, 
    theme, 
    introduction, 
    conclusion, 
    characters, 
    scenes 
  } = req.body;
  
  const userId = req.user._id;
  
  // Basic validation
  if (!title || !storyType || !introduction) {
    throw new Apierror(400, "Title, story type, and introduction are required");
  }
  
  // Create the story
  const story = await Story.create({
    userId,
    title,
    storyType,
    ageGroup: ageGroup || '3-6',
    theme,
    introduction,
    conclusion,
    characters: characters || [],
    scenes: scenes || [],
    status: 'draft'
  });
  
  if (!story) {
    throw new Apierror(500, "Failed to create story");
  }
  
  return res.status(201).json(
    new Apiresponse(201, story, "Story created successfully")
  );
});

// const generateStoryPrompt = asyncHandler(async (req, res) => {
//   console.log("Generating story prompt...");
//   console.log("Request body:", req.body);

//   const { includeChild, childCharacter, storyType } = req.body;

  
//   const userId = req.user._id;
  
//   // Validate input
//   if (storyType === undefined) {
//     throw new Apierror(400, "Story type is required");
//   }
  
//   if (includeChild && (!childCharacter || !childCharacter.name)) {
//     throw new Apierror(400, "Child character information is required when you want to include your child");
//   }
  
//   // Construct the prompt for story generation
//   let prompt = `Create a ${storyType} story `;
  
//   if (includeChild) {
    
//     prompt += `featuring a character named ${childCharacter.name}, who is a ${childCharacter.age}-year-old ${childCharacter.gender?.toLowerCase() || 'child'}. `;
    
//     if (childCharacter.appearance) {
      
//       prompt += `The character appearance is: ${childCharacter.appearance}. `;
//     }
    
//     if (childCharacter.personality) {
        
//       prompt += `The character personality is: ${childCharacter.personality}. `;
//     }
    
//   } else {
//     prompt += `As an AI assistant, create a ${storyType} story for kids aged 4-8 years old. `;
//   }

//   console.log("Generated prompt:", prompt);
  
//   prompt += `You are a helpful AI assitant that creates engaging story for kids and help me to create colourful story books for kids. 
// The story should be suitable for children aged 4-8 years old. The story should be fun and engaging, with a clear beginning, middle, and end. 
// The story should also have a moral or lesson that is appropriate for children. The story should be written in a way that is easy for children to understand 
// and follow along with. The story should be imaginative and creative, with interesting characters and settings. The story should also be age-appropriate and 
// not contain any violence or inappropriate content. 


// Format the response as a JSON object with the following structure:
// {
//   "title": "Story Title",
//   "introduction": "Story introduction paragraph",
//   "conclusion": "Story conclusion paragraph",
//   "storyStyleGuide": {
//     "artStyle": "Choose ONE consistent art style (e.g., '3D Pixar animated style')",
//     "colorPalette": "Define 5-7 main colors that will appear consistently throughout all scenes",
//     "lighting": "Define consistent lighting approach across all scenes",
//     "cameraAngle": "Define preferred camera angles/perspectives to maintain consistency"
//   },
//   "characters": [
//     {
//       "name": "Character Name",
//       "type": "hero/friend/pet/etc",
//       "description": "Brief character description",
//       "visualReference": {
//         "exactAppearance": "Comprehensive visual description that will be used in EVERY scene"
//       }
//     }
//   ],
//   "scenes": [
//     {
//       "title": "Scene Title",
//       "text": "7-8 sentences with simple language that clearly connect to previous scene. Use character names here.",
//       "visualDescription": "A STANDALONE visual description limited to maximum 200 words. Do NOT use character 
//       names but instead describe by appearance (e.g., 'a girl with auburn hair in a green jacket' instead of 
//       'Mira'). Include settings, character appearances, lighting, and composition in a cohesive paragraph. 
//       End with: 3D pixer animated style, vibrant colors, realistic lighting"
//     }
//   ]
// }

// IMPORTANT VISUAL CONTINUITY RULES:
// 1. NEVER use character names in visual descriptions - always use full visual descriptions of each character
// 2. Each visual description must be completely STANDALONE for an image generator that sees only that text
// 3. Maintain exact same clothing, hairstyles, and identifying features for characters across all scenes
// 4. Include specific visual elements from previous scenes to create continuity
// 5. Maintain consistent art style, lighting approach, and color palette throughout
// 6. Keep ALL visual descriptions under 200 words

// Remember: Each visual description will be processed individually by an AI image generator with no knowledge 
// of other scenes or character names. They must work independently while creating visually consistent results.`;

//   console.log("Generated prompt:", prompt);
  
//   system_prompt = `You are a creative storyteller. You can create a story with characters, scenes, and illustrations.`

//   try {
//     console.log("Starting story generation with Replicate/Claude");
//     console.log("Request params:", { includeChild, storyType });
    
//     // Initialize Replicate with API token
   
//     const replicate = new Replicate({
//       auth: process.env.REPLICATE_API_TOKEN,
//     });
    
//     // Prepare input for Claude
//     const input = {
//       prompt: prompt,
//       max_tokens: 8192,
//       system_prompt: system_prompt,
//     };
    
//     console.log("Sending request to Replicate/Claude API...");
    
//     // Call Replicate API with Claude model
//     let fullResponse = "";
//     for await (const event of replicate.stream("anthropic/claude-3.5-sonnet", { input })) {
//       fullResponse += event.toString();
//     }
    
//     console.log("Received complete response from Replicate/Claude");
    
//     // Try to parse JSON from the response
//     let generatedContent;
//     try {
//       // Look for JSON object in the response
//       const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         const jsonString = jsonMatch[0];
//         console.log("Extracted JSON string:", jsonString.substring(0, 100) + "...");
//         generatedContent = JSON.parse(jsonString);
//       } else {
//         throw new Error("No valid JSON found in response");
//       }
//     } catch (parseError) {
//       console.error("Error parsing JSON from Claude response:", parseError);
//       console.log("Raw response preview:", fullResponse.substring(0, 200) + "...");
//       throw new Error("Failed to parse story format from AI response");
//     }
    
//     console.log("Successfully parsed story data with", 
//       generatedContent.scenes?.length || 0, "scenes and", 
//       generatedContent.characters?.length || 0, "characters");
    
//     return res.status(200).json(
//       new Apiresponse(200, generatedContent, "Story prompt generated successfully")
//     );
//   } catch (error) {
//     console.error("Story generation error:", error);
//     console.error("Error details:", error.stack);
    
//     // For development, fallback to a mock response if requested
//     if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_RESPONSES === 'true') {
//       console.log("Using fallback mock response due to error");
      
//       const mockAIResponse = {
//         title: `${includeChild ? childCharacter.name + "'s " : "The "}Amazing ${storyType.charAt(0).toUpperCase() + storyType.slice(1)} Adventure`,
//         introduction: `Once upon a time, ${includeChild ? childCharacter.name : "a brave child named Alex"} discovered a magical map that promised treasure and adventure.`,
//         conclusion: "After an incredible journey filled with friendship and courage, they returned home with wonderful memories and important lessons learned.",
//         characters: [
//           {
//             name: includeChild ? childCharacter.name : "Alex",
//             type: "hero",
//             description: includeChild ? 
//               `${childCharacter.name} is ${childCharacter.age} years old with ${childCharacter.appearance || "a bright smile"}. ${childCharacter.personality || "They are brave and kind."}` :
//               "Alex is a curious and adventurous child who loves to explore."
//           },
//           {
//             name: "Luna",
//             type: "friend",
//             description: "Luna is a wise owl who guides the hero on their journey."
//           },
//           {
//             name: "Sparky",
//             type: "pet",
//             description: "Sparky is a playful dog who provides comic relief and helps in tight situations."
//           }
//         ],
//         scenes: [
//           {
//             title: "The Discovery",
//             text: `${includeChild ? childCharacter.name : "Alex"} finds a mysterious map hidden in an old book.`,
//             visualDescription: "Child discovering a glowing map in a dusty attic, Ultra HDR, 3D Pixar cartoon style, intricate details, vibrant colors, realistic lighting"
//           },
//           {
//             title: "Meeting the Guide",
//             text: "Luna the owl appears and offers to help interpret the magical map.",
//             visualDescription: "Child meeting a wise owl perched on a tree branch, map in hand, 3D Pixar cartoon style, vibrant colors, Dramatic Lighting, Enhanced Clarity"
//           },
//           {
//             title: "The Challenge",
//             text: "A river blocks the path, requiring creative thinking to cross.",
//             visualDescription: "Child and animal friends facing a wide river with stepping stones, 3D intricate details, vibrant colors, realistic lighting, cinematic"
//           },
//           {
//             title: "The Treasure",
//             text: "The treasure turns out to be something unexpected but valuable.",
//             visualDescription: "Child opening a treasure chest that glows with magical light, Ultra HDR, Brilliant Highlights, Hyperrealistic Detailing, cinematic"
//           }
//         ]
//       };
      
//       return res.status(200).json(
//         new Apiresponse(200, mockAIResponse, "Story prompt generated successfully (mock)")
//       );
//     }
    
//     throw new Apierror(500, "Failed to generate story");
//   }
// });

const generateStoryPrompt = asyncHandler(async (req, res) => {
  try {
    const { includeChild, childCharacter, storyType } = req.body;
    const userId = req.user._id;
    
    // Validate input
    if (storyType === undefined) {
      throw new Apierror(400, "Story type is required");
    }
    
    if (includeChild && (!childCharacter || !childCharacter.name)) {
      throw new Apierror(400, "Child character information is required when you want to include your child");
    }
    
    // Construct the prompt for story generation
    let prompt = `Create a ${storyType} story `;
    
    if (includeChild) {
      prompt += `featuring a character named ${childCharacter.name}, who is a ${childCharacter.age}-year-old ${childCharacter.gender?.toLowerCase() || 'child'}. `;
      
      if (childCharacter.appearance) {
        prompt += `The character appearance is: ${childCharacter.appearance}. `;
      }
      
      if (childCharacter.personality) {
        prompt += `The character personality is: ${childCharacter.personality}. `;
      }
    } else {
      prompt += `for kids aged 4-8 years old. `;
    }
    
    prompt += `

Format the response as a JSON object with the following structure:
{
  "title": "Story Title",
  "introduction": "Story introduction paragraph",
  "conclusion": "Story conclusion paragraph",
  "storyStyleGuide": {
    "artStyle": "Choose ONE consistent art style (e.g., '3D Pixar animated style')",
    "colorPalette": "Define 5-7 main colors that will appear consistently throughout all scenes",
    "lighting": "Define consistent lighting approach across all scenes",
    "cameraAngle": "Define preferred camera angles/perspectives to maintain consistency"
  },

  "characters": [
    {
      "name": "Character Name",
      "type": "hero/friend/pet/etc",
      "description": "Brief character description",
      "visualReference": {
        "exactAppearance": "Comprehensive visual description that will be used in EVERY scene"
      }
    }
  ],
  "scenes": [
    {
      "title": "Scene Title",
      "text": "7-8 sentences with simple language that clearly connect to previous scene. Use character names here.",
      "visualDescription": "A STANDALONE visual description limited to maximum 200 words. Do NOT use character 
      names but instead describe by appearance (e.g., 'a girl with auburn hair in a green jacket' instead of 
      'Mira'). Include settings, character appearances, lighting, and composition in a cohesive paragraph. 
      End with: 3D pixar animated style, vibrant colors, realistic lighting"
    }
  ]
  "coverPagescene":{
  "visualDescription": "A STANDALONE visual description that will be used for the cover page. Use Main Character description here along their appearance.
  Include settings, character appearances, lighting, and composition in a cohesive paragraph. 
  End with: 3D pixar animated style, vibrant colors, realistic lighting. Do not use character names. This will be used to generate image for the cover page"
  },
  "endPagescene":{
  "visualDescription": "A STANDALONE visual description that will be used for the end page."
  }
}

IMPORTANT VISUAL CONTINUITY RULES:
1. NEVER use character names in visual descriptions - always use full visual descriptions of each character
2. Each visual description must be completely STANDALONE for an image generator that sees only that text
3. Maintain exact same clothing, hairstyles, and identifying features for characters across all scenes
4. Include specific visual elements from previous scenes to create continuity
5. Maintain consistent art style, lighting approach, and color palette throughout
6. Keep ALL visual descriptions under 200 words

Remember: Each visual description will be processed individually by an AI image generator with no knowledge 
of other scenes or character names. They must work independently while creating visually consistent results.`;
    
    const system_prompt = `You are a helpful AI assistant that creates engaging stories for kids and helps me create colorful story books for kids. 
The story should be suitable for children aged 4-8 years old. The story should be fun and engaging, with a clear beginning, middle, and end. 
The story should also have a moral or lesson that is appropriate for children. The story should be written in a way that is easy for children to understand 
and follow along with. The story should be imaginative and creative, with interesting characters and settings. The story should also be age-appropriate and 
not contain any violence or inappropriate content. `;
    
    // Check if Replicate API key is available
    if (!process.env.REPLICATE_API_TOKEN) {
      console.error("Missing REPLICATE_API_TOKEN environment variable");
      throw new Error("Replicate API key not configured");
    }
    
    
    // Initialize Replicate with API token
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    
    // Prepare input for Claude
    const input = {
      prompt: prompt,
      max_tokens: 8192,
      system: system_prompt,  // Note: Changed from system_prompt to system based on Replicate API docs
    };
    
    // console.log("Sending request to Replicate/Claude API...");
    
    // Call Replicate API with Claude model
    let fullResponse = "";
    
    try {
      // For non-streaming approach (more reliable)
      const output = await replicate.run(
        "anthropic/claude-3.5-sonnet",
        { input }
      );
      
      fullResponse = output.join("");
      
    } catch (apiError) {
      console.error("Error calling Replicate API:", apiError);
      throw new Error(`Failed to call Replicate API: ${apiError.message}`);
    }
    
    // Try to parse JSON from the response
    let generatedContent;
    try {
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        console.log("Extracted JSON string:", jsonString.substring(0, 100) + "...");
        generatedContent = JSON.parse(jsonString);
        // console.log("Parsed JSON successfully:", generatedContent);
        // console.log(generatedContent.coverPagescene.visualDescription);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing JSON from Claude response:", parseError);
      console.log("Raw response preview:", fullResponse.substring(0, 200) + "...");
      throw new Error("Failed to parse story format from AI response");
    }
    
    console.log("Successfully parsed story data with", 
      generatedContent.scenes?.length || 0, "scenes and", 
      generatedContent.characters?.length || 0, "characters");
    
    return res.status(200).json(
      new Apiresponse(200, generatedContent, "Story prompt generated successfully")
    );
  } catch (error) {
    console.error("Story generation error:", error);
    console.error("Error details:", error.stack);
    
    // For development, fallback to a mock response
    if (process.env.NODE_ENV === 'development' && process.env.USE_MOCK_RESPONSES === 'true') {
      console.log("Using fallback mock response due to error");
      
      const mockAIResponse = getMockStoryResponse(req.body);
      
      return res.status(200).json(
        new Apiresponse(200, mockAIResponse, "Story prompt generated successfully (mock)")
      );
    }
    
    // If it's an API error or other known error, return 500 with details
    return res.status(500).json(
      new Apiresponse(500, null, error.message || "Failed to generate story")
    );
  }
});

// Helper function to generate mock responses for development
function getMockStoryResponse({ includeChild, childCharacter, storyType }) {
  return {
    title: `${includeChild ? childCharacter.name + "'s " : "The "}Amazing ${storyType.charAt(0).toUpperCase() + storyType.slice(1)} Adventure`,
    introduction: `Once upon a time, ${includeChild ? childCharacter.name : "a brave child named Alex"} discovered a magical map that promised treasure and adventure.`,
    conclusion: "After an incredible journey filled with friendship and courage, they returned home with wonderful memories and important lessons learned.",
    storyStyleGuide: {
      artStyle: "3D Pixar animated style",
      colorPalette: "Sky blue, forest green, sunny yellow, warm brown, deep purple, ruby red",
      lighting: "Warm, golden light during day scenes, cool blue moonlight for night scenes",
      cameraAngle: "Primarily eye-level perspectives with occasional wide establishing shots"
    },
    characters: [
      {
        name: includeChild ? childCharacter.name : "Alex",
        type: "hero",
        description: includeChild ? 
          `${childCharacter.name} is ${childCharacter.age} years old with ${childCharacter.appearance || "a bright smile"}. ${childCharacter.personality || "They are brave and kind."}` :
          "Alex is a curious and adventurous 7-year-old who loves to explore.",
        visualReference: {
          exactAppearance: includeChild ? 
            `A ${childCharacter.age}-year-old child with ${childCharacter.appearance || "a bright smile"} wearing a blue t-shirt, denim shorts, and red sneakers` :
            "A 7-year-old child with curly brown hair and freckles, wearing a blue t-shirt, denim shorts, and red sneakers"
        }
      },
      {
        name: "Luna",
        type: "friend",
        description: "Luna is a wise owl who guides the hero on their journey.",
        visualReference: {
          exactAppearance: "A large snowy owl with piercing yellow eyes, soft white and gray feathers, and a distinctive black spot on her right wing"
        }
      },
      {
        name: "Sparky",
        type: "pet",
        description: "Sparky is a playful golden retriever who provides comic relief and helps in tight situations.",
        visualReference: {
          exactAppearance: "A young golden retriever with shiny golden fur, floppy ears, wearing a blue collar with a silver star-shaped tag"
        }
      }
    ],
    scenes: [
      {
        title: "The Discovery",
        text: `${includeChild ? childCharacter.name : "Alex"} finds a mysterious map hidden in an old book in the dusty attic. The map glows with strange symbols and shows a path through the Whispering Woods. Luna the owl appears at the window, startling ${includeChild ? childCharacter.name : "Alex"}. "That map leads to the Crystal Cave," hoots Luna wisely. "It contains treasures beyond imagination, but the journey is full of challenges." Excited but nervous, ${includeChild ? childCharacter.name : "Alex"} decides to follow the map, with Luna offering to guide the way. ${includeChild ? childCharacter.name : "Alex"}'s loyal dog Sparky barks enthusiastically, ready for adventure.`,
        visualDescription: "In a dusty attic filled with old trunks and cobwebbed shelves, a young child with curly brown hair and freckles, wearing a blue t-shirt and denim shorts, holds a glowing, ancient-looking map. Sunlight streams through a circular window, illuminating dancing dust particles. A majestic white and gray owl perches on the windowsill, its yellow eyes focused intently on the child. A golden retriever with shiny fur and a blue collar sits beside the child, looking up excitedly at the glowing map. The warm golden afternoon light creates a magical atmosphere in the attic. 3D Pixar animated style, vibrant colors, realistic lighting."
      },
      {
        title: "Entering the Woods",
        text: `With the map clutched tightly, ${includeChild ? childCharacter.name : "Alex"} follows Luna into the Whispering Woods as Sparky bounds ahead excitedly. The trees seem to lean in closer, their leaves rustling with whispered secrets. "The trees are telling stories of travelers who came before," explains Luna, flying from branch to branch. Suddenly, Sparky barks at something ahead – a glittering stream blocks their path, too wide to jump across. The map shows a bridge, but all ${includeChild ? childCharacter.name : "Alex"} can see are stepping stones partially submerged in the water. "Sometimes the way forward isn't obvious," says Luna wisely. "You must look beyond what your eyes first see."`,
        visualDescription: "At the edge of a dense forest where massive trees with vibrant green leaves stretch skyward, a child with curly brown hair and freckles in a blue t-shirt and denim shorts stands holding a glowing map. A white and gray owl with distinctive yellow eyes flies just ahead between the trees, wings spread gracefully. A golden retriever with shining fur and a blue collar has stopped at the edge of a sparkling blue stream that cuts through the forest floor. Sunlight filters through the canopy, creating dappled patterns on the forest floor and reflecting off the water. Several mossy stepping stones are visible breaking the surface of the water. The scene captures the threshold of adventure as the forest seems to beckon them forward. 3D Pixar animated style, vibrant colors, realistic lighting."
      },
      {
        title: "The Crystal Cave",
        text: `After crossing the stream and hiking through the deepest part of the woods, ${includeChild ? childCharacter.name : "Alex"}, Luna, and Sparky finally reach a mountainside with a small opening. "The Crystal Cave," Luna announces solemnly. Gathering courage, ${includeChild ? childCharacter.name : "Alex"} steps inside with Sparky close behind. The passage opens into an enormous cavern filled with glittering crystals of every color, reflecting light in a dazzling display. In the center sits a small wooden chest, ancient and weathered. ${includeChild ? childCharacter.name : "Alex"} approaches carefully while Luna perches on a nearby crystal. "The true treasure awaits," she hoots mysteriously as ${includeChild ? childCharacter.name : "Alex"} reaches for the chest.`,
        visualDescription: "Inside a vast cavern with soaring ceilings, countless crystals of blue, purple, red, yellow, and green jut from the walls and floor, creating a spectacular light show as they reflect and refract light. At the center stands a child with curly brown hair and freckles, still in the same blue t-shirt and denim shorts, now approaching a small, weathered wooden chest that sits on a natural crystal pedestal. The white and gray owl with yellow eyes is perched on a large purple crystal formation to the right, watching attentively. The golden retriever with the blue collar stands alert beside the child, its fur catching the colorful reflections from the crystals around them. The cave is illuminated by a mysterious light source from above, creating dramatic shadows and highlighting the vibrant colors of the crystals. 3D Pixar animated style, vibrant colors, realistic lighting."
      },
      {
        title: "The True Treasure",
        text: `With trembling hands, ${includeChild ? childCharacter.name : "Alex"} opens the ancient chest, expecting gold or jewels. Instead, inside lies a simple mirror with an ornate frame. Looking into it, ${includeChild ? childCharacter.name : "Alex"} doesn't see just a reflection, but images of the entire journey – crossing the stream, helping a rabbit family along the way, and persevering through the dark forest. "The mirror shows the courage and kindness in your heart," explains Luna. "That is the true treasure – discovering your own strength and compassion." Sparky barks happily and licks ${includeChild ? childCharacter.name : "Alex"}'s hand as understanding dawns. "The journey itself was the real treasure," ${includeChild ? childCharacter.name : "Alex"} realizes, feeling stronger and braver than before.`,
        visualDescription: "In the center of the crystal-filled cavern, a child with curly brown hair and freckles, wearing the same blue t-shirt and denim shorts, kneels beside an open wooden chest. Instead of gold, the child holds an ornate silver mirror that emits a soft, magical glow. The mirror's surface shows swirling images rather than a simple reflection. The white and gray owl with yellow eyes hovers nearby with wings outstretched. The golden retriever with the blue collar sits faithfully beside the child, its expression alert and joyful. The surrounding crystals seem to pulse with brighter colors in response to the mirror's magic, creating an atmosphere of wonder and realization. The light in the cave has shifted to a warm golden glow that emanates from the mirror itself, illuminating the child's face with an expression of awe and understanding. 3D Pixar animated style, vibrant colors, realistic lighting."
      }
    ]
  };
}




























/**
 * Generate scene illustration
 * Route: POST /api/v1/stories/generate-illustration
 * Body: sceneText, visualDescription, storyType
 */
// const generateSceneIllustration = asyncHandler(async (req, res) => {
//   const { sceneText, visualDescription, storyType } = req.body;
  
//   // Validate input
//   if (!sceneText && !visualDescription) {
//     throw new Apierror(400, "Scene text or visual description is required");
//   }
  
//   try {
//     // Construct prompt for image generation
//     const prompt = visualDescription || sceneText;
    
//     // In a real implementation, you would call an image generation API like:
//     // - Leonardo.AI
//     // - DALL-E
//     // - Stable Diffusion
    
//     // For now, return a mock image URL
//     const mockImageUrl = "https://example.com/mock-illustration.jpg";
    
//     return res.status(200).json(
//       new Apiresponse(200, { imageUrl: mockImageUrl }, "Scene illustration generated successfully")
//     );
//   } catch (error) {
//     console.error("Illustration generation error:", error);
//     throw new Apierror(500, "Failed to generate illustration");
//   }
// });
const generateSceneIllustration = asyncHandler(async (req, res) => {
  const { sceneId, visualDescription } = req.body;
  const userId = req.user._id;
  
  // Validation
  if (!visualDescription) {
    throw new Apierror(400, "Visual description is required");
  }
 
  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    throw new Apierror(404, "User not found");
  }
 
  // Set fixed parameters for scene generation
  const width = 1024;
  const height = 768; // 4:3 aspect ratio good for scene illustrations
  const numberOfImages = 1;
  const modelId = "b2614463-296c-462a-9586-aafdb8f00e36"; // Flux Dev
  const presetStyle = "DYNAMIC";
 
  const AUTHORIZATION = `Bearer ${process.env.LEONARDO_API_TOKEN}`;
  const HEADERS = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: AUTHORIZATION,
  };
 
  try {
    console.log("Generating scene illustration...");
    console.log("Scene prompt:", visualDescription);
    
    // Call Leonardo AI API to initiate generation
    const response = await axios.post("https://cloud.leonardo.ai/api/rest/v1/generations", {
      prompt: visualDescription,
      modelId: modelId,
      width,
      height,
      num_images: numberOfImages,
      presetStyle,
      promptMagic: false, // Turn off prompt-enhance
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
    
    console.log("Polling for scene image generation completion...");
    
    // Polling parameters
    const maxAttempts = 24;  // Maximum number of attempts
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
    
    // Check if generation completed successfully
    if (generationStatus === "FAILED") {
      throw new Error("Scene illustration generation failed on Leonardo AI");
    }
    
    // Check if we timed out
    if (attempts >= maxAttempts && generationStatus === "PENDING") {
      throw new Error("Scene illustration generation timed out after maximum polling attempts");
    }
    
    // Extract image URL and seed from the result
    if (!generationResponse.data.generations_by_pk.generated_images || 
        generationResponse.data.generations_by_pk.generated_images.length === 0) {
      throw new Error("No images were generated");
    }
    
    const generatedImage = generationResponse.data.generations_by_pk.generated_images[0];
    const imageUrl = generatedImage.url;
    const seed = generatedImage.seed || null;
    
    return res.status(200).json(
      new Apiresponse(
        200, 
        { 
          sceneId,
          imageUrl,
          seed,
          width,
          height
        }, 
        "Scene illustration generated successfully"
      )
    );
 
  } catch (error) {
    console.error("Scene illustration generation error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data
    });
    
    // Fallback to using sample images in development environment
    if (process.env.NODE_ENV === 'development') {
      console.log("Using sample image due to API error");
      
      const sampleImageUrl = "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024&h=768&q=80";
      
      return res.status(200).json(
        new Apiresponse(
          200, 
          { 
            sceneId,
            imageUrl: sampleImageUrl,
            seed: 12345, // Mock seed
            width,
            height
          }, 
          "Sample scene illustration generated due to API error"
        )
      );
    }
    
    throw new Apierror(500, "Failed to generate scene illustration: " + error.message);
  }
 });

/**
 * Get all stories for current user
 * Route: GET /api/v1/stories
 */
const getAllUserStories = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  const stories = await Story.find({ userId })
    .select("title storyType status createdAt lastEditedAt")
    .sort({ lastEditedAt: -1 });
  
  return res.status(200).json(
    new Apiresponse(200, stories, "Stories fetched successfully")
  );
});

/**
 * Get story by ID
 * Route: GET /api/v1/stories/:storyId
 */
const getStoryById = asyncHandler(async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  
  const story = await Story.findById(storyId);
  
  if (!story) {
    throw new Apierror(404, "Story not found");
  }
  
  // Check if user has access to this story
  if (!story.isAccessibleBy(req.user)) {
    throw new Apierror(403, "You don't have permission to access this story");
  }
  
  // Increment view count only if viewer is not the owner
  if (!story.userId.equals(userId)) {
    await story.incrementViewCount();
  }
  
  return res.status(200).json(
    new Apiresponse(200, story, "Story fetched successfully")
  );
});

/**
 * Update story
 * Route: PATCH /api/v1/stories/:storyId
 */
const updateStory = asyncHandler(async (req, res) => {
  const { storyId } = req.params;
  const updates = req.body;
  const userId = req.user._id;
  
  // Find the story
  const story = await Story.findById(storyId);
  
  if (!story) {
    throw new Apierror(404, "Story not found");
  }
  
  // Check if user is the owner
  if (!story.userId.equals(userId)) {
    throw new Apierror(403, "You don't have permission to update this story");
  }
  
  // Update allowed fields
  const allowedUpdates = [
    'title', 'storyType', 'ageGroup', 'theme', 
    'introduction', 'conclusion', 'characters', 
    'scenes', 'status', 'isPublic'
  ];
  
  // Apply updates
  Object.keys(updates).forEach((field) => {
    if (allowedUpdates.includes(field)) {
      story[field] = updates[field];
    }
  });
  
  // Update lastEditedAt
  story.lastEditedAt = Date.now();
  
  // Save the story
  await story.save();
  
  return res.status(200).json(
    new Apiresponse(200, story, "Story updated successfully")
  );
});

/**
 * Delete story
 * Route: DELETE /api/v1/stories/:storyId
 */
const deleteStory = asyncHandler(async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  
  // Find the story
  const story = await Story.findById(storyId);
  
  if (!story) {
    throw new Apierror(404, "Story not found");
  }
  
  // Check if user is the owner
  if (!story.userId.equals(userId)) {
    throw new Apierror(403, "You don't have permission to delete this story");
  }
  
  // Delete the story
  await story.deleteOne();
  
  return res.status(200).json(
    new Apiresponse(200, {}, "Story deleted successfully")
  );
});

/**
 * Share story with other users
 * Route: POST /api/v1/stories/:storyId/share
 * Body: { emails: [] }
 */
const shareStory = asyncHandler(async (req, res) => {
  const { storyId } = req.params;
  const { emails } = req.body;
  const userId = req.user._id;
  
  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    throw new Apierror(400, "List of emails is required");
  }
  
  // Find the story
  const story = await Story.findById(storyId);
  
  if (!story) {
    throw new Apierror(404, "Story not found");
  }
  
  // Check if user is the owner
  if (!story.userId.equals(userId)) {
    throw new Apierror(403, "You don't have permission to share this story");
  }
  
  // Find users by email
  const users = await User.find({ email: { $in: emails } })
    .select("_id email fullname");
  
  if (users.length === 0) {
    throw new Apierror(404, "No registered users found with the provided emails");
  }
  
  // Add users to sharedWith array (avoid duplicates)
  const userIds = users.map(user => user._id);
  story.sharedWith = [...new Set([...story.sharedWith, ...userIds])];
  
  await story.save();
  
  return res.status(200).json(
    new Apiresponse(200, { sharedWith: users }, "Story shared successfully")
  );
});

export {
  createStory,
  generateStoryPrompt,
  generateSceneIllustration,
  getAllUserStories,
  getStoryById,
  updateStory,
  deleteStory,
  shareStory
};