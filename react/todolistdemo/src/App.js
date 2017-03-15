// import React, { Component } from 'react'
// // import { render } from 'react-dom'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import App from './containers/App'
// import todoApp from './reducers/reducers.js'

// let store = createStore(todoApp)

// let rootElement = document.getElementById('root')
// class Apps extends Component {
// 	render() {
// 	  return (
// 	  	<a>aaaaaaa</a>,
// 	  	// <Provider store={store}>
// 	    // <App />
// 	  	// </Provider>,
// 	  rootElement
// 	  );
// 	}
// }
//  export default Apps;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
