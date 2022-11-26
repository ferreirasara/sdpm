<h1 align="center">SDPM</h1>
<h2 align="center">Simulador Didático de Paginação de Memória</h1>
<p align="center">Um simulador acessível para visualizar e compreender o funcionamento dos algoritmos de troca de página.</p>


<img src="https://img.shields.io/github/license/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/issues/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/forks/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/stars/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/last-commit/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/repo-size/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/commit-activity/m/ferreirasara/sdpm" /> <img src="https://img.shields.io/github/languages/top/ferreirasara/sdpm" />


### Pré-requisitos

Para executar esse projeto, são necessárias algumas ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/). Também é aconselhável utilizar um bom editor, como o [VSCode](https://code.visualstudio.com/).

### Rodando o Backend

```bash
# Clone este repositório
$ git clone https://github.com/ferreirasara/sdpm

# Acesse a pasta do projeto no terminal/cmd
$ cd sdpm

# Vá para a pasta backend
$ cd backend

# Adicione um arquivo .env com as seguintes variáveis:
PORT=8080
NODE_ENV=development
TZ=America/Sao_Paulo
DATABASE_URL=SUA_CONNECTION_URI_AQUI
DEVELOPMENT_DATABASE_URL=SUA_CONNECTION_URI_AQUI
NODE_TLS_REJECT_UNAUTHORIZED=0

# Instale as dependências
$ npm install

# Execute a API
$ npm start

# A API inciará na porta:8080 - acesse http://localhost:8080
```

### Rodando o Frontend

```bash
# Clone este repositório
$ git clone https://github.com/ferreirasara/sdpm

# Acesse a pasta do projeto no terminal/cmd
$ cd sdpm

# Vá para a pasta frontend
$ cd frontend

# Adicione um arquivo .env com as seguintes variáveis:
REACT_APP_VERSION=$npm_package_version
NODE_ENV=development

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# A aplicação inciará na porta:3000 - acesse http://localhost:3000
```

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Axios](https://www.npmjs.com/package/axios)
- [AntDesign](https://ant.design/)
- [PostgreSQL](https://www.postgresql.org/)

### Documentos

- [Monografia](https://drive.google.com/file/d/1d77sW2v3VlDeZe06RZ3VUL_qk2BhJ-On/view?usp=sharing)
- [Manual](https://drive.google.com/file/d/1VZCWvZ_j1yHgLe7noBnWz9Cujss5iaZm/view?usp=sharing)