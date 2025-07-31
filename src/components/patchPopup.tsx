import React from "react";

interface PatchNotesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  patches: string[];
  version?: string;   // e.g. "0.1"
  date?: string;      // e.g. "2025-07-31"
}

const PatchNotesPopup: React.FC<PatchNotesPopupProps> = ({
  isOpen,
  onClose,
  patches,
  version = "0.1",
  date = new Date().toLocaleDateString(),
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90 flex justify-center items-center z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="patch-notes-title"
      aria-describedby="patch-notes-list"
    >
      <div
        className="bg-gray-900 text-white rounded-lg shadow-2xl max-w-md w-full p-6 relative
                   transform transition-all duration-300 ease-out scale-100"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close patch notes"
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with Version and Date */}
        <div className="mb-6 border-b border-gray-700 pb-3">
          <h2 id="patch-notes-title" className="text-2xl font-semibold">
            Patch Notes
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Version <span className="font-mono">{version}</span> &mdash;{" "}
            <time dateTime={date}>{date}</time>
          </p>
        </div>

        {/* Patch Cards */}
        <div
          id="patch-notes-list"
          className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {patches.map((patch, i) => (
            <div
              key={i}
              className="bg-gray-800 p-4 rounded shadow-md border border-gray-700"
            >
              <p className="text-gray-300 leading-relaxed">{patch}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
                     text-white py-2 rounded font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PatchNotesPopup;
