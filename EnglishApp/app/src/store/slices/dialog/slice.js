import { createSlice } from "@reduxjs/toolkit";

export const DialogsSlice = createSlice({
    name: 'dialog',
    initialState: {
        value: []
    },
    reducers: {
        setDialog: (state, action)=> {
            state.value = action.payload;
            console.log('CONVERSATION WITH THE APPROVED BELOW')
            console.log(state.value)
        },
        setDialogsApproved: (state) => {
            let next2 = 2;
            
            const newState = state.value.map((item) => {
                if(next2 != 0 && item.approved == false){
                    next2--;
                    return { ...item, approved: true };
                }
                return item;
            })

            state.value = newState;

            console.log(newState)
        }
    }
});

export const { setDialog, setDialogsApproved } = DialogsSlice.actions;