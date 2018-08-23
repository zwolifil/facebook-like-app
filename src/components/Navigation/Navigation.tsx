import {browserHistory, Link, Router} from 'react-router';
import * as React from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';

import './Navigation.scss';
import {setComments, setImages, setMyProfile, setPosts, setProfiles} from '../../actions';

interface IState {ifSigned: boolean, email: string, pass: string, loading: boolean}

export class Navigation extends React.Component<{ setPosts, setProfiles, setComments, setImages, setMyProfile, profiles, myProfile, images}, IState> {

    public constructor(props) {
        super(props);

        this.render = this.render.bind(this);
        this.state = {ifSigned : false, email: "", pass: "", loading: true};
    }

    public componentDidMount() {
        firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState( {ifSigned: true, email: firebase.auth().currentUser.email});
                this.onPostsGet();
                this.onProfilesGet();
                this.onCommentsGet();
                this.onImagesGet();
            }
            else {
                this.setState( {ifSigned: false, email: ""});
            }
        }.bind(this));
    }

    public render() {
        return (
            <div className="align-items-center">
                <div id="nav" className="nav navbar d-flex flex-row container-fluid navigation-bar">
                    {firebase.auth().currentUser ?
                        <div className="d-flex flex-row justify-content-around">
                            <div className="font-weight-bold headline">
                                <Link to={{pathname : "/profiles/" + this.props.myProfile._id, state: {_id: this.props.myProfile._id, name: this.props.myProfile.name,
                                        description: this.props.myProfile.description, avatar: this.props.myProfile.avatar, images: this.props.myProfile.images}}}>
                                    {this.props.images && this.props.images.length && (this.props.myProfile.avatar && <img className="avatar-logo" src={"http://localhost:8000/images/" + this.props.myProfile.avatar} height={40}
                                                                                        width={40}/>)}
                                    {this.props.myProfile.name}
                                </Link>
                            </div>
                            <button id="btn-nav" className="btn btn-primary font-weight-bold navigation-button user-greeting" onClick={this.onLogoutClick}>Logout</button>
                        </div>:
                        <div>
                            <div id="login-form" className="d-flex justify-content-around">
                                <input type="email" onChange={event => {this.setState({email: event.target.value})}} className="form-control" placeholder="Type email"/>
                                <input type="password" onChange={event => {this.setState({pass: event.target.value})}} className="form-control" placeholder="Type password"/>
                                <div className="d-flex flex-row align-items-center">
                                    <button id="btn-nav" className="btn btn-primary font-weight-bold navigation-button user-greeting" onClick={this.onLoginClick}>Login</button>
                                    <Link to="/signup" id="btn-nav" className="btn btn-primary font-weight-bold navigation-button user-greeting">Register</Link>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="d-flex flex-row justify-content-around">
                        {this.state.ifSigned &&
                            <Link to="/profile" id="btn-nav" className="btn btn-primary font-weight-bold navigation-button user-greeting">Profile</Link>
                        }
                        <Link to={{pathname : "/posts", state: {hash : true}}} id="btn-nav" className="btn btn-primary font-weight-bold navigation-button user-greeting">Posts</Link>
                    </div>
                </div>
                <div id="log-alert-child" className="rounded p-1 position-absolute m-auto font-weight-bold" />
                {
                    this.props.children
                }
            </div>
        );
    }

    private onLogoutClick = () => {
        firebase.auth().signOut().then(() => {
            this.setState({email: "", pass: ""});
        });
    };

    private onLoginClick = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
            .then(() => {
                document.getElementById("log-alert-child").style.display = "none";
                this.props.setMyProfile(this.props.profiles.find(profile => profile._id === firebase.auth().currentUser.uid));
            })
            .catch(() => {
                const x = document.getElementById("log-alert-child");
                x.innerText = "Login or password was invalid!";
                x.style.display = "inline-block";
                x.addEventListener("mouseover",
                    () => {x.style.display = "none"})
            });
    };

    private onPostsGet = () => {
        fetch('http://localhost:8000/posts')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                this.props.setPosts(postsData.reverse());
            });
    };

    private onProfilesGet = () => {
        fetch('http://localhost:8000/profiles')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                this.props.setProfiles(postsData);
                this.props.setMyProfile(this.props.profiles.filter(profile => profile._id === firebase.auth().currentUser.uid)[0]);
                this.setState({
                    loading: false
                });
            });
    };

    private onImagesGet = () => {
        fetch('http://localhost:8000/images')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                this.props.setImages(postsData);
            });
    };

    private onCommentsGet = () => {
        fetch('http://localhost:8000/comments')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                this.props.setComments(postsData);
            });
    };
}

const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        myProfile: state.myProfile,
        images: state.images
    };
};

const mapDispatchToProps = { setPosts, setProfiles, setComments, setImages, setMyProfile };

export const NavigationApp = connect(mapStateToProps, mapDispatchToProps)(Navigation);