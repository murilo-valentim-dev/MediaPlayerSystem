import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Media {
    id: number;
    titulo: string;
    descricao: string;
    url: string;
}

interface Playlist {
    id: number;
    nome: string;
    descricao: string;
    midias?: Media[];
}

const PlaylistList = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const fetchPlaylists = () => {
        setLoading(true);
        api.get('/playlist')
            .then((res) => setPlaylists(res.data))
            .catch(() => message.error('Erro ao carregar playlists'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPlaylists();

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDelete = (id: number) => {
        api.delete(`/playlist/${id}`)
            .then(() => {
                message.success('Playlist excluída com sucesso!');
                fetchPlaylists();
            })
            .catch(() => message.error('Erro ao excluir a playlist'));
    };

    const columns: ColumnsType<Playlist> = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text) => <div style={{ whiteSpace: 'normal' }}>{text}</div>,
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            render: (text) => <div style={{ whiteSpace: 'normal' }}>{text}</div>,
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: any, record: Playlist) => (
                <>
                    <Link to={`/playlists/${record.id}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Popconfirm
                        title="Tem certeza que deseja excluir?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" danger>
                            Excluir
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Playlists</h2>
            <Link to="/playlists/new">
                <Button type="primary" style={{ marginBottom: 16 }}>
                    Nova Playlist
                </Button>
            </Link>

            {isMobile ? (
                // Cards para celular
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {playlists.map((pl) => (
                        <div
                            key={pl.id}
                            style={{
                                border: '1px solid #d9d9d9',
                                borderRadius: 8,
                                padding: 12,
                                background: '#fff',
                                wordWrap: 'break-word',
                                whiteSpace: 'normal',
                            }}
                        >
                            <h3>{pl.nome}</h3>
                            <p>{pl.descricao}</p>
                            <div>
                                <strong>Mídias:</strong>
                                <ul>
                                    {(pl.midias || []).map((m) => (
                                        <li key={m.id}>{m.titulo} - {m.descricao}</li>
                                    ))}
                                    {(!pl.midias || pl.midias.length === 0) && <li>Sem mídias</li>}
                                </ul>
                            </div>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <Link to={`/playlists/${pl.id}`}>
                                    <Button type="link">Editar</Button>
                                </Link>
                                <Popconfirm
                                    title="Tem certeza que deseja excluir?"
                                    onConfirm={() => handleDelete(pl.id)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <Button type="link" danger>
                                        Excluir
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={playlists}
                    loading={loading}
                    expandable={{
                        expandedRowRender: (record) => (
                            <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                <strong>Mídias:</strong>
                                <ul>
                                    {(record.midias || []).map((m) => (
                                        <li key={m.id}>{m.titulo} - {m.descricao}</li>
                                    ))}
                                    {(!record.midias || record.midias.length === 0) && <li>Sem mídias</li>}
                                </ul>
                            </div>
                        ),
                    }}
                    scroll={{ x: 'max-content' }}
                />
            )}
        </div>
    );
};

export default PlaylistList;
