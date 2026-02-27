import { useParams } from "react-router-dom";
import useFetchBlogs from "../api/fetchblogs";
import { LoadingSpinner } from "../components/loading";
import pattern from "../assets/images/Frame.png";
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";

const BlogDetail = () => {
  const { blogs, isLoading, error } = useFetchBlogs();
  const { id } = useParams();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#060F1E] flex items-center justify-center">
        <LoadingSpinner title="blog" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#060F1E] flex items-center justify-center">
        <p className="text-white/50 text-lg">Failed to load blog data.</p>
      </div>
    );

  const post = blogs.find((item) => item._id === id);
  if (!post)
    return (
      <div className="min-h-screen bg-[#060F1E] flex items-center justify-center">
        <p className="text-white/50 text-lg">Blog post not found.</p>
      </div>
    );

  return (
    <section className="relative bg-[#060F1E] text-white py-32 px-4 md:px-10 min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={pattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.05] z-0 mix-blend-luminosity"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #3B82F6, transparent 70%)" }}
      />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #3B82F6 50%, transparent)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Back link */}
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to all posts
        </a>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 mb-8">
          <span className="flex items-center gap-1.5">
            <User size={11} /> {post.creator}
          </span>
          <span className="w-px h-3 bg-white/15" />
          <span className="flex items-center gap-1.5">
            <Calendar size={11} /> {post.published_date}
          </span>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* ── Article ── */}
          <article className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden shadow-2xl">
            {/* Hero image */}
            <div className="relative w-full h-64 md:h-80 overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,15,30,0.97) 0%, rgba(6,15,30,0.75) 50%, rgba(6,15,30,0.45) 100%)" }}
              />
              <h1 className="absolute bottom-0 left-0 right-0 p-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]"
                style={{ backgroundImage: "linear-gradient(135deg, #93C5FD 0%, #60A5FA 35%, #3B82F6 65%, #1D4ED8 100%)" }}
              >
                {post.title}
              </h1>
            </div>

            <div className="p-6 md:p-10">
              {/* Description */}
              <p className="text-lg md:text-xl text-white/70 leading-relaxed border-l-2 border-blue-500/50 pl-4 mb-8 italic">
                {post.description}
              </p>

              {/* Body */}
              <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-white/75">
                {post.intro && <p>{post.intro}</p>}
                {post.middle_context && (
                  <>
                    <div className="h-px bg-white/6 my-6" />
                    <p>{post.middle_context}</p>
                  </>
                )}
                {post.conclusion && (
                  <>
                    <div className="h-px bg-white/6 my-6" />
                    <p>{post.conclusion}</p>
                  </>
                )}
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-white/8">
                  <Tag size={13} className="text-white/30 mt-0.5" />
                  {post.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white/70 hover:border-white/20 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-8">

            {/* Categories */}
            {post.categories?.length > 0 && (
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Categories</h2>
                <div className="flex flex-col gap-1.5">
                  {post.categories
                    .sort((a: string, b: string) => a.localeCompare(b))
                    .slice(0, 6)
                    .map((category: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] hover:bg-blue-500/10 border border-white/5 hover:border-blue-500/20 transition-all duration-200 cursor-default group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{category}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Recent Posts */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Recent Posts</h2>
              <div className="flex flex-col divide-y divide-white/5">
                {blogs
                  .filter((item) => item._id !== id)
                  .slice(0, 4)
                  .map((item) => (
                    <a
                      key={item._id}
                      href={`/blogDetails/${item._id}`}
                      className="flex gap-3 items-start py-3 hover:bg-white/[0.03] -mx-2 px-2 rounded-xl transition-colors duration-200 group"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white/75 line-clamp-2 leading-snug group-hover:text-white transition-colors duration-200 mb-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-white/30">{item.published_date}</p>
                      </div>
                      <ArrowRight size={12} className="flex-shrink-0 text-white/20 mt-1 group-hover:text-blue-400 transition-colors" />
                    </a>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;