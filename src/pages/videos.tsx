import { useEffect, useRef, useState } from 'react';
import Subscribe from '../components/subscribe';
import { FaPlay } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingSpinner } from '../components/loading';

gsap.registerPlugin(ScrollTrigger);

const API_KEY = import.meta.env.VITE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const YoutubeVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); // ✅ Added isLoading state

  const videosPerPage = 6;

  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true); // ✅ Start loading
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelData = await channelRes.json();
        const playlistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
        );
        const videosData = await videosRes.json();

        setVideos(videosData.items);
        setFilteredVideos(videosData.items);
        setIsLoading(false); // ✅ End loading
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        setIsLoading(false); // ✅ Stop loading on error
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!headingRef.current || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.from(headingRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(value)
    );
    setFilteredVideos(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  if (isLoading) {
    return (
      <div className='bg-[#171723] min-h-screen flex justify-center items-center'>
        <LoadingSpinner title='Videos' />
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="bg-gray-950 py-16 px-4 md:px-12 text-white">
      {/* Animated Header */}
      <h2
        ref={headingRef}
        className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#CD9EFD]"
      >
        Latest YouTube Videos
      </h2>

      {/* Search Bar */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search videos..."
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => {
            const { videoId } = video.snippet.resourceId;
            const { title, thumbnails } = video.snippet;
            const thumbnailUrl =
              thumbnails?.maxres?.url ||
              thumbnails?.medium?.url ||
              'https://via.placeholder.com/320x180?text=No+Thumbnail';

            return (
              <a
                key={videoId}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col"
              >
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
                  <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-2 w-[90%]">
                    {title}
                  </h3>
                  <span className="bg-white text-black p-2 rounded-full shadow-lg">
                    <FaPlay className="text-xs" />
                  </span>
                </div>
              </a>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No videos found for "{searchTerm}".
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10 py-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Subscribe CTA */}
      <Subscribe />
    </section>
  );
};

export default YoutubeVideos;
