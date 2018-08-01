import * as React from 'react';
import * as firebase from 'firebase';
import { RouteProps } from 'react-router';
import Authorization from '../../Authorization';
import CreatePost from '../CreatePost/CreatePost';
import PostListItem from "../PostListItem/PostListItem";

export interface IPost {
    image: string,
    content: string,
    author: string,
    _id: string,
    __v: number
}

interface IState {
    posts: IPost[],
    ifSigned: boolean
}

export default class PostList extends React.Component<{location}, IState> {

    public constructor(props) {
        super(props);
        this.state = {posts: [], ifSigned: false};
        this.onPostsGet = this.onPostsGet.bind(this);
        this.render = this.render.bind(this);
    }

    public componentDidMount() {
        firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState({ifSigned: true});
                this.onPostsGet();
            }
            else {
                this.setState({ifSigned: false, posts: []});
            }
        }.bind(this));
    }

    public render() {

        return (
            <div className="parent-posts">
                {this.state.ifSigned ?
                    <div className="d-flex flex-column container-fluid">
                        <nav className="flex-fill flex-grow-0 pt-3"><CreatePost toParentCallback={this.onCreateNewPost}/></nav>
                        <div className="flex-fill container align-content-center pt-3">
                            <div id="post-container">
                                {
                                    this.props.location.state ? this.onPostsGet() : ""
                                }
                                {
                                    this.state.posts.reverse().map(post => {
                                    return <PostListItem key={post._id} post={post} toParentCallback={this.onGetHashedPost}/>
                                })}
                            </div>
                        </div>
                    </div>
                    :
                    <h1 className="container-fluid font-weight-bold text-center mt-3">You need to log in to see and add posts!!</h1>
                }
            </div>
        );
    }

    private onPostsGet(){
        fetch('http://localhost:8000/posts')
            .then(postsResponse => postsResponse.json())
            .then(postsData => {
                this.setState({
                    posts: postsData
                });
            });
    };

    private onGetHashedPost = hash => {
        this.props.location.state = undefined;
        if(hash) {
            let postsData = this.state.posts;
            postsData = postsData.filter(post =>
                        post.content.includes(hash)
                    );
            this.setState({
                posts: postsData
            });
            hash = false;
        }
    };

    private onCreateNewPost = newPost => {
        const tmpPosts = this.state.posts;
        tmpPosts.unshift(newPost);
        this.setState({posts: tmpPosts.reverse()});
    }


}