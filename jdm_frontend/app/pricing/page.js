import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import OurSkills from "@/components/sections/OurSkills";
import Pricing from "@/components/sections/Pricing";
export default function PricingPage() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="pricing">
        <Pricing />
        <OurSkills alt />
        <Brand1 alt />
      </Layout>
    </>
  );
}
