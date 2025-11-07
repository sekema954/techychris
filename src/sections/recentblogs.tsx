import { useEffect, useRef } from "react";
import useFetchBlogs from "../api/fetchblogs";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogsHeader, SectionHeader } from "../components/sectionHeader";
import pattern from "../assets/images/Frame.png";

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

  if (isLoading) return null;

  if (!blogs || blogs.length < 1) return null;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0D0F1A] lg:px-30">
      {/* Background pattern */}
      <img
        src={pattern}
        alt="background pattern"
        className="pointer-events-none absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
      />

      <section className="py-12 flex-grow w-full px-4 sm:px-6 max-w-[1600px] relative z-10">
        <div className="text-white">
          {blogsHeader.map((s, i) => (
            <SectionHeader
              key={i}
              title={s.title}
              buttonText={s.buttonText}
              subContext={s.subContext}
              buttonLink={s.buttonLink}
            />
          ))}
        </div>

        <BentoGrid className="w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {blogs.slice(0, 5).map((blog) => (
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
              thumbnail={blog.thumbnail}
              className="bg-[#1A1D2E] border border-[#2C2F3F] text-white"
            />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
};

export default RecentBlogs;
