import { createSlice } from "@reduxjs/toolkit";

export const SituationSlice = createSlice({
    name: "situation",
    initialState: {
        value: null
    },
    reducers: {
        setSituation: (state, action) =>  {
            state.value = action.payload;            
        }
    }
});

export const { setSituation } = SituationSlice.actions;