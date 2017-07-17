const express = require('express');
const http    = require('http');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const crawler = require("crawler");
const url     = require('url');
const app     = express();
// const url = 'http://www.nhaccuatui.com/bai-hat/despacito-remix-luis-fonsi-ft-daddy-yankee-ft-justin-bieber.eI1h9vc468uC.html';

app.get('/', (req, res) => {
    
})
var news = {};

app.listen(3000, () => {
    request("http://www.nhaccuatui.com/bai-hat/1-2-3-4-chi-dan.ivwlvn9YHjar.html", (err, res, body) => {
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
                    console.log(body2);
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