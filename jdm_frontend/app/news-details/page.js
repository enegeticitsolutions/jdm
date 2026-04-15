import Layout from "@/components/layout/Layout";
import NewsDetailsSection from "@/components/sections/NewsDetailsSection";

export default async function NewsDetails({ params }) {
  const { id } = params; // Get the dynamic id from the URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jdm-backend.onrender.com";

  // Fetch blog data for the specific id
  let blogData = null;
  try {
    const response = await fetch(`${apiUrl}/blog/api/blogs/`, { cache: "no-store" });
    const data = await response.json();
    blogData = data.Blog.find((blog) => blog.id === parseInt(id)) || null;
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="News Details" backgroundImage={"/assets/img/banner/blogs.jpg"}>
        <NewsDetailsSection blogData={blogData} />
      </Layout>
    </>
  );
}