import express from "express";
import {
  store,
  getTravelOptions,
} from "../controllers/TravelPlanController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/store", authenticate, store);
router.post("/get-travel-options", authenticate, getTravelOptions)

export default router;
