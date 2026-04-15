import Layout from "@/components/layout/Layout";
import Clientele from "@/components/sections/Clientele";
export default function ClientelePage() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Clientele">
        <Clientele/>
      </Layout>
    </>
  );
}
