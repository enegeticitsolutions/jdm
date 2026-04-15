// 'use client';
// import Layout from "@/components/layout/Layout";
// import ContactInfo from "@/components/sections/contact/ContactInfo";
// import ContactInfo2 from "@/components/sections/contact/ContactInfo2";
// import ContactSection from "@/components/sections/contact/ContactSection";
// import { useContactData } from "@/hooks/useContactData";
// import Loading from "../loading";

// export default function Contact() {

// // const data = {
// //   title: "Contact Us",
// //   addressTitle: "Corporate and Registered Office",
// //   address: "A-75, Road No. 4, Street No. 6, Mahipalpur Extn., New Delhi 110037",
// //   contactTitle: "Contact Info",
// //   phoneLabel: "Mobile",
// //   phone: "+91-49707070-100 Lines",
// //   phoneHref: "tel:+9149707070",
// //   emailLabel: "Email",
// //   email: "info@jdmgroups.com",
// //   emailHref: "mailto:info@jdmgroups.com",
// //   iframe: "https://www.google.com/"
// // };
// const { data, isLoading, error } = useContactData();
// if (isLoading) return <Loading/>;
// // if (error) return <p>Error loading contact info</p>;
//   return (
//     <>
//       <Layout headerStyle={1} footerStyle={1}
//       breadcrumbTitle={data.title}
//       backgroundImage={"/assets/img/banner/contact.jpeg"}>
//         <ContactInfo data={data}/>
//         <ContactSection />
//         <ContactInfo2 iframe={data.iframe}/>
//         {/* <Brand1 /> */}
//       </Layout>
//     </>
//   );
// }

"use client";
import Layout from "@/components/layout/Layout";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactInfo2 from "@/components/sections/contact/ContactInfo2";
import ContactSection from "@/components/sections/contact/ContactSection";
import { useContactData } from "@/hooks/useContactData";
import Loading from "../loading";

export default function Contact() {
  const { data, isLoading } = useContactData();
  if (isLoading) return <Loading />;

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={data?.title || "Contact Us"}
      backgroundImage={"/assets/img/banner/contact.jpeg"}
    >
      <ContactInfo data={data} />
      <ContactSection />
      <ContactInfo2 />
    </Layout>
  );
}
