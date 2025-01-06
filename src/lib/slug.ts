export const generateSlug = (name: string, id: string | number) =>
  `${name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()}-${id}`;
