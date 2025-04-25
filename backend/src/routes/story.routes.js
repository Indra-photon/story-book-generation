import { Router } from "express";
import {
  createStory,
  generateStoryPrompt,
  generateSceneIllustration,
  getAllUserStories,
  getStoryById,
  updateStory,
  deleteStory,
  shareStory
} from "../controllers/story.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multur.middlewares.js";

const router = Router();

// Apply auth middleware to all routes
router.use(verifyJWT);

// Story CRUD operations
router.route("/")
  .post(createStory)
  .get(getAllUserStories);

router.route("/:storyId")
  .get(getStoryById)
  .patch(updateStory)
  .delete(deleteStory);

// AI generation endpoints
router.route("/generate-prompt")
  .post(generateStoryPrompt);

router.route("/generate-illustration")
  .post(generateSceneIllustration);

// Sharing functionality
router.route("/:storyId/share")
  .post(shareStory);

export default router;