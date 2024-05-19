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
            console.log("action.payload")
            console.log(action.payload)
            state.value = action.payload;

        }
    }
});

export const { setDialog } = DialogsSlice.actions;