# Protótipo de Autenticação com LDAP

Este é um protótipo que demonstra a integração de autenticação com um servidor LDAP na API do BOCA (BOCA Online Contest Administrator).

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [ldapjs](http://ldapjs.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
- [OpenLDAP](https://www.openldap.org/)

## Funcionalidades Implementadas

- Autenticação de usuários utilizando servidor LDAP
- Geração de tokens de autenticação JWT
- Proteção de recursos por meio de autenticação com tokens JWT

## Como Rodar o Programa

Siga as instruções abaixo para executar o protótipo em sua máquina local:

1. Certifique-se de ter o Node.js e o Docker instalados em sua máquina.

2. Clone este repositório para sua máquina:

   ```bash
   git clone https://github.com/AryelleSiqueira/auth-prototype.git
    ```

3. Acesse a pasta do projeto:

   ```bash
   cd auth-prototype
   ```

4. Inicie os serviços do banco de dados MySQL e do servidor LDAP juntamente a API utilizando o Docker Compose:

   ```bash
   docker-compose up
   ```

5. A API estará rodando em http://localhost:3333

6. Utilize ferramentas como o [Postman](https://www.postman.com/) para testar os endpoints disponíveis.

## Rotas

### `POST /login`: 
Realiza a autenticação de um usuário utilizando servidor LDAP. Espera receber no body, em formato JSON, os campos `username` e `password` e `Content-Type: application/json` como header da requisição. Retorna um token JWT caso a autenticação seja bem sucedida.

   - Formato do body:
      ```json
      {
         "username": "",
         "password": ""
      }
      ```

   - Usuários para teste:
      - 1: `username`: aluno@um.com | `password`: "ldappw"
      - 2: `username`: aluno@dois.com | `password`: "ldappw"

   ![image](https://github.com/AryelleSiqueira/auth-prototype/assets/61244675/4668f370-dad1-495c-b36a-213b61aa82e7)

### `GET /protected`: 
Rota protegida por autenticação com token JWT. Retorna uma mensagem de sucesso caso o token seja válido.

   ![image](https://github.com/AryelleSiqueira/auth-prototype/assets/61244675/5f39e4ee-cca8-4e36-8c4e-08489ebcb368)