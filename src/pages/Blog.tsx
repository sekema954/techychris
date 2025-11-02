import { useState} from "react";
import useFetchBlogs from "../api/fetchblogs";
import { LoadingSpinner } from "../components/loading";
import pattern from '../assets/images/Frame.png'

const BlogHome = () => {
  const { blogs, isLoading } = useFetchBlogs();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 6;

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle Search submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Filter blogs by search term on submit
    const lower = searchTerm.toLowerCase();
    const results = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(lower) ||
        blog.categories?.some((cat) => cat.toLowerCase().includes(lower)) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(lower))
    );
    setFilteredBlogs(results);
    setSearchVal(searchTerm);
    setIsSearching(true);
  };

  // Handle "Show All" click - reset search & pagination
  const handleShowAll = () => {
    setIsSearching(false);
    setSearchTerm("");
    setSearchVal("");
    setCurrentPage(1);
  };

  // Pagination logic for full blogs list (only when not searching)
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="relative bg-[#2D2A41] min-h-screen text-white px-4 md:px-16 py-40">
      <img
        src={pattern}
        alt="background pattern"
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      />
      {/* Welcome Text */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to TechyChris Blogs</h1>
      <p className="mb-6 text-gray-300 max-w-xl">
        I write about IT trends, topics and modern mythologies. The best articles, links and news related to information technology
      </p>

      {/* Search Bar */}
      <div className="mb-10 max-w-lg">
        <form onSubmit={handleSubmit} className="flex overflow-hidden rounded-md bg-[#171723]">
          <input
            onChange={handleChange}
            value={searchTerm}
            type="text"
            placeholder="Search blogs here..."
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

        {/* Search Info & Show All */}
        {isSearching && (
          <div className="py-6 flex items-center gap-4">
            <p>
              {filteredBlogs.length} result{filteredBlogs.length !== 1 ? "s" : ""} for{" "}
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

      {/* Featured Posts */}
      <h2 className="text-xl font-semibold mb-6">Featured Posts:</h2>

      {blogs.length === 0 &&(
        <LoadingSpinner title="Blogs" />
      )}

      {isLoading &&(
        <LoadingSpinner title="Blogs" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Show filtered blogs if searching, else paginated blogs */}
        {(isSearching ? filteredBlogs : currentBlogs).map((blog, i) => (
          <a
            href={`/blogDetails/${blog._id}`}
            key={blog._id || i}
            className="bg-[#1E1C2E] rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={blog.thumbnail}
              alt="Blog Thumbnail"
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-base">{blog.title}</h3>
              <p className="text-sm text-gray-400">{blog.published_date}</p>
              <div className="flex justify-between text-sm">
                <button className="underline text-purple-300 hover:text-purple-200">Read more</button>
                <span className="text-gray-400">{blog.creator}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Pagination Controls only when NOT searching */}
      {!isSearching && blogs.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogHome;
