// import ImageLibrary from "./components/ImageLibrary";
import { useState } from "react";
import PaintArea from "./components/PaintArea";
import ToolsMenu from "./components/ToolsMenu";
import CanvasContext from "./contexts/CanvasContext";
// import CustomButton from "./components/CustomButton";
// import { Box, Button, Typography, Modal, Backdrop, Fade } from "@mui/material";
// import { useState } from "react";

function App() {
  const [canvasVal, setCanvasVal] = useState(null);
  const setCanvas = (fabricCanvas) => {
    setCanvasVal(fabricCanvas);
  };
  return (
    <CanvasContext.Provider
      value={{
        canvas: canvasVal,
        setCanvas,
      }}
    >
      <ToolsMenu />
      <PaintArea />
      {/* <ImageLibrary /> */}
    </CanvasContext.Provider>
  );
}

export default App;
