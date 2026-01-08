import React, { useState, useEffect } from 'react';
import { getAnalysisHistory } from '../services/api';
import Loader from '../components/common/Loader';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getAnalysisHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to load history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <Loader message="Loading history..." />;

  return (
    <div className="history-page">
      <h1>Analysis History</h1>

      {error && <div className="error-message">{error}</div>}

      {history.length > 0 ? (
        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-item">
              <h3>{item.videoTitle || 'Untitled'}</h3>
              <p className="date">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="summary">{item.summary?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No analysis history yet.</p>
      )}
    </div>
  );
};

export default History;
