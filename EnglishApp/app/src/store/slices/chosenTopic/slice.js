import { createSlice } from "@reduxjs/toolkit";

//Esto nose si sea necesario o refactorizar luego
export const ChosenTopicSlice = createSlice({
    name: "chosenTopic",
    initialState: {
        value: null
    },
    reducers: {
        setChosenTopic: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setChosenTopic } = ChosenTopicSlice.actions;