import { CircularProgress, ImageListItem } from "@mui/material";
import { useState } from "react";

const Image = ({ src, width, height, alt }) => {
  const [loading, setLoading] = useState(true);
  return (
    <ImageListItem
      sx={{
        cursor: "pointer",
        "&:hover": {
          filter: "brightness(0.8)",
        },
      }}
    >
      {loading && (
        <CircularProgress
          width={30}
          postion="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      )}
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setLoading(false)}
      />
    </ImageListItem>
  );
};

export default Image;
