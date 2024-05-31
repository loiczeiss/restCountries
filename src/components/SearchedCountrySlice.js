import { createSlice } from "@reduxjs/toolkit";

export const SearchedCountrySlice = createSlice({
  name: "searchedCountry",
  initialState: "",
  reducers: {
    setSearchTerm: (state, action) => (state = action.payload),
  },
});

export const { setSearchTerm } = SearchedCountrySlice.actions;

export const selectSearchTerm = (state) => state.searchedCountry;

export default SearchedCountrySlice.reducer;
