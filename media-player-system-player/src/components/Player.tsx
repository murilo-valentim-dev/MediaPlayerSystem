import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import ReactPlayer from 'react-player';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { setCurrentMedia } from '../store/playerSlice';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import '../App.css';

const Player: React.FC = () => {
    const currentMedia = useSelector((state: RootState) => state.player.currentMedia);
    const playlistMedias = useSelector((state: RootState) => state.player.playlistMedias);
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Sincroniza o índice sempre que currentMedia muda
    useEffect(() => {
        if (currentMedia && playlistMedias.length > 0) {
            const idx = playlistMedias.findIndex(m => m.id === currentMedia.id);
            setCurrentIndex(idx >= 0 ? idx : 0);
        }
    }, [currentMedia, playlistMedias]);

    const handleNext = () => {
        if (!playlistMedias.length) return;
        const nextIndex = (currentIndex + 1) % playlistMedias.length;
        dispatch(setCurrentMedia(playlistMedias[nextIndex]));
        setCurrentIndex(nextIndex);
    };

    const handlePrev = () => {
        if (!playlistMedias.length) return;
        const prevIndex = (currentIndex - 1 + playlistMedias.length) % playlistMedias.length;
        dispatch(setCurrentMedia(playlistMedias[prevIndex]));
        setCurrentIndex(prevIndex);
    };

    if (!currentMedia) {
        return (
            <Paper className="player-container" sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" color="#555">
                    Selecione uma mídia para reproduzir
                </Typography>
            </Paper>
        );
    }

    const cleanUrl = currentMedia.url.split("&")[0];

    return (
        <Paper className="player-container" sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                {currentMedia.titulo}
            </Typography>

            <Box className="player-video-wrapper" sx={{ position: 'relative', paddingTop: '56.25%', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
                <ReactPlayer
                    url={cleanUrl}
                    controls
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            </Box>

            <Stack direction="row" spacing={3} justifyContent="center">
                <Button
                    variant="contained"
                    startIcon={<SkipPreviousIcon />}
                    sx={{
                        bgcolor: '#0F2143',
                        color: '#fff',
                        borderRadius: 3,
                        px: 3,
                        '&:hover': { bgcolor: '#152d5c' }
                    }}
                    onClick={handlePrev}
                >
                    Anterior
                </Button>

                <Button
                    variant="contained"
                    endIcon={<SkipNextIcon />}
                    sx={{
                        bgcolor: '#0F2143',
                        color: '#fff',
                        borderRadius: 3,
                        px: 3,
                        '&:hover': { bgcolor: '#152d5c' }
                    }}
                    onClick={handleNext}
                >
                    Próxima
                </Button>
            </Stack>
        </Paper>
    );
};

export default Player;
