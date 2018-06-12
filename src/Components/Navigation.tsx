import {browserHistory, Link, Router} from 'react-router';
import * as React from 'react';
import * as firebase from 'firebase';

import './Navigation.scss';

interface IState {ifSigned: boolean, email: string, pass: string}

export default class Navigation extends React.Component<{}, IState> {

    public constructor(props: {}) {
        super(props);

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
            <div className="align-items-center">
                <div className="nav navbar d-flex flex-row container-fluid">
                    {firebase.auth().currentUser ?
                        <div className="d-flex flex-row">
                            <a className="align-middle">Hello, <b>{firebase.auth().currentUser.displayName}</b></a>
                            <div className="d-flex flex-row align-self-center">
                                <button className="btn btn-primary" onClick={this.onLogoutClick}>Logout</button>
                            </div>
                        </div>:
                        <div>
                            <div className="d-flex justify-content-around">
                                <input type="email" onChange={event => {this.setState({email: event.target.value})}} className="form-control" placeholder="Type email"/>
                                <input type="password" onChange={event => {this.setState({pass: event.target.value})}} className="form-control" placeholder="Type password"/>
                                <div className="d-flex flex-row">
                                    <button id="btn-nav" className="btn btn-primary" onClick={this.onLoginClick}>Login</button>
                                    <Link to="/signup" id="btn-nav" className="btn btn-primary">Register</Link>
                                </div>
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
                <div id="log-alert-child" className="rounded p-1 position-absolute m-auto font-weight-bold" />
                {this.props.children}
            </div>
        );
    }

    private onLogoutClick = () => {
        firebase.auth().signOut().then(() => {
            this.setState({email: "", pass: ""});
        });
    }

    private onLoginClick = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                document.getElementById("log-alert-child").style.display = "none";
            })
            .catch(() => {
            const x = document.getElementById("log-alert-child");
            x.innerText = "Login or password was invalid!";
            x.style.display = "inline-block";
            x.addEventListener("mouseover",
                () => {x.style.display = "none"})
        });
    }
}