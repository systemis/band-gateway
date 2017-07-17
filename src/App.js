import {BrowsersRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';

import HomePage from './page/home/home.js';

import logo from './logo.svg';
import './App.css';

class App extends Component {
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

export default App;
