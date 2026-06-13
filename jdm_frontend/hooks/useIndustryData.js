import { useQuery } from "@tanstack/react-query";

const fetchIndustryData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // 8 seconds timeout

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/industry/`, {
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!res.ok) throw new Error("Failed to fetch industry data");

    const data = await res.json();
    console.log("Fetch Response Industry Data: ", data  );
    if (data.error) throw new Error(data.error);
    return data;  // Expected to be an array of industry objects
  } catch (err) {
    console.warn("API fetch failed for industry, falling back to mock data. Error:", err.message);
    return [
      {
        title: "Automotive Industry",
        type: "para",
        content: "JDM Group provides specialized logistics solutions for the automotive industry, handling everything from spare parts to fully assembled vehicles with precision and care.",
        image: "/assets/img/mission.png",
        is_image_left: true,
      },
      {
        title: "Pharmaceutical Industry",
        type: "bullet",
        list_items: [
          "Temperature-controlled transportation",
          "GDP compliant logistics",
          "Cold chain management",
          "Regulatory documentation support",
          "Last-mile delivery solutions"
        ],
        image: "/assets/img/contact-img-shape.png",
        is_image_left: false,
      }
    ];
  } finally {
    clearTimeout(timeout);
  }
};

export const useIndustryData = () => {
  return useQuery({
    queryKey: ["allIndustry"],
    queryFn: fetchIndustryData,
    staleTime: 1000 * 60,  // 1 min cache freshness
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
