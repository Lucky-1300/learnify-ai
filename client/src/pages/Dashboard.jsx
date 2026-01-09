import { useState } from "react";
import VideoInput from "../components/video/VideoInput";
import SummaryCard from "../components/summary/SummaryCard";
import KeyPointsList from "../components/keypoints/KeyPointsList";
import QuizContainer from "../components/quiz/QuizContainer";
import ErrorAlert from "../components/common/ErrorAlert";

// Mock data for demonstration
const MOCK_ANALYSIS = {
  summary: `This comprehensive video explores fundamental concepts in modern technology and their real-world applications. 

The video begins with an introduction to key principles, followed by in-depth explanations of core concepts using practical examples. The instructor demonstrates how these concepts apply to everyday scenarios and industry practices.

Key takeaways include understanding the foundational knowledge required for advanced topics, recognizing common patterns and best practices, and appreciating the importance of continuous learning in this rapidly evolving field.

The video concludes with a summary of the main points and suggestions for further exploration and practice.`,

  keyPoints: [
    {
      title: "Understanding the Fundamentals",
      description: "Learn the core concepts and principles that form the foundation of the topic."
    },
    {
      title: "Practical Applications",
      description: "Discover how these concepts are applied in real-world scenarios and industry practices."
    },
    {
      title: "Best Practices",
      description: "Explore industry-standard practices and methodologies for optimal results."
    },
    {
      title: "Common Challenges",
      description: "Understand common pitfalls and how to avoid them."
    },
    {
      title: "Future Trends",
      description: "Learn about emerging trends and future directions in this field."
    }
  ],

  quiz: [
    {
      _id: "q1",
      questionText: "What is the primary focus of the video?",
      options: [
        "Introduction to the topic with practical examples",
        "Advanced technical details only",
        "Historical background",
        "Competitor analysis"
      ],
      correctAnswer: "Introduction to the topic with practical examples"
    },
    {
      _id: "q2",
      questionText: "Which concept was emphasized the most?",
      options: [
        "Theoretical knowledge",
        "Practical applications and real-world scenarios",
        "Historical facts",
        "Mathematical proofs"
      ],
      correctAnswer: "Practical applications and real-world scenarios"
    },
    {
      _id: "q3",
      questionText: "What are the common challenges mentioned?",
      options: [
        "High costs only",
        "Technical and practical pitfalls to avoid",
        "Weather-related issues",
        "Government regulations"
      ],
      correctAnswer: "Technical and practical pitfalls to avoid"
    },
    {
      _id: "q4",
      questionText: "What does the video recommend for further learning?",
      options: [
        "Stop learning after this video",
        "Exploration and practice",
        "Only theoretical study",
        "Professional certification only"
      ],
      correctAnswer: "Exploration and practice"
    }
  ]
};

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = async (url) => {
    setError("");
    setLoading(true);
    setAnalyzed(false);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, use mock data (replace with API call when backend is ready)
      // const response = await analyzeVideo(url);
      // setSummary(response.summary);
      // setKeyPoints(response.keypoints);
      // setQuiz(response.quiz);

      setSummary(MOCK_ANALYSIS.summary);
      setKeyPoints(MOCK_ANALYSIS.keyPoints);
      setQuiz(MOCK_ANALYSIS.quiz);
      setVideoUrl(url);
      setAnalyzed(true);
    } catch (err) {
      setError(err.message || "Failed to analyze video. Please try again.");
      console.error("Analysis error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (answers) => {
    console.log("Quiz completed with answers:", answers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Video Analysis Dashboard</h1>
          <p className="text-gray-600">Upload a video to get AI-powered insights, summaries, and assessments</p>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert message={error} onClose={() => setError("")} />}

        {/* Video Input */}
        <VideoInput onSubmit={handleAnalyze} loading={loading} />

        {/* Results Section */}
        {analyzed || loading ? (
          <>
            {/* Summary */}
            <SummaryCard summary={summary} loading={loading} />

            {/* Key Points */}
            <KeyPointsList keypoints={keyPoints} loading={loading} />

            {/* Quiz */}
            <QuizContainer quiz={quiz} onComplete={handleQuizComplete} loading={loading} />
          </>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ready to analyze?</h3>
            <p className="text-gray-600">Enter a video URL above to get started with AI-powered analysis</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
