/* ECMAScript and above */
'use strict';

/* Basic Modules */
const express = require('express');

/* Custom modules */
const indexRouter  = require('./routes/index.js')

/* Creates app, specifies port */
const app  = express();
const PORT = process.env.PORT || 5008;

/* Router usage */
app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));