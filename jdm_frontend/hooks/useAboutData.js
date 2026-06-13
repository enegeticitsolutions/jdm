import { useQuery } from "@tanstack/react-query";
import { transformAboutData } from "@/util/transformAboutData";

const fetchAboutData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/about/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error("Failed to fetch about data");
    }

    const raw = await res.json();

    if (raw.error) {
      throw new Error(raw.error);
    }

    return transformAboutData(raw);
  } catch (err) {
    console.warn("API fetch failed for About, falling back to mock data. Error:", err.message);
    return transformAboutData({
      is_active: true,
      heading: "About JDM Group",
      story: {},
      mission: { is_active: true },
      vision: { is_active: true },
      values: { is_active: true },
      key_strengths: {},
      faq: null,
      achievements: null,
      team_heading: "Our Team",
      is_story: true,
      is_faq: true,
      is_achievements: true,
    });
  }
};

export const useAboutData = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: 1000 * 60 * 10, // optional: cache for 10 minutes
  });
};

