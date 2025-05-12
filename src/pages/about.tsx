import Subscribe from "../components/subscribe";
import { TimelineDemo } from "../sections/journey";

const services = [
  {
    id: 1,
    title: "Business Network & IT Infrastructure Setup",
    desc: "Build and secure network the right way.",
    context:
      "I provide tailored IT solutions for small and mid-sized businesses, including full network design, deployment and optimization services such as secure VPN setup, Wi-Fi optimization, cloud integration, and more.",
    sub_context:
      "Perfect for: Small businesses, remote teams, startups, clinics, and schools",
    icon: "💻",
  },
  {
    id: 2,
    title: "Tech Mentorship & Online Learning",
    desc: "Learn tech with guidance that makes sense.",
    context:
      "I offer personalized 1-on-1 mentorship, group coaching, and tech education for aspiring IT professionals. Whether you’re prepping for certifications like CCNA or just want to understand networking basics, I make complex topics simple.",
    sub_context:
      "Perfect for: Students, career switchers, beginners, and tech-curious entrepreneurs",
    icon: "🧠",
  },
  {
    id: 3,
    title: "Managed IT Support & Consulting",
    desc: "Ongoing Support, Without the Hassle.",
    context:
      "I provide flexible IT support packages for businesses that need help managing devices, fixing tech issues, or optimizing performance. Whether it’s a one-time fix or ongoing help, I’ve got you covered.",
    sub_context:
      "Includes: Remote troubleshooting, device setup, network checks, and software updates.",
    icon: "🛠️",
  },
  {
    id: 4,
    title: "Web Design & Development",
    desc: "Professional Websites That Work for You",
    context:
      "I build clean, responsive websites that reflect your brand and engage your audience. From personal portfolios to business sites and online stores, I handle the design, setup, and support so you don’t have to.",
    sub_context:
      "Includes: Custom design, business email setup, e-commerce integration, and mobile optimization.",
    icon: "🌐",
  },
];

const AboutPage = () => {
  return (
    <section className="bg-gray-950 text-white py-33 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate__animated animate__fadeInDown">
          My Services
        </h2>
        <p className="text-lg text-gray-300 mb-12 animate__animated animate__fadeInUp animate__delay-1s">
          I provide the latest IT gadgets, developer gear, and high-performance
          tools to help tech professionals power up their productivity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp animate__delay-${idx + 2}s`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-2 font-medium">{service.desc}</p>
              <p className="text-gray-400 mb-2 text-sm">{service.context}</p>
              <p className="text-gray-500 italic text-sm">{service.sub_context}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <TimelineDemo />
      </div>

      <div className="mt-20">
        <Subscribe />
      </div>
    </section>
  );
};

export default AboutPage;
