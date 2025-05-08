// import mongoose, { Schema } from "mongoose";

// // Scene Schema to represent individual scenes within the story
// const sceneSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     text: {
//       type: String, 
//       required: true
//     },
//     visualDescription: {
//       type: String,
//       default: null // Stores the exact prompt used for image generation
//     },
//     imageUrl: {
//       type: String,
//       default: null // URL to the scene's illustration
//     },
//     order: {
//       type: Number,
//       required: true // Scene position in the story sequence
//     },
//     generationMetadata: {
//       seed: Number,
//       width: Number,
//       height: Number,
//       model: String,
//       stylePreset: String,
//       generatedAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   },
//   { timestamps: true }
// );

// // Character Schema for characters that appear in the story
// const characterSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     age: {
//       type: String,
//       default: null
//     },
//     gender: {
//       type: String,
//       default: null
//     },
//     type: {
//       type: String,
//       enum: ['hero', 'friend', 'pet', 'mentor', 'magical', 'other'],
//       default: 'other'
//     },
//     appearance: {
//       type: String,
//       default: null
//     },
//     personality: {
//       type: String,
//       default: null
//     },
//     isUserChild: {
//       type: Boolean,
//       default: false // Flag to indicate if this character represents the user's child
//     },
//     imageUrl: {
//       type: String,
//       default: null // URL to the character's image/avatar
//     },
//     visualReference: {
//       exactAppearance: {
//         type: String,
//         default: null // Detailed appearance description for consistency
//       }
//     }
//   },
//   { timestamps: false }
// );

// // Page Schema for cover and end pages
// const pageSchema = new Schema(
//   {
//     title: {
//       type: String,
//       default: null
//     },
//     text: {
//       type: String,
//       default: null
//     },
//     visualDescription: {
//       type: String,
//       default: null // Stores the exact prompt used for image generation
//     },
//     imageUrl: {
//       type: String,
//       default: null // URL to the page illustration
//     },
//     generationMetadata: {
//       seed: Number,
//       width: Number,
//       height: Number,
//       model: String,
//       stylePreset: String,
//       generatedAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   },
//   { timestamps: false }
// );

// // Style Guide Schema
// const styleGuideSchema = new Schema(
//   {
//     artStyle: {
//       type: String,
//       default: null
//     },
//     colorPalette: {
//       type: String,
//       default: null
//     },
//     lighting: {
//       type: String,
//       default: null
//     },
//     cameraAngle: {
//       type: String,
//       default: null
//     }
//   },
//   { timestamps: false }
// );

// // Main Story Schema
// const storySchema = new Schema(
//   {
//     // User who created the story
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true
//     },
    
//     // Story basic information
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true
//     },
    
//     // Story metadata
//     storyType: {
//       type: String,
//       required: true,
//       enum: ['adventure', 'educational', 'fantasy', 'bedtime', 'fable', 'nature', 'custom'],
//       default: 'adventure'
//     },
    
//     ageGroup: {
//       type: String,
//       enum: ['0-3', '3-6', '6-9', '9-12'],
//       default: '3-6'
//     },
    
//     theme: {
//       type: String,
//       default: null
//     },
    
//     // Token usage tracking
//     tokensUsed: {
//       type: Number,
//       default: 5 // Default cost of a story
//     },
    
//     // Story content
//     introduction: {
//       type: String,
//       required: true
//     },
    
//     conclusion: {
//       type: String,
//       default: null
//     },
    
//     // Style guide for the story
//     storyStyleGuide: styleGuideSchema,
    
//     // Cover and end pages
//     coverPage: pageSchema,
//     endPage: pageSchema,
    
//     // Characters in the story
//     characters: [characterSchema],
    
//     // Scenes in the story
//     scenes: [sceneSchema],
    
//     // Generation metadata
//     generationPrompt: {
//       type: String,
//       default: null // The prompt used to generate the story
//     },
    
//     generationParameters: {
//       model: String,
//       temperature: Number,
//       maxTokens: Number,
//       generatedAt: {
//         type: Date,
//         default: Date.now
//       }
//     },
    
//     // Story status
//     status: {
//       type: String,
//       enum: ['draft', 'published', 'archived'],
//       default: 'draft'
//     },
    
