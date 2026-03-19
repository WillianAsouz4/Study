const mongoose = require('mongoose')

function connect() {
    mongoose.connect('mongodb://localhost:27017/api-restful')

    const db = mongoose.connection

    db.on('open', () => {
        console.log('Essa bomba, está conectada ao MongoDB')
    })


    db.on('error', console.error.bind(console, 'Erro de conexão'))
}

module.exports = {
    connect
}