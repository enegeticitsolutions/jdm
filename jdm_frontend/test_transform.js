import { transformAboutData } from "./util/transformAboutData.js";

const raw = {
  "mission": {
    "heading": "Our Mission",
    "paragraph": "Mission statement.",
    "is_active": true,
    "image_url": null
  },
  "is_active": true
};

console.log(transformAboutData(raw));
