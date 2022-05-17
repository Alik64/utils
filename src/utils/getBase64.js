export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => resolve(event.target.result));
    reader.addEventListener("error", (error) => reject(error.target.result));
    reader.readAsDataURL(file);
  });
};
