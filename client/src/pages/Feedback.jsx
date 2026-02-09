import { useState } from "react";
import emailjs from "@emailjs/browser";

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    rating: "",
    message: "",
    allowContact: false,
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const toEmail = import.meta.env.VITE_FEEDBACK_TO_EMAIL;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Email service is not configured. Please add EmailJS keys.");
      setIsSubmitting(false);
      return;
    }

    if (!toEmail) {
      setStatus("Recipient email is not configured. Please add VITE_FEEDBACK_TO_EMAIL.");
      setIsSubmitting(false);
      return;
    }

    const payload = { ...form, submittedAt: new Date().toISOString() };
    try {
      const existing = JSON.parse(localStorage.getItem("feedbackSubmissions") || "[]");
      localStorage.setItem("feedbackSubmissions", JSON.stringify([payload, ...existing].slice(0, 20)));
    } catch {
      localStorage.setItem("feedbackSubmissions", JSON.stringify([payload]));
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          topic: form.topic,
          rating: form.rating,
          message: form.message,
          allowContact: form.allowContact ? "Yes" : "No",
          submittedAt: payload.submittedAt,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          to_email: toEmail,
          to_name: "LearnifyAI Admin",
        },
        publicKey
      );
      setStatus("Your response has been submitted.");
      setForm({ name: "", email: "", topic: "", rating: "", message: "", allowContact: false });
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("Saved locally, but email delivery failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Feedback</h1>
          <p className="text-slate-600">Share your experience to help us improve LearnifyAI.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          {status && (
            <div
              className={`mb-6 p-3 rounded-lg border text-sm ${
                status.includes("failed") || status.includes("not configured")
                  ? "bg-red-50 text-red-800 border-red-200"
                  : "bg-green-50 text-green-800 border-green-200"
              }`}
            >
              {status}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="topic">
                Feedback Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select a topic</option>
                <option value="ui">UI/UX</option>
                <option value="ai">AI Output Quality</option>
                <option value="performance">Performance</option>
                <option value="features">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
              <div className="flex flex-wrap gap-3">
                {[5, 4, 3, 2, 1].map((value) => (
                  <label key={value} className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      checked={String(form.rating) === String(value)}
                      onChange={handleChange}
                      className="text-blue-600"
                    />
                    <span className="text-slate-700">{value} Star{value > 1 ? "s" : ""}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="message">
                Your Feedback
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Tell us what worked well and what can be improved..."
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  name="allowContact"
                  checked={form.allowContact}
                  onChange={handleChange}
                  className="text-blue-600"
                />
                You may contact me for more details
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
