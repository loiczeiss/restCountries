import { createSlice } from "@reduxjs/toolkit";

const initialState = {}; // Changed to null to represent no country selected initially

export const SelectedCountrySlice = createSlice({
  name: "selectedCountry",
  initialState,
  reducers: {
    selectCountry: (state, action) => {
      return action.payload; // Set the state to the new country name
    },
  },
});

export const { selectCountry } = SelectedCountrySlice.actions;

export const selectSelectedCountry = (state) => state.selectedCountry;

export default SelectedCountrySlice.reducer;
