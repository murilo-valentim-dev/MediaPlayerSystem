import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from '../features/media/mediaSlice';
import playlistReducer from '../features/playlist/playlistSlice';

export const store = configureStore({
    reducer: {
        media: mediaReducer,
        playlist: playlistReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
