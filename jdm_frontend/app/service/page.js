import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import Service1 from "@/components/sections/Service1";
export default function Services() {
  
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Services" backgroundImage="/assets/img/banner/services.jpg">
        <Service1 />
      </Layout>
    </>
  );
}
