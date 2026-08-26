import { useQuery } from "@tanstack/react-query";
import { transformAboutData } from "@/util/transformAboutData";

export const useAboutData = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL_V1 || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiUrl}/about/`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch about data");
      }

      const raw = await res.json();

      if (raw.error) {
        throw new Error(raw.error);
      }

      return transformAboutData(raw);
    },
    staleTime: 0, // always fetch fresh data
  });
};

