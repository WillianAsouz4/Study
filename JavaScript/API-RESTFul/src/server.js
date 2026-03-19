const express = require('express');
//const path = require('path');

const db = require('./database/db');
const routes = require('./routes/routes');

const app = express();

// Conexao com o banco de dados
db.connect()

// habilitando o server para receber dados do formulario
app.use(express.json())

// definindo as rotas
app.use('/api', routes);


// executando o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))

// exportando o app para testes