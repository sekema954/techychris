import { useState } from "react";
import useFetchBlogs from "../api/fetchblogs";
import { LoadingSpinner } from "../components/loading";
import pattern from "../assets/images/Frame.png";
import { Search, X, ArrowRight, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

const BlogHome = () => {
  const { blogs, isLoading } = useFetchBlogs();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 6;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const lower = searchTerm.toLowerCase();
    const results = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(lower) ||
        blog.categories?.some((cat: string) => cat.toLowerCase().includes(lower)) ||
        blog.tags?.some((tag: string) => tag.toLowerCase().includes(lower))
    );
    setFilteredBlogs(results);
    setSearchVal(searchTerm);
    setIsSearching(true);
  };

  const handleShowAll = () => {
    setIsSearching(false);
    setSearchTerm("");
    setSearchVal("");
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const displayedBlogs = isSearching ? filteredBlogs : currentBlogs;

  return (
    <section className="relative bg-[#060F1E] min-h-screen text-white px-4 md:px-16 py-32 overflow-hidden">
      {/* Background */}
      <img
        src={pattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.05] z-0 mix-blend-luminosity"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Hero Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            TechyChris Blogs
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
            Tech Insights &{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #60A5FA, #818CF8)" }}
            >
              Deep Dives
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            IT trends, networking guides, and modern tech mythologies — written for practitioners, by a practitioner.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500/50 focus-within:bg-white/8 transition-all duration-200">
            <div className="pl-4 text-white/30">
              <Search size={16} />
            </div>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search by title, category, or tag…"
              className="flex-grow px-3 py-3.5 bg-transparent text-white text-sm placeholder-white/30 focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="px-3 text-white/30 hover:text-white/60 transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="px-5 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 disabled:text-white/30 text-white text-sm font-semibold transition-all duration-200"
            >
              Search
            </button>
          </form>

          {isSearching && (
            <div className="flex items-center gap-3 mt-4 text-sm text-white/60">
              <span>
                <span className="text-white font-medium">{filteredBlogs.length}</span> result{filteredBlogs.length !== 1 ? "s" : ""} for{" "}
                <span className="text-blue-400 font-semibold">"{searchVal}"</span>
              </span>
              <button
                onClick={handleShowAll}
                className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
              >
                <X size={12} /> Clear
              </button>
            </div>
          )}
        </div>

        {/* Section label */}
        {!isSearching && (
          <div className="flex items-center gap-4 mb-7">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/40">
              Featured Posts
            </h2>
            <div className="flex-1 h-px bg-white/8" />
          </div>
        )}

        {/* Loading */}
        {(isLoading || blogs.length === 0) && !isSearching && (
          <LoadingSpinner title="Blogs" />
        )}

        {/* Empty search state */}
        {isSearching && filteredBlogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/40">
            <Search size={40} className="opacity-30" />
            <p className="text-lg">No results found for <span className="text-white/60 font-semibold">"{searchVal}"</span></p>
            <button onClick={handleShowAll} className="text-blue-400 hover:text-blue-300 text-sm underline underline-offset-2 transition-colors">
              Browse all posts
            </button>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedBlogs.map((blog, i) => (
            <a
              href={`/blogDetails/${blog._id}`}
              key={blog._id || i}
              className="group flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/50"
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,15,30,0.6), transparent 60%)" }}
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
                  {blog.title}
                </h3>
                <p className="text-white/50 text-sm line-clamp-2 leading-relaxed flex-1">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between text-xs text-white/35 pt-2 border-t border-white/8">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {blog.published_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={11} />
                    {blog.creator}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        {!isSearching && blogs.length > blogsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-all duration-200"
            >
              <ChevronLeft size={15} /> Previous
            </button>
            <span className="text-sm text-white/40 px-2">
              Page <span className="text-white font-semibold">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-sm font-medium transition-all duration-200"
            >
              Next <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogHome;