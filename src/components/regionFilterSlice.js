import { createSlice } from "@reduxjs/toolkit";

const initialState = { region: '' };

export const regionFilterSlice = createSlice({
    name: 'filteredCountriesByRegion',
    initialState,
    reducers: {
        setFilterByRegion: (state, action) => {
            state.region = action.payload;
        },
        removeFilter: () => initialState
    }
});

export const { setFilterByRegion, removeFilter } = regionFilterSlice.actions;

export const selectFilteredRegion = (state) => state.filteredCountriesByRegion?.region || '';

export default regionFilterSlice.reducer;
