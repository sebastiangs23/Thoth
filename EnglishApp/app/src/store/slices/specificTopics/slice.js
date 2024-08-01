import { createSlice } from "@reduxjs/toolkit";

export const TopicsSlice = createSlice({
  name: "topics",
  initialState: {
    value: [],
  },
  reducers: {
    setTopics: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTopics } = TopicsSlice.actions;
