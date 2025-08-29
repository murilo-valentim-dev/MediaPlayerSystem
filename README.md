# MediaPlayerSystem

Repositório com 3 projetos integrados, cada um com sua responsabilidade:

- **MediaPlayerSystem.API**: Backend em .NET Core (API REST)
- **media-player-admin**: Interface web em React/TypeScript para cadastro de mídias e playlists
- **media-player-system-player**: Frontend em React/TypeScript com Redux + MUI, consumindo API e reproduzindo conteúdo multimídia

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
- REST controllers (MediaController, PlaylistController)

### Admin (media-player-admin)
- React + TypeScript
- UI: Ant Design
- Estado: Context API (ou outra, conforme implementação)
- Consumo de API via Axios

### Player (media-player-system-player)
- React + TypeScript
- UI: Ant Design
- Estado global: Redux Toolkit
- Player de mídia: react-player@2.12.0
- Consumo da API via Axios

---

##  Instruções para Rodar Localmente

### Pré-requisitos
- [.NET SDK 7.x] instalado
- [Node.js 18+] com npm ou Yarn instalado

### 1. Backend (.NET API)

cmd
cd MediaPlayerSystem.API
dotnet restore
dotnet ef database update              # Aplica migrations
dotnet run                            # Inicia a API (por padrão em http://localhost:5129)

### Verifique no terminal:
Now listening on: http://localhost:5129

### Para testes, acesse:
GET http://localhost:5129/api/playlist
GET http://localhost:5129/api/playlist/{id}


### 2. Admin (Interface de Cadastro)

cd media-player-admin
npm install
npm start

Acesse em http://localhost:3000
 (ou outra porta mostrada no terminal).
Cadastre mídias e playlists.

### 3.Player (Interface de Reprodução)

cd media-player-system-player
npm install
npm run start

Por padrão, roda em http://localhost:3001
 (ou porta exibida).
Selecione uma playlist para reproduzir vídeos do YouTube ou mídia suportada.

Dica: este frontend consome a API em http://localhost:5129/api.

```text
Fases do Desafio Concluídas
Fase	Descrição	Status
1	CRUD de mídias via API + tela admin	Concluída
2	CRUD de playlists e associação com mídias (front e back)	Concluída
3	Player com React reproduzindo mídias da playlist	Concluída
4	Extras (responsividade, UI, transições, autenticação...)	Parcialmente

Extras implementados:

Layout responsive com MUI e CSS avançado

Estilização aprimorada (hover, efeitos visuais)
```
---

### O que Reforçaria com Mais Tempo

Autoplay contínuo com transições (Fade-In, fade-out)

Feedback visual (loading, estados vazios, tratamento de erros)

Autenticação com JWT

Testes automatizados (unitários e E2E)

---

### Estrutura do Repositório

```text
MediaPlayerSystem/
├── MediaPlayerSystem.API/            # Backend .NET Core
│   └── ... (Controllers, Services, Migrations etc.)
├── media-player-admin/               # React Admin (cadastro de mídias/playlists)
│   └── ...
└── media-player-system-player/       # React Player (reprodução de mídias)
    └── ...

```
