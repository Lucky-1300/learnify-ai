import React from 'react';

const KeyPointsList = ({ keypoints = [] }) => {
  return (
    <div className="keypoints-list">
      <h3>Key Points</h3>
      {keypoints.length > 0 ? (
        <ul>
          {keypoints.map((point, index) => (
            <li key={index} className="keypoint-item">
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <p>No key points available.</p>
      )}
    </div>
  );
};

export default KeyPointsList;
