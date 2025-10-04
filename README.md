# Sistema RH Servidores - Frontend

Frontend desenvolvido em Vue.js 3 para o RH da Polícia Civil da Paraíba. Este projeto consome a API REST desenvolvida em Laravel.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3.5.18** - Framework JavaScript
- **Vite 7.0.6** - Build tool e dev server
- **Vue Router 4.5.1** - Gerenciamento de rotas
- **Pinia 3.0.3** - Gerenciamento de estado
- **Axios 1.12.2** - Cliente HTTP para requisições à API
- **Tailwind CSS 4.1.12** - Framework CSS utilitário
- **Docker** - Containerização da aplicação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 20.19.0 ou superior / 22.12.0 ou superior)
- **npm** (geralmente vem com Node.js)
- **Docker** e **Docker Compose** (opcional, para execução em container)

## 🔧 Instalação

### Opção 1: Execução Local (sem Docker)

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Opção 2: Execução com Docker

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-diretorio>
```

2. Construa e inicie o container:
```bash
docker-compose up -d
```

3. A aplicação estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Compila e minifica para produção
npm run build

# Executa o linter e corrige problemas
npm run lint

# Formata o código com Prettier
npm run format
```

## 🏗️ Estrutura do Projeto

```
├── public/              # Arquivos estáticos
│   └── img/            # Imagens e assets
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── layouts/        # Layouts da aplicação
│   │   ├── AuthenticatedLayout.vue
│   │   └── GuestLayout.vue
│   ├── pages/          # Páginas/Views
│   │   ├── Login.vue
│   │   ├── Home.vue
│   │   ├── pessoais/   # Informações pessoais
│   │   ├── dependentes/ # Gestão de dependentes
│   │   └── formacao/   # Formação acadêmica
│   ├── router/         # Configuração de rotas
│   │   └── index.js
│   ├── stores/         # Stores Pinia
│   │   └── auth.js
│   ├── services/       # Serviços e API calls
│   ├── App.vue         # Componente raiz
│   └── main.js         # Ponto de entrada
├── docker-compose.yml  # Configuração Docker
├── Dockerfile          # Imagem Docker
├── vite.config.js      # Configuração Vite
├── tailwind.config.js  # Configuração Tailwind
└── package.json        # Dependências e scripts
```

## 🔌 Integração com Backend

Este frontend consome a API Laravel que deve estar rodando em `http://localhost:8092`. 

**Importante:** Não há arquivo `.env` neste projeto. Todas as configurações de ambiente estão centralizadas no backend Laravel. A comunicação entre frontend e backend é gerenciada através do proxy configurado no `vite.config.js`.

As principais rotas da API utilizadas são:

- `/api/login` - Autenticação de usuários
- `/api/logout` - Logout
- `/sanctum/csrf-cookie` - Token CSRF
- `/api/*` - Demais endpoints da API

### Configuração de Proxy

O Vite está configurado para fazer proxy das seguintes rotas:

- `/api` → Backend Laravel
- `/sanctum` → Laravel Sanctum
- `/storage` → Arquivos estáticos do Laravel
- `/login` e `/logout` → Autenticação

## 🔐 Autenticação

O sistema utiliza **Laravel Sanctum** para autenticação. O fluxo inclui:

1. Obtenção do token CSRF
2. Login via `/api/login`
3. Armazenamento de informações do usuário no Pinia
4. Proteção de rotas via guards do Vue Router

## 🎨 Estilização

O projeto utiliza **Tailwind CSS** para estilização. As classes utilitárias são aplicadas diretamente nos componentes Vue.

## 🐳 Docker

### Configuração do Docker

O projeto inclui:

- **Dockerfile**: Define a imagem Node.js Alpine
- **docker-compose.yml**: Orquestra o container
- **entrypoint.sh**: Script de inicialização que gerencia dependências

### Variáveis de Ambiente Docker

A URL da API backend é definida no `docker-compose.yml`:

```yaml
environment:
  - VITE_API_URL=http://localhost:8092
```

**Nota:** Esta variável é usada apenas no contexto Docker. Para desenvolvimento local, o proxy do Vite redireciona automaticamente as requisições para `http://host.docker.internal:8092`.

### Comandos Docker Úteis

```bash
# Iniciar containers
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Reconstruir imagem
docker-compose up -d --build

# Acessar container
docker exec -it servidores-frontend sh
```

## 📱 Funcionalidades

- **Autenticação de Usuários**
- **Gerenciamento de Informações Pessoais**
- **Cadastro e Gestão de Dependentes**
- **Registro de Formação Acadêmica**
- **Hot Module Replacement (HMR)** para desenvolvimento

## 🛠️ Desenvolvimento

### Boas Práticas

- Utilize **Composition API** para novos componentes
- Mantenha os componentes pequenos e reutilizáveis
- Use **Pinia** para gerenciamento de estado global
- Siga o guia de estilo do Vue.js
- Execute `npm run lint` antes de fazer commits

### Code Style

O projeto utiliza:
- **ESLint** para linting
- **Prettier** para formatação de código

---

**Desenvolvido para a Polícia Civil da Paraíba**
