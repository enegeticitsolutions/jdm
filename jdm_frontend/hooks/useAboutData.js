import { useQuery } from "@tanstack/react-query";
import { transformAboutData } from "@/util/transformAboutData";

export const useAboutData = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/about/`, {
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
    staleTime: 1000 * 60 * 10, // optional: cache for 10 minutes
  });
};

