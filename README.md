# Residential Finance Manager

Sistema para gerenciamento financeiro de moradores, com backend em ASP.NET Core e persistência em SQLite. O projeto foi estruturado para registrar pessoas, transações financeiras e gerar relatórios consolidados por pessoa e no total do sistema.

## Visão geral

O projeto tem como objetivo centralizar o controle financeiro de um grupo de moradores, permitindo:

- cadastrar pessoas;
- registrar receitas e despesas;
- validar regras de negócio nas transações;
- gerar um relatório consolidado com receita, despesa e saldo líquido.

## Tecnologias

### Backend

- ASP.NET Core 10
- Entity Framework Core
- SQLite
- Swagger / OpenAPI
- .NET 10

### Frontend

- Planejado com React + TypeScript + Vite
- Ainda em fase inicial de implementação

## Arquitetura do backend

A estrutura do backend foi organizada por domínio, com separação entre controllers, services, DTOs e entidades.

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

- Data/AppDbContext: contexto do Entity Framework Core.
- Entities/Person: entidade para armazenar pessoas.
- Entities/FinancialTransaction: entidade para armazenar transações financeiras.
- Features/People: cadastro e listagem de pessoas.
- Features/Transactions: cadastro e listagem de transações.
- Features/Reports: geração de relatórios consolidados.
- Middleware/ExceptionMiddleware: tratamento centralizado de exceções.

## Funcionalidades implementadas

### Pessoas

- Cadastro de pessoa com nome e idade.
- Listagem de todas as pessoas cadastradas.
- Exclusão de pessoa por ID.

### Transações

- Cadastro de transações com descrição, valor, tipo e pessoa associada.
- Listagem de todas as transações cadastradas.
- Validação de regras de negócio:
  - tipo de transação deve ser válido;
  - pessoas menores de 18 anos podem cadastrar apenas despesas;
  - a pessoa informada no cadastro deve existir.

### Relatórios

- Geração de relatório consolidado com:
  - total de receitas;
  - total de despesas;
  - saldo líquido;
  - valores por pessoa.

## Regras de negócio

O backend utiliza regras simples para manter a consistência dos dados:

- cada transação pertence a uma pessoa;
- transações são classificadas como Income ou Expense;
- menores de idade não podem registrar receitas;
- exceções de validação retornam respostas HTTP apropriadas.

## Endpoints da API

A API expõe os seguintes endpoints:

### Pessoas

- POST /api/people
- GET /api/people
- DELETE /api/people/{id}

### Transações

- POST /api/transactions
- GET /api/transactions

### Relatórios

- GET /api/reports/totals

## Banco de dados

O projeto usa SQLite com a conexão definida em:

- appsettings.json

Connection string:

```json
"DefaultConnection": "Data Source=residential-finance.db"
```

As migrations já estão presentes na pasta Migrations e podem ser aplicadas pelo Entity Framework Core.

## Como executar

### Pré-requisitos

- .NET SDK 10
- terminal com acesso ao projeto

### Passos

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Restaure os pacotes e compile a solução:

```bash
dotnet build ResidentialFinanceManager.slnx
```

3. Execute a API:

```bash
dotnet run --project ResidentialFinanceManager.Api
```

4. A API ficará disponível em uma das portas configuradas no arquivo launchSettings.json, geralmente:

- http://localhost:5119
- https://localhost:7157

5. Para visualizar a documentação interativa, acesse o Swagger em:

```text
http://localhost:5119/swagger
```

> Em ambiente de desenvolvimento, o Swagger é habilitado automaticamente.

## Status do projeto

- Backend funcional e estruturado
- API com CRUD básico para pessoas e transações
- Relatórios financeiros implementados
- Frontend ainda será desenvolvido na sequência

## Próximos passos

- implementar a interface frontend em React + TypeScript;
- integrar o frontend com os endpoints da API;
- melhorar a experiência do usuário com formulários e telas de relatório.
