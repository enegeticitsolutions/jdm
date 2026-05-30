import { useQuery } from "@tanstack/react-query";
import { defaultTeamMembers } from "@/util/teamMembers";

const fetchTeamData = async () => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 8000);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/team/`, {
            cache: "no-store",
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error("Failed to fetch team data");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        let processedData = [];
        if (data && data.length > 0) {
            processedData = data.map((member) => ({
                ...member,
                image: member.image?.startsWith("http")
                    ? member.image
                    : `${baseUrl}${member.image}`,
            }));
        } else {
            processedData = defaultTeamMembers;
        }

        return processedData;
    } catch (err) {
        if (err.name === "AbortError") {
            throw new Error("Request timed out");
        }
        console.warn("API fetch failed for team members, falling back to mock data.", err);
        return defaultTeamMembers;
    }
};

export const useTeamData = () => {
    return useQuery({
        queryKey: ["team"],
        queryFn: fetchTeamData,
    });
};
