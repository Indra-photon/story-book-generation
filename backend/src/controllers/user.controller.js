import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { User } from "../models/user.models.js";
import { Character } from "../models/character.models.js"; // You'll need to create this model
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendEmail } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";

// Helper function to generate tokens
const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};
    } catch (error) {
        throw new Apierror(500, "Something went wrong while generating tokens");
    }
};

// User registration
const registerUser = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const {username, email, fullname, password} = req.body;
    // console.log(`username: ${fullname}, email: ${email}, username: ${username}, password: ${password}`);
    
    if ([username, email, fullname, password].some((field) => field?.trim() === "")) {
        throw new Apierror(400, "All fields are required");
    }

    if (email === undefined) {
        throw new Apierror(400, "email are undefined");
    }

    if (fullname === undefined) {
        throw new Apierror(400, "fullname are undefined");
    }

    if (username === undefined) {
        throw new Apierror(400, "username are undefined");
    }

    if (password === undefined) {
        throw new Apierror(400, "password are undefined");
    }

    // Validate email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     throw new Apierror(400, "Invalid email format");
    // }
    
    // Validate password strength
    // if (password.length < 8) {
    //     throw new Apierror(400, "Password must be at least 8 characters long");
    // }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    
    if (existedUser) {
        throw new Apierror(409, "User with email or username already exists");
    }

    // Handle avatar upload if present
    let avatarUrl = "";
    if (req.files && req.files.avatar) {
        const avatarLocalPath = req.files.avatar[0].path;
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (avatar) {
            avatarUrl = avatar.url;
        }
    }

    // Create user with free tier defaults
    const user = await User.create({
        fullname,
        avatar: avatarUrl,
        email,
        password,
        username: username.toLowerCase(),
        subscription: {
            tier: 'free',
            status: 'active',
            startDate: new Date()
        },
        generationLimits: {
            maxCharacters: 3,
            charactersThisPeriod: 0,
            periodResetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
        },
        features: {
            advancedAnimations: false,
            customStyleOptions: false,
            exportFormats: {
                gif: true,
                mp4: false,
                webm: false
            },
            commercialUsage: false,
            noWatermark: false,
            apiAccess: false
        }
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new Apierror(500, "Something went wrong while registering the user");
    }

    // Send verification email
    // try {
    //     await sendEmail({
    //         email: user.email,
    //         emailType: "VERIFY",
    //         userId: user._id
    //     });
    // } catch (error) {
    //     console.log("Error sending verification email:", error);
    //     // Continue registration process even if email fails
    // }

    return res.status(201).json(
        new Apiresponse(201, createdUser, "User registered successfully")
    );
});

// User login
const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body;

    if (!email) {
        throw new Apierror(400, "Email is required");
    }
    
    const user = await User.findOne({
        $or: [{email}]
    });

    if (!user) {
        throw new Apierror(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new Apierror(401, "Invalid user credentials");
    }

    // Update lastLoginDate
    user.lastLoginDate = new Date();
    await user.save({ validateBeforeSave: false });

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new Apiresponse(
                200, 
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

// Logout user
const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new Apiresponse(200, {}, "User logged out"));
});

// Refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new Apierror(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    
        const user = await User.findById(decodedToken?._id);
    
        if (!user) {
            throw new Apierror(401, "Invalid refresh token");
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new Apierror(401, "Refresh token is expired or used");
        }
    
        const options = {
            httpOnly: true,
            secure: true
        };
    
        const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new Apiresponse(
                    200, 
                    {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new Apierror(401, error?.message || "Invalid refresh token");
    }
});

// Get current user
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
        .status(200)
        .json(new Apiresponse(
            200,
            req.user,
            "User fetched successfully"
        ));
});

// Update account details
const updateAccountDetails = asyncHandler(async(req, res) => {
    const {username, email, fullName} = req.body;

    if (!fullName && !email && !username) {
        throw new Apierror(400, "At least one field is required for update");
    }

    const updateFields = {};
    if (fullName) updateFields.fullName = fullName;
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: updateFields
        },
        {new: true}
    ).select("-password");

    return res
        .status(200)
        .json(new Apiresponse(200, user, "Account details updated successfully"));
});

