import { useState, useCallback } from 'react';
import { analyzeVideo, getQuiz, submitQuizAnswers } from '../services/api';

export const useVideoAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (videoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeVideo({ videoUrl });
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Analysis failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getQuizData = useCallback(async (videoId) => {
    try {
      const quiz = await getQuiz(videoId);
      return quiz;
    } catch (err) {
      setError(err.message || 'Failed to fetch quiz');
      throw err;
    }
  }, []);

  const submitAnswers = useCallback(async (quizId, answers) => {
    try {
      const result = await submitQuizAnswers(quizId, answers);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to submit answers');
      throw err;
    }
  }, []);

  return {
    data,
    loading,
    error,
    analyze,
    getQuizData,
    submitAnswers,
  };
};

export default useVideoAnalysis;
