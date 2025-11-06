// Frontend (React)
import { useParams } from "react-router-dom";
import useFetchBlogs from "../api/fetchblogs";
import { LoadingSpinner } from "../components/loading";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pattern from "../assets/images/Frame.png";

const BlogDetail = () => {
  const { blogs, isLoading, error } = useFetchBlogs();
  const { id } = useParams();

  if (isLoading)
    return (
      <div className="bg-black">
        <LoadingSpinner title="blogs" />
      </div>
    );

  if (error) return <p className="text-white p-5">Failed to load blog data</p>;

  const post = blogs.find((item) => item._id === id);
  if (!post) return <p className="text-white p-5">Blog post not found</p>;

  return (
    <section className="relative bg-[#3E3A59] text-white py-40 px-4 md:px-10">
      {/* Background Pattern */}
      <img
        src={pattern}
        alt="background pattern"
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex flex-wrap gap-4 text-sm md:text-base mb-6">
          <span className="font-semibold">{post.creator}</span>
          <span>{post.published_date}</span>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
          {/* Left Column */}
          <div className="bg-[#2B2841] p-6 rounded-2xl shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto rounded-lg mb-4"
            />
            <h2 className="text-xl md:text-2xl font-medium mb-6">
              {post.description}
            </h2>

            <div className="space-y-6 text-base leading-relaxed">
              <p>{post.intro}</p>
              <p>{post.middle_context}</p>
              <p>{post.conclusion}</p>
            </div>
          </div>

          {/* Right Column */}
          <aside className="flex flex-col gap-6">
            {/* Categories */}
            <div className="py-7 bg-[#171723] px-4 rounded-2xl shadow-lg">
              <h1 className="text-[20px] font-semibold mb-4">Categories</h1>
              <div className="flex flex-col gap-4">
                {post.categories
                  .sort((a, b) => a.localeCompare(b)) // sort alphabetically
                  .slice(0, 5) // pick first 5 categories
                  .map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-[#2a293d] hover:bg-[#3b3950] px-3 py-2 rounded-lg transition"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400"
                      />
                      <span className="text-white font-medium">{category}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="py-7 bg-[#171723] px-4 rounded-2xl shadow-lg">
              <h1 className="text-[20px] font-semibold mb-4">Recent Posts</h1>
              <div className="flex flex-col gap-5">
                {blogs
                  .filter((item) => item._id !== id)
                  .slice(0, 4)
                  .map((item) => (
                    <a
                      key={item._id}
                      href={`/blogDetails/${item._id}`}
                      className="flex gap-3 items-center hover:bg-[#2a293d] p-2 rounded-lg transition"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="text-sm">
                        <p className="font-semibold text-white line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {item.published_date}
                        </p>
                      </div>
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
