// import mongoose, {Schema} from "mongoose";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';

// const userSchema = new Schema(
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
        
//         // Token management
//         tokens: {
//             balance: { 
//                 type: Number, 
//                 default: 10 // Starting tokens for new users (one-time allocation for free tier)
//             },
//             maxBalance: { 
//                 type: Number, 
//                 default: 50 // Maximum token balance based on tier
//             },
//             lastPurchaseDate: { 
//                 type: Date, 
//                 default: null // Will be set when subscription is purchased
//             }
//         },
        
//         // Token usage history
//         tokenHistory: [{
//             date: {
//                 type: Date,
//                 default: Date.now
//             },
//             amount: Number, // Positive for refills, negative for usage
//             operation: {
//                 type: String,
//                 enum: ['refill', 'usage', 'purchase', 'bonus'],
//                 required: true
//             },
//             description: String,
//             resourceType: {
//                 type: String,
//                 enum: ['story', 'image', 'system', 'other'],
//                 default: 'other'
//             },
//             resourceId: Schema.Types.ObjectId // Reference to the created resource if applicable
//         }],
        
//         // Subscription related fields
//         subscription: {
//             tier: {
//                 type: String,
//                 enum: ['free', 'basic', 'premium'],
//                 default: 'free'
//             },
//             status: {
//                 type: String,
//                 enum: ['active', 'expired', 'cancelled', 'trial', 'none'],
//                 default: 'active' // Default to active for simplicity
//             },
//             startDate: {
//                 type: Date,
//                 default: Date.now
//             },
//             expiryDate: {
//                 type: Date,
//                 default: () => {
//                     const now = new Date();
//                     // Default expiry 1 year from now
//                     return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
//                 }
//             },
//             customerId: String, // For payment gateway
//             paymentHistory: [{
//                 amount: Number,
//                 date: {
//                     type: Date,
//                     default: Date.now
//                 },
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
//             date: {
//                 type: Date,
//                 default: Date.now
//             },
//             ipAddress: String,
//             userAgent: String
//         }],
        
//         // Story metrics
//         storiesCreated: {
//             type: Number,
//             default: 0
//         },
        
//         // OAuth integration
//         googleId: {
//             type: String
//         },
//         facebookId: {
//             type: String
//         }
//     },
//     {timestamps: true}
// );

// // Set subscription tier limits when tier changes
// userSchema.pre("save", async function (next) {
//     // Hash password when modified
//     if (this.isModified("password")) {
//         try {
//             this.password = await bcrypt.hash(this.password, 10);
//         } catch (err) {
//             return next(err);
//         }
//     }
    
//     // Update token limits when subscription tier changes
//     if (this.isModified("subscription.tier")) {
//         switch (this.subscription.tier) {
//             case 'free':
//                 this.tokens.maxBalance = 50;
//                 break;
//             case 'pro':
//                 this.tokens.maxBalance = 200;
//                 // Don't add tokens here - will be done in the purchase handler
//                 break;
//             case 'business':
//                 this.tokens.maxBalance = 1000;
//                 // Don't add tokens here - will be done in the purchase handler
//                 break;
//         }
//     }
    
//     next();
// });

// // Check if user has enough tokens for an operation
// userSchema.methods.hasEnoughTokens = function(tokenCost) {
//     return this.tokens.balance >= tokenCost;
// };

// // Consume tokens for an operation
// userSchema.methods.consumeTokens = async function(tokenCost, resourceType, resourceId, description) {
//     if (!this.hasEnoughTokens(tokenCost)) {
//         return false;
//     }
    
//     // Reduce token balance
//     this.tokens.balance -= tokenCost;
    
//     // Record token usage
//     this.tokenHistory.push({
//         date: new Date(),
//         amount: -tokenCost,
//         operation: 'usage',
//         resourceType,
//         resourceId,
//         description: description || `Used ${tokenCost} tokens for ${resourceType}`
//     });
    
//     await this.save();
//     return true;
// };

// // Add tokens to user's balance (manually or through purchase)
// userSchema.methods.addTokens = async function(tokenAmount, description = 'Refund') {
//     // Calculate new balance
//     const newBalance = this.tokens.balance + tokenAmount;
    
//     // Add token history entry
//     this.tokenHistory.push({
//         date: new Date(),
//         amount: tokenAmount, // Positive amount
//         operation: 'refill', // Changed from 'refund' to match enum
//         description,
//         resourceType: 'system' // Default to system for refunds
//     });
    
