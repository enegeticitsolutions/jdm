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
    if (err.name === 'AbortError') {
      throw new Error("Request timed out");
    }
    throw err;
  }
};

export const useIndustryVisibility = () => {
  return useQuery({
    queryKey: ["industry"],
    queryFn: fetchIndustryVisibility,
  });
};
