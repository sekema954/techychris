import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { LoadingSpinner } from '../components/loading';
import { SectionHeader, videosHeader } from '../components/sectionHeader';

const API_KEY = import.meta.env.VITE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID;

const FeaturedYoutubeVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const channelData = await channelRes.json();
        const playlistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${playlistId}&key=${API_KEY}`
        );
        const videosData = await videosRes.json();
        setVideos(videosData.items);
      } catch (error) {
        console.error('Failed to fetch featured videos:', error);
      }
    };

    fetchVideos();
  }, []);

  if(videos.length < 1) {
    return(
      <div className='bg-[#0A2540]'>
          <LoadingSpinner title='videos' />
      </div>
    )
  };

  return (
    <section className="bg-[#1E1B2E] lg:py-10 py-6 text-white">
      <div className="max-w-6xl mx-auto">
      <div className="text-white">
         {videosHeader.map((s, _)=>(
           <SectionHeader 
           title={s.title} 
           buttonText={s.buttonText}
           subContext={s.subContext} 
           buttonLink={s.buttonLink} />
       ))}
       </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[250px] md:auto-rows-[300px] gap-6 py-10">
          {videos
            .sort(() => 0.5 - Math.random())
            .map((video, index) => {
              const snippet = video.snippet;
              if (!snippet || !snippet.resourceId) return null;

              const { videoId } = snippet.resourceId;
              const { title, thumbnails } = snippet;
              const thumbnailUrl =
                thumbnails?.maxres?.url ||
                thumbnails?.medium?.url ||
                'https://via.placeholder.com/320x180?text=No+Thumbnail';

              const bentoStyle =
                index === 0
                  ? 'md:col-span-2 md:row-span-2'
                  : index === 3
                  ? 'md:col-span-2'
                  : '';

              return (
                <a
                  key={videoId}
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative rounded-xl overflow-hidden bg-gray-900 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex flex-col ${bentoStyle}`}
                >
                  {/* Thumbnail */}
                  <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>

                  {/* Content */}
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
            })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedYoutubeVideos;
