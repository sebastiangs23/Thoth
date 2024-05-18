import { configureStore } from '@reduxjs/toolkit'
import { DialogsSlice } from './slice.js';

export default configureStore({
    reducer: {
        dialog: DialogsSlice.reducer,
    }
});