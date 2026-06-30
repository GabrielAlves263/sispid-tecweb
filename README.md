# sisPID

**Sistema de Cadastro e Acompanhamento de Monitores PID**

Sistema web para gestão do fluxo de monitores do Programa de Iniciação à Docência (PID) da Universidade Federal do Ceará (UFC). Desenvolvido como projeto final da disciplina de Tecnologias Web.

## Funcionalidades

- **Autenticação** — Login com perfis de admin e professor
- **Monitores** — Cadastro de monitores voluntários e remunerados, consulta e atualização
- **Disciplinas** — Vinculação de disciplinas aos monitores
- **Orientadores** — Vinculação de orientadores aos monitores
- **Frequência** — Registro de frequência mensal
- **Desligamento** — Registro de desligamento de monitores
- **Acúmulo de Atividades** — Autorização para acúmulo de atividades
- **Relatórios** — Relatório anual e relatório por monitor
- **Consultas** — Consulta de monitores, disciplinas, orientadores, frequências, desligamentos, acúmulos e relatórios

## Tecnologias

| Tecnologia | Versão |
|---|---|
| React | ^19.2.6 |
| TypeScript | ~6.0.2 |
| Vite | ^8.0.12 |
| React Router DOM | ^7.18.0 |
| Tailwind CSS | ^3.4.19 |
| MSW (Mock Service Worker) | ^2.14.6 |
| React Icons | ^5.6.0 |
| ESLint | ^10.x |

## Estrutura do Projeto

```
src/
├── main.tsx                  # Bootstrap da aplicação
├── App.tsx                   # Definição de rotas
├── index.css                 # Estilos globais (Tailwind + CSS custom properties)
├── components/               # Componentes reutilizáveis
│   ├── Header.tsx            # Barra de navegação principal
│   ├── Footer.tsx            # Rodapé
│   ├── Layout.tsx            # Layout padrão (Header + conteúdo + Footer)
│   ├── ProtectedRoute.tsx    # Proteção de rotas autenticadas
│   ├── InputField.tsx        # Campo de formulário reutilizável
│   └── MonitorForm.tsx       # Formulário completo de monitor
├── pages/                    # Páginas da aplicação (22 páginas)
├── contexts/
│   └── AuthContext.tsx        # Contexto de autenticação
├── services/                 # Camada de serviço (chamadas à API)
├── types/                    # Interfaces TypeScript
├── constants/
│   └── estados.ts            # Siglas dos estados brasileiros
├── utils/
│   └── validators.ts         # Funções de validação de formulários
└── mocks/                    # Mock Service Worker (API mockada)
    ├── browser.ts
    ├── auth.ts
    ├── crud.ts
    └── data/users.ts         # Usuários mockados
```

## Rotas

| Rota | Página |
|---|---|
| `/login` | Login |
| `/` | Home / Dashboard |
| `/dados-projeto` | Dados do Projeto |
| `/ins-mon-vol` | Inserir Monitor Voluntário |
| `/ins-mon-rem` | Inserir Monitor Remunerado |
| `/atualizar-mon-vol` | Atualizar Monitor Voluntário |
| `/atualizar-mon-rem` | Atualizar Monitor Remunerado |
| `/ins-disciplina` | Inserir Disciplina |
| `/ins-orientador` | Inserir Orientador |
| `/autorizacao-acumulo` | Autorização de Acúmulo |
| `/relatorio-anual` | Relatório Anual |
| `/relatorio-monitor` | Relatório do Monitor |
| `/desligamento-monitor` | Desligamento de Monitor |
| `/frequencia-monitor` | Frequência do Monitor |
| `/consultar-monitor` | Consultar Monitores |
| `/consultar-disciplina` | Consultar Disciplinas |
| `/consultar-orientador` | Consultar Orientadores |
| `/consultar-frequencia` | Consultar Frequências |
| `/consultar-desligamento` | Consultar Desligamentos |
| `/consultar-acumulo` | Consultar Acúmulos |
| `/consultar-relatorio-anual` | Consultar Relatórios Anuais |
| `/consultar-relatorio-monitor` | Consultar Relatórios de Monitor |

## Pré-requisitos

- Node.js (versão recente)
- npm

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

A aplicação será iniciada em modo desenvolvimento com HMR. Em desenvolvimento, as requisições à API são interceptadas pelo MSW (Mock Service Worker), não sendo necessário um backend real.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila TypeScript e gera build de produção |
| `npm run lint` | Executa ESLint em todos os arquivos |
| `npm run preview` | Serve o build de produção localmente |

## Credenciais de Desenvolvimento (MSW)

| Usuário | Senha | Perfil |
|---|---|---|
| `admin` | `123` | Administrador |
| `danilo` | `123` | Professor |

## Equipe

**Equipe Web Fofinhos** — Projeto final da disciplina de Tecnologias Web, UFC.
