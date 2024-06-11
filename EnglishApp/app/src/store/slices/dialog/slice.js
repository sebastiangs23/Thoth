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

    //   let allapproved = state.value.filter((dialog) => dialog.approved == true)
    //     .length;

    //   if (state.value.length == allapproved) {
    //     //Significa que ya aprobo todos los dialogos
    //     console.log("here it should be change the conversation to other, :P");
    //     state.value = [];
    //   } else {
        const newState = state.value.map((item) => {
          if (next2 != 0 && item.approved == false) {
            next2--;
            return { ...item, approved: true };
          }
          return item;
        });

        state.value = newState;
    //   }
    },
  },
});

export const { setDialog, setDialogsApproved } = DialogsSlice.actions;
