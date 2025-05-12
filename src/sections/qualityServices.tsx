import Divider from "../components/divider";
import { Services } from "../constants/services";
import { CardSpotlight } from "../components/ui/card-spotlight";

const Quality_Services = () => {
  return (
    <section className="bg-[#2F2B45] py-20 text-white">
      <header className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-[#CD9EFD] text-[48px] sm:text-[60px] font-extrabold mb-4 leading-tight">
          My Quality Services
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl">
          Offering reliable, efficient, and tailored solutions to meet your business and technical needs — crafted with precision and built for performance.
        </p>
      </header>

      {/* services cards */}
      <div className="flex justify-center mt-16 px-4">
        <div className="grid gap-10 grid-cols-1  lg:grid-cols-3 max-w-7xl w-full">
          {Services.map((service) => (
            <CardSpotlight
              key={service.id}
              className="relative bg-[#171723] max-w-full min-h-[500px] rounded-2xl transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
            >
              <Divider />
              <div className="flex flex-col items-center text-center gap-6 py-10 px-6">
                <img
                  className="w-16 h-16"
                  src={service.icon}
                  alt={service.title}
                  aria-label={service.title}
                />
                <h2 className="text-[24px] sm:text-[28px] font-bold text-white">
                  {service.title}
                </h2>
                <p className="text-[18px] text-gray-400">{service.context}</p>
              </div>
            </CardSpotlight>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quality_Services;
