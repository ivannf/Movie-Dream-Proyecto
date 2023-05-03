const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique:true
        }
    },
    contra: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = model('User', userSchema);