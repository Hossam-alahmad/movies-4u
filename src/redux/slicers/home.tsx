import { createSlice } from "@reduxjs/toolkit";

export interface HomeProps {
  url: {
    backdrop: string;
    poster: string;
    profile: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genres: any;
}

const initialState: HomeProps = {
  url: {
    backdrop: "",
    poster: "",
    profile: "",
  },
  genres: null,
};

export const counterSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});
export const { getApiConfiguration, getGenres } = counterSlice.actions;
export default counterSlice.reducer;
