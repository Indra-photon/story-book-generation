import { Router } from "express";
import {
  generateStoryPrompt,
  getAllUserStories,
  saveStory,
  generateSceneIllustration,
  getStoryById,
  generateBulkSceneIllustrations,
  generateSanitizedSceneIllustration
} from "../controllers/story.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Apply auth middleware to all routes
router.use(verifyJWT);

router.route("/generate-prompt").post(verifyJWT, generateStoryPrompt);
router.route("/get-all-stories").get(verifyJWT, getAllUserStories);
router.route("/save-story").post(verifyJWT, saveStory);
router.route("/create-scene").post(verifyJWT, generateSceneIllustration);
router.route("/get-story/:storyId").get(verifyJWT, getStoryById);
router.route("/create-scenes-bulk").post(verifyJWT, generateBulkSceneIllustrations);
router.route("/create-scene-sanitized").post(verifyJWT, generateSanitizedSceneIllustration);

export default router;