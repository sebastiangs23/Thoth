import { createSlice } from "@reduxjs/toolkit";

/*_____________
|   DIALOG   */
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