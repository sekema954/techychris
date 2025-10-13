import Subscribe from "../components/subscribe";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  
  gsap.registerPlugin(ScrollTrigger);
  
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    testimonialRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);
  

  const steps = [
    {
      id: 1,
      title: "Fill Out the Google Form",
      description: "Start by providing your info so I can better understand your needs.",
      buttonText: "Google Form",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdcdfZ7zEQgINwQl3mK1hJ0sbmzaalU-I9YrjkItsBzcryD_Q/viewform",
    },
    {
      id: 2,
      title: "Schedule Your Ideal Time",
      description: "Choose a convenient time slot for our session using Calendly.",
      buttonText: "Schedule on Calendly",
      link: "https://calendly.com/techychris",
    },
    {
      id: 3,
      title: "Join the Discord Community",
      description: "Connect with like-minded learners and receive support.",
      buttonText: "Join Discord",
      link: "https://discord.gg/QgjVAsbQCH",
    },
  ];

  const features = [
    "1-on-1 Personalized Guidance",
    "Group Coaching Options",
    "Resume & Portfolio Review",
    "Interview & Certification Prep",
    "Exclusive Community Access",
  ];

  const testimonials = [
    {
      name: "Jordan M.",
      feedback: "Chris helped me land my first tech internship. His sessions were clear, actionable, and motivating.",
    },
    {
      name: "Alexa P.",
      feedback: "I finally understood networking thanks to his mentorship. 10/10 recommend for beginners!",
    },
    {
      name: "David R.",
      feedback: "His guidance helped me pass my CCNA exam with confidence. Very insightful and easy to follow.",
    },
    {
      name: "Samantha L.",
      feedback: "From resume tips to mock interviews, everything was spot on. Super grateful for the help!",
    },
  ];

  return (
    <section className="bg-gray-950 text-white py-32 px-6 md:px-12 min-h-screen">
      <div className=" text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Consulting & Mentorship</h2>
        <p className="text-lg text-gray-300 mb-12">
          Whether you're breaking into tech, growing a business, or just need expert guidance — I’ve got you covered.
        </p>

        {/* Steps */}
        <div className="space-y-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-[#1e1e2f] border border-[#2e2e4d] rounded-2xl p-6 text-left shadow-md hover:border-purple-500 transition-all"
            >
              <h3 className="text-xl font-bold text-purple-400 mb-2">Step {step.id}: {step.title}</h3>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <a
                href={step.link}
                target="_blank"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
              >
                {step.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* What You Get */}
        <div className="mt-20 text-left">
          <h3 className="text-2xl font-bold text-white mb-4">What You’ll Get:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {features.map((item, index) => (
              <li key={index} className="pl-2">{item}</li>
            ))}
          </ul>
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-left">
          <h3 className="text-2xl font-bold text-white mb-6">What Others Are Saying:</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div
                key={i}
                ref={(el) => {
                  testimonialRefs.current[i] = el;
                }}                
                className="bg-[#1e1e2f] border border-[#2e2e4d] rounded-xl p-6 shadow-md opacity-0 transform translate-y-4"
              >
                <p className="text-gray-300 italic mb-4">"{t.feedback}"</p>
                <p className="text-purple-400 font-semibold">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Socials */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-4">Follow My Socials</h3>
          <div className="flex justify-center space-x-6 text-3xl text-white">
            <a href="https://www.tiktok.com/@_mbame" className="hover:text-purple-400 transition"><FaTiktok /></a>
            <a href="https://www.instagram.com/techychriss/" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://www.youtube.com/channel/UCiCUVCHgNYouG-31lXZRjQA" className="hover:text-red-600 transition"><FaYoutube /></a>
          </div>
        </div>

        {/* CTA + Subscribe */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Ready to Elevate Your Tech Journey?</h3>
          <p className="text-gray-300 mb-6">Subscribe for free tips, tools, and early access to events.</p>
          <Subscribe />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
