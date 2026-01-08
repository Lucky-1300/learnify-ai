import React from 'react';

const SummaryCard = ({ summary, title = 'Summary' }) => {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <div className="summary-content">
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
