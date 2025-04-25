import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // URL to user's profile picture
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        
        // Character generation and tracking
        characters: [
            {
                type: Schema.Types.ObjectId,
                ref: "Character"
            }
        ],
        generationLimits: {
            maxCharacters: { 
                type: Number, 
                default: 3 // For free users. Pro/Business will be set higher
            },
            charactersThisPeriod: { 
                type: Number, 
                default: 0 
            },
            periodResetDate: { 
                type: Date, 
                default: () => { 
                    const now = new Date();
                    // Set to first day of next month
                    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
                }
            }
        },
        totalCharactersCreated: {
            type: Number,
            default: 0
        },
        
        // Storage tracking
        storage: {
            total: { type: Number, default: 0 }, // Total storage used in MB
            limit: { type: Number, default: 50 } // Storage limit in MB (will be higher for paid)
        },
        
        // Subscription related fields
        subscription: {
            tier: {
                type: String,
                enum: ['free', 'pro', 'business'],
                default: 'free'
            },
            status: {
                type: String,
                enum: ['active', 'expired', 'cancelled', 'trial', 'none'],
                default: 'none'
            },
            startDate: Date,
            expiryDate: Date,
            customerId: String, // For Stripe or other payment gateway
            paymentHistory: [{
                amount: Number,
                date: Date,
                description: String,
                transactionId: String
            }]
        },
        
        // Feature access flags based on subscription
        features: {
            advancedAnimations: { type: Boolean, default: false },
            customStyleOptions: { type: Boolean, default: false },
            exportFormats: {
                gif: { type: Boolean, default: true }, // All tiers get GIF
                mp4: { type: Boolean, default: false }, // Pro and Business
                webm: { type: Boolean, default: false } // Pro and Business
            },
            commercialUsage: { type: Boolean, default: false }, // Pro and Business
            noWatermark: { type: Boolean, default: false }, // Pro and Business
            apiAccess: { type: Boolean, default: false } // Business only
        },
        
        // Token management
        refreshToken: {
            type: String
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordTokenExpiry: {
            type: Date
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationTokenExpiry: {
            type: Date
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        
        // Analytics and user data
        lastLoginDate: Date,
        loginHistory: [{
            date: Date,
            ipAddress: String,
            userAgent: String
        }],
        favoriteAnimationStyle: {
            type: String,
            enum: ['cute', 'anime', 'comic', 'pixel'],
        },
        
        // OAuth integration
        googleId: {
            type: String
        },
        facebookId: {
            type: String
        }
    },
    {timestamps: true}
)

// Set subscription tier limits when tier changes
userSchema.pre("save", async function (next) {
    // Hash password
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            next();
        } catch (err) {
            return next(err);
        }
    }
    
    // Update limits when subscription tier changes
    if (this.isModified("subscription.tier")) {
        switch (this.subscription.tier) {
            case 'free':
                this.generationLimits.maxCharacters = 3;
                this.storage.limit = 50;
                this.features.advancedAnimations = false;
                this.features.customStyleOptions = false;
                this.features.exportFormats.mp4 = false;
                this.features.exportFormats.webm = false;
                this.features.commercialUsage = false;
                this.features.noWatermark = false;
                this.features.apiAccess = false;
                break;
            case 'pro':
                this.generationLimits.maxCharacters = 100; // Unlimited in UI but set a high number
                this.storage.limit = 1000; // 1GB
                this.features.advancedAnimations = true;
                this.features.customStyleOptions = true;
                this.features.exportFormats.mp4 = true;
                this.features.exportFormats.webm = true;
                this.features.commercialUsage = true;
                this.features.noWatermark = true;
                this.features.apiAccess = false;
                break;
            case 'business':
                this.generationLimits.maxCharacters = 500; // Effectively unlimited
                this.storage.limit = 5000; // 5GB
                this.features.advancedAnimations = true;
                this.features.customStyleOptions = true;
                this.features.exportFormats.mp4 = true;
                this.features.exportFormats.webm = true;
                this.features.commercialUsage = true;
                this.features.noWatermark = true;
                this.features.apiAccess = true;
                break;
        }
    }
    
    next();
});

// Method to check if user can create more characters
userSchema.methods.canCreateCharacter = function() {
    // Check if subscription is active
    if (this.subscription.status !== 'active' && this.subscription.status !== 'trial') {
        return false;
    }
    
    // Check if within generation limits for the period
    return this.generationLimits.charactersThisPeriod < this.generationLimits.maxCharacters;
}

// Method to track a new character creation
userSchema.methods.trackCharacterCreation = async function(characterSize = 1) {
    // Check if period needs to be reset
    const now = new Date();
    if (now > this.generationLimits.periodResetDate) {
        this.generationLimits.charactersThisPeriod = 0;
        this.generationLimits.periodResetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    
    // If user can create a character
    if (this.canCreateCharacter()) {
        this.generationLimits.charactersThisPeriod += 1;
        this.totalCharactersCreated += 1;
        this.storage.total += characterSize;
        await this.save();
        return true;
    }
    
    return false;
}

// Check if user has storage space available
userSchema.methods.hasStorageAvailable = function(sizeInMB) {
    return (this.storage.total + sizeInMB) <= this.storage.limit;
}

// Auth methods
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        subscription: {
            tier: this.subscription.tier,
            status: this.subscription.status
        },
        features: this.features
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema)