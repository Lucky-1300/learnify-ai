import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// Video Analysis Endpoints (Protected)
export const analyzeVideo = async (videoUrl, videoTitle) => {
  const res = await API.post("/ai/analyze", { videoUrl, videoTitle });
  return res.data;
};

export const getAnalysisHistory = async () => {
  const res = await API.get("/ai/history");
  return res.data;
};

export const getVideoAnalysis = async (videoId) => {
  const res = await API.get(`/ai/${videoId}`);
  return res.data;
};

export const deleteVideoAnalysis = async (videoId) => {
  const res = await API.delete(`/ai/${videoId}`);
  return res.data;
};

// Quiz Endpoints (Protected)
export const getVideoQuiz = async (videoId) => {
  const res = await API.get(`/quiz/${videoId}`);
  return res.data;
};

export const submitQuizAnswers = async (videoId, answers) => {
  const res = await API.post("/quiz/submit", { videoId, answers });
  return res.data;
};

export const regenerateQuiz = async (videoId) => {
  const res = await API.post(`/quiz/regenerate/${videoId}`);
  return res.data;
};

export default API;
