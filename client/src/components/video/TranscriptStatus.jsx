import React from 'react';

const TranscriptStatus = ({ status, transcript }) => {
  return (
    <div className="transcript-status">
      <h3>Transcript Status: {status}</h3>
      {transcript && (
        <div className="transcript-content">
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptStatus;
