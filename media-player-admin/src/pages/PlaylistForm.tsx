import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const PlaylistForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams(); // id da playlist
    const [medias, setMedias] = useState<any[]>([]);
    const [selectedMedias, setSelectedMedias] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get("/media")
            .then(res => setMedias(res.data || []))
            .catch(() => message.error("Erro ao carregar mídias"));
        if (id) {
            setLoading(true);
            api.get(`/playlist/${id}`)
                .then(res => {
                    const data = res.data;
                    form.setFieldsValue({
                        nome: data.nome,
                        descricao: data.descricao
                    });
                    setSelectedMedias((data.midias || []).map((m: any) => m.id));
                })
                .catch(() => message.error("Erro ao carregar playlist"))
                .finally(() => setLoading(false));
        }
    }, [id, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            let playlistId = id;

            if (!id) {
                const res = await api.post("/playlist", values);
                playlistId = res.data.id;
            } else {
                await api.put(`/playlist/${playlistId}`, values);
            }

            if (playlistId) {
                const res = await api.get(`/playlist/${playlistId}`);
                const currentMediaIds = (res.data.midias || []).map((m: any) => m.id);

                for (const mediaId of currentMediaIds) {
                    if (!selectedMedias.includes(mediaId)) {
                        await api.delete(`/playlist/${playlistId}/removeMedia/${mediaId}`);
                    }
                }

                for (const mediaId of selectedMedias) {
                    if (!currentMediaIds.includes(mediaId)) {
                        await api.post(`/playlist/${playlistId}/addMedia/${mediaId}`);
                    }
                }
            }

            message.success(`Playlist ${id ? "atualizada" : "criada"} com sucesso!`);
            navigate("/playlists");
        } catch (err) {
            console.error("Erro ao salvar playlist", err);
            message.error("Erro ao salvar playlist");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish} disabled={loading}>
            <Form.Item
                name="nome"
                label="Nome"
                rules={[{ required: true, message: "Por favor, insira o nome da playlist" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item name="descricao" label="Descrição">
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item label="Mídias">
                <Select
                    mode="multiple"
                    value={selectedMedias}
                    onChange={setSelectedMedias}
                    placeholder="Selecione as mídias"
                >
                    {medias.map((m: any) => (
                        <Select.Option key={m.id} value={m.id}>
                            {m.titulo ?? m.Titulo ?? "Sem título"}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
                Salvar
            </Button>
        </Form>
    );
};

export default PlaylistForm;
