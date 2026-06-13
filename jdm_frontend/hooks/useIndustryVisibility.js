// hooks/useIndustryVisibility.js
import { useQuery } from "@tanstack/react-query";

const fetchIndustryVisibility = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // Timeout after 8000ms (8 seconds)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/industry-v1/`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);
   

    if (!res.ok) throw new Error("Failed to fetch home data");
    const data = await res.json();
    console.log("Fetch Response Industry Visibility Data: ", data);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.warn("API fetch failed for industry visibility, falling back to mock data. Error:", err.message);
    return { is_industry: true };
  }
};

export const useIndustryVisibility = () => {
  return useQuery({
    queryKey: ["industry"],
    queryFn: fetchIndustryVisibility,
  });
};
