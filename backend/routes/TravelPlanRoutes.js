const express = require("express");
const router = express.Router();
const { store } = require("../controllers/TravelPlanController");
const authenticate = require("../middleware/authMiddleware");

router.post("/store", authenticate, store);

modules.exports = router;
