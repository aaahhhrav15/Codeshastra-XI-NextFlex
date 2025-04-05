import express from "express";
import {
  store,
  getTravelOptions,
  getAllTravelPlans,
  getTravelPlanById,
} from "../controllers/TravelPlanController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/store", authenticate, store);
router.post("/get-travel-options", authenticate, getTravelOptions)
router.get("/get-all-travel-plans", authenticate, getAllTravelPlans)
router.get("/get", authenticate, getAllTravelPlans)
router.get("/get/:id", authenticate, getTravelPlanById)
export default router;
