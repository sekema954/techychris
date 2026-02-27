//import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Divider from "../components/divider";
import { Services } from "../constants/services";
import { CardSpotlight } from "../components/ui/card-spotlight";
import { SectionHeader, servicesHeader } from "../components/sectionHeader";
import pattern from "../assets/images/Frame.png";
//import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Quality_Services = () => {

  {/** *
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
    gsap.from(cardsRef.current.filter(Boolean), {
      opacity: 0,
      y: 48,
      duration: 0.85,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        once:true,
        toggleActions: "play none none none",
      },
    });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  **/}

  return (
    <section
      //ref={sectionRef}
      className="relative bg-[#060F1E] py-24 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <img
        src={pattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.05] z-0 mix-blend-luminosity"
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #6366F1, transparent 70%)" }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }}
      />

      <div className="relative z-10 px-4 lg:px-20 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-white mb-14">
          {servicesHeader.map((s, i) => (
            <SectionHeader
              key={i}
              title={s.title}
              buttonText={s.buttonText}
              subContext={s.subContext}
              buttonLink={s.buttonLink}
            />
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Services.map((service, _) => (
            <CardSpotlight
              key={service.id}
              className="group relative rounded-2xl border border-white/8 hover:border-blue-500/30 bg-white/[0.03] hover:bg-white/[0.055] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/50 overflow-hidden"
              //ref={(el: HTMLDivElement) => {
                //if (el) cardsRef.current[index] = el;
             // }}
            >
              {/* Top edge accent on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Subtle corner glow */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500"
                style={{ background: "radial-gradient(circle, #3B82F6, transparent)" }}
              />

              <div className="flex flex-col items-center text-center gap-5 py-10 px-8 text-white">
                <Divider />

                {/* Icon container */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-300">
                    <img
                      className="w-8 h-8 object-contain"
                      src={service.icon}
                      alt={service.title}
                    />
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-blue-300 transition-colors duration-200">
                  {service.title}
                </h2>

                <p className="text-sm text-white/55 leading-relaxed group-hover:text-white/70 transition-colors duration-200">
                  {service.context}
                </p>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality_Services;