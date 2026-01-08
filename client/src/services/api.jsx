import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Video Analysis
export const analyzeVideo = async (data) => {
  const response = await apiClient.post('/ai/analyze', data);
  return response.data;
};

// Get Quiz
export const getQuiz = async (videoId) => {
  const response = await apiClient.get(`/quiz/${videoId}`);
  return response.data;
};

// Submit Quiz Answers
export const submitQuizAnswers = async (quizId, answers) => {
  const response = await apiClient.post(`/quiz/${quizId}/submit`, { answers });
  return response.data;
};

// Get Analysis History
export const getAnalysisHistory = async () => {
  const response = await apiClient.get('/video/history');
  return response.data;
};

// Get Video Details
export const getVideoDetails = async (videoId) => {
  const response = await apiClient.get(`/video/${videoId}`);
  return response.data;
};

// Get Summary
export const getSummary = async (videoId) => {
  const response = await apiClient.get(`/ai/summary/${videoId}`);
  return response.data;
};

// Get Key Points
export const getKeyPoints = async (videoId) => {
  const response = await apiClient.get(`/ai/keypoints/${videoId}`);
  return response.data;
};

export default apiClient;
