import React, { Component } from 'react';
import $ from 'jquery';
import songMG from '../../js/song.js';

class HomePage extends Component {
    onGetMusicLink(){
        $("#form-input-url-get-song-link").submit(e => {
            e.preventDefault();
            const url = $("#input-url").val();
            if(!url) return;

            new songMG(url).getMusicLink((err, result) => {
                if(err){
                    console.log(err);
                    return alert(err);
                }

                
                // alert(result);
                document.getElementById('show-result').innerText = 'Link here'
                document.getElementById('show-result').setAttribute('href', result);
            });
        })
    }

    render() {
        return (
            <div className="home-page">
                Home 
                <form 
                    id="form-input-url-get-song-link">
                    <input 
                        type="text" 
                        id="input-url"
                        name="input-url"
                        placeholder="Type music href" />
                    <input 
                        type="submit"
                        value="GET"/>
                </form>
                <a id="show-result"></a>
            </div>
        );
    }

    componentDidMount() {
        const sefl = this;
        $(document).ready(() => {
            sefl.onGetMusicLink();      
        })  
    }
}

export default HomePage;