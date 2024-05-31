import { configureStore } from '@reduxjs/toolkit'
import SelectedCountryReducer from '../components/SelectedCountrySlice'
import allCountriesReducer from '../components/CountriesSlice'
import SearchedCountryReducer from '../components/SearchedCountrySlice'
import regionFilterReducer from '../components/regionFilterSlice'
import AppSliceReducer from '../AppSlice'
import lightModeReducer from '../components/lightModeSlice'
export const store = configureStore({
  reducer: {
  selectedCountry: SelectedCountryReducer,
  allCountries: allCountriesReducer,
  searchedCountry: SearchedCountryReducer,
  filteredCountriesByRegion: regionFilterReducer,
  componentPicker: AppSliceReducer,
  lightMode: lightModeReducer
  },
})