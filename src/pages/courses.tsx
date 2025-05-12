import useFetchCourses from "../api/fetchcourses";
import ComingSoon from "./comingSoon";

const CoursePage = () => {
  const { isLoading, courses } = useFetchCourses();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col py-34">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-800 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-5xl font-extrabold z-10 relative text-white animate__animated animate__fadeIn">
          Welcome to the Ultimate Learning Hub
        </h1>
        <p className="mt-4 text-lg z-10 relative text-white animate__animated animate__fadeIn animate__delay-1s">
          Learn, grow, and succeed with our top-notch courses designed to accelerate your career!
        </p>
      </header>

      {/* Courses Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading courses...</p>
        ) : courses.length === 0 ? (
          <ComingSoon />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="px-3 py-3 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover bg-gray-400/20 rounded-xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                  <p className="text-gray-400 mt-2">{course.description}</p>
                  <a
                    href={course.courseUrl}
                    className="mt-4 inline-block py-2 px-4 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-300"
                  >
                    Watch Course →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursePage;
