// hooks/useCareers.js or useCareers.ts]
import { useQuery } from "@tanstack/react-query";

const fetchJobs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/jobs/`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch career data");
  const data = await res.json();

    console.log("Fetched Jobs Data:", data);
  return data.map((job) => ({
    title: job.title || "Untitled Position",
    location: job.location || "Unknown Location",
    type: job.type || "Full-Time",
    description: job.description || "No description available.",
    applyLink: job.applyLink || job.url || "#",
  }));
};

export const useCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: fetchJobs,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });
};
