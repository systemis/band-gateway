const getLinkSongAPI = require('../api/getSongData');
module.exports = app => {
    app.post(`/get/song-link/`, (req, res) => {
        const url = req.body.url;
        new getLinkSongAPI(url).get((err, result) => {
            res.send({err: err, result: result});
        })
    })
}