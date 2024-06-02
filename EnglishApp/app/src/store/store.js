import { configureStore } from '@reduxjs/toolkit'
import { DialogsSlice } from './slices/dialog/slice.js';
import { ScoreSlice } from './slices/score/slice.js';

export default configureStore({
    reducer: {
        dialog: DialogsSlice.reducer,
        score: ScoreSlice.reducer,
    }
});