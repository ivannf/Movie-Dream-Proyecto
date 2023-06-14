const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    imagen: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    reparto: {
        type: String,
        required: true
    },
    fechaEstreno: {
        type: String,
        required: true
    },
    directores: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Movie', movieSchema);