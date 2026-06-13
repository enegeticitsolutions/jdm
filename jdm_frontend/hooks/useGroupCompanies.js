import { useQuery } from "@tanstack/react-query";

const defaultCompanies = [
  { name: "JDM Worldwide Freight Solutions Pvt. Ltd.", link: "" },
  { name: "JDM Cargo Planners Pvt. Ltd.", link: "" },
  { name: "JDM Express Pvt. Ltd.", link: "" },
  { name: "Arrow Transport Service", link: "" },
  { name: "AS Transport Service", link: "" }
];

const fetchGroupCompanies = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/group-companies/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch group companies");
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
  } catch (err) {
    console.warn("API fetch failed for group companies, falling back to mock data. Error:", err.message);
    return defaultCompanies;
  }
};

export const useGroupCompanies = () => {
  return useQuery({
    queryKey: ["group-companies"],
    queryFn: fetchGroupCompanies,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
};
