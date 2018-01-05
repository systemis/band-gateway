'use strict'

const express = require('express');
const fs      = require('fs');
const url     = require('url');
const morgan  = require('morgan');
const path    = require('path');
const app     = express();
const server  = require('http').Server(app);

const expresssession = require('express-session');
const bodyParser     = require('body-parser');

const searchAPI = require('./server/api/search.js');

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, './build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expresssession({
    secret: 'secret',
    saveUninitialized: true
}))

// setup router 
require('./server/app/song.js')(app);

server.listen(process.env.PORT || 1999, () => {
    new searchAPI('despacito').search((err, result) => {
        console.log(result);
    })
})