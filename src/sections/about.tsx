import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profile from '../assets/images/heroimage.webp';
import Divider from '../components/divider';
import { Briefcase, GraduationCap, ShieldCheck, Server, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [readMore, setReadMore] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const badgesRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const badges = [
    { label: 'CEO', icon: <Briefcase size={14} /> },
    { label: 'B.S. Information Technology', icon: <GraduationCap size={14} /> },
    { label: 'M.S. Cybersecurity', icon: <ShieldCheck size={14} /> },
    { label: 'CCNA · SEC+ · NET+ · A+ · AWS CCP', icon: <Server size={14} /> },
  ];

  const stats = [
    { value: '10+', label: 'Years in IT' },
    { value: '50K+', label: 'Community Members' },
    { value: '5+', label: 'Certifications' },
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
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tl.from(imageRef.current, { opacity: 0, x: -60, scale: 0.97 })
        .from(badgesRef.current?.children ?? [], { opacity: 0, y: 16, stagger: 0.08 }, '-=0.5')
        .from(headingRef.current, { opacity: 0, y: 32 }, '-=0.6')
        .from(paragraphRef.current, { opacity: 0, y: 24 }, '-=0.5')
        .from(statsRef.current?.children ?? [], { opacity: 0, y: 20, stagger: 0.1 }, '-=0.5')
        .from(buttonRef.current, { opacity: 0, y: 12 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover parallax
  useEffect(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(image, {
        rotationY: x * 8,
        rotationX: -y * 8,
        scale: 1.04,
        transformPerspective: 900,
        transformOrigin: 'center',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.7,
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
      className="relative bg-[#060F1E] text-white py-20 px-5 lg:px-24 overflow-hidden"
    >
      {/* Background accent: diagonal stripe */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[2px] opacity-20"
        style={{ background: 'linear-gradient(to right, transparent, #3B82F6, transparent)' }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full max-w-7xl mx-auto">

        {/* ── Left column: image + badges ── */}
        <div className="flex flex-col gap-5">
          <div
            ref={imageContainerRef}
            className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
            style={{ perspective: '1000px', aspectRatio: '4/5', maxHeight: 560 }}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl z-0" />

            <img
              ref={imageRef}
              src={profile}
              alt="Chris Quashie"
              loading="lazy"
              className="relative z-10 w-full h-full object-cover object-top rounded-2xl shadow-2xl ring-1 ring-white/10 will-change-transform"
              style={{ aspectRatio: '4/5' }}
            />

            {/* Subtle dark vignette at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl z-20"
              style={{ background: 'linear-gradient(to top, rgba(6,15,30,0.85), transparent)' }}
            />
          </div>

          {/* Badges below image */}
          <div ref={badgesRef} className="flex flex-wrap gap-2">
            {badges.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full backdrop-blur-sm hover:bg-blue-600/30 hover:border-blue-500/50 hover:text-white transition-all duration-300"
              >
                <span className="text-blue-400">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column: text content ── */}
        <div className="flex flex-col gap-7 pt-2">
          <Divider />

          <h1
            ref={headingRef}
            className="font-bold text-[28px] sm:text-[34px] lg:text-[42px] leading-[1.15] tracking-tight"
          >
            IT Professional With a{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #60A5FA, #3B82F6)' }}>
              Passion for All Things Tech
            </span>
          </h1>

          <p
            ref={paragraphRef}
            className="text-[16px] sm:text-[17px] leading-relaxed text-white/70"
          >
            I'm Chris Quashie — a network engineer, technology educator, and content creator
            with a passion for making complex IT concepts accessible. With certifications
            including CCNA, Security+, Network+, A+, and AWS Cloud Practitioner, I specialize
            in enterprise networking, cybersecurity, and cloud technologies, with deep expertise
            in SD-WAN, Wireless, Routing, Switching, and IT infrastructure.

            {readMore && (
              <span className="block mt-4 text-white/70">
                As a content creator, I run a tech-focused YouTube and TikTok channel where I
                break down networking, cybersecurity, and IT topics in a way that's engaging and
                easy to understand. My goal is to educate and inspire others looking to start or
                advance their careers in IT.
              </span>
            )}

            <button
              onClick={() => setReadMore(prev => !prev)}
              className="mt-3 flex items-center gap-1 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors"
            >
              {readMore ? 'Read Less' : 'Read More'}
              <ArrowUpRight
                size={14}
                className={`transition-transform duration-300 ${readMore ? 'rotate-180' : ''}`}
              />
            </button>
          </p>

          {/* Stats row */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 border-y border-white/8 py-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-2xl sm:text-3xl font-bold text-blue-400 tracking-tight">{stat.value}</span>
                <span className="text-xs sm:text-sm text-white/50 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>

          <a
            ref={buttonRef}
            href="https://www.linkedin.com/in/chris-quashie-b74299264"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl w-full sm:w-auto transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-600/40 hover:-translate-y-0.5"
          >
            Let's Connect
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;