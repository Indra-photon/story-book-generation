import { Router } from "express";
import {
  generateStoryPrompt,
  getAllUserStories,
  saveStory,
  generateSceneIllustration,
  getStoryById
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

export default router;