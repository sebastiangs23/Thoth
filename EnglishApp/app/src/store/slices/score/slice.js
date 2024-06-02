import { createSlice } from "@reduxjs/toolkit";

export const ScoreSlice = createSlice({
    name: 'score',
    initialState: {
        value: []
    },
    reducers: {
        setScore: (state, action) => {
            state.value = action.payload;
            console.log('AZURE RESULT')
            console.log(state.value)
        }
    }
});

export const { setScore } = ScoreSlice.actions;