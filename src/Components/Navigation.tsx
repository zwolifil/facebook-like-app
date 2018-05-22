import * as React from 'react';

import * as firebase from 'firebase';
import logo from '../logo.svg';

import './Navigation.css';

interface IState {ifSigned: boolean}

export default class Navigation extends React.Component<{}, IState> {

    public constructor(props: {}) {
        super(props);

        this.onLoginClick = this.onLoginClick.bind(this);
        this.render = this.render.bind(this);
        this.state = {ifSigned : false};
    }

    public componentDidMount(): void {

        firebase.auth().onAuthStateChanged( function (user) {
            user = firebase.auth().currentUser;
            this.setState( {ifSigned: !!user});
            console.log(this.state);
        }.bind(this));
    }

    public render() {
        return (
            <div className="nav navbar d-flex flex-row align-items-end">
                <img src={logo} className="navbar-toggler-icon" alt="logo" />
                <a className="align-middle ">{firebase.auth().currentUser !== null ? firebase.auth().currentUser!.email : ""}</a>
                { this.state.ifSigned ?
                    <a className="align-middle" onClick={this.onLogoutClick}>Logout</a>
                    :
                    <a className="align-middle" onClick={this.onLoginClick}>Login</a>
                }
            </div>
        );
    }

    private onLogoutClick() {
        firebase.auth().signOut().then(() => {

        }).catch(error => {

        })
    }

    private onLoginClick() {
        console.log(firebase.auth().currentUser);
        firebase.auth().signInWithEmailAndPassword("z@z.pl", "qwerty").catch(error => {

        })
    }
}