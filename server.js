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
    var c = new crawler({
        maxConnections : 10,
        // This will be called for each crawled page 
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                var $ = res.$;
                // $ is Cheerio by default 
                //a lean implementation of core jQuery designed specifically for the server 
                // console.log($("title").text());
                // console.log($);
                // console.log(res.$);
            }
            done();
        }
    });

    request("http://www.nhaccuatui.com/bai-hat/1-2-3-4-chi-dan.ivwlvn9YHjar.html", (err, res, body) => {
        if(err) return console.log("that bai");

        
    })

    request("http://www.nhaccuatui.com/flash/xml?key1=df0482589f13991652f12c7653d7014c" , (err, res, body) => {
        console.log(body);
    })
    
    // Queue just one URL, with default callback 
    
// Queue just one URL, with default callback 
// Queue a list of URLs 
// c.queue('http://www.amazon.com');
// c.queue(['http://mp3.zing.vn/']);
// c.queue('http://www.nhaccuatui.com/');
c.queue('http://www.nhaccuatui.com/flash/xml?key1=270c28e286987bfdb2cfc59f88290231');
    
})