import Layout from "@/components/layout/Layout";
import NewsDetailsSection from "@/components/sections/NewsDetailsSection";

export default async function NewsDetails({ searchParams }) {
  const id = searchParams?.id;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const apiUrlV1 = process.env.NEXT_PUBLIC_API_URL_V1 || `${apiUrl}/api/v1`;

  // Fetch blog data for the specific id
  let blogData = null;
  if (id) {
    try {
      const response = await fetch(`${apiUrlV1}/news/`, { cache: "no-store" });
      const data = await response.json();
      const newsItem = data.find((blog) => blog.id === id) || null;
      if (newsItem) {
        blogData = {
          id: newsItem.id,
          title: newsItem.title,
          tags: newsItem.tag,
          date: newsItem.date,
          image: newsItem.image ? `${apiUrl}${newsItem.image}` : null,
          short_description: newsItem.short_description,
          long_description: newsItem.long_description,
          quote: newsItem.quote,
          in_between_image: newsItem.in_between_image ? `${apiUrl}${newsItem.in_between_image}` : null,
        };
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="News Details" backgroundImage={"/assets/img/banner/blogs.jpg"}>
        <NewsDetailsSection blogData={blogData} />
      </Layout>
    </>
  );
}