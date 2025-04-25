import mongoose, { Schema } from "mongoose";

// Main Character Schema - Simplified
const characterSchema = new Schema(
  {
    // User who created the character
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    
    // Basic character information (from user input)
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female', 'Non-binary', 'Other']
    },
    
    // Original portrait uploaded by user
    originalPortrait: {
      url: {
        type: String,
        required: false
      },
      sizeMB: Number
    },
    
    // Generated character image from Leonardo AI
    characterImage: {
      url: {
        type: String
      },
      sizeMB: Number
    },
    
    // The prompt used to generate the character
    generatedPrompt: {
      type: String
    },
    
    // Generation settings used
    generationSettings: {
      model: String,
      style: String,
      aspectRatio: String
    },
    
    // Character status
    status: {
      type: String,
      enum: ['processing', 'ready', 'failed', 'deleted'],
      default: 'processing'
    }
  },
  { 
    timestamps: true
  }
);

// Index for finding a user's characters
characterSchema.index({ userId: 1, createdAt: -1 });

export const Character = mongoose.model("Character", characterSchema);