//     // Update token balance
//     this.tokens.balance = newBalance;
    
//     await this.save();
//     return newBalance;
// };

// // Handle initial token allocation when upgrading from free to paid tier
// userSchema.methods.handleSubscriptionUpgrade = async function(previousTier, newTier) {
//     // If upgrading from free tier to any paid tier
//     if (previousTier === 'free' && (newTier === 'pro' || newTier === 'business')) {
//         // Determine initial allocation based on new tier
//         const initialAllocation = newTier === 'pro' ? 50 : 200;
        
//         // Add tokens without exceeding max balance
//         const newBalance = Math.min(this.tokens.balance + initialAllocation, this.tokens.maxBalance);
//         const actualAdded = newBalance - this.tokens.balance;
        
//         // Update token balance
//         this.tokens.balance = newBalance;
        
//         // Set refill dates
//         const now = new Date();
//         this.tokens.lastRefillDate = now;
//         this.tokens.nextRefillDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        
//         // Record token addition
//         this.tokenHistory.push({
//             date: now,
//             amount: actualAdded,
//             operation: 'bonus',
//             description: `Subscription upgrade bonus: ${actualAdded} tokens added`
//         });
        
//         return {
//             upgraded: true,
//             added: actualAdded,
//             newBalance: newBalance
//         };
//     }
    
//     return {
//         upgraded: false,
//         added: 0,
//         newBalance: this.tokens.balance
//     };
// };

// // Add tokens upon subscription purchase
// userSchema.methods.purchaseSubscription = async function(tier, transactionId, amount) {
//     // Store previous tier to check if this is an upgrade
//     const previousTier = this.subscription.tier;
    
//     // Update subscription details
//     this.subscription.tier = tier;
//     this.subscription.status = 'active';
//     this.subscription.startDate = new Date();
    
//     // Set expiry date to one month from now
//     const now = new Date();
//     this.subscription.expiryDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    
//     // Record payment
//     this.subscription.paymentHistory.push({
//         amount,
//         date: now,
//         description: `Subscription purchase: ${tier} tier`,
//         transactionId
//     });
    
//     // Determine token allocation based on tier
//     let tokenAllocation = 0;
//     switch (tier) {
//         case 'pro':
//             tokenAllocation = 50;
//             break;
//         case 'business':
//             tokenAllocation = 200;
//             break;
//         default:
//             tokenAllocation = 0;
//     }
    
//     // Add tokens without exceeding max balance
//     if (tokenAllocation > 0) {
//         const newBalance = Math.min(this.tokens.balance + tokenAllocation, this.tokens.maxBalance);
//         const actualAdded = newBalance - this.tokens.balance;
        
//         // Update token balance
//         this.tokens.balance = newBalance;
//         this.tokens.lastPurchaseDate = now;
        
//         // Record token addition
//         this.tokenHistory.push({
//             date: now,
//             amount: actualAdded,
//             operation: 'purchase',
//             description: `${tier} subscription tokens: ${actualAdded} tokens added`
//         });
//     }
    
//     await this.save();
    
//     return {
//         success: true,
//         previousTier,
//         newTier: tier,
//         tokensAdded: tokenAllocation,
//         newBalance: this.tokens.balance
//     };
// };

// // Purchase additional tokens separately from subscription
// userSchema.methods.purchaseTokens = async function(tokenAmount, transactionId, amount) {
//     // Calculate new balance considering maxBalance limit
//     const newBalance = Math.min(this.tokens.balance + tokenAmount, this.tokens.maxBalance);
//     const actualAdded = newBalance - this.tokens.balance;
    
//     if (actualAdded <= 0) {
//         return {
//             success: false,
//             message: "Token balance is already at maximum capacity for your subscription tier."
//         };
//     }
    
//     // Update token balance
//     this.tokens.balance = newBalance;
//     this.tokens.lastPurchaseDate = new Date();
    
//     // Record payment
//     this.subscription.paymentHistory.push({
//         amount,
//         date: new Date(),
//         description: `Token purchase: ${actualAdded} tokens`,
//         transactionId
//     });
    
//     // Record token addition
//     this.tokenHistory.push({
//         date: new Date(),
//         amount: actualAdded,
//         operation: 'purchase',
//         description: `Additional token purchase: ${actualAdded} tokens added`
//     });
    
//     await this.save();
    
