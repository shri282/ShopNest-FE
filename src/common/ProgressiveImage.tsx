import React, { useState } from "react";
import { Skeleton } from "@mui/material";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  height = "100%",
  width = "100%",
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Skeleton variant="rectangular" width={width} height={height} />
      )}
      <img
        src={src}
        alt={alt}
        style={{ display: loaded ? "block" : "none" }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ProgressiveImage;
