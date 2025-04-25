import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { 
  generateCharacterPrompt,
  generateCharacterImage,
  saveCharacterImage,
  animateCharacterImage,
  generateCharacterImageIdeogram,
  generateCharacterImageRecraft
} from '../controllers/character.controller.js';
import { upload } from '../middlewares/multur.middlewares.js';

const router = Router();

// All character routes require authentication
router.use(verifyJWT);

router.post('/generate-prompt', 
  verifyJWT,
  upload.single('portrait'), // This middleware parses the multipart form data
  generateCharacterPrompt
);

router.post(
  '/generate-image',
  generateCharacterImage
);

router.post(
  '/save-image',
  saveCharacterImage
);

// New route for character animation
router.post(
  '/animate-character',
  upload.single('characterImage'), // Handle the image upload
  animateCharacterImage
);

router.post(
  '/generate-character-ideogram',
  generateCharacterImageIdeogram
);

router.post(
  '/generate-character-recraft',
  generateCharacterImageRecraft
);

// Get a single character by ID
router.get(
  '/:characterId',
  async (req, res) => {
    try {
      const character = await Character.findById(req.params.characterId);
      
      if (!character) {
        return res.status(404).json({
          success: false,
          message: "Character not found"
        });
      }
      
      // Check if user owns this character
      if (character.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this character"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: character
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving character",
        error: error.message
      });
    }
  }
);

// Get all characters for the current user
router.get(
  '/',
  async (req, res) => {
    try {
      const characters = await Character.find({ userId: req.user._id })
        .sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        data: characters
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error retrieving characters",
        error: error.message
      });
    }
  }
);

export default router;