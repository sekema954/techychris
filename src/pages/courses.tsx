import { useState } from "react";
import { LoadingSpinner } from "../components/loading";
import { useFetchCourses } from "../api/fetchcourses";
import { CourseCard } from "../components/courseCard";
import pattern from '../assets/images/Frame.png'

const Courses = () => {
  const { courses, isLoading } = useFetchCourses();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 6;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle Search submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const lower = searchTerm.toLowerCase();
    const results = courses.filter(
      (course) =>
        course.title?.toLowerCase().includes(lower) ||
        course.instructor?.toLowerCase().includes(lower) ||
        course.tags?.some((tag: string) => tag.toLowerCase().includes(lower))
    );
    setFilteredCourses(results);
    setSearchVal(searchTerm);
    setIsSearching(true);
  };

  // Handle "Show All"
  const handleShowAll = () => {
    setIsSearching(false);
    setSearchTerm("");
    setSearchVal("");
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="relative bg-[#2D2A41] min-h-screen text-white px-4 md:px-16 py-40">
      {/* Header */}

        {/* Pattern background */}
      <img
        src={pattern}
        alt="background pattern"
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Courses</h1>
      <p className="mb-6 text-gray-300 max-w-xl">
        Learn from industry professionals and gain hands-on experience in
        technology, design, and development. Find your next skill today!
      </p>

      {/* Search Bar */}
      <div className="mb-10 max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="flex overflow-hidden rounded-md bg-[#171723]"
        >
          <input
            onChange={handleChange}
            value={searchTerm}
            type="text"
            placeholder="Search courses..."
            className="flex-grow px-4 py-3 bg-transparent text-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 transition disabled:bg-blue-600/60"
            disabled={!searchTerm.trim()}
          >
            Search
          </button>
        </form>

        {/* Search Info */}
        {isSearching && (
          <div className="py-6 flex items-center gap-4">
            <p>
              {filteredCourses.length} result
              {filteredCourses.length !== 1 ? "s" : ""} for{" "}
              <span className="font-bold text-red-300">{searchVal}</span>
            </p>
            <button
              onClick={handleShowAll}
              className="underline text-blue-400 hover:text-blue-600"
            >
              Show All
            </button>
          </div>
        )}
      </div>

      {/* Course Grid */}
      <h2 className="text-xl font-semibold mb-6">Available Courses:</h2>

      {(isLoading || courses.length === 0) && (
        <LoadingSpinner title="Courses" />
      )}

      {/* No Courses Available */}
      {!isLoading && courses.length <= 0 && (
        <div className="w-full text-center">
          <h2 className="text-2xl font-semibold mb-3">Courses Coming Soon!</h2>
          <p className="text-gray-300 max-w-md mx-auto">
            Our team is currently working hard to bring you the best learning experiences.  
            Check back soon for exciting new courses!
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-5">
        {(isSearching ? filteredCourses : currentCourses).map((course: any, i: number) => (
          <a href={course.link} key={course._id || i} target="_blank" rel="noopener noreferrer">
            <CourseCard
              title={course.title}
              instructor={course.instructor}
              sypnosis={course.sypnosis}
              ratings={course.rating}
              price={course.price}
              discount={course.discount}
              tags={course.tage || course.tags}
              link={course.link}
              thumbnail={course.thumbnail}
            />
          </a>
        ))}
      </div>

      {/* Pagination */}
      {!isSearching && courses.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Courses;
