import { useState } from "react";

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [quiz, setQuiz] = useState([]);

  const handleAnalyze = () => {
    // Temporary mock data (replace with API later)
    setSummary(
      "This video explains the fundamentals of the topic with examples and key takeaways."
    );
    setKeyPoints([
      "Introduction to the topic",
      "Explanation of core concepts",
      "Real-world examples",
      "Conclusion and summary",
    ]);
    setQuiz([
      "What is the main topic of the video?",
      "Which concept is explained first?",
      "What example was discussed?",
      "What is the final conclusion?",
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-10">
        Video Analysis Dashboard
      </h1>

      {/* Video URL Input */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Enter Video URL
        </h2>

        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube or video URL"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAnalyze}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze Video
        </button>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Summary
        </h2>

        {summary ? (
          <p className="text-gray-600 leading-relaxed">{summary}</p>
        ) : (
          <p className="text-gray-400 italic">
            No summary available. Analyze a video to generate summary.
          </p>
        )}
      </div>

      {/* Key Points Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Key Points
        </h2>

        {keyPoints.length > 0 ? (
          <ul className="list-disc ml-6 text-gray-600">
            {keyPoints.map((point, index) => (
              <li key={index} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">
            No key points available.
          </p>
        )}
      </div>

      {/* Quiz Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Quiz
        </h2>

        {quiz.length > 0 ? (
          <ol className="list-decimal ml-6 text-gray-600">
            {quiz.map((question, index) => (
              <li key={index} className="mb-1">
                {question}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-400 italic">
            No questions available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
