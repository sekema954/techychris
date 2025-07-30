import Subscribe from "../components/subscribe";

const ComingSoon = () => {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-[#1D1B2E] text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4 animate-pulse">🛠️ Coming Soon</h1>
        <p className="text-lg text-gray-400 mb-6">
          We're working on something awesome! Check back soon for updates.
        </p>
        <p>Subscribe to get the latest news and updates.</p>
        <div className="mt-6 text-center">
          <Subscribe />
        </div>
      </div>
    );
  };
  
  export default ComingSoon;
  