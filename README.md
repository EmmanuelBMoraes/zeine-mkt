# Projeto ZEINE

Bem-vindo ao repositório do Projeto ZEINE! Esta é uma aplicação full-stack moderna, organizada em um monorepo, que inclui um back-end robusto construído com NestJS e um front-end interativo desenvolvido com React e Vite. Todo o ambiente de desenvolvimento e produção é orquestrado com Docker, garantindo consistência e facilidade no setup.

## Features Gerais

- ✅ **Autenticação de Usuários:** Sistema completo de registro e login com segurança baseada em JWT.
- ✅ **Gerenciamento de Produtos:** Funcionalidades para criar e listar produtos no catálogo.
- ✅ **Interface Reativa:** Experiência de usuário fluida e moderna construída como uma Single Page Application (SPA).
- ✅ **Ambiente Containerizado:** Setup simplificado com Docker e Docker Compose para rodar toda a stack com um único comando.

## 🏛️ Arquitetura e Estrutura

O projeto é organizado em um monorepo, contendo duas aplicações principais:

- `/front-end`: A aplicação de interface com o usuário (cliente), construída com React.
- `/back-end`: A API RESTful (servidor), construída com NestJS.

Essa estrutura permite o desenvolvimento desacoplado das duas partes do projeto, mantendo todo o código-fonte em um único repositório para facilitar o gerenciamento.

## 🚀 Como Rodar o Projeto (Setup)

Graças ao Docker, configurar e rodar este projeto é um processo simples e direto.

### Pré-requisitos

