const user = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password),
        email: req.body.email,
        date: req.body.date
    }

    user.create(newUser)
        .then(user => {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

            const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }

            res.send({ dataUser });
        })
        .catch(err => {
            if (err && err.code === 11000) return res.status(409).send('Email ya existente');
            if (err) return res.status(500).send('Server error');
        });
}

exports.loginUser = async (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    try {
        const user = await user.findOne({ email: userData.email });

        if (!user) {
            return res.status(409).send({ message: 'Usuario no encontrado' });
        }

        const resultPassword = bcrypt.compareSync(userData.password, user.password);

        if (!resultPassword) {
            return res.status(409).send({ message: 'Contraseña incorrecta' });
        }

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }

        res.send({ dataUser });
    } catch (error) {
        res.status(500).send('Server error');
    }
}