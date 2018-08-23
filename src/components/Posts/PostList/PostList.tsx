import * as React from 'react';
import * as firebase from 'firebase';
import { RouteProps } from 'react-router';
import {connect} from 'react-redux';
import CreatePost from '../CreatePost/CreatePost';
import PostListItem from "../PostListItem/PostListItem";
import {setHashedPosts, setPosts, setProfiles} from "../../../actions";

interface IState {
    postAdded: boolean,
    hashClicked: boolean,
    ifSigned: boolean
}

class PostList extends React.Component<{location, profiles, setProfiles, posts, setPosts, setHashedPosts, hashedPosts}, IState> {
    private unsubscribe;

    public constructor(props) {
        super(props);
        this.state = {postAdded: false, hashClicked: false, ifSigned: false};
    }

    public componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged( function (user) {
            if(user) {
                this.setState({ifSigned: true});
            }
            else {
                this.setState({ifSigned: false, postAdded: false, hashClicked: false});
            }
        }.bind(this));
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    public render() {
        const {
            profiles,
            location,
            posts
        } = this.props;

        return (
            <div className="parent-posts">
                { (this.state.ifSigned && profiles.length) ?
                    (<div className="d-flex flex-column container-fluid">
                        <nav className="flex-fill flex-grow-0 pt-3"><CreatePost toParentCallback={this.onCreateNewPost}/></nav>
                        <div className="flex-fill container align-content-center pt-3">
                            <div id="post-container">
                                {
                                    location.state && this.deleteHashedPosts()
                                }
                                {
                                    posts && posts.map(post =>
                                        <PostListItem key={post._id} post={post} profile={
                                            profiles.find((profile) => profile._id === post._idProfile)
                                        } toParentCallback={this.onGetHashedPost}/>
                                    )
                                }
                            </div>
                        </div>
                    </div>)
                    :
                    <h1 className="container-fluid font-weight-bold text-center mt-3">You need to log in to see and add posts!!</h1>
                }
            </div>
        );
    }

    private deleteHashedPosts = () => {
        this.props.location.state = undefined;
        if(this.state.hashClicked) {
            fetch('http://localhost:8000/posts')
                .then(postsResponse => postsResponse.json())
                .then(postsData => {
                    this.props.setPosts(postsData.reverse());
                    this.setState({hashClicked: false});
                });
        }
    };

    private onGetHashedPost = hash => {
        if(hash) {
            fetch('http://localhost:8000/posts/' + hash)
                .then(postsResponse => postsResponse.json())
                .then(postsData => {
                    this.props.setPosts(postsData.reverse());
                    hash = false;
                    this.setState({hashClicked: true});
                });
        }
    };

    private onCreateNewPost = newPost => {
        const tmpPosts = this.props.posts;
        tmpPosts.unshift(newPost);
        this.props.setPosts(tmpPosts);
        this.setState({postAdded: true});
    }
}

const mapStateToProps = (state) => {
    return {
        profiles: state.profiles,
        posts: state.posts,
        hashedPosts: state.hashedPosts
    }
};

const mapDispatchToProps = { setProfiles, setPosts, setHashedPosts };

export const PostListRedux = connect(mapStateToProps, mapDispatchToProps)(PostList);