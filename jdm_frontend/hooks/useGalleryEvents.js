import { useQuery } from "@tanstack/react-query";

const fetchGalleryEvents = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // Timeout after 8 seconds

  console.log(
    "Calling Gallery API →",
    `${process.env.NEXT_PUBLIC_API_URL}/gallery/`,
  );

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/gallery/`, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error("Failed to fetch gallery data");

    const rawData = await res.json();
    if (rawData.error) throw new Error(rawData.error);

    // Normalize and prepend base URL to image src
    const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";
    const formatUrl = (path) => {
      if (!path) return path;
      // Strip out the BASE url if it already happens to be in the string
      let cleanPath = path;
      if (BASE && cleanPath.startsWith(BASE)) {
        cleanPath = cleanPath.replace(BASE, "");
      } else if (cleanPath.startsWith("http")) {
        // If it's a completely different external HTTP link, just return it
        return cleanPath;
      }
      return `${BASE}${cleanPath.startsWith("/") ? "" : "/"}${cleanPath}`;
    };

    const normalizedData = rawData.map((event) => ({
      title: event.title,
      is_active: event.is_active,
      images: (event.images || []).map((image) => ({
        src: formatUrl(image.image), // safely format base URL
        alt: image.alt || "Gallery image",
        caption: image.caption || "",
        is_active: image.is_active,
      })),
    }));

    return normalizedData;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
};

export const useGalleryEvents = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGalleryEvents,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes
  });
};
