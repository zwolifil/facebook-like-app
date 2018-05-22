import * as React from 'react';

import * as firebase from 'firebase';

import './Signup.css';



export default class Signup extends React.Component {

    private auth = { email: '', pass: '', repPass: ''};
    private myFormRef: HTMLFormElement;

    public constructor(props: {}) {
        super(props);

        this.onSignupClick = this.onSignupClick.bind(this);
        this.render = this.render.bind(this);
    }

    public render() {
        return (
            <div className="container" id="main">
                <h2 className="text-center align-self-center font-weight-bold">Register</h2>
                <form ref={(el) => this.myFormRef = el} className="container align-content-center align-self-sm-center" onSubmit={event => {this.onSignupClick(); event.preventDefault(); }}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={event => {this.auth.email = event.target.value}} className="form-control" placeholder="Type email"/>
                        <label>Password</label>
                        <input type="password" onChange={event => {this.auth.pass = event.target.value}} className="form-control" placeholder="Type password" />
                        <label>Repeat password</label>
                        <input type="password" onChange={event => {this.auth.repPass = event.target.value}} className="form-control" placeholder="Type password"/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }

    private onSignupClick() {
        if(this.auth.pass !== this.auth.repPass) {
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.pass).catch(error => {
            // Handle Errors here.
        });

        this.myFormRef.reset();
    }
}