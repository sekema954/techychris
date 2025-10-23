import { useEffect, useRef, useState } from "react";
import video from "../assets/videos/Website testimonials correction.mp4";
import CareerRectangle from "../components/CareerRectangle";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true); // start muted for autoplay
  const [userMuted, setUserMuted] = useState(false); // tracks manual mute
  const [firstInteractionDone, setFirstInteractionDone] = useState(false);

  // Manual mute/unmute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      const newMute = !isMuted;
      videoRef.current.muted = newMute;
      setIsMuted(newMute);
      setUserMuted(true);
    }
  };

  // First click anywhere → unmute video
  useEffect(() => {
    const handleFirstClick = () => {
      if (videoRef.current && !firstInteractionDone) {
        videoRef.current.muted = false;
        setIsMuted(false);
        setFirstInteractionDone(true);
      }
    };
    document.addEventListener("click", handleFirstClick);
    return () => {
      document.removeEventListener("click", handleFirstClick);
    };
  }, [firstInteractionDone]);

  // Auto mute/pause when scrolling out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const video = videoRef.current;
        if (!video) return;

        if (!entry.isIntersecting) {
          video.muted = true;
          video.pause();
          setIsMuted(true);
        } else {
          video.play().catch(() => {});
          if (!userMuted && firstInteractionDone) {
            video.muted = false;
            setIsMuted(false);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [userMuted, firstInteractionDone]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 object-cover w-full h-full z-0"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Top-left Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className={`absolute top-6 left-6 z-20 h-16 w-16 rounded-full rounded-full bg-black/50 backdrop-blur-md text-white 
          transition-all duration-300 hover:scale-105 focus:outline-none
          ${!isMuted ? "animate-pulse ring-2 ring-white/40" : ""}`}
      >
        {isMuted ? <span className="text-lg">🔇</span> : <span className="text-lg">🔊</span>}
      </button>

      {/* Top-right Courses Button */}
      <a href="/courses" className="absolute top-6 right-6 z-20">
        <button className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-full hover:bg-blue-700 transition">
          Browse Courses
        </button>
      </a>

      {/* Extra Content Below Video */}
      <div className="relative z-10 mt-screen">
        <CareerRectangle />
      </div>
    </section>
  );
};

export default VideoBackground;
