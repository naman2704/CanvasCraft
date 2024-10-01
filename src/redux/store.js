import { configureStore } from "@reduxjs/toolkit";
import ImagesReducer from "./slices/imagesSlice";

const store = configureStore({
  reducer: {
    images: ImagesReducer,
  },
});

export default store;
