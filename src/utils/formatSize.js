export const formatSize = (size) => {
  return (size / 1024 / 1024).toLocaleString("fr-FR") + " Mo";
};
