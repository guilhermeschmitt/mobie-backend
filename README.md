[![Build Status](https://travis-ci.org/jhonata11/mobie-backend.svg?branch=master)](https://travis-ci.org/jhonata11/mobie-backend)

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
JWT_SECRET= //alguma senha para a geração de tokens
DB_CONNECTION= //url para o caminho do banco, ex: mysql://[usuario]:[senha]@localhost:3306/mobie
```

## Scripts
O projeto possui os seguintes scripts:
```bash
npm start  # inicializa o servidor
npm test  # roda os testes 
npm cleardb  # limpa a base de desenvolvimento
```