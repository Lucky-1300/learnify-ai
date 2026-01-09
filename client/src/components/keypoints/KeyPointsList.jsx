import { useState } from "react";

/**
 * KeyPointsList Component
 * Displays key points with icons and better styling
 */
const KeyPointsList = ({ keypoints = [], loading = false, title = "Key Points" }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!keypoints || keypoints.length === 0) {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 bg-gray-200 h-6 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m0 0V3a2 2 0 00-2-2h-2a2 2 0 00-2 2v2z" />
          </svg>
          <p className="text-gray-400 text-lg">No key points available yet.</p>
        </div>
      </div>
    );
  }

  const icons = [
    "🎯",
    "📌",
    "⭐",
    "💡",
    "🔑",
    "📍",
    "✨",
    "🎓",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-3">
        {keypoints.map((point, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <div className="text-3xl flex-shrink-0 mt-1">{icons[index % icons.length]}</div>
            <div className="flex-1">
              <p className="text-gray-800 font-semibold leading-relaxed">
                {typeof point === "string" ? point : point.title || JSON.stringify(point)}
              </p>
              {expandedIndex === index && typeof point === "object" && point.description && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{point.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPointsList;
