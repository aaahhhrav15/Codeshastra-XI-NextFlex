import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { chatWithTravelPlan } from "../controllers/chatBotController.js";

const router = express.Router();

// POST /api/chat
router.post("/", authenticate, chatWithTravelPlan);

export default router;
