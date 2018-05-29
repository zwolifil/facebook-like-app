import {browserHistory, Link, Router} from 'react-router';
import * as React from 'react';
import * as firebase from 'firebase';

import './Navigation.css';

interface IState {ifSigned: boolean, email: string, pass: string}

export default class Navigation extends React.Component<{}, IState> {

    public constructor(props: {}) {
        super(props);

        this.onLoginClick = this.onLoginClick.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.render = this.render.bind(this);
        this.state = {ifSigned : false, email: "", pass: ""};
    }

    public componentDidMount(): void {

        firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState( {ifSigned: true, email: firebase.auth().currentUser.email});
            }
            else {
                this.setState( {ifSigned: false, email: ""});
            }
        }.bind(this));
    }

    public render() {
        return (
            <div>
                <div className="nav navbar d-flex flex-row ">
                    {this.state.ifSigned ?
                        <div className="d-flex flex-row">
                            <a className="align-middle">Hello, <b>{this.state.email}</b></a>
                            <div className="d-flex flex-row align-self-center">
                                <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
                            </div>
                        </div>:
                        <div className="d-flex justify-content-around">
                            <input type="email" onChange={event => {this.setState({email: event.target.value})}} className="form-control" placeholder="Type email"/>
                            <input type="password" onChange={event => {this.setState({pass: event.target.value})}} className="form-control" placeholder="Type password"/>
                            <div className="d-flex flex-row">
                                <button id="btn-nav" className="btn btn-primary" onClick={this.onLoginClick}>Login</button>
                                <Link to="/signup" id="btn-nav" className="btn btn-primary">Register</Link>
                            </div>
                        </div>
                    }
                    <div className="d-flex flex-row justify-content-around">
                        {this.state.ifSigned ?
                            <Link to="/profile" id="btn-nav" className="btn btn-primary">Profile</Link> :
                            ""
                        }
                        <Link to="/posts" id="btn-nav" className="btn btn-primary">Posts</Link>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }

    private onLogoutClick() {
        firebase.auth().signOut().then(() => {
            this.setState({email: "", pass: ""});
        });
    }

    private onLoginClick() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .catch(error => {

        })
    }
}