import express from "express";
import { getFamousPlaces } from "../controllers/placeController.js";
 
 

const router = express.Router();

router.get("/getFamousPlaces", getFamousPlaces);

export default router;
