import './style.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from "./components/App"
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {entries} from "./components/reducers.js";

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
