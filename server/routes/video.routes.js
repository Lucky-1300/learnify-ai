import express from "express";
import { getAnalysisHistory } from "../controllers/ai.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get analysis history for authenticated user (protected route)
router.get("/history", protect, getAnalysisHistory);

export default router;