// Update avatar
const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path;
    
    if (!avatarLocalPath) {
        throw new Apierror(400, "Avatar file is missing");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    
    if (!avatar?.url) {
        throw new Apierror(400, "Error while uploading avatar");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password");

    return res
        .status(200)
        .json(
            new Apiresponse(200, user, "Avatar image updated successfully")
        );
});

// Character creation
const createCharacter = asyncHandler(async(req, res) => {
    const {name, animationStyle} = req.body;
    
    // Check if user can create a character
    if (!req.user.canCreateCharacter()) {
        throw new Apierror(403, "You've reached your character creation limit. Please upgrade your subscription.");
    }
    
    // Check if portrait was uploaded
    if (!req.file?.path) {
        throw new Apierror(400, "Portrait image is required");
    }
    
    // Upload portrait to Cloudinary
    const portrait = await uploadOnCloudinary(req.file.path);
    if (!portrait?.url) {
        throw new Apierror(400, "Error uploading portrait image");
    }
    
    // Generate character (placeholder for AI processing)
    // In a real implementation, you would call Leonardo AI here
    // For now, we'll just use the same image as a placeholder
    const characterImage = portrait.url;
    
    // Estimate file size (this would be more accurate in a real implementation)
    const estimatedSizeMB = 1.5; // Placeholder value
    
    // Check if user has enough storage
    if (!req.user.hasStorageAvailable(estimatedSizeMB)) {
        throw new Apierror(403, "You've reached your storage limit. Please upgrade your subscription or delete existing characters.");
    }
    
    // Create character record
    const character = await Character.create({
        name: name || "My Character",
        userId: req.user._id,
        originalPortrait: portrait.url,
        characterImage: characterImage,
        animationStyle: animationStyle || "cute",
        sizeMB: estimatedSizeMB,
        animationSettings: {
            animations: ["wave"], // Default animation
            isAnimated: false
        }
    });
    
    // Update user's character tracking
    await req.user.trackCharacterCreation(estimatedSizeMB);
    
    // Add character to user's collection
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: { characters: character._id }
        }
    );
    
    return res
        .status(201)
        .json(
            new Apiresponse(201, character, "Character created successfully")
        );
});

// Apply animation to character
const animateCharacter = asyncHandler(async(req, res) => {
    const {characterId, animationType} = req.body;
    
    if (!characterId || !animationType) {
        throw new Apierror(400, "Character ID and animation type are required");
    }
    
    // Find character and check ownership
    const character = await Character.findById(characterId);
    
    if (!character) {
        throw new Apierror(404, "Character not found");
    }
    
    if (character.userId.toString() !== req.user._id.toString()) {
        throw new Apierror(403, "You don't have permission to animate this character");
    }
    
    // Check if user has permission to use this animation type
    if (animationType !== "wave" && !req.user.features.advancedAnimations) {
        throw new Apierror(403, "This animation type requires a Pro or Business subscription");
    }
    
    // Apply animation (placeholder for Kling AI integration)
    // In a real implementation, you would call Kling AI here
    
    // Update character with animation settings
    character.animationSettings.animations.push(animationType);
    character.animationSettings.isAnimated = true;
    await character.save();
    
    return res
        .status(200)
        .json(
            new Apiresponse(200, character, "Animation applied successfully")
        );
});

// Get user's characters
const getUserCharacters = asyncHandler(async(req, res) => {
    const characters = await Character.find({userId: req.user._id})
        .sort({createdAt: -1});
    
    return res
        .status(200)
        .json(
            new Apiresponse(200, characters, "Characters fetched successfully")
        );
});

