'use client';
import Head from "next/head";
import Layout from "../../components/layout/Layout";
import CareerSection from "../../components/sections/Career";
import { useCareers } from "@/hooks/useCareerData";
// import Loading from "../loading";
// import NotFound from "../not-found";

export default function Careers() {
  const { data: jobs = [], isLoading, isError } = useCareers();

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle="Careers"
      backgroundImage={"/assets/img/banner/career.webp"}
    >
      <Head>
        <title>Careers | JDM Logistics</title>
        <meta
          name="description"
          content="Join our team at JDM Logistics. Explore career opportunities in transport and logistics."
        />
      </Head>

      {/* {isLoading ? (
        <Loading/>
      ) : isError ? (
        <h1>{isError}</h1>
      ) : ( */}
        <CareerSection jobs={jobs} />
      {/* )} */}
    </Layout>
  );
}
