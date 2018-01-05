import $ from 'jquery';
class searchSong{
    constructor(searchValue){
        this.searchValue = searchValue;
    }

    search(fn){
        $.ajax({
            url: `http://localhost:1999/search/songs/${this.searchValue}`, type: `POST`,
            success: data => fn(data.err, data.result),
            error: err => fn(err, null)
        })
    }
}

export default searchSong;