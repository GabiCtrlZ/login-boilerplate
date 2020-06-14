import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  enable as enableDarkMode,
} from 'darkreader'

import { Provider } from 'react-redux'
import store from './store'

enableDarkMode({
  brightness: 100,
  contrast: 90,
  sepia: 10,
})

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
