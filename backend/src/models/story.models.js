import mongoose, { Schema } from "mongoose";

// Scene Schema to represent individual scenes within the story
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
    imageUrl: {
      type: String,
      default: null // URL to the scene's illustration
    },
    order: {
      type: Number,
      required: true // Scene position in the story sequence
    }
  },
  { timestamps: true }
);

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
      enum: ['hero', 'friend', 'pet', 'mentor', 'magical', 'other'],
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
    }
  },
  { timestamps: false }
);

// Main Story Schema
const storySchema = new Schema(
  {
    // User who created the story
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    
    // Story basic information
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    
    // Story metadata
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
    
    theme: {
      type: String,
      default: null
    },
    
    // Story content
    introduction: {
      type: String,
      required: true
    },
    
    conclusion: {
      type: String,
      default: null
    },
    
    // Characters in the story
    characters: [characterSchema],
    
    // Scenes in the story
    scenes: [sceneSchema],
    
    // Story status
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    
    // Storage and sharing settings
    isPublic: {
      type: Boolean,
      default: false
    },
    
    sharedWith: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    
    // For tracking most recent edits/views
    lastEditedAt: {
      type: Date,
      default: Date.now
    },
    
    viewCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Indexes for efficient querying
storySchema.index({ userId: 1, createdAt: -1 });
storySchema.index({ isPublic: 1, viewCount: -1 });

// Pre-save hook to update lastEditedAt on save
storySchema.pre("save", function(next) {
  this.lastEditedAt = Date.now();
  next();
});

// Method to check if user has access to the story
storySchema.methods.isAccessibleBy = function(user) {
  // If the user is the owner
  if (user._id.equals(this.userId)) return true;
  
  // If the story is public
  if (this.isPublic) return true;
  
  // If the user is in the sharedWith list
  return this.sharedWith.some(sharedUserId => 
    sharedUserId.equals(user._id)
  );
};

// Method to increment view count
storySchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  await this.save();
  return this.viewCount;
};

export const Story = mongoose.model("Story", storySchema);