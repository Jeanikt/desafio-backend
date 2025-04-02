# PicPay Simplificado - Desafio Back-end

Bem-vindo ao **PicPay Simplificado**, uma solução desenvolvida como parte de um desafio técnico de back-end. Este projeto implementa uma API RESTful para simular uma plataforma de pagamentos simplificada, permitindo transferências de dinheiro entre usuários comuns e lojistas. A implementação foi feita utilizando **Node.js** com **TypeScript**, seguindo boas práticas de desenvolvimento como arquitetura limpa, princípios SOLID e modularidade.

## Sobre o Projeto

O objetivo do PicPay Simplificado é oferecer uma plataforma onde:

- Usuários comuns podem enviar dinheiro para outros usuários ou lojistas.
- Lojistas podem apenas receber transferências.
- Todas as operações seguem regras de negócio específicas, como validação de saldo, autorização externa e notificação assíncrona.

Este projeto foi estruturado para ser simples, manutenível e escalável, com foco em demonstrar habilidades de desenvolvimento back-end.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para construção da API.
- **TypeScript**: Adiciona tipagem estática ao JavaScript, melhorando a robustez e a manutenção do código.
- **Express**: Framework minimalista para criação de APIs RESTful.
- **Axios**: Cliente HTTP para integração com serviços externos (autorização e notificação).
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **Jest**: Framework para testes unitários e de integração.
- **Supertest**: Biblioteca para testes de integração de APIs.
- **Docker**: Ferramenta para containerização da aplicação.

---

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas para promover desacoplamento e facilitar a manutenção. A estrutura de pastas é organizada da seguinte forma:

picpay-simplificado/
├── src/
│ ├── controllers/ # Lógica de entrada/saída da API
│ ├── models/ # Definições de entidades
│ ├── repositories/ # Acesso aos dados (simulado em memória)
│ ├── routes/ # Definição das rotas da API
│ ├── services/ # Regras de negócio e integrações externas
│ ├── tests/ # Testes unitários e de integração
│ │ ├── integration/ # Testes de integração (endpoints)
│ │ └── services/ # Testes unitários (lógica de negócio)
│ └── index.ts # Ponto de entrada da aplicação
├── .dockerignore # Arquivos ignorados pelo Docker
├── .env # Variáveis de ambiente
├── Dockerfile # Configuração do container Docker
├── jest.config.js # Configuração do Jest para testes
├── package.json # Dependências e scripts
└── README.md # Documentação (este arquivo)

---

## Requisitos Atendidos

O projeto cumpre os principais requisitos do desafio:

1. **Tipos de Usuários**: Usuários comuns e lojistas, com validação de que lojistas só recebem transferências.
2. **Transferências**:
   - Validação de saldo antes da transferência.
   - Consulta ao serviço autorizador externo (`GET https://util.devi.tools/api/v2/authorize`).
   - Operação transacional: reversão em caso de falha.
3. **Notificações**: Envio assíncrono ao serviço externo (`POST https://util.devi.tools/api/v1/notify`), sem bloquear a transação em caso de falha.
4. **API RESTful**: Endpoint `/transfer` implementado conforme o contrato especificado:
   ```json
   POST /transfer
   {
     "value": 100.0,
     "payer": 1,
     "payee": 2
   }
   ```

## Como Configurar e Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (gerenciador de pacotes)
- Docker (para rodar a aplicação em container)

---

### Passos para Configuração (Sem Docker)

1.  **Clone o repositório:**

    ```bash
    git clone <link-do-seu-repositorio>
    cd picpay-simplificado

    ```

2.  **Instale as dependências:**

    ```bash
    npm install

    ```

3.  **Crie um arquivo `.env` com as variáveis de ambiente necessárias:**
    PORT=3000

4.  **Compile o projeto:**
    ```bash
    npm run build
    ```
5.  **Execute a aplicação:**
    Modo de desenvolvimento (com reinício automático):

        ```bash
        npm run dev
        ```

    Modo de produção:

    ```
    npm start
    ```

### Executando com Docker

1.  **Construa a imagem: Certifique-se de que o Docker Desktop está rodando e execute:**

    ```bash
    docker build -t picpay-simplificado .
    ```

2.  **Rode o container:**

    ```bash
    docker run -p 3000:3000 --env-file .env picpay-simplificado
    ```

3.  **Teste o endpoint /transfer como descrito na seção de testes.**

## Testando a API

Com a aplicação rodando, você pode testar o endpoint de transferência usando ferramentas como **Postman** ou **curl**.

### Exemplo de Requisição

```http
POST http://localhost:3000/transfer
Content-Type: application/json

{
  "value": 100.0,
  "payer": 1,
  "payee": 2
}
```

Respostas Possíveis

Sucesso (200)
{ "message": "Transferência realizada com sucesso" }

Erro (400):
{ "error": "Saldo insuficiente" }

Testes Automatizados

O projeto inclui testes unitários e de integração para garantir a qualidade do código.
Testes Unitários: Cobrem a lógica de negócio no TransferService, testando cenários como transferência bem-sucedida, saldo insuficiente e restrições de lojistas.

Testes de Integração: Validam o endpoint /transfer, verificando respostas para requisições válidas e inválidas.

Nota: As chamadas a serviços externos (autorização e notificação) são mockadas nos testes para evitar dependências externas e garantir consistência.

Executando os Testes
Certifique-se de que as dependências estão instaladas:

npm install

Rode os testes:
npm run test

Para rodar em modo interativo (watch):
npm run test:watch

Escolhas Técnicas e Justificativas
Node.js com TypeScript:
Escolhi Node.js pela sua leveza e ampla adoção em APIs RESTful.

TypeScript foi utilizado para garantir tipagem estática, reduzindo erros em tempo de execução e facilitando a manutenção.

Arquitetura em Camadas:
Separei as responsabilidades em controllers (entrada/saída), services (lógica de negócio) e repositories (acesso a dados) para seguir o princípio de responsabilidade única (SRP) do SOLID.

Facilita a substituição do banco em memória por um banco real (ex.: PostgreSQL) no futuro.

Simulação de Banco em Memória:
Como o cadastro de usuários não é avaliado, optei por uma simulação simples para focar no fluxo de transferência.

Transações:
Implementei uma lógica de rollback manual para simular atomicidade, já que o banco em memória não suporta transações nativas.

Notificações Assíncronas:
O envio de notificações não bloqueia a transação, refletindo uma boa prática de resiliência em sistemas distribuídos.

Testes:
Usei Jest para testes unitários e de integração, garantindo cobertura de cenários principais e aumentando a confiabilidade do código.

Docker:
Containerizei a aplicação para facilitar a execução em diferentes ambientes, atendendo a um dos diferenciais do desafio.
