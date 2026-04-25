import Layout from "@/components/layout/Layout";
import NewsSection from "@/components/sections/NewsSection";
export default function NewsGrid() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="News" backgroundImage={"/assets/img/banner/blogs.jpg"}>
        <NewsSection />
      </Layout>
    </>
  );
}
