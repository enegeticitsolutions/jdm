export function highlightContent(text, heading) {
  let updatedText = text;

  // Highlight "JDM"
  updatedText = updatedText.replace(/\bJDM\b/g, "**JDM**");

  // Highlight heading inside its own content
  if (heading) {
    // Escape special regex characters in heading
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedHeading}\\b`, "g");

    updatedText = updatedText.replace(regex, `**${heading}**`);
  }

  return updatedText;
}
