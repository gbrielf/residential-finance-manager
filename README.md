# Residential Finance Manager

Sistema full stack para gerenciamento financeiro de moradores, com backend desenvolvido em ASP.NET Core, frontend em React e persistência de dados em SQLite.

O projeto permite cadastrar pessoas, registrar transações financeiras e visualizar relatórios consolidados por pessoa e de todo o sistema.

## Visão geral

O Residential Finance Manager centraliza o controle financeiro de um grupo de moradores, permitindo:

- cadastrar e listar pessoas;
- excluir pessoas cadastradas;
- registrar receitas e despesas;
- validar regras de negócio nas transações;
- visualizar os resultados financeiros por pessoa;
- acompanhar receitas, despesas e saldo geral;
- atualizar automaticamente os relatórios após novos cadastros.

## Tecnologias

### Backend

- ASP.NET Core 10
- .NET 10
- Entity Framework Core
- SQLite
- Swagger / OpenAPI
- xUnit

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Axios
- React Router

## Arquitetura do backend

A estrutura do backend foi organizada por domínio, com separação entre controllers, services, DTOs, entidades e regras de negócio.

```text
backend/
├── ResidentialFinanceManager.Api/
│   ├── Data/
│   ├── Entities/
│   ├── Features/
│   │   ├── People/
│   │   ├── Transactions/
│   │   └── Reports/
│   ├── Middleware/
│   ├── Migrations/
│   └── Program.cs
└── ResidentialFinanceManager.Tests/
```

### Principais componentes

- `Data/AppDbContext`: contexto do Entity Framework Core.
- `Entities/Person`: entidade responsável por representar uma pessoa.
- `Entities/FinancialTransaction`: entidade responsável por representar uma transação financeira.
- `Features/People`: cadastro, listagem e exclusão de pessoas.
- `Features/Transactions`: cadastro e listagem de transações.
- `Features/Reports`: geração dos relatórios consolidados.
- `Middleware/ExceptionMiddleware`: tratamento centralizado de exceções.

## Arquitetura do frontend

O frontend foi desenvolvido com React e TypeScript, utilizando uma organização baseada em funcionalidades.

```text
frontend/
├── src/
│   ├── app/
│   │   ├── providers.tsx
│   │   └── router.tsx
│   ├── features/
│   │   ├── people/
│   │   │   └── api/
│   │   ├── transactions/
│   │   │   ├── api/
│   │   │   └── types/
│   │   └── reports/
│   │       └── api/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite.config.ts
└── package.json
```

### Principais componentes do frontend

- `App.tsx`: página principal da aplicação, contendo os formulários e o relatório financeiro.
- `app/providers.tsx`: configuração dos provedores globais, incluindo o TanStack Query.
- `app/router.tsx`: configuração das rotas da aplicação.
- `features/people/api`: comunicação com os endpoints de pessoas.
- `features/transactions/api`: comunicação com os endpoints de transações.
- `features/reports/api`: consulta ao relatório consolidado.
- `index.css`: configuração global de estilos e importação do Tailwind CSS.
- `vite.config.ts`: configuração do Vite, do Tailwind e do proxy para a API.

O TanStack Query é utilizado para controlar as consultas e mutações da aplicação, atualizar o relatório após os cadastros e representar estados de carregamento e erro.

## Funcionalidades implementadas

### Pessoas

- Cadastro de pessoa com nome e idade.
- Listagem de todas as pessoas cadastradas.
- Exclusão de pessoa por ID.
- Remoção das transações vinculadas quando uma pessoa é excluída.
- Atualização automática do relatório após um novo cadastro.

### Transações

- Cadastro de transações com:
  - descrição;
  - valor;
  - tipo;
  - pessoa associada.
- Listagem de todas as transações cadastradas.
- Atualização automática do relatório após uma nova transação.
- Validação das regras de negócio no backend.

### Relatórios

- Total de receitas do sistema.
- Total de despesas do sistema.
- Saldo financeiro geral.
- Total de receitas por pessoa.
- Total de despesas por pessoa.
- Saldo individual por pessoa.
- Atualização manual ou automática dos dados.

