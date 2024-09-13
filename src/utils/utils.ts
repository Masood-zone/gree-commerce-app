export const truncateDescription = (desc: string) => {
  if (desc.length > 200) {
    return desc.substring(0, 150) + "..."; // Subtracting 2 characters for spaces
  }
  return desc;
};
