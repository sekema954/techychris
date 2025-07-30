import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Divider from "../components/divider";
import { Services } from "../constants/services";
import { CardSpotlight } from "../components/ui/card-spotlight";

gsap.registerPlugin(ScrollTrigger);

const Quality_Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0F0F1B] py-24">
      <header className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-white text-[40px] sm:text-[56px] font-extrabold mb-4 leading-tight">
          My Quality Services
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl">
          Offering reliable, efficient, and tailored solutions to meet your business and technical needs — crafted with precision and built for performance.
        </p>
      </header>

      <div className="flex justify-center mt-20 px-4">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 max-w-7xl w-full">
      {Services.map((service, index) => (
            <CardSpotlight
              key={service.id}
              className="relative bg-gradient-to-br from-[#1f1c2c] via-[#403A60] to-[#2a0845] rounded-3xl border border-white/10 shadow-xl hover:scale-[1.03] hover:shadow-purple-700/40 transition-transform duration-300"
              ref={(el: HTMLDivElement) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <Divider />
              <div className="flex flex-col items-center text-center gap-6 py-10 px-6">
                <img
                  className="w-16 h-16"
                  src={service.icon}
                  alt={service.title}
                />
                <h2 className="text-[22px] sm:text-[26px] font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
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
