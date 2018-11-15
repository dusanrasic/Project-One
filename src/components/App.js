import React, { Component } from 'react';
import '../styles/App.css';
import Navigation from './Navigation';
import Body from './Body';
import { Provider} from 'react-redux';
import store from '../lib/store';
class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Navigation />
          <Body />
        </div>
      </Provider>
    );
  }
}

export default App;
