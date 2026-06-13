import { useQuery } from "@tanstack/react-query";

const fetchContactData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/contact/`);
    if (!res.ok) throw new Error("Failed to fetch contact data");
    return await res.json();
  } catch (err) {
    console.warn("API fetch failed for Contact, falling back to mock data. Error:", err.message);
    return {
      title: "Contact Us",
      address_title: "Corporate and Registered Office",
      address: "A-75, Road No. 4, Street No. 6, Mahipalpur Extn., New Delhi 110037",
      contact_title: "Contact Info",
      phone_label: "Mobile",
      phone: "+91-49707070-100 Lines",
      phone_href: "tel:+9149707070",
      email_label: "Email",
      email: "info@jdmgroups.com",
      email_href: "mailto:info@jdmgroups.com",
      iframe: "https://www.google.com/"
    };
  }
};

export const useContactData = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: fetchContactData,
  });
};
