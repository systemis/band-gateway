const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const parse   = require('xml2json');
const url     = require('url');
const morgan  = require('morgan');
const path    = require('path');
const app     = express();
const server  = require('http').Server(app);

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, './build')));

app.get('/', (req, res) => {
    
})
var news = {};

server.listen(3000, () => {
    request("http://www.nhaccuatui.com/bai-hat/despacito-remix-luis-fonsi-ft-daddy-yankee-ft-justin-bieber.eI1h9vc468uC.html", (err, res, body) => {
        if(err) return console.log("that bai");
        var indexOfUrlData = body.indexOf("http://www.nhaccuatui.com/flash/xml?key1=");
        var addBool = false;
        var sondId  = "";
        for(var i = indexOfUrlData; i < body.length; i++){
            if(body[i] === '"'){
                console.log(sondId);
                i = body.length;
                addBool = false;
                request(`http://www.nhaccuatui.com/flash/xml?key1=${sondId}` , (err2, res2, body2) => {
                    const $      = cheerio.load(body2);
                    const info   = JSON.parse(parse.toJson(body2)).tracklist.track;
                    console.log(info);
                })
            }

            if(addBool){
                sondId += body[i];
            }
            
            if(body[i] === '='){
                addBool = true;
            }
        }
    })
})