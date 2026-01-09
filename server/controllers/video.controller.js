import Video from "../models/Video.js";

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
