import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PlaylistSelector from './components/PlaylistSelector';
import Player from './components/Player';
import { Layout, Typography, Space } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ backgroundColor: '#0F2143', borderRadius: '0 0 16px 16px', padding: '10px 15px' }}>
          <Typography.Title style={{ color: '#fff', margin: 2 }} level={2}>
            Media Player
          </Typography.Title>
        </Header>

        <Content style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
          <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: 900 }}>
            <div className="playlist-selector">
              <Typography.Title level={4} style={{ color: '#0F2143' }}>
                Selecione uma playlist
              </Typography.Title>
              <PlaylistSelector />
            </div>

            <div className="player-container">
              <Player />
            </div>
          </Space>
        </Content>

        <Footer style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          Media Player - ©2025
        </Footer>
      </Layout>
    </Provider>
  );
};

export default App;
