interface PropHeader{
    title:string;
    buttonText:string;
    subContext:string;
    buttonLink:string;
};

import star from '../assets/images/stars.png';

export const SectionHeader = ({ title, buttonText, subContext, buttonLink }: PropHeader) => {
  return (
    <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex flex-col gap-3">
        <img className="w-[68px] h-[34px]" src={star} alt="estatein" aria-label="estatein" />
        <h1 className="font-semibold lg:text-[48px] text-[28px]">{title}</h1>
        <p className="text-[#999999] font-medium text-[18px]">{subContext}</p>
      </div>

      <a href={buttonLink} aria-label="estatein" className="mt-4 lg:mt-0">
        <button className="px-3 w-full sm:w-[140px] md:w-[160px] lg:w-[196px] h-[50px] sm:h-[44px] bg-blue-600 border border-[#363636] rounded-lg text-white font-medium transition-all duration-500 hover:bg-blue-700">
          {buttonText}
        </button>
      </a>
    </header>
  );
};


export const servicesHeader = [
  {
    id: 1,
    title: "Our Expert Solutions",
    subContext: "Delivering reliable, efficient, and customized IT solutions tailored to your business needs — engineered with precision and built for performance.",
    buttonText: "View All Services",
    buttonLink: "/services",
  },
];

export const blogsHeader = [
  {
    id: 1,
    title: "Latest Insights & Updates",
    subContext: "Stay informed on emerging IT trends, innovations, and practical insights to keep your business ahead of the curve.",
    buttonText: "Read Our Blog",
    buttonLink: "/blog",
  },
];

export const videosHeader = [
  {
    id: 1,
    title: "Featured Videos",
    subContext: "Watch our latest tutorials, tech insights, and project showcases from our YouTube channel to stay inspired and informed.",
    buttonText: "Watch Now",
    buttonLink: "/videos",
  },
];



export const FAQHeader = [
     {
        id:1, 
        title:"Frequently Asked Questions", 
        subContext:"Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way.",
        buttonText:"View All FAQ'S",
        buttonLink:"/FAQ's"
    }
];