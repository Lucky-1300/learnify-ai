import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Learn Smarter with <span className="text-blue-600">Learnify-AI</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Turn YouTube videos into structured learning content with
          AI-generated summaries, key points, and quizzes.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold
                     hover:bg-blue-700 transition shadow-lg"
        >
          Start Learning
        </button>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
          What Learnify-AI Offers
        </h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Video Transcript
            </h3>
            <p className="text-gray-600">
              Automatically extract accurate transcripts from educational
              videos.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Smart Summary
            </h3>
            <p className="text-gray-600">
              Get concise AI-generated summaries for quick revision.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Key Points
            </h3>
            <p className="text-gray-600">
              Highlight the most important learning points automatically.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              AI Quiz
            </h3>
            <p className="text-gray-600">
              Test your understanding with AI-generated questions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
