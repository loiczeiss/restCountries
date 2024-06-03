import { configureStore } from '@reduxjs/toolkit'
import SelectedCountryReducer from '../components/selectedCountry/SelectedCountrySlice'
import allCountriesReducer from '../components/countries/CountriesSlice'
import SearchedCountryReducer from '../components/search&filter/SearchedCountrySlice'
import regionFilterReducer from '../components/search&filter/regionFilterSlice'
import AppSliceReducer from '../AppSlice'
import lightModeReducer from '../components/lightMode/lightModeSlice'
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