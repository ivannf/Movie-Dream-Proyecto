const user = require('./auth.controller');
module.exports = (router) => {
    router.post('/Usuarios', user.createUser);
    router.post('/login', user.loginUser);
}