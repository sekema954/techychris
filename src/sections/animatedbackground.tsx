import { useEffect, useRef } from "react";
import gsap from "gsap";
import CareerRectangle from "../components/CareerRectangle";

const VideoBackground = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0 }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0 },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <section className="relative w-full overflow-hidden text-white py-30">
      {/* Video Background */}
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

      {/* Overlay Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center lg:px-50 px-5 py-10">
        <div className="w-full min-h-[600px] bg-[#1E1B4B]/60 z-10 relative flex flex-col items-center justify-center text-center px-4">
          <h1
            ref={headingRef}
            className="text-4xl lg:text-6xl font-bold mb-6 opacity-0"
          >
            Upgrade Your Tech Skills
          </h1>
          <p
            ref={paragraphRef}
            className="text-lg lg:text-lg max-w-2xl mb-8 opacity-0"
          >
            Meet all your IT growth needs in one place - from expert-led mentorship to
            hands on consulting and career-focused learning in Web Development. Cybersecurity, and Cloud Computing.
          </p>
          <a href="/courses" ref={buttonRef} className="opacity-0">
            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition">
              Browse Courses
            </button>
          </a>

          {/* Bottom Divider */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-[#1E1B4B]" />
        </div>
      </div>

      {/* Extra Content */}
      <div className="mt-70 lg:mt-0">
        <CareerRectangle />
      </div>
    </section>
  );
};

export default VideoBackground;
