import React, { useCallback, useEffect } from "react";

interface IProps {
  imageUrl: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  format?: string;
  maxAge?: string;
  onClick?: () => void;
}

const MyOptimizedImage: React.FC<IProps> = ({
  imageUrl,
  alt,
  className,
  width,
  height,
  format,
  maxAge,
  onClick,
}) => {
  const [image, setImage] = React.useState<string>("");

  const getOptimizedImage = useCallback(async () => {
    const formattedEndpoints = [
      width && `w=${width}`,
      height && `h=${height}`,
      format && `output=${format}`,
      maxAge && `maxage=${maxAge}`,
    ]
      .filter(Boolean)
      .join("&");

    const formattedImgUrl = `https://images.weserv.nl/?url=${imageUrl}&${formattedEndpoints}`;
    try {
      const image = await fetch(formattedImgUrl);
      setImage(image.url);
    } catch {
      setImage(imageUrl);
    }
  }, [width, height, format, maxAge, imageUrl]);

  useEffect(() => {
    getOptimizedImage();
  }, [getOptimizedImage]);

  return <img src={image} alt={alt} className={className} onClick={onClick} />;
};

export default MyOptimizedImage;
