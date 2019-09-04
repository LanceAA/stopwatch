import './style.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {entries} from "./components/reducers.js";
import App from "./components/App"
import {Provider} from "react-redux";

const rootElm = document.getElementById('root');
const store = createStore(entries, applyMiddleware(thunk));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        rootElm
    );
}
render();
