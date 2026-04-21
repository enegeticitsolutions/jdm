import { achievementsData as defaultAchievements } from "./achievement";
import { defaultStoryData } from "./storyData";
import { defaultVMData } from "./visionMission";

const BASE = process.env.NEXT_PUBLIC_BASE_URL;

export const transformAboutData = (data) => {
  if (!data || !data.is_active) return null;

  const transformImage = (url) => {
    console.log("transformImage called with:", url);
    return url ? `${BASE}${url}` : null;
  };

  return {
    heading: data.heading,
    teamHeading: data.team_heading,

    // ------------------------ STORY SECTION ------------------------
    storyData:
      data.is_story && data.story
        ? {
          heading: data.story?.heading || defaultStoryData.heading,
          paragraph: data.story?.paragraph || defaultStoryData.paragraph,
          points:
            data.story?.points?.length > 0
              ? data.story.points
              : defaultStoryData.points,
          founder_image_url:
            transformImage(data.story?.founder_image_url) ||
            defaultStoryData.founder_image_url,
          para1: data.story?.para1 || defaultStoryData.para1,
          para2: data.story?.para2 || defaultStoryData.para2,
        }
        : null,

    // ------------------------ VM + VALUES + KEY STRENGTHS ------------------------
    vmData: {
      mission: data.mission?.is_active
        ? {
          heading: data.mission?.heading || defaultVMData.mission.heading,
          paragraph:
            data.mission?.paragraph || defaultVMData.mission.paragraph,
          image_url:
            transformImage(data.mission?.image_url) ||
            defaultVMData.mission.image_url,
          is_active: true,
        }
        : null,

      vision: data.vision?.is_active
        ? {
          heading: data.vision?.heading || defaultVMData.vision.heading,
          paragraph: data.vision?.paragraph || defaultVMData.vision.paragraph,
          image_url:
            transformImage(data.vision?.image_url) ||
            defaultVMData.vision.image_url,
          is_active: true,
        }
        : null,

      values: data.values?.is_active
        ? {
          heading: data.values?.heading || defaultVMData.values.heading,
          points:
            data.values?.points?.length > 0
              ? data.values.points
              : defaultVMData.values.points,
          image_url:
            transformImage(data.values?.image_url) ||
            defaultVMData.values.image_url,
          is_active: true,
        }
        : null,

      // ⭐ ADDED KEY STRENGTHS INSIDE vmData
      keyStrengths: data.key_strengths
        ? {
          heading: data.key_strengths?.heading || "Our Key Strengths",
          points:
            data.key_strengths?.points?.length > 0
              ? data.key_strengths.points
              : defaultVMData.strengths,
        }
        : null,
    },

    // ------------------------ ACHIEVEMENTS SECTION ------------------------
    achievementsData: data.is_achievements
      ? {
        heading: data.achievements?.heading || defaultAchievements.heading,
        items:
          data.achievements?.items?.length > 0
            ? [
              ...data.achievements.items.map((item, index) => {
                const customApiIcons = [
                  "/assets/img/icon/experience.png",
                  "/assets/img/icon/client.png",
                  "/assets/img/icon/building.png"
                ];
                return {
                  ...item,
                  icon: index < 3 ? customApiIcons[index] : (item.icon ? transformImage(item.icon) : null),
                };
              }),
              ...defaultAchievements.items,
            ]
            : defaultAchievements.items,
      }
      : null,

    // ------------------------ FAQ SECTION ------------------------
    faqData:
      data.is_faq && data.faq
        ? {
          heading: data.faq.heading,
          paragraph: data.faq.paragraph,
          items:
            data.faq?.items?.length > 0
              ? data.faq.items.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                is_active: item.is_active,
              }))
              : [],
        }
        : null,
  };
};
