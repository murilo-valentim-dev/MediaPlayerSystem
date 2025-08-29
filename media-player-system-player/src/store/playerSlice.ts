import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Media {
    id: number;
    titulo: string;
    descricao: string;
    url: string;
    tipo: number;
}

interface PlayerState {
    currentMedia: Media | null;
    playlistMedias: Media[];
}

const initialState: PlayerState = {
    currentMedia: null,
    playlistMedias: [],
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentMedia: (state, action: PayloadAction<Media | null>) => {
            state.currentMedia = action.payload;
        },
        setPlaylistMedias: (state, action: PayloadAction<Media[]>) => {
            state.playlistMedias = action.payload;
        },
    },

});


export const { setCurrentMedia, setPlaylistMedias } = playerSlice.actions;
export default playerSlice.reducer;
