import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '../assets/images/heroimage.png';
import Divider from '../components/divider';

import { Briefcase, GraduationCap, ShieldCheck, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [readMore, setReadMore] = useState(false);

  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  const badges = [
    { label: 'CEO', icon: <Briefcase size={16} /> },
    { label: 'B.S. Information Technology', icon: <GraduationCap size={16} /> },
    { label: 'M.S. Cybersecurity', icon: <ShieldCheck size={16} /> },
    { label: 'CCNA, SEC+, NET+, A+, AWS CCP', icon: <Server size={16} /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        defaults: { ease: 'power3.out', duration: 1 },
      });

      tl.from(imageRef.current, { opacity: 0, x: -100 })
        .from(headingRef.current, { opacity: 0, y: 50 }, '-=0.6')
        .from(paragraphRef.current, { opacity: 0, y: 50 }, '-=0.5')
        .from(buttonRef.current, { opacity: 0, scale: 0.9 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex bg-[#0A2540] text-white py-10 px-5 lg:px-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch w-full">
        {/* Profile Picture with overlay */}
        <div
          ref={imageRef}
          className="w-full h-full max-h-[637px] relative rounded-xl overflow-hidden"
        >
          <img
            src={profile}
            alt="Chris Quashie Profile"
            className="w-full h-full object-cover rounded-xl shadow-2xl ring-2 ring-blue-600 transition-transform duration-300 hover:scale-105"
          />

          {/* Info Badge Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 flex flex-wrap gap-2 rounded-b-xl">
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

        {/* About Content */}
        <div className="bg-[#171723] p-6 lg:p-12 rounded-xl flex flex-col gap-6 h-full">
          <Divider />
          <h1
            ref={headingRef}
            className="font-bold text-[26px] sm:text-[32px] lg:text-[40px] leading-tight"
          >
            IT Professional With a Passion For All Things Tech
          </h1>

          <p
            ref={paragraphRef}
            className="text-[16px] sm:text-[18px] lg:text-[20px] leading-relaxed overflow-y-auto"
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
              className="text-blue-400 cursor-pointer block mt-2"
              onClick={() => setReadMore(prev => !prev)}
            >
              {readMore ? 'Read Less' : 'Read More'}
            </span>
          </p>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/chris-quashie-b74299264"
            ref={buttonRef}
          >
            <button className="bg-blue-600 px-6 py-3 w-full sm:w-[300px] rounded-md font-semibold transition-all duration-500 hover:bg-blue-700">
              Let's Connect
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
