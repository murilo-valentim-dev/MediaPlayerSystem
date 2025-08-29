import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setCurrentMedia, setPlaylistMedias } from '../store/playerSlice';

const PlaylistSelector: React.FC = () => {
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        api
            .get('/playlist')
            .then((res) => setPlaylists(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = async (event: SelectChangeEvent<string>) => {
        const playlistId = parseInt(event.target.value, 10);
        setSelectedPlaylist(event.target.value);

        try {
            const response = await api.get(`/playlist/${playlistId}`);
            const midias = response.data.midias; // usa direto do retorno da API

            // Atualiza playlist completa no Redux
            dispatch(setPlaylistMedias(midias));

            // Define a primeira mídia como currentMedia
            if (midias.length > 0) {
                dispatch(setCurrentMedia(midias[0]));
            } else {
                dispatch(setCurrentMedia(null));
            }
        } catch (err) {
            console.error(err);
            dispatch(setCurrentMedia(null));
            dispatch(setPlaylistMedias([]));
        }
    };

    return (
        <Box my={2}>
            <FormControl fullWidth>
                <InputLabel>Selecionar Playlist</InputLabel>
                <Select
                    value={selectedPlaylist}
                    label="Selecionar Playlist"
                    onChange={handleChange}
                >
                    {playlists.map((playlist) => (
                        <MenuItem key={playlist.id} value={playlist.id.toString()}>
                            {playlist.nome}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default PlaylistSelector;
