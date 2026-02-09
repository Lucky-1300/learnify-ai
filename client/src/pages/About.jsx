const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">About Us</h1>
          <p className="text-slate-600">LearnifyAI helps students learn faster from videos.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 space-y-4">
          <p className="text-slate-700 leading-relaxed">
            LearnifyAI turns long video content into structured study material by generating summaries, key points,
            and quizzes. The goal is to make learning more efficient, accessible, and consistent for students.
          </p>
          <p className="text-slate-700 leading-relaxed">
            The platform focuses on clarity, reliable structure, and a clean user experience so learners can quickly
            understand core ideas and test their knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Mission</h3>
            <p className="text-slate-600">
              Help learners extract knowledge faster from video content with accurate, organized AI outputs.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Vision</h3>
            <p className="text-slate-600">
              Make AI-assisted learning practical and trustworthy for every student and educator.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-50 rounded-2xl shadow-xl p-8 mt-8">
          <h3 className="text-2xl font-semibold mb-4">How it works</h3>
          <ol className="space-y-3 text-slate-200 list-decimal list-inside">
            <li>Paste a video link and start analysis.</li>
            <li>We process the transcript and generate a structured summary.</li>
            <li>Key points and a quiz are created for quick review and assessment.</li>
            <li>Results are saved in history for easy revisits.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;
