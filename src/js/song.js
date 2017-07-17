import $ from 'jquery';
class song{
    constructor(link){
        this.link = link;
    }

    getMusicLink(fn){
        const link = this.link;
        $.ajax({
            url: `/get/song-link/`, type: 'POST', data: {url: link},
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(err, null)
        })
    }
}

export default song;