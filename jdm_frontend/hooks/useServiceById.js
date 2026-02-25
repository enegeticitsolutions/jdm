import { useQuery } from "@tanstack/react-query";
import { services } from "@/util/services";

const fetchServiceById = async (id) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  console.log("fetching service for id: ", id);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_V1}/services/${id}/`,
      {
        cache: "no-store",
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);
    console.log("response for service id ", ": ", res);

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("service data55555: ", data);
    return {
      ...data,
      image: data.image?.startsWith("http")
        ? data.image
        : `${baseUrl}${data.image}`,
    };
  } catch (err) {
    console.warn(
      `API fetch failed for service ${id}, falling back to mock data. Error:`,
      err.message,
    );
    const fallbackService = services.find(
      (s) => s.id.toLowerCase() === id.toLowerCase(),
    );
    if (fallbackService) {
      return fallbackService;
    }
    throw new Error("Service not found in API or fallbacks");
  }
};

export const useServiceById = (id) =>
  // console.log("id in useServiceById: ", id)
  useQuery({
    queryKey: ["service", id],
    queryFn: () => fetchServiceById(id),
    enabled: !!id, // don't run query if id is undefined
  });
