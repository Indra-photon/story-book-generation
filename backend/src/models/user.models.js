// import mongoose, {Schema} from "mongoose";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'

// const userSchema = new Schema (
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true,
//             index: true
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,
//             trim: true
//         },
//         fullname: {
//             type: String,
//             required: true,
//             trim: true,
//             index: true
//         },
//         avatar: {
//             type: String, // URL to user's profile picture
//         },
//         password: {
//             type: String,
//             required: [true, "Password is required"]
//         },
        
//         // Character generation and tracking
//         characters: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: "Character"
//             }
//         ],
//         generationLimits: {
//             maxCharacters: { 
//                 type: Number, 
//                 default: 3 // For free users. Pro/Business will be set higher
//             },
//             charactersThisPeriod: { 
//                 type: Number, 
//                 default: 0 
//             },
//             periodResetDate: { 
//                 type: Date, 
//                 default: () => { 
//                     const now = new Date();
//                     // Set to first day of next month
//                     return new Date(now.getFullYear(), now.getMonth() + 1, 1);
//                 }
//             }
//         },
        
//         // // Storage tracking
//         // storage: {
//         //     total: { type: Number, default: 0 }, // Total storage used in MB
//         //     limit: { type: Number, default: 50 } // Storage limit in MB (will be higher for paid)
//         // },
        
//         // Subscription related fields
//         subscription: {
//             tier: {
//                 type: String,
//                 enum: ['free', 'pro', 'business'],
//                 default: 'free'
//             },
//             status: {
//                 type: String,
//                 enum: ['active', 'expired', 'cancelled', 'trial', 'none'],
//                 default: 'none'
//             },
//             startDate: Date,
//             expiryDate: Date,
//             customerId: String, // For Stripe or other payment gateway
//             paymentHistory: [{
//                 amount: Number,
//                 date: Date,
//                 description: String,
//                 transactionId: String
//             }]
//         },
        
//         // Token management
//         refreshToken: {
//             type: String
//         },
//         forgotPasswordToken: {
//             type: String
//         },
//         forgotPasswordTokenExpiry: {
//             type: Date
//         },
//         emailVerificationToken: {
//             type: String
//         },
//         emailVerificationTokenExpiry: {
//             type: Date
//         },
//         isEmailVerified: {
//             type: Boolean,
//             default: false
//         },
        
//         // Analytics and user data
//         lastLoginDate: Date,
//         loginHistory: [{
//             date: Date,
//             ipAddress: String,
//             userAgent: String
//         }],
        
//         // OAuth integration
//         googleId: {
//             type: String
//         },
//         facebookId: {
//             type: String
//         }
//     },
//     {timestamps: true}
// )

// // Set subscription tier limits when tier changes
// userSchema.pre("save", async function (next) {
//     // Hash password
//     if (this.isModified("password")) {
//         try {
//             this.password = await bcrypt.hash(this.password, 10);
//             next();
//         } catch (err) {
//             return next(err);
//         }
//     }
    
//     // Update limits when subscription tier changes
//     if (this.isModified("subscription.tier")) {
//         switch (this.subscription.tier) {
//             case 'free':
//                 this.generationLimits.maxCharacters = 3;
//                 this.storage.limit = 50;
//                 this.features.advancedAnimations = false;
//                 this.features.customStyleOptions = false;
//                 this.features.exportFormats.mp4 = false;
//                 this.features.exportFormats.webm = false;
//                 this.features.commercialUsage = false;
//                 this.features.noWatermark = false;
//                 this.features.apiAccess = false;
//                 break;
//             case 'pro':
//                 this.generationLimits.maxCharacters = 100; // Unlimited in UI but set a high number
//                 this.storage.limit = 1000; // 1GB
//                 this.features.advancedAnimations = true;
//                 this.features.customStyleOptions = true;
//                 this.features.exportFormats.mp4 = true;
//                 this.features.exportFormats.webm = true;
//                 this.features.commercialUsage = true;
//                 this.features.noWatermark = true;
//                 this.features.apiAccess = false;
//                 break;
//             case 'business':
//                 this.generationLimits.maxCharacters = 500; // Effectively unlimited
//                 this.storage.limit = 5000; // 5GB
//                 this.features.advancedAnimations = true;
//                 this.features.customStyleOptions = true;
//                 this.features.exportFormats.mp4 = true;
//                 this.features.exportFormats.webm = true;
//                 this.features.commercialUsage = true;
//                 this.features.noWatermark = true;
//                 this.features.apiAccess = true;
//                 break;
//         }
//     }
    
//     next();
// });

// // Method to check if user can create more characters
// userSchema.methods.canCreateCharacter = function() {
//     // Check if subscription is active
//     if (this.subscription.status !== 'active' && this.subscription.status !== 'trial') {
//         return false;
//     }
    
