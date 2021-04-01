const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//DB
const db = 'mongodb://localhost/mern-auth'
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
    console.log('listening....');
})

app.use(express.json());


app.get('/', (req,res) => {
    res.json({
        message: "Hello me",
    });
})
