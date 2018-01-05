import $ from 'jquery';
class song{
    constructor(link){
        this.link = link;
    }

    getMusicLink(fn){
        const link = this.link;
        $.ajax({
            url: `http://localhost:1999/get/song-link/`, type: 'POST', data: {url: link},
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(err, null)
        })
    }
}

export default song;