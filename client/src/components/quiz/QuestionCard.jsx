import React, { useState } from 'react';

const QuestionCard = ({ question, onAnswer, onNext, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(question._id, answer);
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <h3>Question {questionNumber} of {totalQuestions}</h3>
        <p className="question-text">{question.questionText}</p>
      </div>
      <div className="options">
        {question.options?.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedAnswer === option ? 'selected' : ''}`}
            onClick={() => handleAnswer(option)}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleAnswer(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!selectedAnswer}
        className="btn btn-primary"
      >
        {questionNumber === totalQuestions ? 'Complete Quiz' : 'Next'}
      </button>
    </div>
  );
};

export default QuestionCard;
