import { configureStore } from '@reduxjs/toolkit'
import SelectedCountryReducer from '../components/SelectedCountrySlice'
import allCountriesReducer from '../components/AllCountrySlice'
import SearchedCountryReducer from '../components/SearchedCountrySlice'
import regionFilterReducer from '../components/regionFilterSlice'
export const store = configureStore({
  reducer: {
  selectedCountry: SelectedCountryReducer,
  allCountries: allCountriesReducer,
  searchedCountry: SearchedCountryReducer,
  filteredCountriesByRegion: regionFilterReducer
  },
})