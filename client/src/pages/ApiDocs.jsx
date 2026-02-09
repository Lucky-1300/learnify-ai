const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">API Docs</h1>
          <p className="text-slate-600">High-level API overview for LearnifyAI.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Base URL</h2>
            <p className="text-slate-700">http://localhost:5000/api</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Core Endpoints</h2>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>POST /ai/analyze — Analyze a video URL</li>
              <li>GET /ai/history — Fetch analysis history</li>
              <li>GET /quiz/:videoId — Fetch quiz for a video</li>
              <li>POST /quiz/submit — Submit quiz answers</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Notes</h2>
            <p className="text-slate-700">Authentication is required for protected endpoints.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;
