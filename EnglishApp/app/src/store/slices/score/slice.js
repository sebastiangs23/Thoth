import { createSlice } from "@reduxjs/toolkit";

export const ScoreSlice = createSlice({
  name: "score",
  initialState: {
    value: {
      pronunciation_level: [
        {
          accuracy_score: 0,
          completeness_score: 0,
          fluency_score: 0,
          pronunciation_score: 0,
          prosody_score: 0,
        },
        [],
      ],
    },
  },
  reducers: {
    setScore: (state, action) => {
      state.value = action.payload;
    },
    deleteScore: (state) => {
      state.value = {
        pronunciation_level: [
          {
            accuracy_score: 0,
            completeness_score: 0,
            fluency_score: 0,
            pronunciation_score: 0,
            prosody_score: 0,
          },
          [],
        ],
      };
    },
  },
});

export const { setScore, deleteScore } = ScoreSlice.actions;