//     // For tracking most recent edits/views
//     lastEditedAt: {
//       type: Date,
//       default: Date.now
//     },
//   },
//   { timestamps: true }
// );

// // Indexes for efficient querying
// storySchema.index({ userId: 1, createdAt: -1 });

// // Pre-save hook to update lastEditedAt on save
// storySchema.pre("save", function(next) {
//   this.lastEditedAt = Date.now();
//   next();
// });

// export const Story = mongoose.model("Story", storySchema);


import mongoose, { Schema } from "mongoose";

// Scene Schema (unchanged)
const sceneSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String, 
      required: true
    },
    visualDescription: {
      type: String,
      default: null
    },
    imageUrl: {
      type: String,
      default: null
    },
    order: {
      type: Number,
      required: true
    },
    generationMetadata: {
      seed: Number,
      width: Number,
      height: Number,
      model: String,
      stylePreset: String,
      generatedAt: {
        type: Date,
        default: Date.now
      }
    }
  },
  { timestamps: true }
);

// Modification History Schema
const modificationHistorySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  details: {
    sceneId: Schema.Types.ObjectId, // If scene-specific
    previousValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  }
});

// Character Schema for characters that appear in the story
const characterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: String,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'other'
    },
    appearance: {
      type: String,
      default: null
    },
    personality: {
      type: String,
      default: null
    },
    isUserChild: {
      type: Boolean,
      default: false // Flag to indicate if this character represents the user's child
    },
    imageUrl: {
      type: String,
      default: null // URL to the character's image/avatar
    },
    visualReference: {
      exactAppearance: {
        type: String,
        default: null // Detailed appearance description for consistency
      }
    }
  },
  { timestamps: false }
);

// Page Schema for cover and end pages
const pageSchema = new Schema(
  {
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    visualDescription: {
      type: String,
      default: null // Stores the exact prompt used for image generation
    },
    imageUrl: {
      type: String,
      default: null // URL to the page illustration
    },
    generationMetadata: {
      seed: Number,
      width: Number,
      height: Number,
      model: String,
      stylePreset: String,
      generatedAt: {
        type: Date,
        default: Date.now
      }
    }
  },
  { timestamps: false }
);

// Style Guide Schema
const styleGuideSchema = new Schema(
  {
    artStyle: {
      type: String,
      default: null
    },
    colorPalette: {
      type: String,
      default: null
    },
    lighting: {
      type: String,
      default: null
    },
    cameraAngle: {
      type: String,
      default: null
    }
  },
  { timestamps: false }
);

// Main Story Schema
const storySchema = new Schema(
  {
    // User Relationship
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    
    // Story Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    
    // Story Metadata
    storyType: {
      type: String,
      required: true,
      enum: ['adventure', 'educational', 'fantasy', 'bedtime', 'fable', 'nature', 'custom'],
      default: 'adventure'
    },
    
    ageGroup: {
      type: String,
      enum: ['0-3', '3-6', '6-9', '9-12'],
      default: '3-6'
    },
    
    // Token Tracking
    tokenTransaction: {
      initialGenerationCost: {
        type: Number,
        default: 5
      },
      initialSaveCost: {
        type: Number,
        default: 2
      },
      totalTokensCost: {
        type: Number,
        default: 7
      },
      isInitialSave: {
        type: Boolean,
        default: true
      }
    },
    
    // Story Content
    introduction: {
      type: String,
      required: true
    },
    
    conclusion: {
      type: String,
      default: null
    },
    
    // Story Components
    characters: [characterSchema],
    scenes: [sceneSchema],
    coverPage: pageSchema,
    endPage: pageSchema,
    
    // Modification Tracking
    modificationHistory: [modificationHistorySchema],
    
    // Status Management
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    
    // Sharing and Visibility
    isPublic: {
      type: Boolean,
      default: false
    },
    
    // Tracking
    lastEditedAt: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);

// Pre-save hook to update lastEditedAt
storySchema.pre("save", function(next) {
  this.lastEditedAt = Date.now();
  next();
});

// Method to track modifications
storySchema.methods.trackModification = function(type, details) {
  this.modificationHistory.push({
    type,
    details
  });
};

export const Story = mongoose.model("Story", storySchema);