import express from "express";
import {
  store,
  getTravelOptions,
  getHotels,
} from "../controllers/TravelPlanController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/store", authenticate, store);
router.post("/get-travel-options", authenticate, getTravelOptions)
router.post("/get-hotels", authenticate, getHotels);

export default router;
