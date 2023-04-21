const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
    create: function (data) {
        const user = new this(data);
        return user.save()
            .then(() => {
                console.log('Se ha registrado correctamente el usuario');
                return user;
            })
            .catch((err) => {
                console.log('Error al registrar el usuario:', err.message);
                throw err;
            });
    },

    login: function (query) {
        return this.find(query).exec();
    }
}

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;