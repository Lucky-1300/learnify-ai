const UserGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">User Guide</h1>
          <p className="text-slate-600">Step-by-step instructions to use LearnifyAI.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <ol className="list-decimal list-inside space-y-3 text-slate-700">
            <li>Open the Dashboard and paste a video link.</li>
            <li>Click Analyze Video to generate a summary, key points, and quiz.</li>
            <li>Review results and navigate to History for saved entries.</li>
            <li>Use Feedback to share improvements and suggestions.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
