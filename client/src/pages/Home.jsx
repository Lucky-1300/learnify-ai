import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Learnify-AI</h1>
        <p>Enhance your learning with AI-powered video analysis</p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </button>
      </div>
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Transcript Generation</h3>
            <p>Automatically extract transcripts from videos</p>
          </div>
          <div className="feature-card">
            <h3>Smart Summaries</h3>
            <p>AI-generated summaries for quick understanding</p>
          </div>
          <div className="feature-card">
            <h3>Key Points</h3>
            <p>Extract essential takeaways from any video</p>
          </div>
          <div className="feature-card">
            <h3>Quiz Generation</h3>
            <p>Test your understanding with AI-generated quizzes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
