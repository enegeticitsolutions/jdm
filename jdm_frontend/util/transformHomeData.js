// utils/transformHomeData.js

const generateImagePaths = (basePath, count) =>
  Array.from({ length: count }, (_, i) => `${basePath}/${i + 1}.png`);

import { homeServices } from "./homeService";
import { branches as defaultBranches } from "./stateGroup";
import { achievementsData as defaultAchievements } from "./achievement";

export const transformHomeData = (data) => {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("BASE URL: ", BASE);
  console.log("data in transformHomeData: ", data);

  return {
    videoSrc:
      data.is_hero && data.hero.video_url
        ? `${BASE}${data.hero.video_url}`
        : "/assets/img/hero/intro.mp4",
    services: data.is_services
      ? {
          heading: data.services?.heading || "Our Services",
          items:
            data.services?.items?.length > 0
              ? data.services.items.map((item) => ({
                  ...item,
                  image: `${BASE}${item.image}`,
                }))
              : homeServices,
        }
      : null,
    journey: {
      heading: data.is_journey ? data.journey.heading : "Our Journey",
      url:
        data.is_journey && data.journey.video_url
          ? `${BASE}${data.journey.video_url}`
          : "/assets/img/journey/JDM_Timeline.mp4",
    },
    clientele: data.is_clientele
      ? data.clientele?.items?.length > 0
        ? data.clientele.items.map((item) => `${BASE}${item}`)
        : generateImagePaths("/assets/img/customer_logo", 40)
      : generateImagePaths("/assets/img/customer_logo", 40),
    affiliations: data.is_affiliations
      ? data.affiliations?.items?.length > 0
        ? data.affiliations.items.map((item) => `${BASE}${item}`)
        : generateImagePaths("/assets/img/brand/Associations/International", 10)
      : generateImagePaths("/assets/img/brand/Associations/International", 10),
    associations: data.is_associations
      ? data.associations?.items?.length > 0
        ? data.associations.items.map((item) => `${BASE}${item}`)
        : generateImagePaths("/assets/img/brand/Associations/Domestic", 7)
      : generateImagePaths("/assets/img/brand/Associations/Domestic", 7),
    seaPartners: data.is_sea_partners
      ? data.sea_partners?.items?.length > 0
        ? data.sea_partners.items.map((item) => `${BASE}${item}`)
        : generateImagePaths("/assets/img/career_partner_logos/Sea", 11)
      : generateImagePaths("/assets/img/career_partner_logos/Sea", 11),
    airPartners: data.is_air_partners
      ? data.air_partners?.items?.length > 0
        ? data.air_partners.items.map((item) => `${BASE}${item}`)
        : generateImagePaths("/assets/img/career_partner_logos/Air", 17)
      : generateImagePaths("/assets/img/career_partner_logos/Air", 17),
    branches: data.is_locations
      ? {
          heading: data.locations?.heading || "Our Locations",
          items:
            data.locations?.items?.length > 0
              ? data.locations.items.map((item) => ({
                  ...item,
                  image: `${BASE}${item.image}`,
                }))
              : defaultBranches,
        }
      : null,
    achievements: data.is_achievements
      ? {
          heading: data.achievements?.heading || defaultAchievements.heading,
          items:
            data.achievements?.items?.length > 0
              ? data.achievements.items.map((item) => ({
                  ...item,
                  icon: `${BASE}${item.icon}`,
                }))
              : defaultAchievements.items,
        }
      : null,
  };
};
