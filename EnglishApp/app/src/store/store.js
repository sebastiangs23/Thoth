import { configureStore } from "@reduxjs/toolkit";
import { DialogsSlice } from "./slices/dialog/slice.js";
import { ScoreSlice } from "./slices/score/slice.js";
import { CountriesSlice } from "./slices/countries/slice.js";
import { AudioUriSlice } from "./slices/audioUri/slice.js";

export default configureStore({
  reducer: {
    dialog: DialogsSlice.reducer,
    score: ScoreSlice.reducer,
    countries: CountriesSlice.reducer,
    audioUri: AudioUriSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
