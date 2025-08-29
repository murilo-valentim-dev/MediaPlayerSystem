# 🎵 MediaPlayerSystem

Sistema de Player de Mídias desenvolvido como parte de um desafio técnico.  
O projeto é dividido em três frentes independentes, mas integradas:  

- **MediaPlayerSystem.API**: API REST em .NET Core para gerenciar mídias e playlists  
- **media-player-admin**: Interface de administração em React/TypeScript para cadastro de mídias e playlists  
- **media-player-system-player**: Player web em React/TypeScript para reprodução das mídias da playlist selecionada  

---

## 🧰 Tecnologias Utilizadas

### Geral
- Git (monorepo)  
- TypeScript  
- React  
- Axios (consumo da API)  

### Backend (MediaPlayerSystem.API)
- .NET Core / ASP.NET Core  
- Entity Framework Core (com migrations)  
- C# 11+  
- REST controllers (`MediaController`, `PlaylistController`)  

### Admin (media-player-admin)
- React + TypeScript  
- UI: Ant Design  
- Estado: Context API (ou outra, conforme implementação)  
- Consumo de API via Axios  

### Player (media-player-system-player)
- React + TypeScript  
- UI: Ant Design  
- Estado global: Redux Toolkit  
- Player de mídia: `react-player@2.12.0`  
- Consumo da API via Axios  

---

## 🚀 Instruções para Rodar Localmente

### Pré-requisitos
- [.NET SDK 7.x] instalado  
- [Node.js 18+] com npm ou Yarn instalado  

---

### 1️⃣ Backend (.NET API)

```bash
cd MediaPlayerSystem.API
dotnet restore
dotnet ef database update      # Aplica migrations
dotnet run                      # Inicia a API
```

### API por padrão disponível em: http://localhost:5129

### Endpoints para teste:

- GET http://localhost:5129/api/playlist

- GET http://localhost:5129/api/playlist/{id}

### 2️⃣ Admin (Interface de Cadastro)

```bash
cd media-player-admin
npm install
npm start
```

- Interface disponível em http://localhost:3000

- Permite cadastrar, editar, listar e excluir mídias e playlists

### 3️⃣ Player (Interface de Reprodução)
  
```bash
cd media-player-system-player
npm install
npm run start
```
- Interface disponível em http://localhost:3001

- Permite reproduzir vídeos do YouTube ou mídias suportadas da playlist selecionada

---


```text
| Fase | Descrição                                                | Status       |
| ---- | -------------------------------------------------------- | -------------|
| 1    | CRUD de mídias via API + tela admin                      | ✅ Concluída |
| 2    | CRUD de playlists e associação com mídias                | ✅ Concluída |
| 3    | Player com React reproduzindo mídias da playlist         | ✅ Concluída |
| 4    | Extras (responsividade, UI, transições, autenticação...) | ⚠️ Parcial   |

```

---

### 🛠 O que Reforçaria com Mais Tempo

- Autoplay contínuo com transições (Fade-In / Fade-Out)

- Feedback visual (loading, estados vazios, tratamento de erros)

- Autenticação com JWT

- Testes automatizados (unitários e E2E)

---

### 🗂 Estrutura do Repositório
```text
MediaPlayerSystem/
├── MediaPlayerSystem.API/            # Backend .NET Core
│   └── ... (Controllers, Services, Migrations etc.)
├── media-player-admin/               # React Admin (cadastro de mídias/playlists)
│   └── ...
└── media-player-system-player/       # React Player (reprodução de mídias)
    └── ...
```

---

### 👤 Autor

- Desenvolvido por Murilo Valentim

- Em caso de dúvidas, entre em contato!
