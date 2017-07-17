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
            const searchsList       = $(body).find('li.list_song.search');
            const searchsListSong   = $(body).find('a.name_song.search');
            const searchsListSinger = $(body).find('a.name_singer');
            const searchsListListen = $(body).find('span.icon_listen');
            
            const songs = []

            for(var i = 0; i < searchsListSong.length; i++){
                const song = {
                    name: searchsListSong[i].attribs.title,
                    location: searchsListSong[i].attribs.href,
                    singerName: searchsListSinger[i].children[0].data,
                }

                songs.push(song);
                if(i === searchsListSong.length - 1){
                    fn(null, songs);
                }
            }
        })
    }
}

module.exports = search;