"use client";

import Layout from "@/components/layout/Layout";
import NewsDetailsSection from "@/components/sections/NewsDetailsSection";
import { useSingleNews } from "@/hooks/useSingleNews";
import { useRecentNews } from "@/hooks/useRecentNews";
import Loading from "@/app/loading";

export default function NewsDetails({ params }) {
  const { id } = params;

  // Use your hook to fetch the news by id
  const { data: blogData, isLoading, error } = useSingleNews(id);
  const { data: recentNews, isLoading: recentLoading } = useRecentNews();

  if (isLoading) return <Loading/>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle="News Details"
      backgroundImage={"/assets/img/banner/blogs.jpg"}
    >
      <NewsDetailsSection blogData={blogData} recentPosts={recentNews}/>
    </Layout>
  );
}
