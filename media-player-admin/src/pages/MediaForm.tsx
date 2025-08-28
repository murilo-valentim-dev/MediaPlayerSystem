import { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const MediaForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams(); // id da mídia se for edição
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`/media/${id}`)
                .then(res => {
                    const data = res.data;
                    // Preencher o form com os dados existentes
                    form.setFieldsValue({
                        titulo: data.titulo ?? data.Titulo ?? '',
                        descricao: data.descricao ?? data.Descricao ?? '',
                        url: data.url ?? data.Url ?? '',
                    });
                })
                .catch(() => message.error('Erro ao carregar a mídia'))
                .finally(() => setLoading(false));
        }
    }, [id, form]);

    const onFinish = async (values: { titulo: string; descricao?: string; url: string }) => {
        setLoading(true);
        try {
            if (!id) {
                // criar nova mídia
                await api.post('/media', values);
                message.success('Mídia criada com sucesso!');
            } else {
                // atualizar mídia existente
                await api.put(`/media/${id}`, values);
                message.success('Mídia atualizada com sucesso!');
            }
            navigate('/medias');
        } catch {
            message.error('Erro ao salvar a mídia.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Mídia' : 'Nova Mídia'}</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={loading}
            >
                <Form.Item
                    label="Título"
                    name="titulo"
                    rules={[{ required: true, message: 'Por favor, insira o título!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Descrição"
                    name="descricao"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="URL"
                    name="url"
                    rules={[{ required: true, message: 'Por favor, insira a URL!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MediaForm;
