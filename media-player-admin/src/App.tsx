import React from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import MediaList from './pages/MediaList';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white' }}>Media Player Admin</Header>
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<MediaList />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>© 2025 Murilo Valentim</Footer>
    </Layout>
  );
};

export default App;
