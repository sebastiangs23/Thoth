import { createSlice } from "@reduxjs/toolkit";

export const AudioUriSlice = createSlice({
    name: 'audioUri',
    initialState: {
        value: ""
    },
    reducers: {
        setAudioUri2: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setAudioUri2 } = AudioUriSlice.actions;