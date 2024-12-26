import { createSlice } from "@reduxjs/toolkit";

export const DialogsSlice = createSlice({
  name: "dialog",
  initialState: {
    value: [],
  },
  reducers: {
    setDialog: (state, action) => {
      state.value = action.payload;
    },
    setDialogsApproved: (state) => {
      let next2 = 2;

      const newState = state.value.map((item) => {
        if (next2 != 0 && item.approved == false) {
          next2--;
          return { ...item, approved: true };
        }
        return item;
      });

      let countApproved = state.value.filter((dialog) => dialog.approved == true).length;

      if(countApproved === state.value.length){
        newState[newState.length - 1] = { ...newState[newState.length - 1], allApproved: true  }
      }

      state.value = newState;
    },
  },
});

export const { setDialog, setDialogsApproved } = DialogsSlice.actions;
