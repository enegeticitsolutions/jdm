import { useQuery } from "@tanstack/react-query";

const fetchVASData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/vas/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch value added services data");
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    let processedData = [];
    if (data && data.length > 0) {
      processedData = data.map((vas) => ({
        id: vas.slug || vas.id,
        title: vas.title,
        content: vas.content || `${vas.para1}\n\n${vas.para2}`,
      }));
    } else {
      // Fallback if empty database
      const { tabs } = require("../util/otherService");
      processedData = tabs;
    }

    return processedData;
  } catch (err) {
    console.warn(
      "API fetch failed for VAS, falling back to mock data. Error:",
      err.message,
    );
    const { tabs } = require("../util/otherService");
    return tabs;
  }
};

export const useValueAddedServices = () => {
  return useQuery({
    queryKey: ["vas"],
    queryFn: fetchVASData,
  });
};
