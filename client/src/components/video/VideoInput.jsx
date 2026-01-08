import React, { useState } from 'react';

const VideoInput = ({ onSubmit }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      alert('Please enter a video URL');
      return;
    }
    setLoading(true);
    await onSubmit(videoUrl);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="video-input-form">
      <div className="form-group">
        <label htmlFor="videoUrl">Enter Video URL</label>
        <input
          id="videoUrl"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube or video URL"
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Processing...' : 'Analyze Video'}
      </button>
    </form>
  );
};

export default VideoInput;
