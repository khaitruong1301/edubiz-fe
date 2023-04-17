import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './templates/login/SummerFont-Light.ttf';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux'; //npm install react-redux
import ConfigStore from './redux/ConfigStore';

const store = ConfigStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
