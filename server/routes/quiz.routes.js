import express from "express";
import {
  submitQuizAnswers,
  getVideoQuiz,
  regenerateQuiz,
} from "../controllers/quiz.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes are protected with JWT middleware
// GET /api/quiz/:videoId - Get quiz for a specific video
router.get("/:videoId", protect, getVideoQuiz);

// POST /api/quiz/submit - Submit quiz answers and get score
router.post("/submit", protect, submitQuizAnswers);

// POST /api/quiz/regenerate/:videoId - Regenerate quiz for a video
router.post("/regenerate/:videoId", protect, regenerateQuiz);

export default router;
