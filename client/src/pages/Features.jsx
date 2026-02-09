const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Features</h1>
          <p className="text-slate-600">
            LearnifyAI turns long videos into concise learning materials with structured outputs and a clean workflow.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">What you get</h2>
          <p className="text-slate-700 leading-relaxed">
            Paste a video link and receive a summary, key points, and a short quiz in one flow.
            The outputs are designed to be consistent, readable, and ready for quick study.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">Transcript-first</span>
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold">Structured output</span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-semibold">Fast workflow</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">AI Summaries</h3>
            <p className="text-slate-600">
              Generate clear summaries that focus on learning outcomes, definitions, and practical takeaways.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Key Points</h3>
            <p className="text-slate-600">
              Extract the most important ideas and present them in a clean, scan-friendly format.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Instant Quiz</h3>
            <p className="text-slate-600">
              Auto-generated questions to verify understanding and reinforce memory.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">History & Tracking</h3>
            <p className="text-slate-600">
              Keep a timeline of past analyses with quick access to summaries and quizzes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-slate-900 text-slate-50 rounded-2xl shadow-xl p-6">
            <h4 className="text-lg font-semibold mb-2">Reliable structure</h4>
            <p className="text-slate-200 text-sm">Consistent sections for summary, points, and quiz.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Graceful fallback</h4>
            <p className="text-slate-600 text-sm">Mock mode keeps demos usable without API keys.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h4 className="text-lg font-semibold text-slate-900 mb-2">Clean UI</h4>
            <p className="text-slate-600 text-sm">Focused layout that keeps learning content readable.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