//     return {
//         success: true,
//         added: actualAdded,
//         newBalance: newBalance,
//         maxReached: actualAdded < tokenAmount
//     };
// };

// // Track story creation
// userSchema.methods.trackStoryCreation = async function(storyId) {
//     this.storiesCreated += 1;
//     await this.save();
// };

// // Auth methods
// userSchema.methods.isPasswordCorrect = async function(password) {
//     return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.generateAccessToken = function() {
//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         subscription: {
//             tier: this.subscription.tier,
//             status: this.subscription.status
//         }
//     }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
// };

// userSchema.methods.generateRefreshToken = function() {
//     return jwt.sign({
//         _id: this._id,
//     }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
// };

// export const User = mongoose.model("User", userSchema);

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
        
        // Token management - simplified
        tokens: {
            balance: { 
                type: Number, 
                default: 10 // Starting tokens for new users (one-time allocation on registration)
            },
            maxBalance: { 
                type: Number, 
                default: 20 // Maximum token balance for free tier
            }
        },
        
        // Token usage history
        tokenHistory: [{
            date: {
                type: Date,
                default: Date.now
            },
            amount: Number, // Positive for additions, negative for usage
            operation: {
                type: String,
                enum: ['usage', 'purchase', 'bonus'],
                required: true
            },
            description: String,
            resourceType: {
                type: String,
                enum: ['story', 'system', 'other'],
                default: 'other'
            },
            resourceId: Schema.Types.ObjectId // Reference to the created resource if applicable
        }],
        
        // Subscription related fields
        subscription: {
            tier: {
                type: String,
                enum: ['free', 'basic', 'premium'],
                default: 'free'
            },
            status: {
                type: String,
                enum: ['active', 'expired', 'cancelled', 'trial', 'none'],
                default: 'active'
            },
            startDate: {
                type: Date,
                default: Date.now
            },
            expiryDate: {
                type: Date,
                default: () => {
                    const now = new Date();
                    // Default expiry 1 month from now
                    return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                }
            },
            previousTier: {
                type: String,
                enum: ['none', 'free', 'basic', 'premium'],
                default: 'none'
            },
            autoRenew: {
                type: Boolean,
                default: true
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
        
        // Story metrics - just track total count
        storiesCreated: {
            type: Number,
            default: 0
        },
        
        // Authentication related
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

// Pre-save hook for password hashing and setting max tokens based on tier
userSchema.pre("save", async function (next) {
    // Hash password when modified
    if (this.isModified("password")) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
            
        } catch (err) {
            return next(err);
        }
    }
    
    // Update max token balance when subscription tier changes
    if (this.isModified("subscription.tier")) {
        // Store previous tier for future reference
        if (this.subscription.tier !== this.previousTier && this.previousTier !== 'none') {
            this.subscription.previousTier = this.previousTier;
            
        }
        
        // Update max tokens based on tier
        switch (this.subscription.tier) {
            case 'free':
                this.tokens.maxBalance = 10;
                break;
            case 'basic':
                this.tokens.maxBalance = 50;
                break;
            case 'premium':
                this.tokens.maxBalance = 100;
                break;
        }
    }
    
    // If this is a brand new user (first creation), give 10 initial tokens
    // if (this.isNew) {
    //     this.tokens.balance = 10;
        
    //     // Record initial token grant
    //     this.tokenHistory.push({
    //         date: new Date(),
    //         amount: 10,
    //         operation: 'bonus',
    //         description: 'New user welcome tokens'
    //     });
    // }
    
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

// Add tokens to user's balance (for refunds or manual adjustments)
userSchema.methods.addTokens = async function(tokenAmount, description = 'Token adjustment') {
    // Calculate new balance without exceeding max
    const newBalance = Math.min(this.tokens.balance + tokenAmount, this.tokens.maxBalance);
    const actualAdded = newBalance - this.tokens.balance;
    
    // Add token history entry
    this.tokenHistory.push({
        date: new Date(),
        amount: actualAdded,
        operation: 'bonus',
        description,
        resourceType: 'system'
    });
    
    // Update token balance
    this.tokens.balance = newBalance;
    
    await this.save();
    return {
        success: true,
        added: actualAdded,
        newBalance
    };
};

// Process subscription purchase/upgrade/renewal
// userSchema.methods.purchaseSubscription = async function(tier, transactionId, amount) {
//     // Store previous tier
//     const previousTier = this.subscription.tier;
//     this.subscription.previousTier = previousTier;
    
//     // Determine the type of subscription change
//     const isEarlyRenewal = (tier === previousTier && 
//                           this.subscription.status === 'active' && 
//                           new Date() < this.subscription.expiryDate);
                          
//     const isTierUpgrade = (tier !== previousTier && 
//                          this.subscription.status === 'active' && 
//                          new Date() < this.subscription.expiryDate &&
//                          (
//                            (previousTier === 'free' && (tier === 'basic' || tier === 'premium')) ||
//                            (previousTier === 'basic' && tier === 'premium')
//                          ));
    
//     // Update subscription details
//     this.subscription.tier = tier;
//     this.subscription.status = 'active';
//     this.subscription.startDate = new Date();
    
//     // Set expiry date to one month from now
//     const now = new Date();
//     this.subscription.expiryDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    
//     // Record payment with appropriate description
//     let paymentDescription = "Subscription purchase";
//     if (isEarlyRenewal) {
//         paymentDescription = `Early renewal of ${tier} tier subscription`;
//     } else if (isTierUpgrade) {
//         paymentDescription = `Upgrade from ${previousTier} to ${tier} tier`;
//     } else {
//         paymentDescription = `New subscription: ${tier} tier`;
//     }
    
//     this.subscription.paymentHistory.push({
//         amount,
//         date: now,
//         description: paymentDescription,
//         transactionId
//     });
    
//     // Update max token balance and add tier-specific tokens
//     let tokensToAdd = 0;
    
//     switch (tier) {
//         case 'basic':
//             this.tokens.maxBalance = 50;
//             tokensToAdd = 40; // Add 40 tokens for basic tier
//             break;
//         case 'premium':
//             this.tokens.maxBalance = 100;
//             tokensToAdd = 80; // Add 80 tokens for premium tier
//             break;
//         default:
//             this.tokens.maxBalance = 20;
//             tokensToAdd = 0;
//     }
    
//     // FULL ALLOCATION APPROACH: No adjustment for tier upgrades - always give full token amount
//     // (Previous prorating code removed)
    
//     // Add tokens without exceeding max balance
//     if (tokensToAdd > 0) {
//         const newBalance = Math.min(this.tokens.balance + tokensToAdd, this.tokens.maxBalance);
//         const actualAdded = newBalance - this.tokens.balance;
        
//         // Only record history and update balance if tokens were actually added
//         if (actualAdded > 0) {
//             let tokenDescription = "";
//             if (isEarlyRenewal) {
//                 tokenDescription = `Early renewal ${tier} tier token refresh`;
//             } else if (isTierUpgrade) {
//                 tokenDescription = `Upgrade to ${tier} tier bonus tokens`;
//             } else {
//                 tokenDescription = `${tier} tier subscription bonus tokens`;
//             }
            
//             // Record token addition
//             this.tokenHistory.push({
//                 date: now,
//                 amount: actualAdded,
//                 operation: 'bonus',
//                 description: tokenDescription
//             });
            
//             // Update token balance
//             this.tokens.balance = newBalance;
//         }
//     }
    
//     await this.save();
    
//     return {
//         success: true,
//         tier,
//         transactionType: isEarlyRenewal ? 'early_renewal' : (isTierUpgrade ? 'tier_upgrade' : 'new_subscription'),
//         expiryDate: this.subscription.expiryDate,
//         tokensAdded: actualAdded || 0,
//         newBalance: this.tokens.balance
//     };
//   };

userSchema.methods.purchaseSubscription = async function(tier, transactionId, amount) {
    // Store previous tier
    const previousTier = this.subscription.tier;
    this.subscription.previousTier = previousTier;
    
    // Determine the type of subscription change
    const isEarlyRenewal = (tier === previousTier && 
                          this.subscription.status === 'active' && 
                          new Date() < this.subscription.expiryDate);
                          
    const isTierUpgrade = (tier !== previousTier && 
                         this.subscription.status === 'active' && 
                         new Date() < this.subscription.expiryDate &&
                         (
                           (previousTier === 'free' && (tier === 'basic' || tier === 'premium')) ||
                           (previousTier === 'basic' && tier === 'premium')
                         ));
    
    // Update subscription details
    this.subscription.tier = tier;
    this.subscription.status = 'active';
    this.subscription.startDate = new Date();
    
    // Set expiry date to one month from now
    const now = new Date();
    this.subscription.expiryDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    
    // Record payment with appropriate description
    let paymentDescription = "Subscription purchase";
    if (isEarlyRenewal) {
        paymentDescription = `Early renewal of ${tier} tier subscription`;
    } else if (isTierUpgrade) {
        paymentDescription = `Upgrade from ${previousTier} to ${tier} tier`;
    } else {
        paymentDescription = `New subscription: ${tier} tier`;
    }
    
    this.subscription.paymentHistory.push({
        amount,
        date: now,
        description: paymentDescription,
        transactionId
    });
    
    // Update max token balance and add tier-specific tokens
    let tokensToAdd = 0;
    
    switch (tier) {
        case 'basic':
            this.tokens.maxBalance = 50;
            tokensToAdd = 40; // Add 40 tokens for basic tier
            break;
        case 'premium':
            this.tokens.maxBalance = 100;
            tokensToAdd = 80; // Add 80 tokens for premium tier
            break;
        default:
            this.tokens.maxBalance = 20;
            tokensToAdd = 0;
    }
    
    // Initialize actualAdded here, outside the conditional block
    let actualAdded = 0;
    
    // Add tokens without exceeding max balance
    if (tokensToAdd > 0) {
        const newBalance = Math.min(this.tokens.balance + tokensToAdd, this.tokens.maxBalance);
        actualAdded = newBalance - this.tokens.balance;
        
        // Only record history and update balance if tokens were actually added
        if (actualAdded > 0) {
            let tokenDescription = "";
            if (isEarlyRenewal) {
                tokenDescription = `Early renewal ${tier} tier token refresh`;
            } else if (isTierUpgrade) {
                tokenDescription = `Upgrade to ${tier} tier bonus tokens`;
            } else {
                tokenDescription = `${tier} tier subscription bonus tokens`;
            }
            
            // Record token addition
            this.tokenHistory.push({
                date: now,
                amount: actualAdded,
                operation: 'bonus',
                description: tokenDescription
            });
            
            // Update token balance
            this.tokens.balance = newBalance;
        }
    }
    
    await this.save();
    
    return {
        success: true,
        tier,
        transactionType: isEarlyRenewal ? 'early_renewal' : (isTierUpgrade ? 'tier_upgrade' : 'new_subscription'),
        expiryDate: this.subscription.expiryDate,
        tokensAdded: actualAdded, // Now using the initialized variable
        newBalance: this.tokens.balance
    };
};

// Method to handle subscription expiration
userSchema.methods.checkSubscriptionStatus = async function() {
    const now = new Date();
    
    // Only check if status is active and we have an expiry date
    if (this.subscription.status === 'active' && this.subscription.expiryDate) {
        // Check if subscription has expired
        if (now > this.subscription.expiryDate) {
            // If auto-renew is disabled or renewal failed
            if (!this.subscription.autoRenew) {
                // Handle subscription expiration
                
                // 1. Update status to expired
                this.subscription.status = 'expired';
                
                // 2. Handle downgrade back to free tier
                if (this.subscription.tier !== 'free') {
                    this.subscription.previousTier = this.subscription.tier;
                    this.subscription.tier = 'free';
                    
                    // 3. Update max token balance
                    this.tokens.maxBalance = 10;
                    
                    // 4. If current token balance exceeds new max, adjust it
                    if (this.tokens.balance > this.tokens.maxBalance) {
                        // Record the adjustment in history
                        this.tokenHistory.push({
                            date: now,
                            amount: this.tokens.maxBalance - this.tokens.balance,
                            operation: 'usage',
                            description: 'Token adjustment due to subscription expiration',
                            resourceType: 'system'
                        });
                        
                        // Set balance to new max
                        this.tokens.balance = this.tokens.maxBalance;
                    }
                }
                
                await this.save();
                return {
                    status: 'expired',
                    message: 'Subscription has expired and been downgraded to free tier',
                    previousTier: this.subscription.previousTier
                };
            }
        }
    }
    
    return {
        status: this.subscription.status,
        tier: this.subscription.tier,
        expiryDate: this.subscription.expiryDate
    };
};

// Check if user can create a story based on token balance and subscription status
userSchema.methods.canCreateStory = async function(tokenCost = 5) {
    // // First check subscription status
    // await this.checkSubscriptionStatus();

    // Then check token balance
    return this.hasEnoughTokens(tokenCost);
};

// Track story creation
userSchema.methods.trackStoryCreation = async function(storyId) {
    // Only increment total stories created
    this.storiesCreated += 1;
    await this.save();
    return true;
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