// hooks/useSingleNews.js
import { useQuery } from "@tanstack/react-query";

const defaultNews = [
  {
    id: 1,
    title: "Understanding the Dynamics of Air Freight Shipping in 2026",
    tags: ["Logistics", "Air Freight"],
    date: "2026-06-01",
    image: "/assets/img/blog/inner_blog_img01.jpg",
    short_description: "Explore the main challenges and solutions for global air cargo supply chains in the current economic landscape.",
    long_description: "Air freight remains a crucial vertical of global shipping. In this article, we outline how capacity optimization, fuel efficiency, and digital tracking tools are revolutionizing the transit of sensitive and high-value cargo across international borders.",
    quote: "Efficiency is doing things right; effectiveness is doing the right things.",
    in_between_image: "/assets/img/blog/inner_blog_img02.jpg",
  },
  {
    id: 2,
    title: "Why Customs Clearance Expertise is Essential for Global Retailers",
    tags: ["Customs", "Compliance"],
    date: "2026-06-05",
    image: "/assets/img/blog/inner_blog_img02.jpg",
    short_description: "Learn how professional custom brokers help businesses save costs and avoid delay penalties at border control.",
    long_description: "Navigating border compliance requires detailed knowledge of HS codes, trade agreements, and tariff regulations. Experienced custom clearance agencies prevent delays and optimize import/export duty costs.",
    quote: "Compliance is not a constraint, it is a business accelerator.",
    in_between_image: "/assets/img/blog/inner_blog_img03.jpg",
  },
  {
    id: 3,
    title: "Warehousing Solutions: Maximizing Efficiency with WMS Technology",
    tags: ["Warehousing", "Technology"],
    date: "2026-06-10",
    image: "/assets/img/blog/inner_blog_img03.jpg",
    short_description: "Discover how real-time inventory management keeps large-scale logistics operations running smoothly.",
    long_description: "Bonded warehousing combined with real-time tracking provides safety and accessibility. We explore the role of digital databases in tracking inventory from shipment arrival to last-mile transport delivery.",
    quote: "Technology is best when it brings people and logistics together.",
    in_between_image: "/assets/img/blog/inner_blog_img01.jpg",
  }
];

const fetchSingleNews = async (id) => {
  try {
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
  } catch (err) {
    console.warn(`API fetch failed for single news ${id}, falling back to mock data. Error:`, err.message);
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;
    const fallbackNews = defaultNews.find((item) => item.id === id || item.id === numericId) || defaultNews[0];
    return fallbackNews;
  }
};

export const useSingleNews = (id) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchSingleNews(id),
    enabled: !!id, // only run if id is provided
  });
};
