import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: false,
  text: "Light Mode",
};

export const lightModeSlice = createSlice({
  name: "lightMode",
  initialState,
  reducers: {
    setLightMode: (state, action) => {
      state.mode = action.payload;
    },
    setLightText: (state, action) => {
      state.text = action.payload;
    },
  },
});

export const { setLightMode, setLightText } = lightModeSlice.actions;

export const isLight = (state) => state.lightMode.mode;
export const lightText = (state) => state.lightMode.text;

export default lightModeSlice.reducer;
