const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Support</h1>
          <p className="text-slate-600">Need help? We are here to assist you.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 space-y-4">
          <p className="text-slate-700">For any questions or issues, reach out via the feedback form.</p>
          <div className="flex gap-3">
            <a
              href="/feedback"
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Go to Feedback
            </a>
            <a
              href="/faq"
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
