# NexSearch - Buscador Web com Árvores Binárias de Busca

## Descrição

O **NexSearch** é um buscador web que utiliza **Árvores Binárias de Busca** (ABB) para realizar as buscas e indexações das páginas capturadas. A aplicação foi desenvolvida como parte da disciplina de **Algoritmos e Estruturas de Dados**. Ela consiste em um crawler que captura dados da web, realiza a indexação e oferece uma interface para consulta das informações. 

A arquitetura da aplicação envolve:

- **Crawler** para capturar os dados da web.
- **Árvores Binárias de Busca (ABB)** para realizar a indexação e busca eficiente de páginas.
- **Docker** para contêinerização dos serviços.
- **Vue.js** e **Axios** para o frontend.
- **NestJS** para o backend, que fornece a API para o frontend.

## Alunos Responsáveis

- **Emanoel Carvalho**
- **Cleiton Lucas**
- **Gean Lima**

## Tecnologias

- **Backend**: NestJS
- **Frontend**: Vue.js + Axios
- **Crawler**: Implementado em JavaScript para capturar dados da web.
- **Indexação**: Árvores Binárias de Busca (ABB).
- **Containerização**: Docker
- **Serviços**: JSON Server para dados simulados.

## Como Usar

### 1. Inicializar o Docker

Para rodar os serviços de forma contêinerizada, use o seguinte comando para subir os containers:

```bash
docker-compose up -d
```

### 2. Inicializar o JSON Server

Para iniciar o **JSON Server** (caso esteja usando), execute o seguinte comando:

```bash
json-server --watch db.json --port 3001
```

### 3. Inicializar a API

Para inicializar o **backend** (API) desenvolvido em NestJS, execute o seguinte comando:

```bash
npm run start
```

### 4. Inicializar o Frontend

Por fim, para inicializar o **frontend** em Vue.js, execute:

```bash
npm run serve
```

### 5. Acessar a aplicação

Após iniciar os serviços, acesse o buscador em:

```
http://localhost:8080
```

No frontend, você poderá realizar buscas na web utilizando a estrutura de árvores binárias de busca.

## Como Funciona

- O **crawler** é responsável por navegar pela web e coletar páginas que serão indexadas.
- As páginas capturadas são armazenadas e organizadas de forma eficiente utilizando **Árvores Binárias de Busca (ABB)**, o que garante buscas rápidas e eficientes.
- O backend em **NestJS** expõe uma API para o frontend, permitindo que o usuário busque informações a partir da interface.
- O **frontend**, desenvolvido em **Vue.js**, permite ao usuário realizar buscas e visualizar os resultados de forma interativa.

## Licença

Este projeto é de uso educacional e foi desenvolvido como parte da disciplina de Algoritmos e Estruturas de Dados.

## Como Contribuir

Este projeto é uma atividade acadêmica, mas contribuições para melhorar a eficiência do buscador ou a implementação das árvores binárias de busca são bem-vindas. Para contribuir, faça um fork deste repositório, crie uma branch com sua modificação e envie um pull request.

---

**Boa sorte nas suas pesquisas!**
