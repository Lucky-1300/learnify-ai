const Faq = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">FAQ</h1>
          <p className="text-slate-600">Common questions about LearnifyAI.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Does it work without an API key?</h3>
            <p className="text-slate-700">Yes. Mock mode provides demo outputs for presentations.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">What links are supported?</h3>
            <p className="text-slate-700">Any valid video link can be used for demo; YouTube is recommended.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Where is my history stored?</h3>
            <p className="text-slate-700">Mock history is stored locally in the browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
