import { useState, useEffect } from "react";
import useFetchBlogs from "../api/fetchblogs";

const BlogHome = () => {
  const { blogs } = useFetchBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const handleChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // Run search and update filtered blogs whenever searchTerm changes
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const results = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(lower) ||
        blog.categories?.some((cat) => cat.toLowerCase().includes(lower)) ||
        blog.tags?.some((tag) => tag.toLowerCase().includes(lower))
    );
    setFilteredBlogs(results);
  }, [searchTerm, blogs]); // Trigger on search term or blog data change

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#2D2A41] min-h-screen text-white px-4 md:px-16 py-40">
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
            className="px-5 py-3 bg-[#3E3A59] hover:bg-[#5e5783] transition disabled:bg-gray-500"
            disabled={!searchTerm}
          >
            Search
          </button>
        </form>
      </div>

      {/* Featured Posts */}
      <h2 className="text-xl font-semibold mb-6">Featured Posts:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, i) => (
            <a href={`/blogDetails/${blog.id}`} key={i} className="bg-[#1E1C2E] rounded-lg overflow-hidden shadow-md">
              <img
                src={blog.thumbnail || "https://via.placeholder.com/400x200.png?text=Blog+Image"}
                alt="Blog Thumbnail"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-base">{blog.title}</h3>
                <p className="text-sm text-gray-400">{blog.published_date}</p>
                <div className="flex justify-between text-sm">
                  <button className="underline hover:text-gray-300">Read more</button>
                  <span className="text-gray-400">{blog.creator}</span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400">No blogs found</p>
        )}
      </div>
    </section>
  );
};

export default BlogHome;
