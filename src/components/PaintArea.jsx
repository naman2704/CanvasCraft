import { useContext, useLayoutEffect } from "react";
import { fabric } from "fabric";
// import { fabricCanvas } from "./fabricCanvas";
import { Box } from "@mui/material";
const PaintArea = () => {
  const { setCanvas } = useContext(CanvasContext);
  useLayoutEffect(() => {
    const canvas = new fabric.canvas("CraftCanvas", {
      width: 800,
      height: 600,
      fireRightClick: true,
      fireMiddleClick: true,
      stopContextMenu: true,
      backgroundColor: undefined,
      backgroundImage: undefined,
    });
    canvas.requestRenderAll();
  }, []);
  return (
    <Box id="canvas-wrapper" position="relative" width="100%" height="100vh">
      <canvas id="CraftCanvas"></canvas>
    </Box>
  );
};

export default PaintArea;
