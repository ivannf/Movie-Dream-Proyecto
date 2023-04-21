const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, {useNewUrlParser: true})
        .then(() => console.log(`Mongo conectado en ${dbURL}`))
        .catch( err => console.log(`Error en conexión a ${dbURL}`))

    process.on('SIGINT', () => {
        mongoose.connection.close (() => {
            console.log('Mongo esta desconectado');
            process.exit(0)
        });
    });
}