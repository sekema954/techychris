import CareerRectangle from "../components/CareerRectangle"

const VideoBackground = () => {
  return (
    <section className="relative w-full overflow-hidden text-white py-30">
      {/* Video element */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute object-cover z-0 left-0 top-0 w-full h-full"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center lg:px-50 px-5 py-10">
        <div className="w-full min-h-[600px] bg-[#1E1B4B]/60 z-10 relative flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Upgrade Your Tech Skills
          </h1>
          <p className="text-lg lg:text-xl max-w-2xl mb-8">
            Master in-demand IT skills like Web Development, Cybersecurity, and Cloud Computing with our expert-led online courses.
          </p>
          <a href="/courses">
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition">
                Browse Courses
            </button>
          </a>
          {/* Divider */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-[#1E1B4B]"></div>
        </div>
      </div>

      {/* Extra content below video section */}
      <div className="mt-70 lg:mt-0">
        <CareerRectangle />
      </div>
    </section>
  );
};

export default VideoBackground;
