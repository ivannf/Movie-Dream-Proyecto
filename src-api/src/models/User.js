const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
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
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = model('User', userSchema);