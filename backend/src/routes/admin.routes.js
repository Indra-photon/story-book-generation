import { Router } from 'express';
import { verifyJWT, isAdmin } from "../middlewares/auth.middlewares.js";
import { 
  getDashboardStats,
  getAllUsers,
  getUserAnalytics,
  updateUserStatus,
  getAllCharacters,
  getSystemHealth
} from '../controllers/admin.controller.js';

const router = Router();

// All admin routes require authentication and admin permissions
router.use(verifyJWT);
router.use(isAdmin);

// Dashboard and analytics
router.route("/dashboard-stats").get(getDashboardStats);
router.route("/system-health").get(getSystemHealth);

// User management
router.route("/users").get(getAllUsers);
router.route("/users/:userId/analytics").get(getUserAnalytics);
router.route("/users/:userId/status").patch(updateUserStatus);

// Character management
router.route("/characters").get(getAllCharacters);

export default router;