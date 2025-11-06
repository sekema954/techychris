interface Prop {
  title: string;
}

export const LoadingSpinner = ({ title }: Prop) => {
  return (
    <div className="flex flex-col justify-center items-center py-13">
      <p className="text-yellow-400 text-center py-4 animate-pulse">
        Loading {title}...
      </p>

      {/* Spinner */}
      <div className="spinner w-10 h-10 rounded-full border-4 border-t-transparent"></div>

      <style>
        {`
          /* Spin rotation */
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Color cycling (red → yellow → green → red) */
          @keyframes colorCycle {
            0% { border-top-color: #ef4444; }     /* red */
            33% { border-top-color: #facc15; }    /* yellow */
            66% { border-top-color: #22c55e; }    /* green */
            100% { border-top-color: #ef4444; }   /* back to red */
          }

          .spinner {
            border-color: rgba(255, 255, 255, 0.1);
            border-top-color: #ef4444;
            animation: spin 0.8s linear infinite, colorCycle 2s linear infinite;
          }
        `}
      </style>
    </div>
  );
};
