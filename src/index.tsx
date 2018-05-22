import 'bootstrap/dist/css/bootstrap.css';
import * as React from "react";
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import Navigation from './Components/Navigation';
import Signup from './Components/Signup';


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
    <div>
        <Navigation />
        < Signup />
    </div>,
    document.getElementById('root'));
