import { createContext } from "react";

const CanvasContext = createContext({
  canvas: null,
  setCanvas: () => {},
});

export default CanvasContext;
