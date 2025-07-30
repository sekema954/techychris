// hooks/useFetchBlogs.js
import { useEffect, useState } from "react";

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface Comment {
  user: string;
  comment: string;
  date: string; // ISO date string
}

interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  categories: string[];
  thumbnail: string;
  hero_image: string;
  gallery: string[];
  video_url: string;
  intro: string;
  middle_context: string;
  conclusion: string;
  published_date: string;
  published_time: string;
  updated_at: string;
  reading_time: number;
  draft: boolean;
  creator: string;
  author: Author;
  tags: string[];
  views: number;
  likes: number;
  comments: Comment[];
}

const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    const url = import.meta.env.PROD
      ? `${import.meta.env.VITE_HEROKU_URL}/api/blogs`
      : "http://localhost:3000/api/blogs"; //endpoint
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to get blogs ${response.status}`);
      }
      const result = await response.json();
      setBlogs(result);
    } catch (err) {
      console.error("Internal server error", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return { blogs, isLoading, refetch: fetchBlogs, error };
};

export default useFetchBlogs;
