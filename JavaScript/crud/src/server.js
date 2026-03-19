const express = require('express')
const path = require('path')
const db = require('./database')

const router = require('./routes') 

const app = express()

// Conectando ao banco de dados
db.connect()


//definido o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Definindo os arquivos plúblcos
app.use(express.static(path.join(__dirname, 'public')))

// Definido a pasta para receber dados via pots (Formulario)
app.set(express.urlencoded({extended: true}))

// definido as rotas
app.use('/', router)

// 404 error (not found)
app.use((req, res) =>{
    res.send('Página não encontrada')
})

// exucutando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server running on port ${port}`))