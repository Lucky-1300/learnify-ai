import mongoose from "mongoose";
import Video from "../models/Video.js";
import { extractTranscript } from "../services/transcript.service.js";
import { generateSummary, generateKeyPoints, generateQuiz } from "../services/openai.service.js";

/**
 * Analyze a video and generate summary, keypoints, and quiz using AI
 */
export const analyzeVideo = async (req, res) => {
  try {
    const { videoUrl, videoTitle } = req.body;
    const userId = req.userId;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    let usedMock = false;
    let fallbackReason = "";

    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    const video = new Video({
      userId,
      videoUrl,
      videoTitle: videoTitle || "Untitled Video",
      status: "processing",
    });

    await video.save();

    console.log("📹 Extracting transcript from video...");
    let transcript = "";
    try {
      transcript = await extractTranscript(videoUrl);
    } catch (err) {
      console.warn("Transcript extraction failed:", err.message);
      fallbackReason = `Transcript extraction failed: ${err.message}`;
    }

    if (!transcript || transcript.length < 50) {
      console.warn("Transcript missing/too short. Falling back to mock analysis.");
      usedMock = true;
      fallbackReason = fallbackReason || "Transcript missing or too short";
      const { mockSummary, mockKeyPoints, mockQuiz } = buildMockAnalysis(video.videoTitle);
      video.summary = mockSummary;
      video.keyPoints = mockKeyPoints;
      video.quiz = mockQuiz.map((q) => ({
        _id: new mongoose.Types.ObjectId(),
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
      }));
      video.status = "completed";
      await video.save();
      return res.status(201).json({
        ...serializeVideo(video),
        debug: { usedMock, reason: fallbackReason, transcriptLength: transcript?.length || 0, hasOpenAI },
      });
    }

    console.log(`✅ Transcript extracted: ${transcript.length} characters`);

    console.log("🤖 Generating AI analysis...");
    let summary, keyPoints, quiz;
    try {
      if (!hasOpenAI) {
        throw new Error("OpenAI API key missing");
      }
      [summary, keyPoints, quiz] = await Promise.all([
        generateSummary(transcript, video.videoTitle),
        generateKeyPoints(transcript, video.videoTitle),
        generateQuiz(transcript, video.videoTitle),
      ]);
      console.log("✅ AI analysis complete");
    } catch (err) {
      console.warn("AI generation failed, using mock:", err.message);
      usedMock = true;
      fallbackReason = fallbackReason || err.message || "AI generation failed";
      const mock = buildMockAnalysis(video.videoTitle);
      summary = mock.mockSummary;
      keyPoints = mock.mockKeyPoints;
      quiz = mock.mockQuiz;
    }

    const quizWithIds = (quiz || []).map((q) => ({
      _id: new mongoose.Types.ObjectId(),
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }));

    video.summary = summary;
    video.keyPoints = keyPoints;
    video.quiz = quizWithIds;
    video.status = "completed";

    await video.save();

    console.log(`✅ Video analysis saved: ${video._id}`);
    return res.status(201).json({
      ...serializeVideo(video),
      debug: { usedMock, reason: fallbackReason || null, transcriptLength: transcript?.length || 0, hasOpenAI },
    });
  } catch (error) {
    console.error("Video analysis error:", error);
    res.status(500).json({ message: "Failed to analyze video" });
  }
};

/**
 * Get analysis history for authenticated user
 */
export const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const videos = await Video.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json(videos);
  } catch (err) {
    console.error("HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

/**
 * Get a specific analysis by ID
 */
export const getVideoAnalysis = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOne({ _id: videoId, userId });

    if (!video) {
      return res.status(404).json({ message: "Video analysis not found" });
    }

    res.status(200).json(video);
  } catch (err) {
    console.error("GET ANALYSIS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch analysis" });
  }
};

/**
 * Delete a video analysis
 */
export const deleteVideoAnalysis = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: "Invalid video ID" });
    }

    const video = await Video.findOneAndDelete({ _id: videoId, userId });

    if (!video) {
      return res.status(404).json({ message: "Video analysis not found" });
    }

    res.status(200).json({ message: "Video analysis deleted successfully" });
  } catch (err) {
    console.error("DELETE ANALYSIS ERROR:", err);
    res.status(500).json({ message: "Failed to delete analysis" });
  }
};

// Helpers
const serializeVideo = (video) => ({
  _id: video._id,
  videoUrl: video.videoUrl,
  videoTitle: video.videoTitle,
  summary: video.summary,
  keyPoints: video.keyPoints,
  quiz: video.quiz,
  status: video.status,
  createdAt: video.createdAt,
});

const buildMockAnalysis = (title = "Untitled Video") => {
  const mockSummary = `This analysis for "${title}" provides a practical overview with core concepts, real-world examples, and suggested next steps for deeper learning.`;
  const mockKeyPoints = [
    { title: "Core Concepts", description: "Understand the main ideas and why they matter." },
    { title: "Real Examples", description: "See how the ideas apply in everyday scenarios." },
    { title: "Best Practices", description: "Learn tips to avoid common pitfalls." },
    { title: "Challenges", description: "Recognize hurdles and strategies to overcome them." },
    { title: "Next Steps", description: "Suggested directions for practice and exploration." },
  ];
  const mockQuiz = [
    { questionText: "What is emphasized most?", options: ["Theory", "Practical use", "History", "Trivia"], correctAnswer: "Practical use" },
    { questionText: "Which area helps avoid mistakes?", options: ["Best practices", "Random tips", "Guesswork", "None"], correctAnswer: "Best practices" },
    { questionText: "What should you consider next?", options: ["Stop learning", "Practice", "Ignore", "Unrelated tasks"], correctAnswer: "Practice" },
    { questionText: "What do examples illustrate?", options: ["Unrelated facts", "Real scenarios", "Only theory", "Myths"], correctAnswer: "Real scenarios" },
  ];
  return { mockSummary, mockKeyPoints, mockQuiz };
};
