import React, { Component } from 'react';

import * as firebase from 'firebase';
import logo from '../logo.svg';

import './Signup.css';



class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = { email: '', pass: '', repPass: ''};
        this.onSignupClick = this.onSignupClick.bind(this);
    }


    render() {
        return (
            <div className="container" id="main">
                <h2 className="text-center align-self-center font-weight-bold">Register</h2>
                <form className="container align-content-center align-self-sm-center">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={event => {this.setState({email: event.target.value})}} className="form-control" placeholder="Type email"/>
                        <label>Password</label>
                        <input type="password" onChange={event => {this.setState({pass: event.target.value})}} className="form-control" placeholder="Type password" />
                        <label>Repeat password</label>
                        <input type="password" onChange={event => {this.setState({repPass: event.target.value})}} className="form-control" placeholder="Type password"/>
                    </div>

                    <button type="button" className="btn btn-default" onClick={this.onSignupClick}>Submit</button>
                </form>
            </div>
        );
    }

    onSignupClick() {
        if(this.state.pass !== this.state.repPass) {
            console.log("Passwords doesn't match!");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch(function (error) {
            console.log(error.message);
        })
    }
}

export default Signup;