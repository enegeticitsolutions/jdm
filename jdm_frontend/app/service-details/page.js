import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import ServiceDetails1 from "@/components/sections/ServiceDetails1";
export default function ServicesDetails() {
  return (
    <>
      <Layout
        headerStyle={1}
        footerStyle={1}
        breadcrumbTitle="Services details"
        backgroundImage="/assets/img/banner/services.jpg"
      >
        {/* <ServiceDetails1 /> */}
        <Brand1 />
      </Layout>
    </>
  );
}
