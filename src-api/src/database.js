const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ivan:ivan@proyectofinal.uriytkd.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));