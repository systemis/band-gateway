const request = require('request');
const cheerio = require('cheerio');
const parse   = require('xml2json');
const sourceMURL = "https://www.nhaccuatui.com/flash/xml?key1=";

class getSongData{
    constructor(url){
        this.url = url;
    }

    get(fn){
        request(this.url, (err, res, body) => {
            if(err) return fn({err: err, result: null});
            var indexOfUrlData = body.indexOf(sourceMURL);
            var addBool = false;
            var sondId  = "";
            console.log(indexOfUrlData);
            for(var i = indexOfUrlData; i < body.length; i++){
                if(body[i] === '"'){
                    i = body.length;
                    addBool = false;
                    request(`${sourceMURL}${sondId}` , (err2, res2, body2) => {
                        if(!JSON.parse(parse.toJson(body2)).tracklist) return fn({err: 'Link Underfined', result: null});
                        const info   = JSON.parse(parse.toJson(body2)).tracklist.track;
                        
                        return fn(null, info.location);
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
    }
}

module.exports = getSongData;