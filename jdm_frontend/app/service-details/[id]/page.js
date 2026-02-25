// // pages/team-details/[id].jsx
// import Layout from "@/components/layout/Layout";
//  import ServiceDetail from "@/components/sections/ServiceDetails1";
// import Link from "next/link";
// import { services } from "@/util/services"; // Import your default services data

// // Generate static paths for all services
// export async function generateStaticParams() {
//   return services.map((service) => ({ id: service.id }));
// }

// export default function ServiceDetails({ params }) {
//   console.log("Params ID:", params.id);

//   // Handle "all-services" case
//   if (params.id.toLowerCase() === "all-services") {
//     return (
//       <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="All Services" backgroundImage="/assets/img/banner/services.jpg">
//         <div className="container">
//           <h2>All Services</h2>
//           <ul>
//             {services.map((service) => (
//               <li key={service.id}>
//                 <Link href={`/service-details/${service.id}`}>{service.title}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </Layout>
//     );
//   }
//   const service = services.find(
//     (s) => s.id.toLowerCase() === params.id.toLowerCase()
//   );
//   if (!service) {
//     console.log("Service not found for ID:", params.id);
//     return (
//       <Layout headerStyle={1} footerStyle={1} breadcrumbTitle="Service Not Found"  backgroundImage="/assets/img/banner/services.jpg">
//          <div className="container">
//            <h2>Service Not Found</h2>
//            <p>The service you are looking for does not exist.</p>
//            </div>
//        </Layout>
//      );
//    }

//    return (
//      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={service.title}  backgroundImage="/assets/img/banner/services.jpg">
//        <ServiceDetail service={service} />
//        </Layout>
//    );
//  }

// app/service-details/[id]/page.js
"use client";

import Layout from "@/components/layout/Layout";
import ServiceDetail from "@/components/sections/ServiceDetails1";
import { useServiceById } from "@/hooks/useServiceById";
import Loading from "@/app/loading";

export default function ServiceDetails({ params }) {
  const { id } = params;
  console.log("service id11119999991: ", id);
  const { data: service, isLoading, error } = useServiceById(id);
  console.log("service99999999999: ", service);
  // console.log("data0000: ", data)

  if (isLoading) return <Loading />;

  if (error || !service) {
    return (
      <Layout
        headerStyle={1}
        footerStyle={1}
        breadcrumbTitle="Service Not Found"
        backgroundImage="/assets/img/banner/services.jpg"
      >
        <div className="container">
          <h2>Service Not Found</h2>
          <p>
            The service you are looking for does not exist or failed to load.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      // breadcrumbTitle={service.title}
      backgroundImage="/assets/img/banner/services.jpg"
    >
      <ServiceDetail service={service} />
    </Layout>
  );
}
