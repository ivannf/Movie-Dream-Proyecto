const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'));

router.post('/register', async (req, res) => {
    const { name, surname, email, password } = req.body;
    const newUser = new User({name,surname,email,password});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'claveSecreta');
    res.status(200).json({token: token});
});

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({email: email})
    if(!user) return res.status(401).send("El correo no esta registrado");
    if(user.password !== password) return res.status(401).send("La contraseña es incorrecta");

    const token = jwt.sign({_id: user._id}, 'claveSecreta');
    return res.status(200).json({token});

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
	} catch(e) {
		return res.status(401).send('Solicitud no autorizada');
	}
}