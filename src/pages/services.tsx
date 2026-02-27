//import Subscribe from "../components/subscribe";
import { FaYoutube, FaInstagram, FaTiktok, FaDiscord, FaLinkedin } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, CheckCircle2, CalendarDays, ClipboardList,
  Users, Star, Quote, Zap, Shield, Target, Trophy,
  BookOpen, MessageCircle, Clock, Laptop, HeartHandshake,
  TrendingUp, Award, Rocket, Briefcase, GraduationCap,
  DollarSign, Globe,
} from "lucide-react";
import pattern from "../assets/images/Frame.png";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.from(el.querySelectorAll("[data-anim]"), {
          opacity: 0, y: 36, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none none" },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* ─── data ─── */
  const steps = [
    {
      id: 1, title: "Fill Out the Google Form",
      description: "Start by sharing your background and goals so I can tailor the experience to you.",
      buttonText: "Open Form", link: "https://docs.google.com/forms/d/e/1FAIpQLSdcdfZ7zEQgINwQl3mK1hJ0sbmzaalU-I9YrjkItsBzcryD_Q/viewform",
      icon: <ClipboardList size={22} className="text-blue-400" />,
      badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      btn: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/30",
    },
    {
      id: 2, title: "Schedule Your Ideal Time",
      description: "Browse available slots and book a convenient time via Calendly.",
      buttonText: "Book on Calendly", link: "https://calendly.com/techychris",
      icon: <CalendarDays size={22} className="text-emerald-400" />,
      badge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      btn: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30",
    },
    {
      id: 3, title: "Join the Discord Community",
      description: "Connect with like-minded learners and get ongoing peer support.",
      buttonText: "Join Discord", link: "https://discord.gg/QgjVAsbQCH",
      icon: <Users size={22} className="text-violet-400" />,
      badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",
      btn: "bg-violet-600 hover:bg-violet-500 shadow-violet-900/30",
    },
  ];

  const whoIHelp = [
    {
      icon: <GraduationCap size={22} className="text-blue-400" />,
      title: "Aspiring IT Professionals",
      desc: "Just starting out? I'll map your path from zero to your first role in networking, cloud, or cybersecurity.",
      color: "blue",
    },
    {
      icon: <Briefcase size={22} className="text-emerald-400" />,
      title: "Entrepreneurs & Creators",
      desc: "Growing a tech brand or side business? Get strategy, systems, and content direction that actually works.",
      color: "emerald",
    },
    {
      icon: <Award size={22} className="text-violet-400" />,
      title: "Certification Candidates",
      desc: "Prep smarter for CCNA, Sec+, Net+, A+, and AWS CCP with structured study plans and mock exams.",
      color: "violet",
    },
  ];

  const stats = [
    { value: "500+", label: "Students Mentored",     icon: <Users size={20} className="text-blue-400" />,    color: "blue" },
    { value: "50+",  label: "Certifications Earned",  icon: <Trophy size={20} className="text-emerald-400" />, color: "emerald" },
    { value: "50K+", label: "Community Members",      icon: <Globe size={20} className="text-violet-400" />,  color: "violet" },
    { value: "95%",  label: "Satisfaction Rate",      icon: <Star size={20} className="text-amber-400" />,   color: "amber" },
  ];

  const testimonials = [
    { name: "Jordan M.",   role: "IT Intern → Full-Time",  stars: 5, feedback: "Chris helped me land my first tech job. His sessions were clear, actionable, and genuinely motivating. Worth every minute." },
    { name: "Alexa P.",    role: "Network Engineer",       stars: 5, feedback: "I finally understood networking thanks to his mentorship. Perfect for beginners who feel completely overwhelmed." },
    { name: "David R.",    role: "CCNA Certified",         stars: 5, feedback: "His guidance helped me pass my CCNA with confidence. Very insightful and easy to follow — highly recommend." },
    { name: "Samantha L.", role: "SOC Analyst",            stars: 5, feedback: "From resume tips to mock interviews, everything was spot on. I walked away confident and fully prepared." },
  ];

  const features = [
    { text: "1-on-1 Personalized Sessions",  icon: <Target size={13} /> },
    { text: "Group Coaching Options",         icon: <Users size={13} /> },
    { text: "Resume & Portfolio Review",      icon: <ClipboardList size={13} /> },
    { text: "Interview & Cert Prep",          icon: <Shield size={13} /> },
    { text: "Exclusive Community Access",     icon: <MessageCircle size={13} /> },
    { text: "Career Roadmap Planning",        icon: <TrendingUp size={13} /> },
    { text: "Real-World Lab Walkthroughs",    icon: <Laptop size={13} /> },
    { text: "Lifetime Resource Access",       icon: <BookOpen size={13} /> },
  ];

  const socials = [
    { icon: <FaTiktok />,    href: "https://www.tiktok.com/@_mbame",                              label: "TikTok",    hover: "hover:border-white/30 hover:text-white" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/techychriss/",                      label: "Instagram", hover: "hover:border-pink-500/40 hover:text-pink-400" },
    { icon: <FaYoutube />,   href: "https://www.youtube.com/channel/UCiCUVCHgNYouG-31lXZRjQA",   label: "YouTube",   hover: "hover:border-red-500/40 hover:text-red-400" },
    { icon: <FaDiscord />,   href: "https://discord.gg/QgjVAsbQCH",                               label: "Discord",   hover: "hover:border-indigo-500/40 hover:text-indigo-400" },
    { icon: <FaLinkedin />,  href: "https://www.linkedin.com/in/chris-quashie-b74299264",         label: "LinkedIn",  hover: "hover:border-blue-500/40 hover:text-blue-400" },
  ];

  const iconBg: Record<string, string> = {
    blue:    "bg-blue-500/10 border-blue-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    violet:  "bg-violet-500/10 border-violet-500/20",
    amber:   "bg-amber-500/10 border-amber-500/20",
  };

  const card = "bg-white/[0.03] border border-white/8 rounded-2xl transition-all duration-300";

  return (
    <div className="relative bg-[#060F1E] text-white min-h-screen overflow-hidden">
      <img src={pattern} alt="" aria-hidden
        className="pointer-events-none fixed inset-0 w-full h-full object-cover opacity-[0.04] z-0 mix-blend-luminosity" />
      <div className="pointer-events-none fixed top-0 inset-x-0 h-px z-10"
        style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }} />

      {/* ══ HERO ══ */}
      <div 
      ref={(el) => {sectionRefs.current[0] = el}}
        className="relative z-10 text-center max-w-6xl mx-auto px-6 pt-36 pb-24">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-15 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }} />

        <span data-anim className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
          <HeartHandshake size={11} /> Consulting & Mentorship
        </span>

        <h1 data-anim className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
          Elevate Your{" "}
          <span className="text-transparent bg-clip-text drop-shadow-[0_0_32px_rgba(96,165,250,0.4)]"
            style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8)" }}>
            Tech Career
          </span>
        </h1>

        <p data-anim className="text-xl text-white/52 max-w-2xl mx-auto mb-10 leading-relaxed">
          Mentorship, strategy, and real-world guidance to help you break into tech,
          ace certifications, and build long-term success.
        </p>

        <div data-anim className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://calendly.com/techychris" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 text-base">
            <Rocket size={16} /> Book a Free Intro Call
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a href="#steps"
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/65 hover:bg-white/5 hover:text-white hover:border-white/25 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base">
            See How It Works
          </a>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-16 xl:px-24 max-w-[1400px] mx-auto space-y-5 pb-24">

        {/* ══ STATS ══ */}
        <div 
        //ref={(el) => (sectionRefs.current[1] = el)}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} data-anim className={`${card} hover:border-white/14 hover:-translate-y-1 p-6 group`}>
              <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${iconBg[s.color]}`}>
                {s.icon}
              </div>
              <p className="text-3xl font-bold text-white tracking-tight">{s.value}</p>
              <p className="text-xs text-white/38 uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ══ CONSULTING INTRO + STEPS ══ */}
        <div 
        //ref={(el) => (sectionRefs.current[2] = el)}
          className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">

          {/* Consulting intro left */}
          <div data-anim className={`${card} p-8 flex flex-col justify-between gap-8`}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1.5 h-5 rounded-full bg-blue-500" />
                <h2 className="font-bold text-2xl">Consulting & Mentorship</h2>
              </div>
              <p className="text-white/52 text-base leading-relaxed mb-8">
                Whether you're breaking into tech, growing a business, or preparing for certifications —
                I help you execute with clarity and confidence. Real guidance from someone who's been in the field.
              </p>
              {/* Who I help */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {whoIHelp.map((w, i) => (
                  <div key={i} className="group flex flex-col gap-3 bg-white/[0.025] hover:bg-white/[0.05] border border-white/6 hover:border-white/14 rounded-xl p-4 transition-all duration-200">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${iconBg[w.color]}`}>
                      {w.icon}
                    </div>
                    <h4 className="font-semibold text-sm text-white/85 group-hover:text-white transition-colors">{w.title}</h4>
                    <p className="text-xs text-white/42 leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps right */}
          <div id="steps" data-anim className={`${card} p-7`}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
              <h2 className="font-bold text-xl">How It Works</h2>
            </div>
            <div className="flex flex-col gap-1">
              {steps.map((step, i) => (
                <div key={i} className="relative flex gap-3">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[17px] top-10 h-8 w-px bg-white/10" />
                  )}
                  <div className={`w-9 h-9 rounded-xl border flex-shrink-0 flex items-center justify-center z-10 ${step.badge}`}>
                    {step.icon}
                  </div>
                  <div className="pb-6 flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${step.badge.split(" ")[2]}`}>Step {step.id}</p>
                    <h3 className="font-semibold text-sm text-white/85 mb-1">{step.title}</h3>
                    <p className="text-xs text-white/42 leading-relaxed mb-3">{step.description}</p>
                    <a href={step.link} target="_blank" rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-1.5 ${step.btn} text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all duration-200 shadow-lg`}>
                      {step.buttonText}
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FEATURES + TESTIMONIALS ══ */}
        <div 
        //ref={(el) => (sectionRefs.current[3] = el)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Everything you get */}
          <div data-anim className={`${card} p-7`}>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-blue-400" />
              </div>
              <h2 className="font-bold text-xl">Everything You Get</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white/[0.025] border border-white/6 hover:border-blue-500/20 hover:bg-white/[0.045] rounded-xl px-3.5 py-2.5 transition-all duration-200 group">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs text-white/62 group-hover:text-white/88 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div data-anim className={`${card} p-7`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5 rounded-full bg-amber-400" />
                <h2 className="font-bold text-xl">What People Say</h2>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}
                <span className="text-white/35 text-xs ml-1.5">4.9</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {testimonials.map((t, i) => (
                <div key={i}
                  className="bg-white/[0.025] border border-white/6 hover:border-white/12 rounded-xl p-4 transition-all duration-200 group flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Quote size={14} className="text-blue-400/40" />
                    <div className="flex gap-px">
                      {[...Array(t.stars)].map((_, j) => <Star key={j} size={9} className="text-amber-400 fill-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-white/52 text-xs leading-relaxed flex-1 group-hover:text-white/72 transition-colors">"{t.feedback}"</p>
                  <div className="flex items-center gap-2 pt-2 border-t border-white/6">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/25 flex items-center justify-center text-[11px] font-bold text-blue-300 flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white/72 truncate">{t.name}</p>
                      <p className="text-[10px] text-white/35">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FINAL CTA ══ */}
        <div 
        //ref={(el) => (sectionRefs.current[4] = el)}
          className="relative rounded-2xl border border-white/8 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{ background: "radial-gradient(ellipse at 30% 0%, #3B82F6, transparent 60%)" }} />
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }} />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Copy */}
            <div data-anim className="p-10 lg:p-14 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 w-fit">
                <Zap size={10} /> Stay in the Loop
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                Ready to Transform Your{" "}
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8)" }}>
                  Tech Career?
                </span>
              </h2>
              <p className="text-white/48 text-sm leading-relaxed mb-7 max-w-sm">
                Subscribe for free tips, certification guides, and early access to courses and events.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  { icon: <Clock size={13} className="text-blue-400" />,    text: "Weekly IT & networking tutorials" },
                  { icon: <Shield size={13} className="text-emerald-400" />, text: "Certification study guides" },
                  { icon: <DollarSign size={13} className="text-violet-400" />, text: "Early course & event access" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/52">
                    {item.icon} {item.text}
                  </li>
                ))}
              </ul>
              <a href="https://calendly.com/techychris" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/40 w-fit hover:-translate-y-0.5">
                <Rocket size={15} /> Book Your Session Now
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Subscribe */}
            <div data-anim className="p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-white/8 flex items-center">
              <div className="w-full">
                {/**<Subscribe />**/}
              </div>
            </div>
          </div>
        </div>

        {/* ══ SOCIALS ══ */}
        <div 
        //ref={(el) => (sectionRefs.current[5] = el)}
          className={`${card} p-8`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div data-anim>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-5 rounded-full bg-pink-500" />
                <h3 className="font-bold text-xl">Follow the Journey</h3>
              </div>
              <p className="text-white/40 text-sm ml-3.5">Daily tips, tutorials, and behind-the-scenes content.</p>
            </div>
            <div data-anim className="flex flex-wrap justify-center sm:justify-end gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.025] border border-white/8 text-white/48 text-sm font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${s.hover}`}>
                  <span className="text-base">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;