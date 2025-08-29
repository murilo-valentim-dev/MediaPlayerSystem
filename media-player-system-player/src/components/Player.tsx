import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import ReactPlayer from 'react-player';
import { Button, Typography, Space } from 'antd';
import { setCurrentMedia } from '../store/playerSlice';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../App.css';

const Player: React.FC = () => {
    const currentMedia = useSelector((state: RootState) => state.player.currentMedia);
    const playlistMedias = useSelector((state: RootState) => state.player.playlistMedias);
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState<number>(0);

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
            <div className="player-container" style={{ textAlign: 'center', padding: 60 }}>
                <Typography.Text style={{ color: '#555' }}>
                    Selecione uma mídia para reproduzir
                </Typography.Text>
            </div>
        );
    }

    const cleanUrl = currentMedia.url.split("&")[0];

    return (
        <div className="player-container" style={{ padding: 20 }}>
            <Typography.Title level={4}>{currentMedia.titulo}</Typography.Title>

            <div className="player-video-wrapper">
                <ReactPlayer
                    url={cleanUrl}
                    controls
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                />
            </div>

            <Space size="middle" style={{ justifyContent: 'center', display: 'flex', marginTop: 20 }}>
                <Button type="primary" icon={<LeftOutlined />} onClick={handlePrev}>
                    Anterior
                </Button>
                <Button type="primary" icon={<RightOutlined />} onClick={handleNext}>
                    Próxima
                </Button>
            </Space>
        </div>
    );
};

export default Player;
