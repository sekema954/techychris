// Frontend (React)
import { useParams } from "react-router-dom";
import useFetchBlogs from "../api/fetchblogs";

{/***type CommentType = {
  id: string;
  postId: string;
  user: string;
  comment: string;
  date: string;
  content:string;
  timestamp:string;
};***/}

const BlogDetail = () => {
  const { blogs, isLoading, error } = useFetchBlogs();
  const { id } = useParams();



  if (isLoading) return <p className="text-white p-5">Loading...</p>;
  if (error) return <p className="text-white p-5">Failed to load blog data</p>;


  const post = blogs.find((item) => item._id === id);
  console.log("URL param id:", id); // check what comes from the URL
  console.log("Fetched blog IDs:", blogs.map((b) => b._id)); // confirm structure
  if (!post) return <p className="text-white p-5">Blog post not found</p>;



  return (
    <section className="bg-[#3E3A59] text-white py-40 px-4 md:px-10">
      <header className="flex flex-wrap gap-4 text-sm md:text-base mb-6">
        <span className="font-semibold">{post.creator}</span>
        <span>{post.published_date}</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{post.title}</h1>
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-4"
          />
          <h2 className="text-xl md:text-2xl font-medium mb-6">{post.description}</h2>

          <div className="space-y-6 text-base leading-relaxed">
            <p>{post.intro}</p>
            <p>{post.middle_context}</p>
            <p>{post.conclusion}</p>
          </div>
        </div>

        <aside>
          <div className="py-7 mt-5 bg-[#171723] px-3">
            <h1 className="text-[20px]">Categories</h1>
            <div className="flex flex-col gap-6 mt-6">
              {post.categories.map((category, index) => (
                <div key={index}>
                  <span>{category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-7 mt-5 bg-[#171723] px-3 rounded-lg">
            <h1 className="text-[20px] font-semibold">Recent Posts</h1>
            <div className="flex flex-col gap-5 mt-4">
              {blogs
                .filter((item) => item._id !== id)
                .slice(0, 4)
                .map((item) => (
                  <a
                    key={item._id}
                    href={`/blogDetails/${item._id}`}
                    className="flex gap-3 items-center hover:bg-[#2a293d] p-2 rounded transition"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="text-sm">
                      <p className="font-semibold text-white line-clamp-2">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.published_date}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default BlogDetail;
