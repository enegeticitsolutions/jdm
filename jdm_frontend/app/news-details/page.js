import Layout from "@/components/layout/Layout";
import NewsDetailsSection from "@/components/sections/NewsDetailsSection";

export default async function NewsDetails({ params }) {
  const { id } = params; // Get the dynamic id from the URL
  const mediaBase = process.env.NEXT_PUBLIC_API_URL || "";
  const apiUrlV1 = process.env.NEXT_PUBLIC_API_URL_V1 || `${mediaBase}/api/v1`;

  // Fetch blog data for the specific id
  let blogData = null;
  try {
    const response = await fetch(`${apiUrlV1}/news/`, { cache: "no-store" });
    const data = await response.json();
    const matched = data.find((blog) => String(blog.id) === String(id)) || null;
    blogData = matched
      ? {
          ...matched,
          image: matched.image ? `${mediaBase}${matched.image}` : null,
          in_between_image: matched.in_between_image
            ? `${mediaBase}${matched.in_between_image}`
            : null,
        }
      : null;
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
