# MOBIE-BACKEND
## Set up
Tenha uma versão do MySQL instalada e rodando. Após isso, basta executar:
```bash
npm install
```

O projeto depende de um arquivo `.env` na raiz do projeto. Este arquivo deve possuir o seguinte formato: 
```javascript
HOST=localhost
PORT=8081

// DATABASE DEV
DB_SCHEMA=// o schema
DB_USER=// o usuário
DB_PASS=// a chave

JWT_SECRET=// alguma chave para geração do token

// DATABASE ENV
DB_SCHEMA_TEST=// o schema do banco de testes
DB_USER_TEST=// o usuário
DB_PASS_TEST=// a chave
```

## Scripts
O projeto possui os seguintes scripts:
```bash
npm start  # inicializa o servidor
npm run test  # roda os testes 
npm cleardb  # limpa a base de desenvolvimento
```