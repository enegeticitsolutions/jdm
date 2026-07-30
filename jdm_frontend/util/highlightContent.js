export function highlightContent(text, heading) {
  let updatedText = text;

  // Highlight "JDM Group" and "JDM" (italicize using Markdown)
  updatedText = updatedText.replace(/\b(JDM Group|JDM)\b/g, "_$1_");

  // Highlight heading inside its own content
  if (heading) {
    // Escape special regex characters in heading
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedHeading}\\b`, "g");

    updatedText = updatedText.replace(regex, `**${heading}**`);
  }

  return updatedText;
}
