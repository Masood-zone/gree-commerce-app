export const truncateDescription = (desc: string, length: number) => {
  if (desc.length > 200) {
    return desc.substring(0, length) + "..."; // Subtracting 2 characters for spaces
  }
  return desc;
};
