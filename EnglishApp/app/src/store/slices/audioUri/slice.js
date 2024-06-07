import { createSlice } from "@reduxjs/toolkit";

export const AudioUriSlice = createSlice({
    name: 'audioUri',
    initialState: {
        value: ""
    },
    reducers: {
        setAudioUri: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAudioUri } = AudioUriSlice.actions;