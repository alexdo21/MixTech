import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap-slider/dist/css/bootstrap-slider.css"

import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/**
 * Main entry point of react app. Provider wrapper gives App access to the Redux store.
 * The React DOM renders App.js in the beginning.
 */


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
