import React, { Component } from 'react';
import $                    from 'jquery';
import songMG               from '../../js/song.js';
import './style/home-page-style.css';

class HomePage extends Component {
    changeMGValue(src){
        const media     = document.getElementById('show-result-mg');
        const source    = document.getElementById('play-song');
        const playAgain = () => {
            media.load();
            media.play();
        }

        source.setAttribute('src', src);
        setTimeout(playAgain(), 1000);
    }

    onGetMusicLink(){
        $("#form-input-url-get-song-link").submit(e => {
            e.preventDefault();
            const url = $("#input-url").val();
            if(!url) return;

            new songMG(url).getMusicLink((err, result) => {
                if(err) return document.getElementById('show-result').innerText = 'Error'
                
                this.changeMGValue(result);
            });
        })
    }

    render() {
        return (
            <div className="home-page">
                <div className="handler-group">
                    <form 
                        id="form-input-url-get-song-link" 
                        className="container">
                        <input 
                            type="text" 
                            id="input-url"
                            name="input-url"
                            placeholder="Type music href"/>
                        <span 
                            type="submit"
                            className="fa fa-search" />
                    </form>
                    <div id="show-results-search" 
                        className="container">
                        <a id="show-result"></a>
                        <audio 
                            id="show-result-mg"
                            controls>
                            <source 
                                id="play-song"
                                nptype="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
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