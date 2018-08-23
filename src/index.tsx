import 'bootstrap/dist/css/bootstrap.css';
import * as React from "react";
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import * as firebase from 'firebase';
import Routes from './Routes';
import {store} from "./store";

const config = {
    apiKey: "AIzaSyBjZui6CTBv9Xc6Epjyyl8zmaKrOO-5C74",
    authDomain: "facebook-like-app.firebaseapp.com",
    databaseURL: "https://facebook-like-app.firebaseio.com",
    projectId: "facebook-like-app",
    storageBucket: "facebook-like-app.appspot.com",
    messagingSenderId: "364659637614"
};
firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}>
                <Router history={browserHistory} routes={Routes} />
            </Provider>,
    document.getElementById('root'));
