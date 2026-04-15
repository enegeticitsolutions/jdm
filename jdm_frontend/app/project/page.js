import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import Project1 from "@/components/sections/Project1";
export default function Project() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Project">
        <Project1 />
        <Brand1 />
      </Layout>
    </>
  );
}
