// components/RecentBlogs.tsx
import useFetchBlogs from "../api/fetchblogs";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";

const RecentBlogs = () => {
  const { blogs, isLoading } = useFetchBlogs();

  if (isLoading) return <p className="text-center text-white">Loading Blog...</p>;

  return (
    <section className="bg-gradient-to-t from-[#3E3A59] via-black to-[#171723] text-white py-12">
      <header className="text-center mb-8">
        <h1 className="text-[#CD9EFD] lg:text-[60px] text-[30px] font-bold">RECENT BLOGS</h1>
        <p className="text-lg">Stay connected and learn about the newest IT trends</p>
      </header>

      <BentoGrid className="max-w-6xl mx-auto px-4">
        {blogs.slice(0, 8).map((blog, i) => (
          <BentoGridItem
            id={blog.id}
            key={blog.id}
            title={blog.title}
            description={blog.description}
            slug={
              <a
                href={`/blogDetails/${blog.id}`}
                className="text-purple-400 underline hover:text-purple-300 transition"
              >
                Read more
              </a>
            }
            thumbnail={
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md bg-[#1F1F1F]"
              />
            }
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default RecentBlogs;
