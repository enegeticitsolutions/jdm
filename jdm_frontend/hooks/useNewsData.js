// hooks/useNewsData.js
import { useQuery } from "@tanstack/react-query";

const fetchNewsData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000); // Timeout after 8s

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/news/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch news data");

    const rawData = await res.json();
    if (rawData.error) throw new Error(rawData.error);

    const normalizedData = rawData.map((item) => ({
      id: item.id,
      title: item.title,
      tags: item.tag,
      date: item.date,
      image: `${process.env.NEXT_PUBLIC_API_URL}${item.image}`,
      short_description: item.short_description,
      long_description: item.long_description,
      quote: item.quote,
      in_between_image: `${process.env.NEXT_PUBLIC_API_URL}${item.in_between_image}`,
    }));

    return normalizedData;
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Request timed out");
    throw err;
  }
};

export const useNewsData = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNewsData,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
