import React, { Component } from 'react';

import * as firebase from 'firebase';
import logo from '../logo.svg';

import './Navigation.css';

class Navigation extends Component {

    ifSigned = false;

    constructor(props) {
        super(props);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.ifSigned = true;
            } else {
                this.ifSigned = false;
            }
        });
    }

    render() {
        return (
            <div className="nav navbar d-flex flex-row align-items-end">
                <img src={logo} className="navbar-toggler-icon" alt="logo" />
                <p>{firebase.auth().currentUser !== null ? firebase.auth().currentUser.email : null}</p>
                <a className="align-middle">{this.ifSigned ? "Logout" : "Login"}</a>
            </div>
        );
    }
}

export default Navigation;