import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useFetchBlogs from "../api/fetchblogs";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoadingSpinner } from "../components/loading";

gsap.registerPlugin(ScrollTrigger);

const RecentBlogs = () => {
  const { blogs, isLoading } = useFetchBlogs();

  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headerRef.current || !titleRef.current || !subtitleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
      },
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    }).from(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  if(blogs.length < 1) {
    return(
      <div className=" bg-black text-white flex items-center justify-center">
        <LoadingSpinner title="recent blogs" />
      </div>
    )
  }

  if (isLoading)
    return (
      <p className="text-center text-white min-h-screen flex items-center justify-center">
        Loading Blog...
      </p>
    );

  return (
  <div className="min-h-screen flex flex-col bg-[#0D0F1A]">
    <section className="py-12 flex-grow w-full px-4 sm:px-6 md:px-8 max-w-[1600px] mx-auto">
      <header
        ref={headerRef}
        className="text-center mb-12"
        style={{ perspective: "1000px" }}
      >
        <h1
          ref={titleRef}
          className="text-white text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-extrabold tracking-wide drop-shadow-md"
        >
          RECENT BLOGS
        </h1>
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed"
        >
          Stay connected and learn about the newest IT trends
        </p>
      </header>

      <BentoGrid className="w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {blogs.slice(0, 5).map((blog, _) => (
          <BentoGridItem
            id={blog._id}
            key={blog._id}
            title={blog.title}
            description={blog.description}
            slug={
              <a
                href={`/blogDetails/${blog._id}`}
                className="text-blue-400 underline hover:text-blue-300 transition text-sm sm:text-base"
              >
                Read more
              </a>
            }
            thumbnail={
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-md"
              />
            }
            className="bg-[#1A1D2E] border border-[#2C2F3F] text-white"
          />
        ))}
      </BentoGrid>
    </section>

    <footer className="flex justify-center py-8 bg-transparent">
      <Link to="/blog">
        <button className="h-[48px] min-w-[150px] bg-[#165DFB] hover:bg-blue-600 text-white rounded-md flex items-center justify-center px-4 text-sm sm:text-base">
          See more
          <FontAwesomeIcon className="ml-3" icon={faArrowRight} />
        </button>
      </Link>
    </footer>
  </div>
  );
};

export default RecentBlogs;
