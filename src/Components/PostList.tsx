import * as React from 'react';
import CreatePost from './CreatePost';
import PostListItem from "./PostListItem";


export default class PostList extends React.Component<{}, {posts: Array<{}>}> {

    public constructor(props) {
        super(props);
        this.state = {posts: []};

        this.render = this.render.bind(this);
        this.onPostsGet = this.onPostsGet.bind(this);
        this.onPostsGet();

    }

    public render() {
        return (
            <div className="d-flex flex-row container-fluid">
                <nav className="flex-fill flex-grow-0"><CreatePost toParentCallback={this.onPostsGet} /></nav>
                <div className="flex-fill container align-content-center border-left">
                    <h2 className="text-center w-100 font-weight-bold">Every thought</h2>
                    <div id="post-container" className="container-fluid">
                        {this.state.posts.map(post => {
                            return <PostListItem key={1} post={post}/>
                        })}
                    </div>
                </div>
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