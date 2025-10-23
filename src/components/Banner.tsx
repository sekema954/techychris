//banner.tsx

import { useState } from "react";
import abstractDesign from '../assets/images/Abstract Design.png'

export const Banner = () => {
    const [click, setClick] = useState<boolean>(false);
    return(
        <header 
        style={{
            backgroundImage: `url(${abstractDesign})`
        }}
        className={`flex py-4 text-center lg:justify-center px-5 relative ${click ? 'hidden' : 'flex'}`}>
            <p className="text-sm">✨Discover Your Next IT Solution with TechyChris <a className="text-purple-100 text-center" href="/services" aria-label="" about="Learn more">Learn more</a></p>
            <div>
                <span onClick={()=>setClick(!click)} 
                    className="w-5 h-5 rounded-full bg-white text-black flex items-center 
                        justify-center lg:absolute right-5 font-bold cursor-pointer transition-all
                        duration-[0.5s] hover:w-6 hover:h-6"
                    >
                    &times;
                </span>
            </div>

        </header>
    )
};