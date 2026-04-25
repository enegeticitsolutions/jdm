// hooks/useSingleNews.js
import { useQuery } from "@tanstack/react-query";

const fetchSingleNews = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/news/`);
  if (!res.ok) throw new Error("Failed to fetch news list");

  const data = await res.json();
  const news = data.find((item) => item.id === id);

  if (!news) throw new Error("News not found");

  return {
    id: news.id,
    title: news.title,
    tags: news.tag,
    date: news.date,
    image: `${process.env.NEXT_PUBLIC_API_URL}${news.image}`,
    short_description: news.short_description,
    long_description: news.long_description,
    quote: news.quote,
    in_between_image: `${process.env.NEXT_PUBLIC_API_URL}${news.in_between_image}`,
  };
};

export const useSingleNews = (id) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchSingleNews(id),
    enabled: !!id, // only run if id is provided
  });
};
