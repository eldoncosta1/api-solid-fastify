# App

Gympass style app.

- Nesse projeto será desenvolvido uma aplicação para check-ins em academias. Aqui você irá aprender sobre alguns conceitos do SOLID, Design Patterns, Docker para iniciar o banco de dados, JWT e Refresh Token, RBAC e diversos outros conceitos.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu históricos de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10 km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

### JWT

JWT: JSON Web Token

1. Usuário faz login, envia e-mail/senha, o back-end cria um token ÚNICO, não-modificável e STATELESS

STATELESS: Não armazendao em nenhuma estrutura de persistência de dados (banco de dados)

Back-end: Quando vai criar o token ele usa uma PALAVRA-CHAVE (string)

Palavra-chave: jsfiajasgasgoaigoai,oeaogkaeovkoakok

token jwt -> header.payload.sign

Login -> JWT

JWT - Todas as rqeuisições dali para frente

Header (Cabeçalho): Authorization: Bearer JWT
