const { Schema, model } = require('mongoose');
var User = require('./User');
var Movie = require('./Movie');

const reservaSchema = new Schema({
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    sala: {
        type: String,
        required: true
    },
    asiento: {
        type: String,
    },
    idPelicula: {
        type: Schema.Types.ObjectId,
        ref:'Movie',
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref:'User',
    }
}, {
    timestamps: true
});

module.exports = model('Reserva', reservaSchema);