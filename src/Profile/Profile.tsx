import * as React from 'react';
import * as firebase from 'firebase';
import {browserHistory, Router} from 'react-router';
import './Profile.scss';
import {RoutingData} from "../RoutingData";
import CreatePost from "../Posts/CreatePost/CreatePost";

export default class Profile extends React.Component{

    private name: string;
    private email: string;
    private pass: string;
    private description: string;
    private avatarFile;
    private Files;

    private myRef: HTMLFormElement;

    public render() {
        return(
            <div className="container">
                <form ref={(el) => this.myRef = el} className="container align-content-center align-self-sm-center" onSubmit={this.onUpdateClick}>
                    <h2 className="text-center align-self-center font-weight-bold">Update name</h2>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" onChange={event => {this.name = event.target.value}} className="form-control" placeholder="Type name"/>
                    </div>

                    <h2 className="text-center align-self-center font-weight-bold">Update email</h2>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={event => {this.email = event.target.value}} className="form-control" placeholder="Type email" />
                    </div>

                    <h2 className="text-center align-self-center font-weight-bold">Update password</h2>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={event => {this.pass = event.target.value}} className="form-control" placeholder="Type password"/>
                    </div>

                    <h2 className="text-center align-self-center font-weight-bold">Add Avatar</h2>
                    <div className="form-group">
                        <input type="file" name="avatarfile" id="avatarfile" className="inputFile" accept="image/*" onChange={this.handleAvatarFileUpload}/>
                        <label htmlFor="avatarfile" className="input-file-icon-wrap">
                            <svg className="input-file-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                        </label>
                    </div>

                    <h2 className="text-center align-self-center font-weight-bold">Add New Images</h2>
                    <div className="form-group">
                        <input type="file" name="file" id="galleryFile" className="inputFile" accept="image/*" multiple={true} onChange={this.handleFileUpload}/>
                        <label htmlFor="galleryFile" className="input-file-icon-wrap">
                            <svg className="input-file-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                        </label>
                    </div>

                    <h2 className="text-center align-self-center font-weight-bold">Add Description</h2>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" onChange={event => {this.description = event.target.value}} className="form-control" placeholder="Type something about yourself"/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        );
    }

    private handleAvatarFileUpload = ( event ) => {
        this.avatarFile = event.target.files[0];
    }

    private handleFileUpload = ( event ) => {
        this.Files = event.target.files;
    }

    private onUpdateClick = (event) => {
        event.preventDefault();

        const myProfile = RoutingData.myProfile;

        if(this.name) {
            firebase.auth().currentUser.updateProfile({
                displayName: this.name,
                photoURL: firebase.auth().currentUser.photoURL
            });
            myProfile.name = this.name;
            this.onPostsUpdate(myProfile);
        }

        if(this.email) {
            firebase.auth().currentUser.updateEmail(
                this.email
            )
        }

        if(this.pass) {
            firebase.auth().currentUser.updatePassword(
                this.pass
            )
        }

        if(this.avatarFile) {
            firebase.auth().currentUser.updateProfile({
                displayName: firebase.auth().currentUser.displayName,
                photoURL: "/Images/" + this.avatarFile.name
            })

            const data = new FormData();
            data.append('imgUploader', this.avatarFile);

            fetch('http://localhost:8000/images', {
                method: 'post',
                body: data
            })
                .catch(error => console.log(error.message));

            myProfile.avatar = this.avatarFile.name;
        }

        if(this.description) {
            myProfile.description = this.description;
        }

        if(this.Files) {
            for(const file of this.Files) {
                myProfile.images.push(file.name);
                const data = new FormData();
                data.append('imgUploader', file);

                fetch('http://localhost:8000/images', {
                    method: 'post',
                    body: data
                })
                    .catch(error => console.log(error.message));
            }
        }

        fetch('http://localhost:8000/profiles/' + myProfile._id, {
            method: 'put',
            body: JSON.stringify(myProfile),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((postResponse) => postResponse.json())
            .then(postData => {
            });

        this.myRef.reset();
    }

    private onPostsUpdate(myProfile) {
        RoutingData.posts.filter(post => post._idProfile === myProfile._id).map(post => {
            fetch('http://localhost:8000/posts/' + post._id, {
                method: 'put',
                body: JSON.stringify({name: myProfile.name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((postResponse) => postResponse.json())
                .then(postData => {
                });

            post.author = myProfile.name;
        })
    }

}