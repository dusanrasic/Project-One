import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from './Navigation';
import Body from './Body';

class App extends Component {
  constructor(){
    super();
    this.state = {
      results: {}
    }
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Body />
      </div>
    );
  }
}

export default App;
