import { createSlice } from "@reduxjs/toolkit";

export const AudioUriSlice = createSlice({
    name: 'audioUri',
    initialState: {
        value: ""
    },
    reducers: {
        setAudioUri: (state, action) => {
            state.value = action.payload;
        },
        deleteAudioUri: (state) => {
            state.value = "";
        }
    }
});

export const { setAudioUri, deleteAudioUri } = AudioUriSlice.actions;