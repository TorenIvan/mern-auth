/* ECMAScript and above */
'use strict';

/* Basic Modules */
const express = require('express');
const path    = require('path');

/* Custom modules */
const routes  = require('./routes/index.js')

/* Creates app, specifies port */
const app = express();
const PORT = process.env.PORT || 5008;

/* Serve static files */
app.use(express.static(path.join(__dirname, '../client/public')));

/* Router usage */
app.use('/', routes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));