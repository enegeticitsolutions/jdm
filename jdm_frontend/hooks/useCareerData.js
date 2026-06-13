// hooks/useCareers.js or useCareers.ts]
import { useQuery } from "@tanstack/react-query";

const defaultJobs = [
  {
    title: "Senior Logistics Coordinator",
    location: "New Delhi",
    type: "Full-Time",
    description: "Responsible for coordinating and overseeing international freight forwarding operations, managing client communications, and ensuring timely deliveries.",
    applyLink: "#",
  },
  {
    title: "Customs Clearance Executive",
    location: "Mumbai",
    type: "Full-Time",
    description: "Handle documentation, HS code classification, and regulatory compliance for importing and exporting goods through Indian customs.",
    applyLink: "#",
  },
  {
    title: "Warehouse Operations Manager",
    location: "Chennai",
    type: "Full-Time",
    description: "Oversee daily warehouse activities, inventory control using WMS platforms, and staff safety compliance.",
    applyLink: "#",
  }
];

const fetchJobs = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/jobs/`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch career data");
    const data = await res.json();

    return data.map((job) => ({
      title: job.title || "Untitled Position",
      location: job.location || "Unknown Location",
      type: job.type || "Full-Time",
      description: job.description || "No description available.",
      applyLink: job.applyLink || job.url || "#",
    }));
  } catch (err) {
    console.warn("API fetch failed for careers, falling back to mock data. Error:", err.message);
    return defaultJobs;
  }
};

export const useCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: fetchJobs,
    staleTime: 0,//instantly reload statues
    refetchOnWindowFocus: true,//instantly reload statues
  });
};
