import Video from "../models/Video.js";
import mongoose from "mongoose";

/**
 * Submit quiz answers and calculate score
 */
export const submitQuizAnswers = async (req, res) => {
  try {
    const { videoId, answers } = req.body;
    const userId = req.userId;

    // Validation
    if (!videoId || !answers) {
      return res.status(400).json({ message: "Video ID and answers are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    // Fetch video with quiz
    const video = await Video.findOne({
      _id: videoId,
      userId: userId,
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!video.quiz || video.quiz.length === 0) {
      return res.status(400).json({ message: "No quiz available for this video" });
    }

    // Calculate score
    let correctCount = 0;
    const results = video.quiz.map((question) => {
      const userAnswer = answers[question._id];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctCount++;

      return {
        questionId: question._id,
        questionText: question.questionText,
        userAnswer: userAnswer || "Not answered",
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    const score = ((correctCount / video.quiz.length) * 100).toFixed(2);

    res.status(200).json({
      videoId: video._id,
      videoTitle: video.videoTitle,
      totalQuestions: video.quiz.length,
      correctAnswers: correctCount,
      score: parseFloat(score),
      results,
    });
  } catch (err) {
    console.error("SUBMIT QUIZ ERROR:", err);
    res.status(500).json({ message: "Failed to submit quiz", error: err.message });
  }
};

/**
 * Get quiz for a specific video
 */
export const getVideoQuiz = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOne({
      _id: videoId,
      userId: userId,
    }).select("quiz videoTitle");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (!video.quiz || video.quiz.length === 0) {
      return res.status(404).json({ message: "No quiz available for this video" });
    }

    // Return quiz without correct answers (security)
    const quizForClient = video.quiz.map((question) => ({
      _id: question._id,
      questionText: question.questionText,
      options: question.options,
    }));

    res.status(200).json({
      videoId: video._id,
      videoTitle: video.videoTitle,
      quiz: quizForClient,
      totalQuestions: video.quiz.length,
    });
  } catch (err) {
    console.error("GET QUIZ ERROR:", err);
    res.status(500).json({ message: "Failed to fetch quiz", error: err.message });
  }
};

/**
 * Regenerate quiz for a video (admin only - for future implementation)
 */
export const regenerateQuiz = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOne({
      _id: videoId,
      userId: userId,
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // In production, this would call the LLM to regenerate quiz
    // For now, we'll just return success message
    res.status(200).json({
      message: "Quiz regeneration started. Please check back soon.",
      videoId: video._id,
    });
  } catch (err) {
    console.error("REGENERATE QUIZ ERROR:", err);
    res.status(500).json({ message: "Failed to regenerate quiz", error: err.message });
  }
};
