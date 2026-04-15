"use client";

import { useIndustryVisibility } from "@/hooks/useIndustryVisibility";
import { useIndustryData } from "@/hooks/useIndustryData";
import Layout from "@/components/layout/Layout";
import Industry from "@/components/sections/Industry";
import Loading from "../loading";
import NotFound from "../not-found";

export default function ClientelePage() {
  const { data: industrySpec, isLoading: loadingSpec, error: errorSpec } = useIndustryVisibility();
  const { data: industrySections, isLoading: loadingData, error: errorData } = useIndustryData();

  if (loadingSpec || loadingData) {
    return <Loading/>;
  }

  if (errorSpec || errorData) {
    return <NotFound/>;
  }

  // If the industry flag is false or null/undefined, return 404 or custom "Page Not Found"
  if (!industrySpec?.is_industry) {
    return (
      <NotFound/>
    );
  }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Our Industry">
      <Industry data={industrySections} />
    </Layout>
  );
}
