import { useEffect, useState } from 'react';
import Subscribe from '../components/subscribe';

const API_KEY = import.meta.env.VITE_API_KEY
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const YoutubeVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const videosPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Step 1: Get Uploads Playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelData = await channelRes.json();
        const playlistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        // Step 2: Get Videos (fetching up to 50 videos for pagination/search to work better)
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
        );
        const videosData = await videosRes.json();
        setVideos(videosData.items);
        setFilteredVideos(videosData.items);
      } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(value)
    );
    setFilteredVideos(filtered);
    setCurrentPage(1); 
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, startIndex + videosPerPage);

  return (
    <section className="bg-gray-950 py-12 px-4 md:px-12 text-white py-35">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Latest Videos</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search videos..."
          className="w-full max-w-md px-4 py-2 rounded-md border bg-white text-black "
        />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentVideos.map((video) => {
          const { videoId } = video.snippet.resourceId;
          const { title, thumbnails } = video.snippet;

          return (
            <a
              key={videoId}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={thumbnails.medium.url}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10 py-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      <Subscribe />
    </section>
  );
};

export default YoutubeVideos;
