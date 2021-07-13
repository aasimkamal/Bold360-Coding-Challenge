import React, { Component } from 'react';
import Alert from 'react-s-alert';
import './App.css';
import Bold360APICalls from './Bold360APICalls';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {
  render() {
    return (
      <div>
        <Bold360APICalls />
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}

export default App;
