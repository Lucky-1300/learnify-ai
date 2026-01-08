import React, { useState, useEffect } from 'react';
import VideoInput from '../components/video/VideoInput';
import Loader from '../components/common/Loader';
import SummaryCard from '../components/summary/SummaryCard';
import KeyPointsList from '../components/keypoints/KeyPointsList';
import QuizContainer from '../components/quiz/QuizContainer';
import { analyzeVideo } from '../services/api';

const Dashboard = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  const handleVideoSubmit = async (videoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const response = await analyzeVideo({ videoUrl });
      setVideoData(response);
      setActiveTab('summary');
    } catch (err) {
      setError('Failed to analyze video. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Video Analysis Dashboard</h1>
      
      <div className="input-section">
        <VideoInput onSubmit={handleVideoSubmit} />
      </div>

      {loading && <Loader message="Analyzing your video..." />}

      {error && <div className="error-message">{error}</div>}

      {videoData && (
        <div className="results-section">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`tab-button ${activeTab === 'keypoints' ? 'active' : ''}`}
              onClick={() => setActiveTab('keypoints')}
            >
              Key Points
            </button>
            <button
              className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              Quiz
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'summary' && videoData.summary && (
              <SummaryCard summary={videoData.summary} />
            )}
            {activeTab === 'keypoints' && videoData.keypoints && (
              <KeyPointsList keypoints={videoData.keypoints} />
            )}
            {activeTab === 'quiz' && videoData.quiz && (
              <QuizContainer quiz={videoData.quiz} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
