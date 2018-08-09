import * as React from 'react';
import * as firebase from 'firebase';
import { RouteProps } from 'react-router';
import CreatePost from '../CreatePost/CreatePost';
import PostListItem from "../PostListItem/PostListItem";
import {RoutingData} from "../../RoutingData";

export interface IPost {
    image: string,
    content: string,
    author: string,
    _id: string,
    __v: number
}

interface IProfile {
    avatar: string,
    name: string,
    description: string,
    _id: string,
    __v: number
}

interface IImage {
    url: string,
    uid: string
}

interface IState {
    posts: IPost[],
    images: IImage[],
    profiles: IProfile[],
    loading: boolean,
    ifSigned: boolean
}

export default class PostList extends React.Component<{location, CallbackToParent}, IState> {

    private unsubscribe;

    public constructor(props) {
        super(props);
        this.state = {posts: [], images: [], profiles: [], loading: true, ifSigned: false};
        this.onPostsGet = this.onPostsGet.bind(this);
        this.onProfilesGet = this.onProfilesGet.bind(this);
        this.render = this.render.bind(this);
    }

    public componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState({ifSigned: true});
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.onProfilesGet();
                // noinspection JSPotentiallyInvalidUsageOfClassThis
                this.onPostsGet();
                this.onImagesGet();
                this.onCommentsGet();
            }
            else {
                this.setState({ifSigned: false, posts: [], profiles: []});
            }
        }.bind(this));
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public render() {
        return (
            !this.state.loading ?
            <div className="parent-posts">
                {this.state.ifSigned ?
                    <div className="d-flex flex-column container-fluid">
                        <nav className="flex-fill flex-grow-0 pt-3"><CreatePost toParentCallback={this.onCreateNewPost}/></nav>
                        <div className="flex-fill container align-content-center pt-3">
                            <div id="post-container">
                                {
                                    this.props.location.state ? RoutingData.getPosts(this.state.posts) : ""
                                }
                                {
                                    RoutingData.posts ? RoutingData.posts.map(post => {
                                    return <PostListItem key={post._id} post={post} profile={
                                        RoutingData.profiles.find((profile) => profile._id === post._idProfile)
                                    } toParentCallback={this.onGetHashedPost}/>
                                }) : ""
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <h1 className="container-fluid font-weight-bold text-center mt-3">You need to log in to see and add posts!!</h1>
                }
            </div> :
                <div>LOADING</div>
        );
    }


    private onPostsGet(){
        fetch('http://localhost:8000/posts')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                RoutingData.getPosts(postsData.reverse());
                RoutingData.setHashedPosts(RoutingData.posts);
                this.setState({
                    posts: postsData
                });
            });
    };

    private onImagesGet = () => {
        fetch('http://localhost:8000/images')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                RoutingData.setImages(postsData);
                this.setState({images: postsData});
            });
    }

    private onCommentsGet = () => {
        fetch('http://localhost:8000/comments')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                RoutingData.setComments(postsData);
            });
    }

    private onProfilesGet(){
        fetch('http://localhost:8000/profiles')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                RoutingData.getProfiles(postsData);
                this.setState({
                    profiles: postsData,
                    loading: false
                });
            });
    };

    private onGetHashedPost = hash => {
        this.props.location.state = undefined;
        if(hash) {
            RoutingData.getPosts(RoutingData.hashedPosts);
            let postsData = RoutingData.posts;
            postsData = postsData.filter(post =>
                        post.content.includes(hash)
                    );
            RoutingData.setHashedPosts(RoutingData.posts);
            RoutingData.getPosts(postsData);
            this.setState({posts: this.state.posts});
            hash = false;
        }
    };

    private onCreateNewPost = newPost => {
        const tmpPosts = this.state.posts;
        tmpPosts.unshift(newPost);
        this.setState({posts: tmpPosts});
    }

}