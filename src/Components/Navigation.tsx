import * as DOM from 'react-router-dom';
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
                <div className="nav navbar d-flex flex-row align-items-end ">
                    {this.state.ifSigned ?
                        <a>Hello, <b>{this.state.email}</b></a> :
                        <div className="d-flex justify-content-around">
                            <input type="email" onChange={event => {this.setState({email: event.target.value})}} className="form-control" placeholder="Type email"/>
                            <input type="password" onChange={event => {this.setState({pass: event.target.value})}} className="form-control" placeholder="Type password"/>
                        </div>
                    }
                    { this.state.ifSigned ?
                        <button className="btn btn-default" onClick={this.onLogoutClick}>Logout</button>
                        :
                        <div className="d-flex flex-row">
                        <button id="btn-nav" className="btn btn-default" onClick={this.onLoginClick}>Login</button>

                        </div>
                    }
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