import express from "express";
import { store } from "../controllers/TravelPlanController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/store", authenticate, store);

export default router;
