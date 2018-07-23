import * as React from 'react';
import * as firebase from 'firebase';
import {browserHistory} from 'react-router';

export default class Profile extends React.Component{

    private name: string;
    private email: string;
    private pass: string;

    private myNameRef: HTMLFormElement;
    private myMailRef: HTMLFormElement;
    private myPassRef: HTMLFormElement;

    public render() {
        return(
            <div className="container">
                <h2 className="text-center align-self-center font-weight-bold">Update name</h2>
                <form ref={(el) => this.myNameRef = el} className="container align-content-center align-self-sm-center" onSubmit={this.onUpdateNameClick}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" onChange={event => {this.name = event.target.value}} className="form-control" placeholder="Type name"/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <h2 className="text-center align-self-center font-weight-bold">Update email</h2>
                <form ref={(el) => this.myMailRef = el} className="container align-content-center align-self-sm-center" onSubmit={this.onUpdateEmailClick}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={event => {this.email = event.target.value}} className="form-control" placeholder="Type email" />
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>

                <h2 className="text-center align-self-center font-weight-bold">Update password</h2>
                <form ref={(el) => this.myPassRef = el} className="container align-content-center align-self-sm-center" onSubmit={this.onUpdatePassClick}>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={event => {this.pass = event.target.value}} className="form-control" placeholder="Type password"/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }

    private onUpdateNameClick = (event) => {
        event.preventDefault();

        firebase.auth().currentUser.updateProfile({
            displayName: this.name,
            photoURL: null
        });

        this.myNameRef.reset();
    }

    private onUpdateEmailClick = (event) => {
        event.preventDefault();

        firebase.auth().currentUser.updateEmail(
            this.email
        );

        this.myMailRef.reset();
    }

    private onUpdatePassClick = (event) => {
        event.preventDefault();

        firebase.auth().currentUser.updatePassword(
            this.pass
        );

        this.myPassRef.reset();
    }

}