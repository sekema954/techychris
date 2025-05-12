//Career Rectangle

import { Career } from "../constants/career";

const CareerRectangle = () => {
    return(
        //Container
        <div className="absolute bottom-0 lg:h-[100px] w-full bg-[#171723] flex lg:flex-row flex-col items-center gap-15 lg:gap-0 justify-between px-10 py-5 lg:py-0">
            {Career.map((stat)=>(
                <div key={stat.id} className="flex items-center justify-center">
                    <h1 className="text-4xl font-bold">{stat.value}</h1>
                    <h4 className="w-30 text-center">{stat.title}</h4>
                </div>
            ))}

        </div>
    )
}

export default CareerRectangle;