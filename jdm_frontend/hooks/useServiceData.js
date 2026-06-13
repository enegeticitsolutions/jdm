// hooks/useServiceData.js
import { useQuery } from "@tanstack/react-query";

const fetchServiceData = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // Timeout after 8000ms (8 seconds)

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/services/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch home data");
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // e.g., 'https://example.com/'

    // Assume data is an array of services
    let processedData = [];
    if (data && data.length > 0) {
      processedData = data.map((service) => ({
        ...service,
        image: service.image?.startsWith("http")
          ? service.image
          : `${baseUrl}${service.image}`,
      }));
    } else {
      // Fallback if empty database
      const { homeServices } = require("../util/homeService");
      processedData = homeServices.map((service) => ({
        ...service,
        id: service.link.split("/").pop(),
        image: service.image?.startsWith("http")
          ? service.image
          : service.image?.startsWith("/")
            ? service.image
            : `/${service.image}`,
      }));
    }

    console.log("Processed Service Data: ", processedData);

    return processedData;
  } catch (err) {
    console.warn("API fetch failed for Services, falling back to mock data. Error:", err.message);
    const { homeServices } = require("../util/homeService");
    return homeServices.map((service) => ({
      ...service,
      id: service.link.split("/").pop(),
      image: service.image?.startsWith("http")
        ? service.image
        : service.image?.startsWith("/")
          ? service.image
          : `/${service.image}`,
    }));
  }
};

export const useServiceData = () => {
  return useQuery({
    queryKey: ["service"],
    queryFn: fetchServiceData,
  });
};
