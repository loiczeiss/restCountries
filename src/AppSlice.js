import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
  name: "componentPicker",
  initialState: 0,
  reducers: {
    setComponent: (state, action) => {
      return action.payload;
    },
  },
});

export const { setComponent } = AppSlice.actions;

export const componentPicked = (state) => state.componentPicker;

export default AppSlice.reducer;
