import Layout from "@/components/layout/Layout";
import Brand1 from "@/components/sections/Brand1";
import Team2 from "@/components/sections/Team2";
export default function Team() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="team">
        <Team2 />
        <Brand1 />
      </Layout>
    </>
  );
}
