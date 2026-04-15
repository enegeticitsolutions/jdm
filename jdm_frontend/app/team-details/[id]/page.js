import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Layout from "@/components/layout/Layout";
import TeamDetails1 from "@/components/sections/TeamDetails1";
import { defaultTeamMembers } from "@/util/teamMembers";
import TeamSlider from "@/components/sections/Team2";

// const [teamMembers, setTeamMembers] = useState(defaultTeamMembers);

const teamMembers = defaultTeamMembers;
// Generate static paths (for Pages Router with getStaticPaths or App Router)
export async function generateStaticParams() {
  return teamMembers.map((member) => ({ id: String(member.id) }));
}


export default function TeamDetails({ params }) {

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['team'],
  //   queryFn: async () => {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/team/`, {
  //       cache: 'no-store',
  //     });
  //     if (!res.ok) throw new Error('Failed to fetch team data');
  //     const data = await res.json();
  //     if (data.error) throw new Error(data.error);
  //     setTeamMembers(data.items.map((item) => ({
  //       id: item.id,
  //       name: item.name,
  //       image: `${process.env.NEXT_PUBLIC_API_URL}${item.image}`,
  //       excerpt: renderDescription(item.excerpt),
  //       bio: item.bio,
  //       role: item.role,
  //     })));
  //     return data;
  //   },
  // });

  // if (isLoading) return <Loading />;
  // if (error) return <NotFound error={error} />;

  console.log("Params ID:", params.id);

  const member = teamMembers.find((m) => String(m.id) === params.id);

  if (!member) {
    console.log("Team member not found for ID:", params.id);
    return (
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Team Member Not Found">
        <div className="container">
          <h2>Team Member Not Found</h2>
          <p>The team member you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={member.name}>
      <TeamDetails1 member={member} />
      <TeamSlider/>
    </Layout>
  );
}