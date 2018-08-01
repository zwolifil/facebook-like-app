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
                <form ref={(el) => this.myPassRef = el} className="container align-content-center align-self-sm-center" onSubmit={this.onUpdatePassClick}>
                    <div className="form-group">
                        <label>Avatar</label>
                        <input type="file" name="file" id="file" className="inputFile" accept="image/*" />
                        <label htmlFor="file" className="input-file-icon-wrap">
                            <svg className="input-file-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                        </label>
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