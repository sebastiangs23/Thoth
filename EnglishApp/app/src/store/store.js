import { configureStore } from "@reduxjs/toolkit";
import { TopicsSlice } from "./slices/specificTopics/slice.js";
import { ChosenTopicSlice } from "./slices/chosenTopic/slice.js";
import { SituationSlice } from "./slices/situation/slice.js";
import { DialogsSlice } from "./slices/dialog/slice.js";
import { ScoreSlice } from "./slices/score/slice.js";
import { CountriesSlice } from "./slices/countries/slice.js";
import { AudioUriSlice } from "./slices/audioUri/slice.js";

export default configureStore({
  reducer: {
    topics: TopicsSlice.reducer,
    chosenTopic: ChosenTopicSlice.reducer, //X
    situation: SituationSlice.reducer, //X
    dialog: DialogsSlice.reducer, //X
    score: ScoreSlice.reducer,
    countries: CountriesSlice.reducer,
    audioUri: AudioUriSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