### Interface

- Dashboard financeiro responsivo.
- Formulário para cadastro de pessoas.
- Formulário para cadastro de transações.
- Indicadores com os totais financeiros.
- Resumo financeiro de cada pessoa.
- Feedback de carregamento, sucesso e erro.
- Identidade visual inspirada no GitHub Dark.

## Regras de negócio

O backend aplica as seguintes regras para garantir a consistência dos dados:

- cada transação deve pertencer a uma pessoa existente;
- as transações são classificadas como `Income` ou `Expense`;
- pessoas menores de 18 anos podem registrar apenas despesas;
- o valor de uma transação deve ser válido;
- o tipo informado deve corresponder a um valor válido do enum;
- ao excluir uma pessoa, suas transações também são removidas;
- exceções de validação retornam respostas HTTP apropriadas.

## Endpoints da API

### Pessoas

```http
POST /api/people
GET /api/people
DELETE /api/people/{id}
```

### Transações

```http
POST /api/transactions
GET /api/transactions
```

### Relatórios

```http
GET /api/reports/totals
```

## Banco de dados

O projeto utiliza SQLite com a conexão definida no arquivo:

```text
backend/ResidentialFinanceManager.Api/appsettings.json
```

Connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=residential-finance.db"
  }
}
```

As migrations estão presentes na pasta `Migrations` e podem ser aplicadas pelo Entity Framework Core.

## Como executar

### Pré-requisitos

- .NET SDK 10
- Node.js
- npm
- terminal com acesso ao projeto

## Executando o backend

Acesse a pasta do backend:

```bash
cd backend
```

Restaure os pacotes e compile a solução:

```bash
dotnet build ResidentialFinanceManager.slnx
```

Execute a API:

```bash
dotnet run --project ResidentialFinanceManager.Api
```

A API ficará disponível em uma das portas configuradas no arquivo `launchSettings.json`, geralmente:

```text
http://localhost:5119
https://localhost:7157
```

Para visualizar a documentação interativa, acesse o Swagger:

```text
http://localhost:5119/swagger
```

> Em ambiente de desenvolvimento, o Swagger é habilitado automaticamente.

## Executando o frontend

Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

O Vite utiliza um proxy para encaminhar as requisições iniciadas com `/api` para o backend:

```ts
server: {
    host: true,
    port: 5173,
    proxy: {
        '/api': {
            target: 'http://localhost:5119',
            changeOrigin: true,
        },
    },
}
```

Por isso, a API deve estar em execução na porta `5119` durante o uso do frontend.

## Fluxo da aplicação

O fluxo principal da aplicação funciona da seguinte maneira:

1. O usuário cadastra uma pessoa pelo frontend.
2. O frontend envia os dados para a API.
3. O backend valida e persiste os dados no SQLite.
4. O usuário registra uma receita ou despesa associada a uma pessoa.
5. O backend valida as regras de negócio da transação.
6. O frontend invalida a consulta do relatório.
7. O TanStack Query busca novamente os dados atualizados.
8. O dashboard apresenta os totais gerais e individuais.

## Status do projeto

- Backend funcional e estruturado.
- API integrada ao SQLite.
- Cadastro, listagem e exclusão de pessoas implementados.
- Cadastro e listagem de transações implementados.
- Regras de negócio implementadas.
- Relatórios financeiros implementados.
- Frontend integrado aos endpoints da API.
- Dashboard responsivo desenvolvido com Tailwind CSS.
- Tratamento de carregamento, sucesso e erro no frontend.

## Possíveis melhorias

- substituir o campo de ID da pessoa por uma lista de seleção;
- implementar edição de pessoas e transações;
- adicionar exclusão de transações pela interface;
- criar confirmação antes da exclusão;
- adicionar paginação e filtros;
- adicionar testes automatizados para o frontend;
- ampliar a cobertura de testes do backend;
- disponibilizar a aplicação em um ambiente de produção.