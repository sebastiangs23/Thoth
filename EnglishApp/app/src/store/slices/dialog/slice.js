import { createSlice } from "@reduxjs/toolkit";

export const DialogsSlice = createSlice({
    name: 'dialog',
    initialState: {
        value: []
    },
    reducers: {
        setDialog: (state, action)=> {
            state.value = action.payload;
        }
    }
});

export const { setDialog } = DialogsSlice.actions;