// "use client";
import Layout from "@/components/layout/Layout";
// import Link from "next/link";
// import BranchDetail from "@/components/sections/BranchDetail";
// import { stateGroup } from "@/util/stateGroup"; // Corrected to match the exported name
// import IndianBranches from "@/components/sections/branches";

// Generate static paths for each state
// export async function generateStaticParams() {
//   return Object.keys(stateGroup).map((state) => ({ id: state.toLowerCase() }));
// }

export default function BranchDetailFunc({ params }) {
  // const state = params.id;
  // const branches = stateGroup[state.toLowerCase()] || [];

  // if (process.env.NODE_ENV === "development") {
  //   console.log("Branches:", branches);
  // }

  // if (!branches.length) {
  //   return (
  //     <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Branch Details Not Found">
  //       <div className="container text-center py-10">
  //         <h2>Branch Details Not Found</h2>
  //         <p>The branch details for this state do not exist.</p>
  //         <Link href="/indianbranches" className="theme-btn mt-4">
  //           Back to Branches <i className="fa-regular fa-arrow-right" />
  //         </Link>
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={state.charAt(0).toUpperCase() + state.slice(1)}>
      {/* <BranchDetail branches={branches} state={state} />
      <IndianBranches/> */}
      NA
    </Layout>
  );
}