import express from "express";
import { getAnalysisHistory } from "../controllers/video.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/history", protect, getAnalysisHistory);

export default router;
