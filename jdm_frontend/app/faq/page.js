import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import Faq from "@/components/sections/Faq";
export default function FaqPage() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="faq">
        <Faq />
        {/* <Brand1 /> */}
      </Layout>
    </>
  );
}
