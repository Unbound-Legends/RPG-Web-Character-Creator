import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import {App} from './components/index';
import 'core-js/es7/array';
import 'core-js/fn/string/includes';
import 'core-js/fn/object/values';

require('./styles/tabs.css');
require('bootstrap/dist/css/bootstrap.css');
require('./styles/index.css');
require('sw-rpg-icons/css/sw-rpg-colors.min.css');
require('sw-rpg-icons/css/sw-rpg-icons.min.css');

export const store = createStore(allReducers, {}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
