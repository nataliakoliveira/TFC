
# TFC - Trybe Futebol Clube

O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

No time de desenvolvimento do TFC, o meu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar através do docker-compose as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, foi desenvolvido um back-end dockerizado utilizando modelagem de dados através do Sequelize. No desenvolvimento foi respeitado regras de negócio providas no projeto e a API é capaz de ser consumida por um front-end já provido nesse projeto.

Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

O back-end possui regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

# Rodando o Projeto(Docker)
A partir da pasta  ```app``` rode o serviço node com o comando ```npm run compose:up```.

Esse serviço irá inicializar os containers ```app_backend```, ```app_frontend```, e o container do banco de dados mysql.
Ao inicializar os containers as aplicações ja estarão rodando em suas respectivas portas.

Para consumir o frontend acesse em seu navegador: ```http://localhost:3000```

:warning: Atenção :warning: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

:warning: Atenção :warning: O git dentro do container não vem configurado com suas credenciais. Faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

:warning: Atenção :warning: Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

:warning: Atenção :warning: Caso você esteja usando macOS e ao executar o docker-compose up -d se depare com o seguinte erro:

```bash
The Compose file './docker-compose.yml' is invalid because:
Unsupported config option for services.db: 'platform'
Unsupported config option for services.node: 'platform'
```
Foram encontradas 2 possíveis soluções para este problema:
* Você pode adicionar manualmente a option platform: linux/amd64 no service do banco de dados no arquivo docker-compose.yml do projeto, mas essa é uma solução local e você deverá reproduzir isso para os outros projetos.
* Você pode adicionar manualmente nos arquivos .bashrc, .zshenv ou .zshrc do seu computador a linha export DOCKER_DEFAULT_PLATFORM=linux/amd64, essa é uma solução global. As soluções foram com base nesta fonte.
## Stacks utilizadas

**Front-End**: React, Axios.

**Back-end**: Javascript, Typescript, Node.js, POO, SOLID, Docker, Sequelize.

**Testes**: Mocha, chai, sinon, jest.



## Aprendizados

 - A realização da dockerização dos apps, network, volume e compose;
 - A modelagem de dados com MySQL através do Sequelize;
 - A criação e associação de tabelas usando models do sequelize;
 - A construção de uma API REST com endpoints para consumir os models criados;
 - A construção de um CRUD com TypeScript, utilizando ORM;
