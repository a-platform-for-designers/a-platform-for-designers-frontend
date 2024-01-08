export default function getBase64(file: File) {
  if (!file) return;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      console.warn(error);
      reject(error);
    };
  });
}
