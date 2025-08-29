import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PlaylistSelector from './components/PlaylistSelector';
import Player from './components/Player';
import { Container, Typography, Box, Paper, Stack } from '@mui/material';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Conteúdo principal */}
        <Box sx={{ flexGrow: 1, py: 4, m: 2 }}>
          <Box className="app-header" textAlign="left" mb={4}>
            <Typography variant="h4" component="h1">
              Media Player
            </Typography>
          </Box>

          <Container maxWidth="md">
            <Stack spacing={4}>
              <Paper className="playlist-selector" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Selecione uma playlist
                </Typography>
                <PlaylistSelector />
              </Paper>

              <Box className="player-container">
                <Player />
              </Box>
            </Stack>
          </Container>
        </Box>

        <Box component="footer" sx={{ textAlign: 'center', py: 2, bgcolor: '#f5f5f5' }}>
          Media Player - Player ©2025
        </Box>
      </Box>
    </Provider>
  );
};

export default App;
