'use client';
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Hero2 from "@/components/sections/Hero2";
import Service3 from "@/components/sections/Service3";
import Journey from "@/components/sections/Journey";
import Brand1 from "@/components/sections/Brand1";
import IndianBranches from "@/components/sections/branches";
import Achivements from "@/components/sections/Achivements";
import CtaBanner2 from "@/components/sections/CtaBanner2";
// HIDDEN: Testimonials section temporarily disabled
// import Testimonial2 from "@/components/sections/Testimonial2";
// HIDDEN: News page temporarily disabled
// import News2 from "@/components/sections/News2";
import Loading from "./loading";
import NotFound from "./not-found";

import { useHomeData } from "@/hooks/useHomeData";
import { transformHomeData } from "@/util/transformHomeData";
import { homeServices } from "@/util/homeService";

export default function Home2() {
  const { data, isLoading, error } = useHomeData();
  console.log("home data3212211: ", data);
  const [content, setContent] = useState(null);

  useEffect(() => {

    if (data && data.is_active) {

      setContent(transformHomeData(data));
    }

  }, [data]);

  // if (isLoading) return <Loading />;
  console.log("content678990: ", content);
  if (error) return <NotFound error={"error.message"} />;
  // console.log('Services:', content.services);
  if (!content) return null;

  return (
    <Layout headerStyle={2} footerStyle={2}>
      <Hero2 video_url={content.videoSrc} />
      <Service3 data={content.services} />
      <Journey heading={content.journey.heading} url={content.journey.url} />
      <Brand1 images={content.clientele} know_more="Our Clientele" to="/our-clientele" border="true" />
      <Brand1 images={content.affiliations} heading="Accreditations & Certifications" border="true" pagination="false" />
      <Brand1 images={content.associations} heading="Associations" border="true" pagination="false" />
      <Brand1 images={content.seaPartners} heading="Our Sea Carrier Partners" border="true" pagination="false" />
      <Brand1 images={content.airPartners} heading="Our Air Carrier Partners" border="true" pagination="false" />
      <IndianBranches data={content.branches} />
      <Achivements data={content.achievements} />
      <CtaBanner2 />
      {/* HIDDEN: Testimonials section temporarily disabled */}
      {/* <Testimonial2 /> */}
      {/* HIDDEN: News page temporarily disabled */}
      {/* <News2 /> */}
    </Layout>
  );
}
