import * as React from 'react';

import * as firebase from 'firebase';

import './Signup.css';



class Signup extends React.Component {

    private auth = { email: '', pass: '', repPass: ''};


    public constructor(props: {}) {
        super(props);

        this.onSignupClick = this.onSignupClick.bind(this);
        this.render = this.render.bind(this);
    }

    public render() {
        return (
            <div className="container" id="main">
                <h2 className="text-center align-self-center font-weight-bold">Register</h2>
                <form className="container align-content-center align-self-sm-center">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={event => {this.auth.email = event.target.value}} className="form-control" placeholder="Type email"/>
                        <label>Password</label>
                        <input type="password" onChange={event => {this.auth.pass = event.target.value}} className="form-control" placeholder="Type password" />
                        <label>Repeat password</label>
                        <input type="password" onChange={event => {this.auth.repPass = event.target.value}} className="form-control" placeholder="Type password"/>
                    </div>

                    <button type="button" className="btn btn-default" onClick={this.onSignupClick}>Submit</button>
                </form>
            </div>
        );
    }

    private onSignupClick() {
        console.log(this.auth.email);
        if(this.auth.pass !== this.auth.repPass) {
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.pass).catch(error => {
            // Handle Errors here.
        });
    }
}

export default Signup;