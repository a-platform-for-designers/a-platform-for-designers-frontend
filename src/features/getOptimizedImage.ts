// https://images.weserv.nl/docs/ <--- documentation on api

const getOptimizedImage = (
  image: string,
  width?: number,
  height?: number,
  format?: string,
  maxAge?: string
) => {
  const formattedEndpoints = [
    width && `w=${width}`,
    height && `h=${height}`,
    format && `output=${format}`,
    maxAge && `maxage=${maxAge}`,
  ]
    .filter(Boolean)
    .join("&");

  const formattedImgUrl = `https://images.weserv.nl/?url=${image}&${formattedEndpoints}`;
  return formattedImgUrl;
};

export { getOptimizedImage };
