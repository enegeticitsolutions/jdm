'use client';

import Layout from "@/components/layout/Layout";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import Achivements from "@/components/sections/Achivements";
import Team2 from "@/components/sections/Team2";
import StorySection from "@/components/sections/About1";
import VisionMissionFounder from "@/components/sections/Vission_Mission";
import Faq from "@/components/sections/Faq";

import { useEffect, useState } from "react";
import { useAboutData } from "@/hooks/useAboutData";

export default function About() {
  const { data, error, isLoading } = useAboutData();
  console.log("About page hook data:", data);

  const [aboutHeading, setAboutHeading] = useState("About Us");
  const [storyData, setStoryData] = useState(null);
  const [vmData, setVmData] = useState({});
  const [achievementssData, setAchievementssData] = useState(null);
  const [teamHeading, setTeamHeading] = useState("Our Leadership Team");
  const [faqData, setFaqData] = useState(null);

  useEffect(() => {
    if (data) {
      // setAboutHeading(data.heading);
      setStoryData(data.storyData);
      setVmData(data.vmData);
      setAchievementssData(data.achievementsData);
      setTeamHeading(data.teamHeading);
      setFaqData(data.faqData);
      console.log("About page data:", data);
    }
  }, [data]);

  // if (isLoading) return <Loading />;
  // if (error || !data) return <NotFound error={error} />;

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={aboutHeading}>
      {storyData && <StorySection data={storyData} />}
      {vmData && <VisionMissionFounder data={vmData} />}
      {achievementssData && <Achivements data={achievementssData} />}
      <Team2 heading={teamHeading} />
      {faqData && <Faq data={faqData} />}
    </Layout>
  );
}