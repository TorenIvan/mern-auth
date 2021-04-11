/* ECMAScript and above */
'use strict';

/* Basic Modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

/* Custom Modules */
const indexRouter  = require('./routes/index.js')

//DB
const db = 'mongodb://localhost/mern-auth'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 5008;
const app  = express()

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Security Middleware Handling
/* Security Headers */
app.use(helmet());
/* XSS Prevention */
app.use(xss());
/* HTTP Parameter Pollution Prevention */
app.use(hpp());
/* Limiting package rate, prevent DDoS */
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, 	//10 minutes
	max: 10000,			//10.000 requests
});
app.use(limiter);
// End of Security Middleware Handling


/* Router usage */
app.use('/', indexRouter);


app.get('/', (req,res) => {
    res.json({
        message: "Hello me",
    });
})
