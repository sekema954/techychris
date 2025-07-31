import { useEffect, useState } from "react";

interface Email {
  email: string;
}

export const useFetchSubscribers = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [subscribers, setSubscribers] = useState<Email[]>([]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_HEROKU_URL}/api/get/emails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        throw new Error(`${errorData}: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.subscribers)
      setSubscribers(result.subscribers);
    } catch (error: any) {
      console.error(`${error.message}, internal server error`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return {
    isLoading,
    error,
    subscribers,
  };
};
