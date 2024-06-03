import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search&filter/SearchedCountrySlice";
import { selectFilteredRegion } from "../search&filter/regionFilterSlice";

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

// Memoization function
const memoize = (fn) => {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    if (lastArgs && lastArgs.length === args.length && args.every((arg, index) => arg === lastArgs[index])) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  };
};

const filterCountries = (allCountries, searchTerm) => {
  return allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectFilteredAllCountries = memoize((state) => {
  const allCountries = selectAllCountries(state);
  const searchTerm = selectSearchTerm(state);
  return filterCountries(allCountries, searchTerm);
});

export default allCountriesSlice.reducer;
