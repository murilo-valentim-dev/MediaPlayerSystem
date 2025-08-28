import { Layout, Menu } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import MediaList from './pages/MediaList';
import MediaForm from './pages/MediaForm';
import PlaylistList from './pages/PlaylistList';
import PlaylistForm from './pages/PlaylistForm';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/medias">Mídias</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/playlists">Playlists</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '20px' }}>
        <Routes>
          {/* Rotas de Mídias */}
          <Route path="/medias" element={<MediaList />} />
          <Route path="/medias/new" element={<MediaForm />} />
          <Route path="/medias/new/:id" element={<MediaForm />} />


          <Route path="/playlists" element={<PlaylistList />} />
          <Route path="/playlists/new" element={<PlaylistForm />} />
          <Route path="/playlists/:id" element={<PlaylistForm />} />
        </Routes>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Media Player Admin ©2025</Footer>
    </Layout>
  );
}

export default App;
