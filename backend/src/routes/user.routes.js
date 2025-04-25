import { Router } from 'express';
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { 
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  updateAccountDetails,
  updateUserAvatar,
  requestPasswordReset,
  resetForgotPassword,
  verifyEmail,
  upgradeSubscription
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multur.middlewares.js';

const router = Router();

// Authentication routes - no auth required
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(requestPasswordReset);
router.route("/reset-password").post(resetForgotPassword);
router.route("/verify-email/:token").get(verifyEmail);

// Protected routes - require authentication
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/update-avatar").patch(
  verifyJWT,
  upload.single('avatar'),
  updateUserAvatar
);

// Subscription management
router.route("/upgrade-subscription").post(verifyJWT, upgradeSubscription);

export default router;