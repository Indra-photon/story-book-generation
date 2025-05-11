import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { Story } from "../models/story.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import axios from "axios";
import Replicate from "replicate";
import mongoose from 'mongoose'

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


const generateStoryPrompt = asyncHandler(async (req, res) => {
  try {
    const { includeChild, childCharacter, storyType } = req.body;
    const userId = req.user._id;

    // User verification and token validation
    const user = await User.findById(userId);
    if (!user) {
      throw new Apierror(404, "User not found");
    }

    // Check email verification
    if (!user.isEmailVerified) {
      throw new Apierror(403, "Please verify your email before generating a story");
    }

    // Define token cost for story generation
    const STORY_GENERATION_COST = 5;

    // Check if user has enough tokens
    if (!user.hasEnoughTokens(STORY_GENERATION_COST)) {
      throw new Apierror(403, "Insufficient tokens. Please purchase more tokens to generate a story.");
    }

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
    }`;
    
    const system_prompt = `You are a helpful AI assistant that creates engaging stories for kids and helps me create colorful story books for kids. 
    The story should be suitable for children aged 4-8 years old. The story should be fun and engaging, with a clear beginning, middle, and end. 
    The story should also have a moral or lesson that is appropriate for children. The story should be written in a way that is easy for children to understand 
    and follow along with. The story should be imaginative and creative, with interesting characters and settings. The story should also be age-appropriate and 
    not contain any violence or inappropriate content. 

    IMPORTANT FOR WRITING THE STORY: (RESTRICTED GUIDELINE)
    1. You can not use words "mushrooms", "cutting", "knife", "kids", "porn",or any violent words inside the story, story title or story conslusion 
    2. You can not use words "mushrooms", "cutting", "knife", "kids", "porn", or any violent words inside the visual description of any scene

    IMPORTANT VISUAL CONTINUITY RULES:
    1. NEVER use character names in visual descriptions - always use full visual descriptions of each character
    2. Each visual description must be completely STANDALONE for an image generator that sees only that text
    3. Maintain exact same clothing, hairstyles, and identifying features for characters across all scenes
    4. Include specific visual elements from previous scenes to create continuity
    5. Maintain consistent art style, lighting approach, and color palette throughout
    6. Keep ALL visual descriptions under 200 words

    REMEMBER: Each visual description will be processed individually by an AI image generator with no knowledge 
    of other scenes or character names. They must work independently while creating visually consistent results.

    Example of a story:  
    Anaya loves to play in the park. Today, the sun is shining, and she can't wait to see her animal friends. As Anaya enters the park, she sees Benny the bunny hopping towards her. 'Hello, Benny!' she calls out.
    Benny the bunny hops over. 'Let's go to the swings!' Anaya says. Benny nods excitedly.Anaya and Benny take turns swinging high in the air. They laugh and giggle as they soar through the sky.
    Next, they head to the slide, where Fiona the fox is waiting. 'Hello, Fiona!' Anaya shouts.Anaya, Benny, and Fiona all slide down together. They laugh as they zoom down the slippery slide.
    Suddenly, Timmy the turtle arrives, carrying a picnic basket. 'Let's have a picnic!' he suggests.They all sit down on the blanket and enjoy a delicious picnic together. They share sandwiches and fruit.
    After the picnic, Anaya leads her friends to a magical fairy garden hidden behind the trees.In the fairy garden, they meet Luna the ladybug, who grants them a magical wish.
    Anaya wishes for everyone to always be happy and play together forever. Luna grants the wish with a twinkle.As the sun sets, Anaya and her friends say goodbye and promise to play together again tomorrow.
`;

    // Initialize Replicate for story generation
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
    
    const input = {
      prompt: prompt,
      max_tokens: 8192,
      system: system_prompt,
      temperature: 0.9,
    };
    
    // Consume tokens for story generation BEFORE API call
    // This ensures we don't charge if the API call fails
    const tokenConsumed = await user.consumeTokens(
      STORY_GENERATION_COST, 
      'story', 
      null, 
      `Story generation - ${storyType} type`
    );

    if (!tokenConsumed) {
      throw new Apierror(403, "Failed to process token deduction");
    }

    try {
      // Generate story content through Replicate/Claude API
      const output = await replicate.run(
        "anthropic/claude-3.7-sonnet",
        { input }
      );
      
      const fullResponse = output.join("");
      
      // Parse JSON response
      let generatedContent;
      const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        generatedContent = JSON.parse(jsonString);
      } else {
        throw new Error("No valid JSON found in response");
      }

      // Create a new story document
      const newStory = await Story.create({
        userId: user._id,
        title: generatedContent.title,
        storyType: storyType,
        introduction: generatedContent.introduction,
        conclusion: generatedContent.conclusion,
        characters: generatedContent.characters.map(character => ({
          name: character.name,
          type: character.type,
          description: character.description,
          visualReference: character.visualReference
        })),
        scenes: generatedContent.scenes.map((scene, index) => ({
          title: scene.title,
          text: scene.text,
          visualDescription: scene.visualDescription,
          imageUrl: null,
          order: index + 1
        })),
        storyStyleGuide: {
          artStyle: generatedContent.storyStyleGuide?.artStyle,
          colorPalette: generatedContent.storyStyleGuide?.colorPalette,
          lighting: generatedContent.storyStyleGuide?.lighting,
          cameraAngle: generatedContent.storyStyleGuide?.cameraAngle
        },
        coverPage: {
          title: generatedContent.title, // Use story title for cover page
          text: generatedContent.introduction, 
          visualDescription: generatedContent.coverPagescene?.visualDescription || null,
          imageUrl: null // Empty imageUrl field that will be filled later
        },
        // Add end page with empty imageUrl
        endPage: {
          title: "The End", // Default title for end page
          text: generatedContent.conclusion, 
          visualDescription: generatedContent.endPagescene?.visualDescription || null,
          imageUrl: null // Empty imageUrl field that will be filled later
        },
        status: 'draft',
        tokenTransaction: {
          initialGenerationCost: STORY_GENERATION_COST,
          initialSaveCost: 0, // Will be updated when story is saved
          totalTokensCost: STORY_GENERATION_COST,
          isInitialSave: true
        }
      });

      // Increment user's story count
      await user.trackStoryCreation(newStory._id);

      return res.status(200).json(
        new Apiresponse(
          200, 
          {
            story: generatedContent,
            storedStory: {
              _id: newStory._id,
              title: newStory.title,
              status: newStory.status
            },
            remainingTokens: user.tokens.balance
          }, 
          "Story generated successfully"
        )
      );
    } catch (error) {
      // If API call or story creation fails, refund the tokens
      console.error("Story generation error:", error);
      
      try {
        const refundResult = await user.addTokens(
          STORY_GENERATION_COST, 
          'Story generation failed'
        );
        console.log("Tokens refunded:", refundResult);
      } catch (refundError) {
        console.error("Failed to refund tokens:", refundError);
      }
      
      throw new Error("Failed to generate story: " + error.message);
    }

  } catch (error) {
    console.error("Story generation error:", error);
    return res.status(500).json(
      new Apiresponse(500, null, error.message || "Failed to generate story")
    );
  }
});

const getAllUserStories = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  
  try {
    // Find all stories for the user, sorted by most recent first
    const stories = await Story.find({ userId })
      .select("title storyType status createdAt lastEditedAt scenes characters")
      .sort({ createdAt: -1 });
    
    // Count total stories and calculate some basic stats
    const totalStories = stories.length;
    const storyTypeCounts = stories.reduce((acc, story) => {
      acc[story.storyType] = (acc[story.storyType] || 0) + 1;
      return acc;
    }, {});

    return res.status(200).json(
      new Apiresponse(
        200, 
        {
          stories,
          metadata: {
            totalStories,
            storyTypeCounts
          }
        }, 
        "Stories fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching user stories:", error);
    throw new Apierror(500, "Failed to fetch stories");
  }
});

const saveStory = asyncHandler(async (req, res) => {
  const { 
    story, 
    scenes, 
    storyId, // Optional for updates
    coverPage, // Try accessing these fields as well
    endPage
  } = req.body;

  // console.log('full cover page', coverPage);

  const coverPageImage = coverPage.imageUrl
  const endPageImage = endPage.imageUrl
  const coverPageVisualDescription = coverPage.visualDescription
  const endPageVisualDescription = endPage.visualDescription

  // console.log('Direct coverPageImage:', coverPageImage);
  
  const STORY_SAVE_TOKEN_COST = 2;
  const userId = req.user._id;

  try {
    // Find the user
    const user = await User.findById(userId);
    
    // Validate user exists
    if (!user) {
      throw new Apierror(404, "User not found");
    }

    // New Story Creation vs. Updating Existing Story
    if (!storyId) {
      // This is a completely new story (not from generateStoryPrompt)
      // Check tokens for initial save
      if (!user.hasEnoughTokens(STORY_SAVE_TOKEN_COST)) {
        throw new Apierror(403, "Insufficient tokens to save story");
      }

      // Consume tokens for save
      const tokenConsumed = await user.consumeTokens(
        STORY_SAVE_TOKEN_COST, 
        'story', 
        null, 
        'Initial story save'
      );

      if (!tokenConsumed) {
        throw new Apierror(500, "Failed to deduct tokens");
      }

      // Create new story
      const newStory = await Story.create({
        userId: user._id,
        title: story.title,
        storyType: story.storyType || 'custom',
        introduction: story.introduction,
        conclusion: story.conclusion,
        
        // Characters
        characters: story.characters ? story.characters.map(character => ({
          name: character.name,
          type: character.type || 'other',
          age: character.age,
          gender: character.gender,
          appearance: character.appearance,
          personality: character.personality,
          visualReference: {
            exactAppearance: character.visualReference?.exactAppearance
          }
        })) : [],

        // Scenes
        scenes: scenes.map((scene, index) => ({
          title: scene.title,
          text: scene.text,
          imageUrl: scene.image,
          visualDescription: scene.visualDescription,
          order: index + 1,
          generationMetadata: {
            generatedAt: new Date()
          }
        })),

        // Cover Page
        // coverPage: coverPageImage ? {
        //   imageUrl: coverPageImage,
        //   visualDescription: story.coverPageVisualDescription || story.coverPagescene?.visualDescription
        // } : existingStory.coverPage,

        coverPage: {
          title: story.title,
          text: story.introduction,
          visualDescription: coverPageVisualDescription || null,
          imageUrl: coverPageImage
        },

        // End Page
        // endPage: endPageImage ? {
        //   imageUrl: endPageImage,
        //   visualDescription: story.endPageVisualDescription || story.endPagescene?.visualDescription
        // } : existingStory.endPage,

        endPage: {
          title: "The End",
          text: story.conclusion,
          visualDescription: endPageVisualDescription,
          imageUrl: endPageImage
        },

        // Style Guide
        storyStyleGuide: story.storyStyleGuide ? {
          artStyle: story.storyStyleGuide.artStyle,
          colorPalette: story.storyStyleGuide.colorPalette,
          lighting: story.storyStyleGuide.lighting,
          cameraAngle: story.storyStyleGuide.cameraAngle
        } : null,

        // Token transaction tracking
        tokenTransaction: {
          initialGenerationCost: 0, // No generation cost for direct saves
          initialSaveCost: STORY_SAVE_TOKEN_COST,
          totalTokensCost: STORY_SAVE_TOKEN_COST,
          isInitialSave: false // Mark as saved
        },

        status: 'draft'
      });

      // Track story creation
      await user.trackStoryCreation(newStory._id);

      return res.status(201).json(
        new Apiresponse(
          201, 
          {
            story: {
              _id: newStory._id,
              title: newStory.title,
              status: newStory.status
            },
            remainingTokens: user.tokens.balance
          }, 
          "Story saved successfully"
        )
      );
    } else {
      // Existing Story Update
      const existingStory = await Story.findById(storyId);
      
      if (!existingStory) {
        throw new Apierror(404, "Story not found");
      }

      // Verify user ownership
      if (!existingStory.userId.equals(userId)) {
        throw new Apierror(403, "You do not have permission to modify this story");
      }

      // Check if this is the first save after generation (isInitialSave = true)
      if (existingStory.tokenTransaction.isInitialSave) {
        // Check tokens for save
        if (!user.hasEnoughTokens(STORY_SAVE_TOKEN_COST)) {
          throw new Apierror(403, "Insufficient tokens to save story");
        }

        // Consume tokens for save
        const tokenConsumed = await user.consumeTokens(
          STORY_SAVE_TOKEN_COST, 
          'story', 
          existingStory._id, 
          `Save story: ${existingStory.title}`
        );

        if (!tokenConsumed) {
          throw new Apierror(500, "Failed to deduct tokens");
        }

        // Update token transaction
        existingStory.tokenTransaction.initialSaveCost = STORY_SAVE_TOKEN_COST;
        existingStory.tokenTransaction.totalTokensCost = 
          existingStory.tokenTransaction.initialGenerationCost + STORY_SAVE_TOKEN_COST;
        existingStory.tokenTransaction.isInitialSave = false;
      }
      // For subsequent saves/updates, no tokens are deducted

      // Update story details
      existingStory.set({
        title: story.title,
        introduction: story.introduction,
        conclusion: story.conclusion,
        
        // Characters
        characters: story.characters ? story.characters.map(character => ({
          name: character.name,
          type: character.type || 'other',
          age: character.age,
          gender: character.gender,
          appearance: character.appearance,
          personality: character.personality,
          visualReference: {
            exactAppearance: character.visualReference?.exactAppearance
          }
        })) : existingStory.characters,

        // Scenes
        scenes: scenes.map((scene, index) => ({
          title: scene.title,
          text: scene.text,
          imageUrl: scene.image,
          visualDescription: scene.visualDescription,
          order: index + 1,
          generationMetadata: {
            generatedAt: new Date()
          }
        })),

        coverPage: {
          title: story.title,
          text: story.introduction,
          visualDescription: coverPageVisualDescription || null,
          imageUrl: coverPageImage
        },

        endPage: {
          title: "The End",
          text: story.conclusion,
          visualDescription: endPageVisualDescription,
          imageUrl: endPageImage
        },

        // Style Guide
        storyStyleGuide: story.storyStyleGuide ? {
          artStyle: story.storyStyleGuide.artStyle,
          colorPalette: story.storyStyleGuide.colorPalette,
          lighting: story.storyStyleGuide.lighting,
          cameraAngle: story.storyStyleGuide.cameraAngle
        } : existingStory.storyStyleGuide,
        
        // Update modification tracking
        lastEditedAt: new Date()
      });

      // Track modification in history
      if (existingStory.modificationHistory) {
        existingStory.modificationHistory.push({
          type: 'story_update',
          modifiedAt: new Date(),
          details: {
            previousValue: null,
            newValue: null
          }
        });
      }

      // Save the updated story
      await existingStory.save();

      return res.status(200).json(
        new Apiresponse(
          200, 
          {
            story: {
              _id: existingStory._id,
              title: existingStory.title,
              status: existingStory.status
            },
            remainingTokens: user.tokens.balance,
            tokenInfo: {
              initialSave: false,
              totalCost: existingStory.tokenTransaction.totalTokensCost
            }
          }, 
          existingStory.tokenTransaction.isInitialSave ? 
            "Story saved successfully with 2 tokens deducted" : 
            "Story updated successfully with no additional tokens deducted"
        )
      );
    }

  } catch (error) {
    console.error("Story save/update error:", error);

    // Handle potential token refund if initial save fails
    if (!storyId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          await user.addTokens(
            STORY_SAVE_TOKEN_COST, 
            'Story saving failed - refund'
          );
        }
      } catch (refundError) {
        console.error("Failed to refund tokens:", refundError);
      }
    }

    throw new Apierror(500, error.message || "Error processing story");
  }
});

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

 const getStoryById = asyncHandler(async (req, res) => {
  const { storyId } = req.params;
  const userId = req.user._id;
  
  try {
    // Validate the story ID (assuming you use mongoose)
    if (!mongoose.Types.ObjectId.isValid(storyId) || !storyId) {
      throw new Apierror(400, "Invalid story ID format");
    }
    
    // Find the story that belongs to the user
    const story = await Story.findOne({
      _id: storyId,
      userId
    });
    
    // If no story is found
    if (!story) {
      throw new Apierror(404, "Story not found or you don't have permission to access it");
    }
    
    return res.status(200).json(
      new Apiresponse(
        200,
        story,
        "Story fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    throw new Apierror(500, "Failed to fetch story");
  }
});


export {

  generateStoryPrompt,
  getAllUserStories,
  saveStory,
  generateSceneIllustration,
  getStoryById
  
};