import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router } from 'react-router-dom'
import { ScrollContext } from 'react-router-scroll-4';

import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

import './bootstrap-lux/lux.css';
import './style/style.css';

const render = (
    <Provider store={store}>
        <Router>
            <ScrollContext>
                <App />
            </ScrollContext>
        </Router>
    </Provider>
);

ReactDOM.render(render, document.getElementById('root'));
