import { useState, useRef, useEffect } from "react";
import VideoInput from "../components/video/VideoInput";
import SummaryCard from "../components/summary/SummaryCard";
import KeyPointsList from "../components/keypoints/KeyPointsList";
import QuizContainer from "../components/quiz/QuizContainer";
import ErrorAlert from "../components/common/ErrorAlert";
import { analyzeVideo } from "../services/api";

const Dashboard = () => {
  const mockMode = true;
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("info");
  const statusTimer = useRef(null);

  const previewData = {
    title: "Untitled Video",
    summary:
      "This analysis for \"Untitled Video\" provides a practical overview with core concepts, real-world examples, and suggested next steps for deeper learning.",
    keyPoints: ["Core Concepts", "Real Examples", "Best Practices", "Challenges", "Next Steps"],
    quizQuestion: {
      prompt: "What is emphasized most?",
      options: ["Theory", "Practical use", "History", "Trivia"],
    },
  };

  const buildMockResult = (url) => {
    let host = "any source";
    try {
      host = url ? new URL(url).host.replace(/^www\./, "") : "any source";
    } catch {
      host = "any source";
    }
    const title = url ? `Shared Video (${host})` : "Untitled Video";
    const displayUrl = url || "(no link provided)";
    return {
      title,
      summary:
        `This is a mock analysis for "${title}". Source: ${displayUrl}. The summary highlights core concepts, practical takeaways, and next steps for further learning.`,
      keyPoints: [
        "Core Concepts",
        "Real Examples",
        "Best Practices",
        "Common Challenges",
        "Next Steps",
        `Source Link: ${displayUrl}`,
      ],
      quiz: [
        {
          _id: "mock-q1",
          questionText: "Which area helps avoid mistakes?",
          options: ["Best practices", "Random tips", "Guesswork", "None"],
        },
        {
          _id: "mock-q2",
          questionText: "Why are examples included in the analysis?",
          options: ["To show application", "To add length", "To replace summary", "To avoid structure"],
        },
        {
          _id: "mock-q3",
          questionText: "What is highlighted as the next step?",
          options: ["Deeper learning", "Skipping practice", "Ignoring key points", "Guessing answers"],
        },
        {
          _id: "mock-q4",
          questionText: "What is the main benefit of the summary?",
          options: ["Quick understanding", "Longer reading", "Unclear points", "No direction"],
        },
      ],
    };
  };

  const showStatus = (message, type = "info", duration = 4000) => {
    setStatus(message);
    setStatusType(type);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), duration);
  };

  useEffect(() => {
    return () => {
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, []);

  const handleAnalyze = async (url) => {
    setError("");
    setLoading(true);
    setAnalyzed(false);
    showStatus("Mock mode enabled. Showing demo results.", "info");

    if (mockMode) {
      const mock = buildMockResult(url);
      const entry = {
        _id: `mock-${Date.now()}`,
        videoTitle: mock.title || "Shared Video",
        summary: mock.summary,
        createdAt: new Date().toISOString(),
        keyPoints: mock.keyPoints.length,
        quizQuestions: mock.quiz.length,
        sourceUrl: url || "",
        isMock: true,
      };
      try {
        const existing = JSON.parse(localStorage.getItem("mockHistory") || "[]");
        localStorage.setItem("mockHistory", JSON.stringify([entry, ...existing].slice(0, 20)));
      } catch {
        localStorage.setItem("mockHistory", JSON.stringify([entry]));
      }
      const target = `/mock-result.html?url=${encodeURIComponent(url || "")}`;
      window.location.assign(target);
      return;
    }

    try {
      const response = await analyzeVideo(url, "");

      const hasData =
        (response && response.summary) ||
        (response && (response.keyPoints || response.keypoints) && (response.keyPoints || response.keypoints).length > 0) ||
        (response && response.quiz && response.quiz.length > 0);

      if (!hasData) {
        const mock = buildMockResult(url);
        setSummary(mock.summary);
        setKeyPoints(mock.keyPoints);
        setQuiz(mock.quiz);
        setVideoUrl(url);
        setAnalyzed(true);
        showStatus("No API output. Showing mock results.", "info");
        return;
      }

      setSummary(response.summary || "");
      setKeyPoints(response.keyPoints || response.keypoints || []);
      setQuiz(response.quiz || []);
      setVideoUrl(url);
      setAnalyzed(true);
      showStatus("Analysis complete", "success");
    } catch (err) {
      const mock = buildMockResult(url);
      setSummary(mock.summary);
      setKeyPoints(mock.keyPoints);
      setQuiz(mock.quiz);
      setVideoUrl(url);
      setAnalyzed(true);
      setError("");
      showStatus("API unavailable. Showing mock results.", "info");
      console.error("Analysis error (mocked):", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (answers) => {
    console.log("Quiz completed with answers:", answers);
  };

  const renderPreview = () => {
    const icons = ["🎯", "📌", "⭐", "💡", "🔑"];

    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-slate-50 rounded-2xl shadow-lg p-8 border border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-amber-200 text-slate-900 flex items-center justify-center font-bold">AI</div>
            <div>
              <p className="text-sm text-slate-300">Sample analysis</p>
              <p className="text-lg font-semibold text-slate-50">{previewData.title}</p>
            </div>
          </div>
          <p className="text-slate-200 leading-relaxed">{previewData.summary}</p>
        </div>

        <div className="bg-slate-900 text-slate-50 rounded-2xl shadow-xl p-8">
          <p className="text-sm uppercase tracking-wide text-amber-200 mb-3">Key Points</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {previewData.keyPoints.map((point, idx) => (
              <div key={point} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-xl">{icons[idx % icons.length]}</span>
                <span className="font-semibold text-slate-50">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500">Quiz</p>
              <h3 className="text-xl font-semibold text-slate-900">Question 1 of 4</h3>
            </div>
            <div className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">Example</div>
          </div>

          <p className="text-lg font-semibold text-slate-900 mb-4">{previewData.quizQuestion.prompt}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {previewData.quizQuestion.options.map((option) => (
              <div key={option} className="p-4 border-2 border-slate-200 rounded-xl hover:border-amber-400 transition cursor-pointer">
                <p className="text-slate-800 font-medium">{option}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6 text-sm text-slate-500">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">Previous</span>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white">Next</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Toast / Status */}
        {status && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm transition transform ${
              statusType === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : statusType === "error"
                ? "bg-red-50 text-red-800 border border-red-200"
                : "bg-blue-50 text-blue-800 border border-blue-200"
            }`}
          >
            {status}
          </div>
        )}

        {/* Header */}
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-lg shadow-slate-900/10">
            <span>Video Analysis Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Upload a video to get AI-powered insights, summaries, and assessments</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Paste any captioned YouTube link (or supported source), then let the AI create a summary, highlight the key points, and build a quick quiz to check understanding.</p>
        </div>

        {/* Error Alert */}
        {error && <ErrorAlert message={error} onClose={() => setError("")} />}

        <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-6 items-start">
          <div className="space-y-8">
            <VideoInput onSubmit={handleAnalyze} loading={loading} />

            {/* Results Section */}
            {analyzed || loading ? (
              <div className="space-y-6">
                <SummaryCard summary={summary} loading={loading} />
                <KeyPointsList keypoints={keyPoints} loading={loading} />
                <QuizContainer quiz={quiz} onComplete={handleQuizComplete} loading={loading} />
              </div>
            ) : (
              renderPreview()
            )}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-4 bg-slate-900 text-white rounded-2xl shadow-2xl p-8 border border-slate-800">
              <p className="text-sm uppercase tracking-wide text-amber-200 mb-3">How it works</p>
              <ul className="space-y-3 text-slate-100">
                <li className="flex gap-3"><span className="text-amber-300">1.</span><span>Paste a video URL and start analysis.</span></li>
                <li className="flex gap-3"><span className="text-amber-300">2.</span><span>We pull the transcript and run the AI prompt for summary + key points.</span></li>
                <li className="flex gap-3"><span className="text-amber-300">3.</span><span>We auto-generate a short quiz to reinforce learning.</span></li>
                <li className="flex gap-3"><span className="text-amber-300">4.</span><span>Review results, then rerun with another link anytime.</span></li>
              </ul>
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex h-10 w-10 rounded-full bg-amber-100 text-amber-900 items-center justify-center font-bold">AI</span>
                <p className="leading-relaxed">Fast, context-aware outputs with graceful fallbacks when transcripts or keys are missing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
