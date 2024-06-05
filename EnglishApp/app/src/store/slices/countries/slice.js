import { createSlice } from "@reduxjs/toolkit";

export const CountriesSlice = createSlice({
    name: 'countries',
    initialState: {
        value: []
    },
    reducers: {
        setCountries: (state, action) => {
            state.value = action.payload;
            console.log(state.value);
        }
    }
});

export const { setCountries } = CountriesSlice.actions;