- Git
- Docker
- Docker Compose

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone URL_DO_SEU_REPOSITORIO.git
    cd nome-do-projeto
    ```

2.  **Crie o arquivo de ambiente:**
    Na raiz do projeto, verifique o arquivo `.env`.
    Em seguida, preencha as variáveis no arquivo `.env` com suas configurações personalizadas, se quiser (portas, segredos JWT, etc.).

3.  **Suba os contêineres:**
    Execute o seguinte comando na raiz do projeto. Ele irá construir as imagens e iniciar todos os serviços (front-end, back-end e banco de dados).

    ```bash
    docker-compose up --build
    ```

4.  **Acesse a aplicação:**
    - **Front-end:** http://localhost (ou a porta que você mapeou para o Nginx).
    - **Back-end API:** http://localhost:3001.

## 🖥️ Front-end (Interface do Usuário)

A interface de usuário do projeto ZEINE é uma aplicação web moderna (SPA) projetada para oferecer uma experiência fluida e interativa para o gerenciamento e visualização de produtos.

### Funcionalidades do Front-end

- **Tela de Login:** Permite que usuários já registrados acessem a plataforma de forma segura.
- **Tela de Registro:** Um formulário para que novos usuários possam criar uma conta na aplicação.
- **Catálogo de Produtos:** Uma página dedicada à exibição de todos os produtos cadastrados.
- **Registro de Produtos:** Uma área restrita onde usuários autenticados podem adicionar novos produtos ao catálogo.

### Stack de Tecnologias (Front-end)

- **Framework Principal:** React 19 com Vite.
- **Linguagem:** TypeScript.
- **Roteamento:** React Router DOM v7.
- **Estilização:** Tailwind CSS.
- **Componentes UI:** Radix UI e Shadcn UI.
- **Gerenciamento de Estado de Servidor:** TanStack Query (React Query).
- **Formulários:** React Hook Form com validação via Zod.
- **Comunicação com a API:** Axios.
- **Qualidade de Código:** ESLint e TypeScript ESLint.

### Decisões Técnicas (Front-end)

#### Formulários: React Hook Form + Zod

Optei por esta combinação pela alta performance (mínimas re-renderizações) do React Hook Form e pela segurança de tipos e validação integrada que o Zod oferece, garantindo consistência entre o front-end e o back-end.

#### UI e Estilização: Tailwind CSS + Shadcn UI

Utilizei Tailwind CSS por sua abordagem utility-first, que acelera o desenvolvimento e mantém a consistência. Shadcn UI foi escolhido por não ser uma biblioteca de componentes tradicional; em vez disso, copiamos o código dos componentes para nosso projeto, nos dando total controle e customização sobre eles, aproveitando a base acessível do Radix UI.

#### Servidor de Produção: Nginx

Para o ambiente de produção, utilizei o Nginx por sua alta performance em servir arquivos estáticos. Configuramos o Nginx com uma regra de `try_files` para redirecionar todas as rotas não encontradas para o `index.html`, resolvendo o problema de erro 404 em rotas de Single Page Applications (SPAs) e garantindo que o roteamento do React funcione corretamente.

### Scripts (Front-end)

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Analisa o código em busca de erros.
- `npm run preview`: Visualiza a build de produção localmente.

## ⚙️ Back-end (API)

O back-end do projeto é uma API RESTful robusta e escalável, responsável por toda a lógica de negócio, autenticação de usuários e gerenciamento de dados.

### Funcionalidades do Back-end

- **Autenticação Segura:** Endpoints para registro de usuários com hash de senha (bcrypt) e login com estratégias Local e JWT (Passport.js).
- **CRUD Completo de Produtos:** Rotas protegidas para criar, ler, atualizar e deletar produtos.
- **Upload de Imagens:** Capacidade de receber e armazenar imagens de produtos localmente no servidor.
- **Validação de Dados:** Uso de DTOs (Data Transfer Objects) com `class-validator` para garantir que todos os dados recebidos pela API sejam válidos e seguros.

### Stack de Tecnologias (Back-end)

- **Framework Principal:** NestJS 10, um framework Node.js progressivo para construir aplicações eficientes e escaláveis.
- **Linguagem:** TypeScript.
- **Banco de Dados:** MongoDB com Mongoose como ODM (Object Data Modeling) para uma interação simplificada e segura com o banco.
- **Autenticação:** Passport.js com estratégias `passport-jwt` e `passport-local` para um sistema de autenticação flexível e seguro.
- **Validação:** `class-validator` e `class-transformer` para validação e transformação automática de DTOs.
- **Gerenciamento de Configuração:** `@nestjs/config` para gerenciar variáveis de ambiente de forma segura.
- **Testes:** Framework de testes configurado com Jest e Supertest para testes unitários e e2e.

### Decisões Técnicas (Back-end)

#### Framework: NestJS

A escolha pelo NestJS se deu por sua arquitetura modular e opinativa, fortemente inspirada no Angular. Isso nos proporciona uma estrutura de projeto organizada (módulos, controllers, services), facilitando a manutenção e escalabilidade. Além disso, sua integração nativa com TypeScript e ferramentas como `class-validator` acelera o desenvolvimento de APIs robustas.

#### Banco de Dados: MongoDB

Para a persistência de dados, optamos pelo MongoDB devido à sua natureza NoSQL e flexibilidade de esquemas, o que é ideal para o desenvolvimento ágil. A integração com o NestJS através do Mongoose simplifica as operações de banco de dados, permitindo a definição de schemas fortes e validações no nível do modelo.

#### Upload de Arquivos: Servidor Local vs. Cloud Storage

Para o ambiente de desenvolvimento e prototipagem, a estratégia de upload de imagens foi implementada para salvar os arquivos diretamente no servidor local. Esta abordagem é simples e eficaz para validar a funcionalidade. No entanto, para um ambiente de produção real, a arquitetura foi pensada para evoluir: a recomendação é substituir o armazenamento local por um serviço de cloud storage como AWS S3 ou Firebase Storage. Isso garante maior escalabilidade, segurança e disponibilidade dos arquivos, desacoplando o armazenamento de mídia do servidor da aplicação.

### Endpoints da API

A API expõe os seguintes endpoints. Para facilitar os testes, uma coleção do Postman está disponível na raiz do projeto.

#### Autenticação (`/auth`)

| Método | Rota             | Descrição                              | Corpo (Body) Exemplo              |
| :----- | :--------------- | :------------------------------------- | :-------------------------------- |
| POST   | `/auth/register` | Registra um novo usuário.              | `{ "name", "email", "password" }` |
| POST   | `/auth/login`    | Autentica um usuário e retorna um JWT. | `{ "email", "password" }`         |

#### Produtos (`/products`)

> **Observação:** Todas as rotas de produtos, exceto `GET`, requerem um token JWT de autenticação no cabeçalho (`Authorization: Bearer <token>`).

| Método | Rota               | Descrição                                   | Corpo (Body) Exemplo                       |
| :----- | :----------------- | :------------------------------------------ | :----------------------------------------- |
| GET    | `/products`        | Lista todos os produtos cadastrados.        | -                                          |
| GET    | `/products/:id`    | Busca um produto específico pelo seu ID.    | -                                          |
| POST   | `/products`        | Cria um novo produto.                       | `{ "titulo", "descricao", "preco", ... }`  |
| POST   | `/products/upload` | Faz o upload de uma imagem para um produto. | `FormData` com um campo `file`.            |
| PATCH  | `/products/:id`    | Atualiza parcialmente um produto existente. | `{ "preco": 129.99, "status": "vendido" }` |
| DELETE | `/products/:id`    | Deleta um produto pelo seu ID.              | -                                          |

### Scripts (Back-end)

- `npm run start:dev`: Inicia a API em modo de desenvolvimento com watch mode.
- `npm run build`: Compila o código TypeScript para JavaScript para produção.
- `npm run start:prod`: Inicia a aplicação em modo de produção a partir dos arquivos compilados.
- `npm run lint`: Analisa o código em busca de erros e problemas de formatação.
- `npm run format`: Formata o código automaticamente usando o Prettier.
- `npm run test`: Executa os testes unitários e de integração.
