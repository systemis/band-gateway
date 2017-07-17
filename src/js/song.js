import $ from 'jquery';
class song{
    constructor(link){
        this.link = link;
    }

    getMusicLink(url, fn){
        $.ajax({
            url: `get/song-link/${url}`, type: 'POST',
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(err, null)
        })
    }
}

export default song;