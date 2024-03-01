# Projeto Kanban

Kanban é uma ferramenta visual que ajuda a gerenciar e otimizar fluxos de trabalho.

O quadro Kanban é geralmente dividido em colunas que representam os estágios do processo. Cartões (ou post-its) são usados para representar as tarefas ou itens de trabalho, e eles se movem de uma coluna para outra conforme progridem no processo. Isso fornece uma visão rápida e clara do status de cada item e do fluxo de trabalho como um todo.

## Stack do proejeto

- React.js (FRONT)
- Node.js + Typescript (BACKEND)
- Base de Dados: SQLite (BACKEND)

## Pré-Requisitos para rodar o projeto

- Node.js >= 14
- Docker (para poder subir FRONT/BACK via docker)

## Subindo FRONT/BACK localmente

Primeiro,

adicione um arquivo .env dentro da pasta BACK:

```
PORT=5000
JWT_SECRET=<ADICIONAR SECRET>
DB_DIALECT=sqlite
DB_STORAGE="./database.sqlite"
```

Rodar os seguintes comandos:

Na raiz da pasta, rode:

```console
> docker-compose build --no-cache
> docker-compose up
```

acessar: http://localhost:3000/

## Subindo BACK localmente

Adicione um arquivo .env dentro da pasta BACK:

```
PORT=5000
JWT_SECRET=<ADICIONAR SECRET>
DB_DIALECT=sqlite
DB_STORAGE="./database.sqlite"
```

Rodar os seguintes comandos:

Para roda-lo, faça:

```console
> cd BACK
> npm install
> npm run start ou npm run start:dev
```

acessar: http://localhost:5000/

## Subindo FRONT localmente

Rodar os seguintes comandos:

Na raiz da FRONT,

```console
> cd FRONT
> npm install
> npm run start
```

acessar: http://localhost:3000/

#### NOTE: O projeto já esta com um login e senha cadastrado no banco para acessar a aplicação (mesmo login e senha ja definido no projeto do front)
