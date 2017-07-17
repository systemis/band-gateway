const request = require('request');
const cheerio = require('cheerio');
const parse   = require('xml2json');
const sourceM = "http://www.nhaccuatui.com/tim-kiem?q=";
class search{
    constructor(searchValue){
        this.searchValue = searchValue;
    }

    search(fn){
        request(`http://www.nhaccuatui.com/tim-kiem?q=${this.searchValue}`, (err, res, body) => {
            if(err) return fn(err, null);
            
            const $ = cheerio.load(body);

            const searchsListSong = $(body).find('a.name_song.search');
            const hrefValue = [];

            for(var i = 0; i < searchsListSong.length; i++){
                console.log(searchsListSong[i].attribs.href);
            }

            fn(null, searchsListSong);
        })
    }
}

module.exports = search;