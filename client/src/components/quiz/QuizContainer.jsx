import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import QuizResult from './QuizResult';

const QuizContainer = ({ quiz = { questions: [] }, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  if (showResults) {
    return <QuizResult answers={answers} questions={quiz.questions} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onAnswer={handleAnswerSelect}
          onNext={handleNext}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
        />
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default QuizContainer;
