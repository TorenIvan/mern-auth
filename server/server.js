/* ECMAScript and above */
'use strict';

/* Basic Modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* Custom Modules */
const indexRouter  = require('./routes/index.js')

//DB
const db = 'mongodb://localhost/mern-auth'
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5008;

/* Router usage */
app.use('/', indexRouter);

app.get('/', (req,res) => {
    res.json({
        message: "Hello me",
    });
})