//     // Check if within generation limits for the period
//     return this.generationLimits.charactersThisPeriod < this.generationLimits.maxCharacters;
// }

// // Method to track a new character creation
// userSchema.methods.trackCharacterCreation = async function(characterSize = 1) {
//     // Check if period needs to be reset
//     const now = new Date();
//     if (now > this.generationLimits.periodResetDate) {
//         this.generationLimits.charactersThisPeriod = 0;
//         this.generationLimits.periodResetDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//     }
    
//     // If user can create a character
//     if (this.canCreateCharacter()) {
//         this.generationLimits.charactersThisPeriod += 1;
//         this.totalCharactersCreated += 1;
//         this.storage.total += characterSize;
//         await this.save();
//         return true;
//     }
    
//     return false;
// }

// // Check if user has storage space available
// userSchema.methods.hasStorageAvailable = function(sizeInMB) {
//     return (this.storage.total + sizeInMB) <= this.storage.limit;
// }

// // Auth methods
// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password)
// }

// userSchema.methods.generateAccessToken = function (){
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         subscription: {
//             tier: this.subscription.tier,
//             status: this.subscription.status
//         },
//         features: this.features
//     }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
// }

// userSchema.methods.generateRefreshToken = function (){
//     return jwt.sign({
//         _id: this._id,
//     }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
// }

// export const User = mongoose.model("User", userSchema)





import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
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
        
        // Token management
        tokens: {
            balance: { 
                type: Number, 
                default: 10 // Starting tokens for new users (one-time allocation for free tier)
            },
            maxBalance: { 
                type: Number, 
                default: 50 // Maximum token balance based on tier
            },
            lastPurchaseDate: { 
                type: Date, 
                default: null // Will be set when subscription is purchased
            }
        },
        
        // Token usage history
        tokenHistory: [{
            date: {
                type: Date,
                default: Date.now
            },
            amount: Number, // Positive for refills, negative for usage
            operation: {
                type: String,
                enum: ['refill', 'usage', 'purchase', 'bonus'],
                required: true
            },
            description: String,
            resourceType: {
                type: String,
                enum: ['story', 'image', 'system', 'other'],
                default: 'other'
            },
            resourceId: Schema.Types.ObjectId // Reference to the created resource if applicable
        }],
        
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
                default: 'active' // Default to active for simplicity
            },
            startDate: {
                type: Date,
                default: Date.now
            },
            expiryDate: {
                type: Date,
                default: () => {
                    const now = new Date();
                    // Default expiry 1 year from now
                    return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                }
            },
            customerId: String, // For payment gateway
            paymentHistory: [{
                amount: Number,
                date: {
                    type: Date,
                    default: Date.now
                },
                description: String,
                transactionId: String
            }]
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
            date: {
                type: Date,
                default: Date.now
            },
            ipAddress: String,
            userAgent: String
        }],
        
        // Story metrics
        storiesCreated: {
            type: Number,
            default: 0
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
);

// Set subscription tier limits when tier changes
userSchema.pre("save", async function (next) {
    // Hash password when modified
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (err) {
            return next(err);
        }
    }
    
    // Update token limits when subscription tier changes
    if (this.isModified("subscription.tier")) {
        switch (this.subscription.tier) {
            case 'free':
                this.tokens.maxBalance = 50;
                break;
            case 'pro':
                this.tokens.maxBalance = 200;
                // Don't add tokens here - will be done in the purchase handler
                break;
            case 'business':
                this.tokens.maxBalance = 1000;
                // Don't add tokens here - will be done in the purchase handler
                break;
        }
    }
    
    next();
});

// Check if user has enough tokens for an operation
userSchema.methods.hasEnoughTokens = function(tokenCost) {
    return this.tokens.balance >= tokenCost;
};

// Consume tokens for an operation
userSchema.methods.consumeTokens = async function(tokenCost, resourceType, resourceId, description) {
    if (!this.hasEnoughTokens(tokenCost)) {
        return false;
    }
    
    // Reduce token balance
    this.tokens.balance -= tokenCost;
    
    // Record token usage
    this.tokenHistory.push({
        date: new Date(),
        amount: -tokenCost,
        operation: 'usage',
        resourceType,
        resourceId,
        description: description || `Used ${tokenCost} tokens for ${resourceType}`
    });
    
    await this.save();
    return true;
};

