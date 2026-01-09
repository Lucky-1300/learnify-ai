import { useState } from "react";

/**
 * QuizResult Component
 * Displays quiz results with score and detailed breakdown
 */
const QuizResult = ({ answers = {}, questions = [] }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-center text-gray-400">No quiz data available.</p>
      </div>
    );
  }

  const correctAnswers = questions.filter((q) => answers[q._id] === q.correctAnswer).length;
  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(0) : 0;

  const getScoreColor = (scoreValue) => {
    if (scoreValue >= 80) return "text-green-600";
    if (scoreValue >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (scoreValue) => {
    if (scoreValue >= 80) return "bg-green-50";
    if (scoreValue >= 60) return "bg-yellow-50";
    return "bg-red-50";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>

        {/* Score Display */}
        <div className={`inline-block p-8 rounded-2xl ${getScoreBgColor(score)}`}>
          <div className="text-6xl font-bold mb-2">
            <span className={getScoreColor(score)}>{score}%</span>
          </div>
          <p className="text-gray-700 text-lg font-semibold">
            {correctAnswers} out of {totalQuestions} correct
          </p>
        </div>

        {/* Feedback Message */}
        <p className="mt-6 text-gray-600 text-lg">
          {score >= 80
            ? "🎉 Excellent! You've mastered this content!"
            : score >= 60
            ? "👍 Good job! Keep practicing to improve."
            : "📚 Keep learning! Review the content and try again."}
        </p>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-3 px-4 mb-6 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-lg transition flex items-center justify-center gap-2"
      >
        {showDetails ? "Hide Details" : "Show Detailed Results"}
        <svg
          className={`w-5 h-5 transition-transform ${showDetails ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Detailed Results */}
      {showDetails && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Breakdown</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question._id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={index} className={`p-4 rounded-lg border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${isCorrect ? "bg-green-600" : "bg-red-600"}`}>
                      {isCorrect ? "✓" : "✗"}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Q{index + 1}: {question.questionText}</p>
                    </div>
                  </div>

                  <div className="ml-9 space-y-2">
                    <div className={`p-2 rounded ${isCorrect ? "bg-green-100" : "bg-yellow-100"}`}>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Your answer:</span> {userAnswer || "Not answered"}
                      </p>
                    </div>

                    {!isCorrect && (
                      <div className="p-2 bg-green-100 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
