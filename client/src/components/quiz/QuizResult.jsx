import React from 'react';

const QuizResult = ({ answers, questions = [] }) => {
  const correctAnswers = questions.filter(
    (q) => answers[q._id] === q.correctAnswer
  ).length;
  const totalQuestions = questions.length;
  const score = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      <div className="result-summary">
        <p className="score">Score: {score}%</p>
        <p className="correct-answers">
          Correct Answers: {correctAnswers} out of {totalQuestions}
        </p>
      </div>
      <div className="result-details">
        {questions.map((question, index) => (
          <div key={index} className="result-item">
            <h4>{question.questionText}</h4>
            <p>Your Answer: {answers[question._id]}</p>
            <p className={answers[question._id] === question.correctAnswer ? 'correct' : 'incorrect'}>
              Correct Answer: {question.correctAnswer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
