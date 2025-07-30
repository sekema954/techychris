import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Contact = () => {
  const actions = [
    {
      title: 'Google Form',
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSdcdfZ7zEQgINwQl3mK1hJ0sbmzaalU-I9YrjkItsBzcryD_Q/viewform',
      description: 'Start by filling out the Google Form so we can better understand your needs.',
    },
    {
      title: 'Schedule on Calendly',
      link: 'https://calendly.com/techychris',
      description: 'Pick a time that works best for you to connect.',
    },
    {
      title: 'Join Discord',
      link: 'https://discord.com/channels/1397433141949366394/1397433142838562828',
      description: 'Join the community for support and updates.',
    },
  ];

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#1D1B2E] to-[#262244] py-20 px-6 flex items-center justify-center">
      <div
        className={`max-w-6xl w-full bg-white rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden
          transition-all duration-700 ease-in-out transform 
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Left Side */}
        <div className="lg:col-span-7 p-12 md:p-20 flex flex-col justify-center gap-12 bg-gradient-to-br from-indigo-50 to-blue-100">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 tracking-tight">
              Let’s Get You Connected
            </h1>
            <p className="text-indigo-700 text-lg max-w-lg">
              Choose one of the options below to get started. I'm here to support you every step of the way!
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {actions.map((action, idx) => (
              <a
                key={idx}
                href={action.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl shadow-lg py-6 px-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row md:items-center md:justify-between border border-transparent hover:border-indigo-400"
              >
                <div className="mb-3 md:mb-0">
                  <h2 className="text-indigo-900 text-xl font-semibold group-hover:text-indigo-700 transition-colors">
                    {action.title}
                  </h2>
                  <p className="text-indigo-600 mt-1 max-w-md">{action.description}</p>
                </div>

                <div
                  className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-all duration-300"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-5 bg-indigo-900 flex items-center justify-center p-12 rounded-tr-3xl rounded-br-3xl relative overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            className="w-full max-w-sm opacity-70"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <circle cx="200" cy="200" r="180" strokeOpacity="0.1" />
            <path d="M150 180h100v40H150zM180 140h40v40h-40z" strokeOpacity="0.3" />
            <circle cx="200" cy="200" r="80" strokeOpacity="0.3" />
            <path d="M120 320l160-160" strokeOpacity="0.3" />
          </svg>
          <span className="absolute bottom-6 right-6 text-indigo-400 italic text-sm select-none">
            Connect & Collaborate
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
