import React from "react";

const WarningAlert = ({ warning, onClose }) => {
  if (!warning) return null;

  const getWarningStyle = () => {
    if (warning.includes("EXCESSIVE QUANTITY")) {
      return "bg-red-50 border-red-200 text-red-800";
    } else if (warning.includes("CRITICAL PATTERN")) {
      return "bg-red-50 border-red-200 text-red-800";
    } else if (warning.includes("CONSECUTIVE EATING")) {
      return "bg-orange-50 border-orange-200 text-orange-800";
    } else if (warning.includes("WEEKLY LIMIT")) {
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
    return "bg-blue-50 border-blue-200 text-blue-800";
  };

  const getWarningIcon = () => {
    if (warning.includes("EXCESSIVE") || warning.includes("CRITICAL"))
      return "🚨";
    if (warning.includes("CONSECUTIVE")) return "⚠️";
    if (warning.includes("WEEKLY")) return "📊";
    return "💡";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className={`p-6 rounded-xl border-2 ${getWarningStyle()}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{getWarningIcon()}</span>
              <h3 className="text-xl font-bold">Health Warning!</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="whitespace-pre-line text-sm leading-relaxed mb-6">
            {warning}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Got it! 👍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningAlert;
