## Kanban Backend

API REST para projeto Kanban

Tecnologias:

1. Typescript + NodeJS + Express

## Requisitos

1. O sistema deve ter um mecanismo de login usando JWT, com um entrypoint que recebe `{ "login":"letscode", "senha":"lets@123"}` e gera um token.

2. O sistema deve ter um middleware que valide se o token é correto, valido e não está expirado, antes de permitir acesso a qualquer outro entrypoint. Em caso negativo retorne status 401.

3. O login e senha fornecidos devem estar em variáveis de ambiente e terem uma versão para o ambiente de desenvolvimento vinda de um arquivo .env no node ou de um arquivo de configuração no ASP.NET. Esse arquivo não deve subir ao GIT, mas sim um arquivo de exemplo sem os valores reais. O mesmo vale para qualquer "segredo" do sistema, como a chave do JWT.

4. Um card terá o seguinte formato:

```
id: int | (guid [c#] | uuid [node])
titulo : string,
conteudo: string,
lista: string
```

5. Os entrypoints da aplicação devem usar a porta 5000 e ser:

```
(POST)      http://0.0.0.0:5000/login/

(GET)       http://0.0.0.0:5000/cards/
(POST)      http://0.0.0.0:5000/cards/
(PUT)       http://0.0.0.0:5000/cards/{id}
(DELETE)    http://0.0.0.0:5000/cards/{id}
```

6. Para inserir um card o título, o conteúdo e o nome da lista devem estar preenchidos, o id não deve conter valor. Ao inserir retorne o card completo incluindo o id atribuído com o statusCode apropriado. Caso inválido, retorne status 400.

7. Para alterar um card, o entrypoint deve receber um id pela URL e um card pelo corpo da requisição. Valem as mesmas regras de validação do item acima exceto que o id do card deve ser o mesmo id passado pela URL. Na alteração todos os campos são alterados. Caso inválido, retorne status 400. Caso o id não exista retorne 404. Se tudo correu bem, retorne o card alterado.

8. Para remover um card, o entrypoint deve receber um id pela URL. Caso o id não exista retorne 404. Se a remoção for bem sucedida retorne a lista de cards.

9. A listagem de cards deve enviar todos os cards em formato json, contendo as informações completas.

10. Deve ser usada alguma forma de persistência, no C# pode-se usar o Entity Framework (in-memory), no nodeJS pode ser usado Sequelize + sqlite (in-memory) ou diretamente o driver do sqlite (in-memory).

11. Se preferir optar por utilizar um banco de dados "real", adicione um docker-compose em seu repositório que coloque a aplicação e o banco em execução, quando executado `docker-compose up` na raiz. A connection string e a senha do banco devem ser setados por ENV nesse arquivo.

12. O campo conteúdo do card aceitará markdown, isso não deve impactar no backend, mas não custa avisar...

13. Faça um filter (asp.net) ou middleware (nodejs) que escreva no console sempre que os entrypoints de alteração ou remoção forem usados, indicando o horário formatado como o datetime a seguir: `01/01/2021 13:45:00`.

A linha de log deve ter o seguinte formato (se a requisição for válida):

`<datetime> - Card <id> - <titulo> - <Remover|Alterar>`

Exemplo:

```console
> 01/01/2021 13:45:00 - Card 1 - Comprar Pão - Removido
```

14. O projeto deve ser colocado em um repositório GITHUB ou equivalente, estar público, e conter um readme.md que explique em detalhes qualquer comando ou configuração necessária para fazer o projeto rodar. Por exemplo, como configurar as variáveis de ambiente, como rodar migrations (se foram usadas).

15. A entrega será apenas a URL para clonarmos o repositório.

## Pré-Requisitos para rodar o projeto

- Node.js >= 14
- Docker (para poder subir FRONT/BACK via docker)

## Subindo BACK localmente

Primeiro adicione um arquivo .env com as seguintes variaveis preechidas:

```
PORT=5000
JWT_SECRET=<ADICIONAR SECRET>
DB_DIALECT=sqlite
DB_STORAGE="./database.sqlite"
```

Para roda-lo, faça:

```console
> cd BACK
> npm install
> npm run start ou npm run start:dev
```

## Rodar os testes unitários

```console
> cd BACK
> npm run test ou npm run test:coverage
```

## Collection Postman

as chamadas para cada um dos entrypoints se encontra no arquivo `Kanban-Backend.postman_collection` dentro da pasta `_postman-collection`
