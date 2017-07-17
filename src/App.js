import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component }             from 'react';
import {connect}                        from 'react-redux';
import HomePage                         from './page/home/home.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentWillMount(){
    console.log(this.props.songInfo);
  }

  render() {
    return (
      <div className="App">
        <Router>
            <Route exact path="/" component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default connect(state => {
  return{
    songInfo: state.songInfo
  }
})(App);
