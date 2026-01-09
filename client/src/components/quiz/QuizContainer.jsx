import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

/**
 * QuizContainer Component
 * Manages quiz flow with progress tracking
 */
const QuizContainer = ({ quiz = [], onComplete, loading = false }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = Array.isArray(quiz) ? quiz : quiz.questions || [];

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz</h2>
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01m-6.993-5.679a6.002 6.002 0 015.974 5.069M19.5 13a6.002 6.002 0 01-5.974 5.069m0 0a7 7 0 11-13.999 0" />
          </svg>
          <p className="text-gray-400 text-lg">No quiz available yet. Analyze a video to get started.</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return <QuizResult answers={answers} questions={questions} />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {currentQuestion && (
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.questionText || currentQuestion}</h3>

            {Array.isArray(currentQuestion.options) && currentQuestion.options.length > 0 && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                      answers[currentQuestion._id] === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={answers[currentQuestion._id] === option}
                      onChange={() => handleAnswerSelect(currentQuestion._id, option)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestion._id]}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? "Complete Quiz" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
