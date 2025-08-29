import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrentMedia, setPlaylistMedias } from '../store/playerSlice';

const { Option } = Select;

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

    const handleChange = async (value: string) => {
        const playlistId = parseInt(value, 10);
        setSelectedPlaylist(value);

        try {
            const response = await api.get(`/playlist/${playlistId}`);
            const midias = response.data.midias;

            dispatch(setPlaylistMedias(midias));
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
        <Select
            value={selectedPlaylist}
            placeholder="Selecione uma playlist"
            style={{ width: '100%' }}
            onChange={handleChange}
        >
            {playlists.map((playlist) => (
                <Option key={playlist.id} value={playlist.id.toString()}>
                    {playlist.nome}
                </Option>
            ))}
        </Select>
    );
};

export default PlaylistSelector;
