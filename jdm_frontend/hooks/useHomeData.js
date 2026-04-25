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

    console.log("abcd: ", res);

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch home data");
    const data = await res.json();
    console.log("data from home api: ", data);
    console.log("data123: ", data.error);
    if (data.error) throw new Error(data.error);
    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error("Request timed out");
    }
    throw err;
  }
};

export const useHomeData = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomeData,
  });
};
