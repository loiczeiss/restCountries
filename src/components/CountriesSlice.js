import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "./SearchedCountrySlice";
import { selectFilteredRegion } from "./regionFilterSlice";
import Countries from "./Countries";

// Async thunk to fetch countries
export const loadCountries = createAsyncThunk(
  "allCountries/getAllCountries",
  async (_, { getState }) => {
    const state = getState();
    const region = selectFilteredRegion(state);
    const url = "https://rest-countries-api-gamma-drab.vercel.app/";
    const queryString = new URLSearchParams({ region }).toString();
    const fullUrl = `${url}?${queryString}`;

    const response = await fetch(fullUrl);
    const data = await response.json();
    return data;
  }
);

const sliceOptions = {
  name: "allCountries",
  initialState: {
    countries: [],
    isLoading: false,
    hasError: false,
    loadingTimer: false,
  },
  reducers: {
    setLoadingTime: (state, action) => {
      state.loadingTimer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.countries = action.payload;
      })
      .addCase(loadCountries.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
};

export const allCountriesSlice = createSlice(sliceOptions);

export const { setLoadingTime } = allCountriesSlice.actions;
export const selectAllCountries = (state) => state.allCountries.countries;

export const LoadingTimeBoolean = (state) => state.allCountries.loadingTimer;

export const selectFilteredAllCountries = (state) => {
  const allCountries = selectAllCountries(state);
  const searchTerm = selectSearchTerm(state);

  return allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default allCountriesSlice.reducer;
