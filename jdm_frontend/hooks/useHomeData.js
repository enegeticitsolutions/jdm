// hooks/useHomeData.js
import { useQuery } from "@tanstack/react-query";

const fetchHomeData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // Timeout after 8000ms (8 seconds)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/home/`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch home data");
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    console.warn("API fetch failed for Home, falling back to mock data. Error:", err.message);
    return {
      is_active: true,
      is_hero: true,
      is_services: true,
      is_journey: true,
      is_clientele: true,
      is_associations: true,
      is_affiliations: true,
      is_sea_partners: true,
      is_air_partners: true,
      is_locations: true,
      is_achievements: true,
      is_news: true,
      hero: { video_url: null, image_url: null },
      services: { heading: "Our Services", items: [] },
      journey: { heading: "Our Journey", video_url: null },
      clientele: { items: [] },
      associations: { items: [] },
      affiliations: { items: [] },
      sea_partners: { items: [] },
      air_partners: { items: [] },
      locations: { heading: "Our Locations", items: [] },
      achievements: { heading: "Achievements", items: [] },
    };
  }
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
  });
};
