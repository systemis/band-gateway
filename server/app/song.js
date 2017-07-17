const request = require('request');
const cheerio = require('cheerio');
const parse   = require('xml2json');
module.exports = app => {
    app.post(`/get/song-link/`, (nhan, goi) => {
        console.log('dd');
        const url = nhan.body.url;
        request(url, (err, res, body) => {
            if(err) return goi.send({err: err, result: null});
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
                        goi.send({err: null, result: info.location});
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
}