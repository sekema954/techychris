export const ViewCourses = () => {
    return(
        <div className="bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="relative overflow-hidden bg-gradient-to-r from-cyan-700 via-blue-700 to-indigo-800 text-white py-24 px-6 text-center flex flex-col items-center justify-center">
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                {/* Animated floating elements (decorative dots) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-cyan-400 rounded-full blur-sm animate-pulse"></div>
                    <div className="absolute bottom-[25%] right-[15%] w-2 h-2 bg-blue-300 rounded-full blur-[1px] animate-bounce"></div>
                    <div className="absolute top-[40%] right-[30%] w-4 h-4 bg-indigo-400 rounded-full blur-md animate-ping"></div>
                </div>

                {/* Header text */}
                <h1 className="relative z-10 font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight drop-shadow-lg animate__animated animate__fadeInDown">
                    Welcome to the <span className="text-cyan-300">Ultimate Learning Hub</span>
                </h1>

                <p className="relative z-10 mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-gray-100 animate__animated animate__fadeInUp animate__delay-1s">
                    Learn, grow, and succeed with our expertly crafted courses designed to
                    accelerate your career and help you master in-demand skills.
                </p>

                {/* Call-to-action */}
                <a
                    href="/"
                    className="relative z-10 mt-8 px-8 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-lg shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
                >
                    Explore Courses
                </a>
            </header>
        </div>
    )
}