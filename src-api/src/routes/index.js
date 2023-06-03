const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Movie = require('../models/Movie');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body;
    const newUser = new User({ name, surname, email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, 'claveSecreta');
    res.status(200).json({ token: token });
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) return res.status(401).send("El correo no esta registrado");
    if (user.password !== password) return res.status(401).send("La contraseña es incorrecta");

    const token = jwt.sign({ _id: user._id }, 'claveSecreta');
    return res.status(200).json({ token });

});

router.get('/home', async (req, res) => {
    try {
        const movies = await Movie.find({}, { imagen: 1, nombre: 1, _id: 1});
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las películas' });
    }
});

router.get('/pelicula/:id', async (req, res) => {
    try {
        const movieId = req.params.id; 
        const movie = await Movie.findById(movieId, {
            imagen: 1,
            nombre: 1,
            sinopsis: 1,
            duracion: 1,
            reparto: 1,
            fechaEstreno: 1,
            directores: 1,
            genero: 1,
            calificacion: 1,
            _id: 1
        });

        console.log(movie);

        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        
            res.json(movie);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los detalles de la película' });
        }
});

router.post('/peliculas', async (req, res) => {
    const { imagen, nombre, sinopsis, duracion, reparto, fechaEstreno, directores, genero, calificacion } = req.body;

    try {
        // Crear una nueva película en la base de datos
        const pelicula = new Movie({
            imagen,
            nombre,
            sinopsis,
            duracion,
            reparto,
            fechaEstreno,
            directores,
            genero,
            calificacion
        });

        const nuevaPelicula = await pelicula.save();

        return res.status(201).json(nuevaPelicula);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error de servidor");
    }
});

router.get('/tareas', (req, res) => {
    res.json([
        {
            _id: 1,
            name: "Primera tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        },
        {
            _id: 2,
            name: "Segunda tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        },
        {
            _id: 3,
            name: "Tercera tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        }
    ])
});

router.get('/tareasPrivadas', verificarToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: "Primera tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        },
        {
            _id: 2,
            name: "Segunda tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        },
        {
            _id: 3,
            name: "Tercera tarea",
            description: 'tarea',
            date: "2023-05-02T18:36:06.684"
        }
    ])
});

module.exports = router;

async function verificarToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).send('Solicitud no autorizada');
        }
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        if (token === 'null') {
            return res.status(401).send('Solicitud no autorizada');
        }

        const payload = await jwt.verify(token, 'claveSecreta');
        if (!payload) {
            return res.status(401).send('Solicitud no autorizada');
        }
        req.userId = payload._id;
        console.log(payload);
        next();
    } catch (e) {
        return res.status(401).send('Solicitud no autorizada');
    }
}