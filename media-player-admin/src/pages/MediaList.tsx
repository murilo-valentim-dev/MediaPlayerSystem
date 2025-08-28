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

const MediaList = () => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const fetchMedias = () => {
        setLoading(true);
        api.get('/media')
            .then((res) => setMedias(res.data))
            .catch(() => message.error('Erro ao carregar mídias'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchMedias();

        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDelete = (id: number) => {
        api.delete(`/media/${id}`)
            .then(() => {
                message.success('Mídia excluída com sucesso!');
                fetchMedias();
            })
            .catch(() => message.error('Erro ao excluir a mídia'));
    };

    const columns: ColumnsType<Media> = [
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
            onCell: () => ({ style: { whiteSpace: 'normal', wordWrap: 'break-word' } }),
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            onCell: () => ({ style: { whiteSpace: 'normal', wordWrap: 'break-word' } }),
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            onCell: () => ({ style: { whiteSpace: 'normal', wordWrap: 'break-word' } }),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Link to={`/medias/new/${record.id}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Popconfirm
                        title="Tem certeza que deseja excluir?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="link" danger>Excluir</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Lista de Mídias</h2>
            <Link to="/medias/new">
                <Button type="primary" style={{ marginBottom: 16 }}>
                    Adicionar Mídia
                </Button>
            </Link>

            {isMobile ? (
                // Cards para celular
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {medias.map((m) => (
                        <div key={m.id} style={{
                            border: '1px solid #d9d9d9',
                            borderRadius: 8,
                            padding: 12,
                            background: '#fff',
                            wordWrap: 'break-word',
                            whiteSpace: 'normal'
                        }}>
                            <h3>{m.titulo}</h3>
                            <p>{m.descricao}</p>
                            <p><strong>URL:</strong> {m.url}</p>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <Link to={`/medias/new/${m.id}`}>
                                    <Button type="link">Editar</Button>
                                </Link>
                                <Popconfirm
                                    title="Tem certeza que deseja excluir?"
                                    onConfirm={() => handleDelete(m.id)}
                                    okText="Sim"
                                    cancelText="Não"
                                >
                                    <Button type="link" danger>Excluir</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={medias}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                />
            )}
        </div>
    );
};

export default MediaList;
