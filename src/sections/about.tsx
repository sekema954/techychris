import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '../assets/images/heroimage.webp';
import Divider from '../components/divider';
import { Briefcase, GraduationCap, ShieldCheck, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [readMore, setReadMore] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const badges = [
    { label: 'CEO', icon: <Briefcase size={16} /> },
    { label: 'B.S. Information Technology', icon: <GraduationCap size={16} /> },
    { label: 'M.S. Cybersecurity', icon: <ShieldCheck size={16} /> },
    { label: 'CCNA, SEC+, NET+, A+, AWS CCP', icon: <Server size={16} /> },
  ];

  // Scroll-triggered animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        defaults: { ease: 'power3.out', duration: 1 },
      });

      tl.from(imageRef.current, { opacity: 0, x: -80 })
        .from(headingRef.current, { opacity: 0, y: 40 }, '-=0.5')
        .from(paragraphRef.current, { opacity: 0, y: 40 }, '-=0.4')
        .from(buttonRef.current, { opacity: 0, scale: 0.95 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover parallax effect with null safety
  useEffect(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(image, {
        rotationY: x * 10,
        rotationX: -y * 10,
        scale: 1.05,
        transformPerspective: 800,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex bg-[#0A2540] text-white py-12 px-5 lg:px-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        {/* Image with Parallax */}
        <div
          ref={imageContainerRef}
          className="relative w-full h-full max-h-[637px] rounded-xl overflow-hidden cursor-pointer group"
          style={{ perspective: '1000px' }}
        >
          <div className="absolute inset-0 rounded-xl bg-blue-600/10 opacity-0 group-hover:opacity-100 blur-3xl transition duration-700" />

          <img
            ref={imageRef}
            src={profile}
            alt="Chris Quashie"
            loading="lazy"
            className="w-full h-full object-cover rounded-xl shadow-2xl ring-2 ring-blue-600 will-change-transform"
          />

          {/* Info Badges */}
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 flex flex-wrap gap-2 rounded-b-xl backdrop-blur-md">
            {badges.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-blue-600/80 text-white text-xs sm:text-sm px-3 py-1 rounded-full shadow hover:bg-blue-700 transition-all"
              >
                {item.icon}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="bg-[#171723] p-6 lg:p-12 rounded-xl flex flex-col gap-6 h-full shadow-lg shadow-blue-900/30">
          <Divider />
          <h1
            ref={headingRef}
            className="font-bold text-[26px] sm:text-[32px] lg:text-[40px] leading-tight"
          >
            IT Professional With a Passion For All Things Tech
          </h1>

          <p
            ref={paragraphRef}
            className="text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed"
          >
            I’m Chris Quashie, a network engineer, technology educator, and content
            creator with a passion for making complex IT concepts accessible.
            With certifications including CCNA, Security+, Network+, A+, and AWS Cloud Practitioner,
            I specialize in enterprise networking, cybersecurity, and cloud technologies, with expertise in SD-WAN, Wireless, Routing, Switching, and IT infrastructure.

            {readMore && (
              <>
                <br /><br />
                As a content creator, I run a tech-focused YouTube and TikTok account, where I 
                break down networking, cybersecurity, and IT topics in a way that's engaging and
                easy to understand. My goal is to educate and inspire others looking to start
                or advance their careers in IT.
              </>
            )}
            <span
              onClick={() => setReadMore(prev => !prev)}
              className="text-blue-400 cursor-pointer block mt-3 font-semibold hover:underline"
            >
              {readMore ? 'Read Less' : 'Read More'}
            </span>
          </p>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/chris-quashie-b74299264"
          >
            <button
              ref={buttonRef}
              className="bg-blue-600 px-6 py-3 w-full sm:w-[300px] rounded-md font-semibold transition-all duration-500 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700/30"
            >
              Let's Connect
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
