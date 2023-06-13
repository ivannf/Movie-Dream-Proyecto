const { Router, json } = require("express");
const router = Router();

const User = require("../models/User");
const Movie = require("../models/Movie");
const Reserva = require("../models/Reserva");

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => res.send("Hello world"));

router.post("/register", async (req, res) => {
  const { name, surname, email, password, role } = req.body;
  const newUser = new User({ name, surname, email, password, role });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, "claveSecreta");
  res.status(200).json({ token: token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(401).send("El correo no esta registrado");
  if (user.password !== password)
    return res.status(401).send("La contraseña es incorrecta");

  const token = jwt.sign({ _id: user._id, role: user.role }, "claveSecreta");
  return res.status(200).json({ token });
});

router.get("/reservaUser/:id", async (req, res) => {
  try{
    const userId = req.params.userId;
    const reserva = await Reserva.find(userId, {fecha:1 , hora:1, asiento:1, sala:1, idPelicula: 1});
    res.json(reserva);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los detalles de la reservaUser" })
  }
});

router.get("/admin", async (req, res) => {
  try {
    const user = await User.find(
      {},
      { name: 1, surname: 1, email: 1, role: 1 }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

router.post("/admin/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
});

router.delete('/admin/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

router.get("/perfil/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(
      userId,
      { name: 1, surname: 1, email: 1, password: 1 }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

router.post('/perfil/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  });

router.get("/login", async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email }, { role: 1 });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

router.get("/home", async (req, res) => {
  try {
    const movies = await Movie.find({}, { imagen: 1, nombre: 1, _id: 1 });
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las películas" });
  }
});

router.put("/perfil", (req, res) => {
  const { name, surname, email, password } = req.body;
  const userId = req.params.userId;

  User.findByIdAndUpdate(
    userId,
    { name, surname, email, password },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el usuario", error: err });
      }
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        user: updatedUser,
      });
    }
  );
});

router.get("/pelicula/:id", async (req, res) => {
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
      _id: 1,
    });

    console.log(movie);

    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    res.json(movie);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los detalles de la película" });
  }
});

router.post("/peliculas", async (req, res) => {
  const {
    imagen,
    nombre,
    sinopsis,
    duracion,
    reparto,
    fechaEstreno,
    directores,
    genero,
    calificacion,
  } = req.body;

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
      calificacion,
    });

    const nuevaPelicula = await pelicula.save();

    return res.status(201).json(nuevaPelicula);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error de servidor");
  }
});

router.post("/reservaPelicula",  async  (req, res) => {
  const { idUsuario, idPelicula, fecha, hora, asiento, sala } = req.body;

  try{
  const newReservation = new Reserva({
    idUsuario,
    idPelicula,
    fecha,
    hora,
    asiento,
    sala
  });

  // Guarda la reserva en la base de datos
  const reserva = await newReservation.save();

    return res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error de servidor");
  }
});

router.get("/reservaPelicula/:movieId", async (req, res) => {
  try {
    const movieId = req.params.idPelicula;
    const reserva = await Reserva.findById(movieId, {
      fecha,
      hora,
      sala,
      asientos,
      idPelicula,
      idUsuario,
    });

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los detalles de la reserva" });
  }
});

router.get("/tareas", (req, res) => {
  res.json([
    {
      _id: 1,
      name: "Primera tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
    {
      _id: 2,
      name: "Segunda tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
    {
      _id: 3,
      name: "Tercera tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
  ]);
});

router.get("/tareasPrivadas", verificarToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "Primera tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
    {
      _id: 2,
      name: "Segunda tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
    {
      _id: 3,
      name: "Tercera tarea",
      description: "tarea",
      date: "2023-05-02T18:36:06.684",
    },
  ]);
});

module.exports = router;

async function verificarToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Solicitud no autorizada");
    }
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (token === "null") {
      return res.status(401).send("Solicitud no autorizada");
    }

    const payload = await jwt.verify(token, "claveSecreta");
    if (!payload) {
      return res.status(401).send("Solicitud no autorizada");
    }
    req.userId = payload._id;
    console.log(payload);
    next();
  } catch (e) {
    return res.status(401).send("Solicitud no autorizada");
  }
}
