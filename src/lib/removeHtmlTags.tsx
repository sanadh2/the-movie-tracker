export const removeHtmlTags = (htmlString: string | undefined) => {
  if (!htmlString) return undefined;
  return htmlString.replace(/<[^>]*>/g, "");
};
