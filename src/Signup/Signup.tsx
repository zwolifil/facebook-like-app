import * as React from 'react';
import * as firebase from 'firebase';
import './Signup.scss';

export default class Signup extends React.Component {

    private auth = {avatar: '', description: '', name: '', email: '', pass: '', repPass: ''};
    private myFormRef: HTMLFormElement;

    public constructor(props: {}) {
        super(props);

        this.onSignupClick = this.onSignupClick.bind(this);
        this.render = this.render.bind(this);
    }

    public render() {
        return (
            <div className="container main">
                <h2 className="text-center align-self-center font-weight-bold">Register</h2>
                <form ref={(el) => this.myFormRef = el} className="container align-content-center align-self-sm-center signup-form" onSubmit={this.onSignupClick}>
                    <div className="form-group">
                        <label className="signup-form-label">Avatar</label>
                        <input type="file" name="file" id="file" className="inputFile" accept="image/*" onChange={event => this.auth.avatar = event.target.files[0].name} />
                        <label htmlFor="file" className="input-file-icon-wrap">
                            <svg className="input-file-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                        </label>
                        <label className="signup-form-label">Description</label>
                        <input type="text" onChange={event => {this.auth.description = event.target.value}} className="form-control" placeholder="Type something about yourself"/>
                        <label className="signup-form-label">Name</label>
                        <input type="text" onChange={event => {this.auth.name = event.target.value}} className="form-control" placeholder="Type name"/>
                        <label className="signup-form-label">Email</label>
                        <input type="email" onChange={event => {this.auth.email = event.target.value}} className="form-control" placeholder="Type email"/>
                        <label className="signup-form-label">Password</label>
                        <input type="password" onChange={event => {this.auth.pass = event.target.value}} className="form-control" placeholder="Type password" />
                        <label className="signup-form-label">Repeat password</label>
                        <input type="password" onChange={event => {this.auth.repPass = event.target.value}} className="form-control" placeholder="Type password"/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                    <div id="log-alert-child-signup" className="rounded p-1 position-absolute m-auto font-weight-bold" />
                </form>
            </div>
        );
    }

    private onSignupClick(event) {
        event.preventDefault();
        if(this.auth.pass !== this.auth.repPass) {
            const x = document.getElementById("log-alert-child-signup");
            x.innerText = "Passwords doesn't match!";
            x.style.display = "inline-block";
            x.addEventListener("mouseover",
                () => {x.style.display = "none"});
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.pass)
            .then( () => {
                document.getElementById("log-alert-child-signup").style.display = "none";

                firebase.auth().currentUser.updateProfile({
                    displayName: this.auth.name,
                    photoURL: "/Images/" + this.auth.avatar
                });

                fetch('http://localhost:8000/profiles', {
                    method: 'post',
                    body: JSON.stringify({
                        name: this.auth.name,
                        description: this.auth.description,
                        avatar: this.auth.avatar
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((postResponse) => postResponse.json())
                    .then(postData => {
                    });
            })
            .catch(() => {
                const x = document.getElementById("log-alert-child-signup");
                x.innerText = "Login or password was invalid!";
                x.style.display = "inline-block";
                x.addEventListener("mouseover",
                    () => {x.style.display = "none"})
        });

        this.myFormRef.reset();
    }
}