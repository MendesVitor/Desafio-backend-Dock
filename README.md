# Teste Backend da Dock
> Teste feito por Vítor Mendes

# [Documentação da API](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/Documenta%C3%A7%C3%A3o%20API%20V%C3%ADtor%20Mendes.pdf)

Os passos abaixo irão ensinar como configurar o ambiente de desenvolvimento e como testar a API hospedada na AWS

## Como Começar
- Faça a instalação do [Node.js](https://nodejs.org/en/) versão 14.15.4LTS ou superior, do [SQL Server Management Studio](https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) versão 18.8 ou superior, do [Git](https://git-scm.com/downloads) e do [Postman](https://www.postman.com/)
- Ao iniciar o SQL Server Management Studio utilize as crendencias e nome do servidor, que estão [aqui](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/credenciaisBancoDeDados.txt), e em autenticação selecione 'Autenticação do SQL Server'.
- 🔴Importante🔴 as tabelas já estão criadas. para testar os scripts do banco de dados, que estão [aqui](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/scriptsBancoVitorMendes.sql), é necessário rodar os comandos nesta ordem:
```sh
DROP TABLE transacoes,contas
DROP TABLE pessoas,tipoTransacao
```
e então abrir uma nova consulta no banco dockDB e rodar os scripts do banco.
- Clone o repositório utiliznado o git e o comando.
```sh
git clone https://github.com/MendesVitor/Teste-Backend-Dock-Vitor-Mendes.git
```
- Para instalar as dependências do projeto execute o comando:
```sh
npm install
```
- Para iniciar o projeto em modo de desenvolvimento execute o comando:
```sh
npm run dev
```
- 🔴Importante🔴 Para testar com o Postman é so importar os arquivos com as rotas,que estão [aqui](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/rotas-teste-vitor-mendes.postman_collection.json), e importar o ambiente [Dev](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/Dev.postman_environment.json), para testar a API hospedada na própria máquina, e importar o ambiente [AWS](https://github.com/MendesVitor/Desafio-backend-Dock/blob/master/Documentos/AWS.postman_environment.json) para testar a API hospedada na AWS. Depois de importado é necessário selecionar o ambiente em que se deseja fazer a requisição.

## Dependências
- [Express](https://expressjs.com/pt-br/) Framework para Node.js para ajudar no desenvolvimento da API.
- [Body-parser](https://www.npmjs.com/package/body-parser) É um módulo capaz de converter o body da requisição para vários formatos. Usaremos o formato JSON.
- [Dotenv](https://www.npmjs.com/package/dotenv) Carrega as variaves de ambiente de um arquivo .env para o process.env.
- [node-mssql](https://www.npmjs.com/package/mssql) Utiliza o Tedious para fazer as querys no SQL Server.
- [Eslint](https://www.npmjs.com/package/eslint) Usado para garantir o padrão do código.
- [Prettier](https://www.npmjs.com/package/prettier) Usado para formatar o código.
- [Eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) Usado para que não ocorra conflito entre as configurações do Eslint e do Prettier.
- [Morgan](https://www.npmjs.com/package/morgan) Mostra no terminal logs das requisições HTTP.
- [Nodemon](https://www.npmjs.com/package/nodemon) Usado para automaticamente reiniciar o servidor quando alguma alteração é feita.

## Feito com
- [Amazon Web Services](https://aws.amazon.com/) para hospdar o banco de dados e a aplicação.
- [Node.js](https://nodejs.org/en/) versão 14.15.4LTS para desenvolver a API REST.
- [Microsoft SQL Server 2017](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads) Como banco de dados hospedado na AWS.
- [SQL Server Management Studio](https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) versão 18.8 para as operações do banco de dados.
- [Visual Studio Code](https://code.visualstudio.com/download) versão 1.52 para criar o código e rodar a aplicação.
- [Git](https://git-scm.com/downloads) para o controle de versão.
- [Postman](https://www.postman.com/) Usado para fazer as requisições HTTP e testar as rotas.