// Add tokens to user's balance (manually or through purchase)
userSchema.methods.addTokens = async function(tokenAmount, description = 'Refund') {
    // Calculate new balance
    const newBalance = this.tokens.balance + tokenAmount;
    
    // Add token history entry
    this.tokenHistory.push({
        date: new Date(),
        amount: tokenAmount, // Positive amount
        operation: 'refill', // Changed from 'refund' to match enum
        description,
        resourceType: 'system' // Default to system for refunds
    });
    
    // Update token balance
    this.tokens.balance = newBalance;
    
    await this.save();
    return newBalance;
};

// Handle initial token allocation when upgrading from free to paid tier
userSchema.methods.handleSubscriptionUpgrade = async function(previousTier, newTier) {
    // If upgrading from free tier to any paid tier
    if (previousTier === 'free' && (newTier === 'pro' || newTier === 'business')) {
        // Determine initial allocation based on new tier
        const initialAllocation = newTier === 'pro' ? 50 : 200;
        
        // Add tokens without exceeding max balance
        const newBalance = Math.min(this.tokens.balance + initialAllocation, this.tokens.maxBalance);
        const actualAdded = newBalance - this.tokens.balance;
        
        // Update token balance
        this.tokens.balance = newBalance;
        
        // Set refill dates
        const now = new Date();
        this.tokens.lastRefillDate = now;
        this.tokens.nextRefillDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        
        // Record token addition
        this.tokenHistory.push({
            date: now,
            amount: actualAdded,
            operation: 'bonus',
            description: `Subscription upgrade bonus: ${actualAdded} tokens added`
        });
        
        return {
            upgraded: true,
            added: actualAdded,
            newBalance: newBalance
        };
    }
    
    return {
        upgraded: false,
        added: 0,
        newBalance: this.tokens.balance
    };
};

// Add tokens upon subscription purchase
userSchema.methods.purchaseSubscription = async function(tier, transactionId, amount) {
    // Store previous tier to check if this is an upgrade
    const previousTier = this.subscription.tier;
    
    // Update subscription details
    this.subscription.tier = tier;
    this.subscription.status = 'active';
    this.subscription.startDate = new Date();
    
    // Set expiry date to one month from now
    const now = new Date();
    this.subscription.expiryDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    
    // Record payment
    this.subscription.paymentHistory.push({
        amount,
        date: now,
        description: `Subscription purchase: ${tier} tier`,
        transactionId
    });
    
    // Determine token allocation based on tier
    let tokenAllocation = 0;
    switch (tier) {
        case 'pro':
            tokenAllocation = 50;
            break;
        case 'business':
            tokenAllocation = 200;
            break;
        default:
            tokenAllocation = 0;
    }
    
    // Add tokens without exceeding max balance
    if (tokenAllocation > 0) {
        const newBalance = Math.min(this.tokens.balance + tokenAllocation, this.tokens.maxBalance);
        const actualAdded = newBalance - this.tokens.balance;
        
        // Update token balance
        this.tokens.balance = newBalance;
        this.tokens.lastPurchaseDate = now;
        
        // Record token addition
        this.tokenHistory.push({
            date: now,
            amount: actualAdded,
            operation: 'purchase',
            description: `${tier} subscription tokens: ${actualAdded} tokens added`
        });
    }
    
    await this.save();
    
    return {
        success: true,
        previousTier,
        newTier: tier,
        tokensAdded: tokenAllocation,
        newBalance: this.tokens.balance
    };
};

// Purchase additional tokens separately from subscription
userSchema.methods.purchaseTokens = async function(tokenAmount, transactionId, amount) {
    // Calculate new balance considering maxBalance limit
    const newBalance = Math.min(this.tokens.balance + tokenAmount, this.tokens.maxBalance);
    const actualAdded = newBalance - this.tokens.balance;
    
    if (actualAdded <= 0) {
        return {
            success: false,
            message: "Token balance is already at maximum capacity for your subscription tier."
        };
    }
    
    // Update token balance
    this.tokens.balance = newBalance;
    this.tokens.lastPurchaseDate = new Date();
    
    // Record payment
    this.subscription.paymentHistory.push({
        amount,
        date: new Date(),
        description: `Token purchase: ${actualAdded} tokens`,
        transactionId
    });
    
    // Record token addition
    this.tokenHistory.push({
        date: new Date(),
        amount: actualAdded,
        operation: 'purchase',
        description: `Additional token purchase: ${actualAdded} tokens added`
    });
    
    await this.save();
    
    return {
        success: true,
        added: actualAdded,
        newBalance: newBalance,
        maxReached: actualAdded < tokenAmount
    };
};

// Track story creation
userSchema.methods.trackStoryCreation = async function(storyId) {
    this.storiesCreated += 1;
    await this.save();
};

// Auth methods
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        subscription: {
            tier: this.subscription.tier,
            status: this.subscription.status
        }
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
};

export const User = mongoose.model("User", userSchema);