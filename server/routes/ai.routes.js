import express from "express";
import {
  analyzeVideo,
  getAnalysisHistory,
  getVideoAnalysis,
  deleteVideoAnalysis,
} from "../controllers/ai.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes are protected with JWT middleware
// POST /api/ai/analyze - Analyze a video and generate summary, keypoints, quiz
router.post("/analyze", protect, analyzeVideo);

// GET /api/ai/history - Get all analyses for the authenticated user
router.get("/history", protect, getAnalysisHistory);

// GET /api/ai/:videoId - Get specific video analysis
router.get("/:videoId", protect, getVideoAnalysis);

// DELETE /api/ai/:videoId - Delete a video analysis
router.delete("/:videoId", protect, deleteVideoAnalysis);

export default router;
