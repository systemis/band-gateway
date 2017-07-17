import React, { Component } from 'react';
import $                    from 'jquery';
import songMG               from '../../js/song.js';
import searchAPI            from '../../js/search-song.js';
import './style/home-page-style.css';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            songsSearch: []
        }
    }
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

            

            new searchAPI(url).search((err, result) => {
                if(err) return;

                this.setState({songsSearch: result});
            })
        })
    }

    render() {
        return (
            <div className="home-page">
                <h1 className="title">Music for every one</h1>
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
                        <div className="show-data">
                            {this.state.songsSearch.map((value, index) => {
                                return(
                                    <div className="row song-item"
                                        onClick={() => {
                                            const list = document.getElementsByClassName("song-item");
                                            for(var i = 0; i < list.length; i ++) { list[i].classList.remove('active')}
                                            list[index].classList.add('active');

                                            new songMG(value.location).getMusicLink((err, result) => {
                                                this.changeMGValue(result);
                                            });
                                        }}>
                                        <span className="show-song-name"> {value.name}    </span>
                                        <span className="show-singer-name"> {value.singerName} </span>xx
                                    </div>
                                )
                            })}
                        </div>
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

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextState);
        this.render();
        return true;
    }
}

export default HomePage;