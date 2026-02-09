import { useState, useEffect } from "react";
import { getAnalysisHistory } from "../services/api";
import Loader from "../components/common/Loader";
import ErrorAlert from "../components/common/ErrorAlert";

// Placeholder data for demonstration
const PLACEHOLDER_HISTORY = [
  {
    _id: "1",
    videoTitle: "Introduction to React Hooks",
    summary: "Learn how to use React Hooks to manage state and side effects in functional components",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    keyPoints: 5,
    quizQuestions: 4
  },
  {
    _id: "2",
    videoTitle: "JavaScript Async/Await Explained",
    summary: "Deep dive into asynchronous programming with async functions and await patterns",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    keyPoints: 6,
    quizQuestions: 5
  },
  {
    _id: "3",
    videoTitle: "CSS Grid for Responsive Design",
    summary: "Master CSS Grid layout for building modern, responsive web applications",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    keyPoints: 4,
    quizQuestions: 3
  },
  {
    _id: "4",
    videoTitle: "Node.js REST API Development",
    summary: "Build scalable REST APIs using Node.js and Express framework",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    keyPoints: 7,
    quizQuestions: 6
  },
];

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemove = (id) => {
    const updated = history.filter((item) => item._id !== id);
    setHistory(updated);
    try {
      localStorage.setItem("mockHistory", JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleClearAll = () => {
    const confirmed = window.confirm("Are you sure you want to clear all history?");
    if (!confirmed) return;
    setHistory([]);
    try {
      localStorage.removeItem("mockHistory");
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedMock = JSON.parse(localStorage.getItem("mockHistory") || "[]");
        if (storedMock.length > 0) {
          setHistory(storedMock);
          return;
        }
        // Try to fetch from API
        try {
          const data = await getAnalysisHistory();
          setHistory(Array.isArray(data) ? data : data.videos || []);
        } catch (apiError) {
          console.log("API not available, using placeholder data:", apiError.message);
          setHistory(PLACEHOLDER_HISTORY);
        }
      } catch (err) {
        setError("Failed to load history. Please try again later.");
        console.error("Fetch history error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter((item) =>
    (item.videoTitle || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loader message="Loading your analysis history..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Analysis History</h1>
            <p className="text-gray-600">View and manage your previous video analyses</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="h-11 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition inline-flex items-center"
            >
              Back to Dashboard
            </a>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="h-11 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

        {/* Search Bar */}
        {history.length > 0 && (
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search analysis history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        )}

        {/* History List or Empty State */}
        {filteredHistory.length > 0 ? (
          <div className="grid gap-6">
            {filteredHistory.map((item) => {
              const date = new Date(item.createdAt);
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
              const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 border border-gray-100"
                >
                  {/* Title and Date */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {item.videoTitle || "Untitled Video"}
                      </h3>
                      {item.isMock && (
                        <span className="inline-block text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full mb-2">
                          Mock Entry
                        </span>
                      )}
                      <p className="text-sm text-gray-500">
                        <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formattedDate} at {formattedTime}
                      </p>
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      Completed
                    </span>
                  </div>

                  {/* Summary Preview */}
                  <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">
                    {item.summary || "No summary available"}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 18c-1.26 0-2.5-.5-3.41-1.41A4.83 4.83 0 012.18 12.18c0-2.67 2.15-4.82 4.82-4.82s4.82 2.15 4.82 4.82-2.15 4.82-4.82 4.82zm0-9.64c-2.05 0-3.82 1.77-3.82 3.82s1.77 3.82 3.82 3.82 3.82-1.77 3.82-3.82-1.77-3.82-3.82-3.82z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Key Points</p>
                        <p className="font-semibold text-gray-800">{item.keyPoints || 0}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Quiz</p>
                        <p className="font-semibold text-gray-800">{item.quizQuestions || 0} Q's</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <a
                      href={`/mock-result.html?url=${encodeURIComponent(item.sourceUrl || "")}`}
                      className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition text-center"
                    >
                      View Analysis
                    </a>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="flex-1 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : searchTerm ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Results Found</h3>
            <p className="text-gray-600">No analyses match "{searchTerm}". Try a different search term.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m0 0h6M6 12h6m0 0h6" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Analysis History</h3>
            <p className="text-gray-600">You haven't analyzed any videos yet. Start by going to the Dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
