const getLinkSongAPI = require('../api/getSongData');
const searchAPI      = require('../api/search.js');
module.exports = app => {
    app.post('/search/songs/:value', (req, res) => {
        const searchValue = req.params.value;
        console.log(searchValue);
        new searchAPI(searchValue).search((err, songs) => {
            res.send({err: err, result: songs});
        })
    })

    app.post(`/get/song-link/`, (req, res) => {
        const url = req.body.url;
        new getLinkSongAPI(url).get((err, result) => {
            res.send({err: err, result: result});
        })
    })
}