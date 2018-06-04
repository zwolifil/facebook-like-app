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

    public constructor(props) {
        super(props);
        this.state = {posts: [], ifSigned: false};

        this.render = this.render.bind(this);
        this.onPostsGet();
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
            <div>
                {this.state.ifSigned ?
                    <div className="d-flex flex-row container-fluid">
                        <nav className="flex-fill flex-grow-0"><CreatePost toParentCallback={this.onPostsGet}/></nav>
                        <div className="flex-fill container align-content-center border-left">
                            <h2 className="text-center w-100 font-weight-bold">Every thought</h2>
                            <div id="post-container" className="container-fluid">
                                {this.state.posts.reverse().map(post => {
                                    return <PostListItem key={post._id} post={post}/>
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

    private onPostsGet = () => {
        fetch('http://localhost:8000/posts')
            .then(postsResponse => postsResponse.json())
            .then(postsData=> {
                this.setState({
                    posts: postsData
                });
            });
    }


}