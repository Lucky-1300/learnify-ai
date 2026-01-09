import Video from "../models/Video.js";
import mongoose from "mongoose";

/**
 * Analyze a video and generate summary, keypoints, and quiz
 * In production, this would call the LLM service
 */
export const analyzeVideo = async (req, res) => {
  try {
    const { videoUrl, videoTitle } = req.body;
    const userId = req.userId;

    // Validation
    if (!videoUrl) {
      return res.status(400).json({ message: "Video URL is required" });
    }

    // Create video document with pending status
    const video = new Video({
      userId,
      videoUrl,
      videoTitle: videoTitle || "Untitled Video",
      status: "processing",
    });

    await video.save();

    // In production, this would:
    // 1. Extract transcript from video
    // 2. Call LLM to generate summary, keypoints, and quiz
    // 3. Update video document with results
    // 4. Send back the analysis

    // For now, return mock data and mark as completed
    const mockSummary =
      "This video provides a comprehensive overview of the topic with practical examples and real-world applications.";

    const mockKeyPoints = [
      {
        title: "Understanding the Fundamentals",
        description:
          "Learn the core concepts and principles that form the foundation.",
      },
      {
        title: "Practical Applications",
        description: "Discover how these concepts apply in real-world scenarios.",
      },
      {
        title: "Best Practices",
        description: "Explore industry-standard practices and methodologies.",
      },
      {
        title: "Common Challenges",
        description: "Understand common pitfalls and how to avoid them.",
      },
      {
        title: "Future Trends",
        description: "Learn about emerging trends and future directions.",
      },
    ];

    const mockQuiz = [
      {
        _id: new mongoose.Types.ObjectId(),
        questionText: "What is the primary focus of the video?",
        options: [
          "Introduction with practical examples",
          "Advanced technical details only",
          "Historical background",
          "Competitor analysis",
        ],
        correctAnswer: "Introduction with practical examples",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        questionText: "Which concept was emphasized the most?",
        options: [
          "Theoretical knowledge",
          "Practical applications and real-world scenarios",
          "Historical facts",
          "Mathematical proofs",
        ],
        correctAnswer: "Practical applications and real-world scenarios",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        questionText: "What are the common challenges mentioned?",
        options: [
          "High costs only",
          "Technical and practical pitfalls to avoid",
          "Weather-related issues",
          "Government regulations",
        ],
        correctAnswer: "Technical and practical pitfalls to avoid",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        questionText: "What does the video recommend for further learning?",
        options: [
          "Stop learning after this video",
          "Exploration and practice",
          "Only theoretical study",
          "Professional certification only",
        ],
        correctAnswer: "Exploration and practice",
      },
    ];

    // Update video with analysis results
    video.summary = mockSummary;
    video.keyPoints = mockKeyPoints;
    video.quiz = mockQuiz;
    video.status = "completed";

    await video.save();

    // Return the complete analysis
    res.status(201).json({
      _id: video._id,
      videoUrl: video.videoUrl,
      videoTitle: video.videoTitle,
      summary: video.summary,
      keyPoints: video.keyPoints,
      quiz: video.quiz,
      status: video.status,
      createdAt: video.createdAt,
    });
  } catch (err) {
    console.error("VIDEO ANALYSIS ERROR:", err);
    res.status(500).json({ message: "Failed to analyze video", error: err.message });
  }
};

/**
 * Get analysis history for the authenticated user
 */
export const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const videos = await Video.find({ userId })
      .sort({ createdAt: -1 })
      .select("-transcript");

    res.status(200).json(videos);
  } catch (err) {
    console.error("GET HISTORY ERROR:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

/**
 * Get a specific video analysis by ID
 */
export const getVideoAnalysis = async (req, res) => {
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

    const video = await Video.findOneAndDelete({
      _id: videoId,
      userId: userId,
    });

    if (!video) {
      return res.status(404).json({ message: "Video analysis not found" });
    }

    res.status(200).json({ message: "Video analysis deleted successfully" });
  } catch (err) {
    console.error("DELETE ANALYSIS ERROR:", err);
    res.status(500).json({ message: "Failed to delete analysis" });
  }
};