// Delete character
const deleteCharacter = asyncHandler(async(req, res) => {
    const {characterId} = req.params;
    
    const character = await Character.findById(characterId);
    
    if (!character) {
        throw new Apierror(404, "Character not found");
    }
    
    if (character.userId.toString() !== req.user._id.toString()) {
        throw new Apierror(403, "You don't have permission to delete this character");
    }
    
    // Remove from Cloudinary (implement this separately)
    // For now, just delete the database record
    
    // Update user's storage used
    req.user.storage.total -= character.sizeMB;
    await req.user.save();
    
    // Remove character from database
    await character.deleteOne();
    
    // Remove from user's characters array
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { characters: characterId }
        }
    );
    
    return res
        .status(200)
        .json(
            new Apiresponse(200, {}, "Character deleted successfully")
        );
});

// Upgrade subscription
const upgradeSubscription = asyncHandler(async(req, res) => {
    const {tier, paymentId} = req.body;
    
    if (!tier || !["pro", "business"].includes(tier)) {
        throw new Apierror(400, "Valid subscription tier is required");
    }
    
    if (!paymentId) {
        throw new Apierror(400, "Payment ID is required");
    }
    
    // Process payment (implement payment gateway integration separately)
    // Placeholder for payment verification
    const paymentVerified = true;
    
    if (!paymentVerified) {
        throw new Apierror(400, "Payment verification failed");
    }
    
    // Calculate subscription expiry (1 year from now)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    // Update user subscription
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                "subscription.tier": tier,
                "subscription.status": "active",
                "subscription.startDate": new Date(),
                "subscription.expiryDate": expiryDate,
                "subscription.customerId": paymentId
            }
        },
        {new: true}
    ).select("-password -refreshToken");
    
    // The pre-save hook will update feature flags and limits automatically
    
    return res
        .status(200)
        .json(
            new Apiresponse(200, user, `Subscription upgraded to ${tier} successfully`)
        );
});

// Request password reset
const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new Apierror(400, "Email is required");
    }

    // Find user and validate
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
        // Security: Still send success response even if email doesn't exist
        return res.status(200).json(
            new Apiresponse(200, {}, "If your email is registered, you will receive a reset link")
        );
    }

    try {
        await sendEmail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });

        return res.status(200).json(
            new Apiresponse(200, {}, "Password reset link sent successfully")
        );
    } catch (error) {
        console.log(error);
        
        throw new Apierror(500, "Error sending reset email. Please try again.");
    }
});

// Reset password
const resetForgotPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        throw new Apierror(400, "All fields are required");
    }

    // Find user with non-expired token
    const users = await User.find({
        forgotPasswordTokenExpiry: { $gt: Date.now() }
    });

    // Find matching token
    let userFound = null;
    for (const user of users) {
        const isValidToken = await bcrypt.compare(token, user.forgotPasswordToken);
        if (isValidToken) {
            userFound = user;
            break;
        }
    }

    if (!userFound) {
        throw new Apierror(400, "Invalid or expired reset token");
    }

    // Update password
    userFound.password = newPassword;
    userFound.forgotPasswordToken = undefined;
    userFound.forgotPasswordTokenExpiry = undefined;

    await userFound.save();

    return res.status(200).json(
        new Apiresponse(200, {}, "Password reset successful")
    );
});

// Verify email
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;
    
    if (!token) {
        throw new Apierror(400, "Token is required");
    }
    
    // Find users with non-expired verification tokens
    const users = await User.find({
        emailVerificationTokenExpiry: { $gt: Date.now() }
    });
    
    // Find user with matching token
    let userFound = null;
    for (const user of users) {
        const isValidToken = await bcrypt.compare(token, user.emailVerificationToken);
        if (isValidToken) {
            userFound = user;
            break;
        }
    }
    
    if (!userFound) {
        throw new Apierror(400, "Invalid or expired verification token");
    }
    
    // Update user verification status
    userFound.isEmailVerified = true;
    userFound.emailVerificationToken = undefined;
    userFound.emailVerificationTokenExpiry = undefined;
    
    await userFound.save();
    
    return res.status(200).json(
        new Apiresponse(200, {}, "Email verified successfully")
    );
});

// Export controllers
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    createCharacter,
    animateCharacter,
    getUserCharacters,
    deleteCharacter,
    upgradeSubscription,
    requestPasswordReset,
    resetForgotPassword,
    verifyEmail
};