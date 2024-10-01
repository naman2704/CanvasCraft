import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  images: [],
};

const apiKey = import.meta.env.VITE_UNSPLASH_CLIENT_ID;

export const getImages = createAsyncThunk(
  "images/getImages",
  async (imageQuery, thunkAPI) => {
    const { type = "random", perPageItem = 25, query } = imageQuery;
    let apiURL = `https://api.unsplash.com/photos/random?count=${perPageItem}&client_id=${apiKey}`;
    if (type === "search") {
      apiURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}&per_page=${perPageItem}`;
    }
    console.log("apiURL: ", apiURL);
    try {
      const response = await axios.get(apiURL);
      console.log("Unsplash images response: ", response);
      return response.data;
    } catch (error) {
      console.log("Error while calling upnsplash image API: ", error);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    resetImages: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetImages } = imagesSlice.actions;
export default imagesSlice.reducer;
