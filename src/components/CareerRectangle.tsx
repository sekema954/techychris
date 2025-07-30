import { Career } from "../constants/career";
import CountUp from "react-countup";

const CareerRectangle = () => {
  return (
    <div className="absolute bottom-0 lg:h-[100px] w-full bg-[#171723] flex lg:flex-row flex-col items-center gap-6 lg:gap-0 justify-between px-10 py-5 lg:py-0">
      {Career.map((stat) => (
        <div key={stat.id} className="flex flex-col items-center justify-center text-white">
          <h1 className="text-2xl font-bold">
            {stat.title === "Supporters Across all Platforms" ? (
              <>
                <CountUp
                  end={stat.value / 1000}
                  decimals={stat.value % 1000 !== 0 ? 1 : 0}
                  duration={15}
                />
                k+
              </>
            ) : (
              <CountUp end={stat.value} duration={15} separator="," suffix="+" />
            )}
          </h1>
          <h4 className="w-37 text-center">{stat.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default CareerRectangle;
