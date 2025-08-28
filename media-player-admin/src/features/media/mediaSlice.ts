import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Media {
    id: number;
    title: string;
    url: string;
}

interface MediaState {
    medias: Media[];
    loading: boolean;
    error: string | null;
}

const initialState: MediaState = {
    medias: [],
    loading: false,
    error: null,
};

// Busca todas as mídias
export const fetchMedias = createAsyncThunk('media/fetchAll', async () => {
    const response = await axios.get<Media[]>('http://localhost:5000/api/media');
    return response.data;
});

// Cria uma nova mídia
export const createMedia = createAsyncThunk(
    'media/create',
    async (media: Omit<Media, 'id'>) => {
        const response = await axios.post('http://localhost:5000/api/media', media);
        return response.data;
    }
);

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedias.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedias.fulfilled, (state, action) => {
                state.loading = false;
                state.medias = action.payload;
            })
            .addCase(fetchMedias.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Erro ao buscar mídias.';
            })
            .addCase(createMedia.fulfilled, (state, action) => {
                state.medias.push(action.payload);
            });
    },
});

export default mediaSlice.reducer;
