import * as React from 'react';
import * as firebase from 'firebase';
import CreatePost from './CreatePost';
import PostListItem from "./PostListItem";

interface IPost {
    title: string,
    content: string,
    author: string,
    _id: string,
    __v: number
}

interface IState {
    posts: IPost[],
    ifSigned: boolean
}

export default class PostList extends React.Component<{}, IState> {

    private hash: string;

    public constructor(props) {
        super(props);
        this.state = {posts: [], ifSigned: false};

        this.render = this.render.bind(this);
        this.onPostsGet(false);
    }

    public componentDidMount() {
        firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState({ifSigned: true});
            }
            else {
                this.setState({ifSigned: false});
            }
        }.bind(this));
    }

    public render() {
        return (
            <div id="parent-posts">
                {this.state.ifSigned ?
                    <div className="d-flex flex-column container-fluid">
                        <nav className="flex-fill flex-grow-0 pt-3"><CreatePost toParentCallback={this.onPostsGet}/></nav>
                        <div className="flex-fill container align-content-center pt-3">
                            <div id="post-container">
                                {this.state.posts.reverse().map(post => {
                                    return <PostListItem key={post._id} post={post} toParentCallback={this.onPostsGet}/>
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

    private onPostsGet = (hash) => {
        if(hash) {
            fetch('http://localhost:8000/posts')
                .then(postsResponse => postsResponse.json())
                .then(postsData => {
                    postsData = postsData.filter(post => {
                       post.content.includes(hash)
                    });
                    this.setState({
                        posts: postsData
                    });
                });
        }
        else {
            fetch('http://localhost:8000/posts')
                .then(postsResponse => postsResponse.json())
                .then(postsData => {
                    this.setState({
                        posts: postsData
                    });
                });
        }
    }


}