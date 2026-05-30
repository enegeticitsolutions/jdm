"use client";

import Layout from "@/components/layout/Layout";
import TeamDetails1 from "@/components/sections/TeamDetails1";
import { defaultTeamMembers } from "@/util/teamMembers";
import TeamSlider from "@/components/sections/Team2";
import { useTeamData } from "@/hooks/useTeamData";
import Loading from "@/app/loading";

export default function TeamDetails({ params }) {
  const { data: teamMembers = defaultTeamMembers, isLoading } = useTeamData();

  if (isLoading) return <Loading />;

  console.log("Params ID:", params.id);

  const member = teamMembers.find((m) => String(m.id) === params.id);

  if (!member) {
    console.log("Team member not found for ID:", params.id);
    return (
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Team Member Not Found">
        <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
          <h2>Team Member Not Found</h2>
          <p>The team member you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={member.name}>
      <TeamDetails1 member={member} />
      <TeamSlider />
    </Layout>
  );
}