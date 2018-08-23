import * as React from 'react';
import {connect} from 'react-redux';
import FindHashtags from 'find-hashtags';
import {Link} from 'react-router';
import Images from '../../Images/Images';

import "./PostListItem.scss";

const PostListItem = ({post, profile, toParentCallback, images}) => {
    return (
            <div className="list-group-item m-1 d-flex flex-column align-content-center">
                <div className="text-left font-weight-bold headline">
                    <Link to={{pathname : "/profiles/" + profile._id, state: {_id: profile._id, name: profile.name, description: profile.description, avatar: profile.avatar, images: profile.images}}}>
                        {images && images.length && (profile.avatar && <img className="avatar-logo" src={"http://localhost:8000/images/" + profile.avatar} height={40}
                                 width={40}/>)}
                        {post.author}
                    </Link>
                </div>
                <div className="card-body text-left pl-0">
                    {post.content}
                </div>
                {images && images.length && post.image &&
                    <div className="parent">
                        <Images small={"http://localhost:8000/images/" + post.image} large={"http://localhost:8000/images/" + post.image}
                                index={post.image} smallImageStyle={"small-image-post"} post={post} />
                    </div>
                }
                <div className="d-flex flex-row hash-div">
                    {FindHashtags(post.content).map(hash => {
                        return <Link className="page-link" key={hash} onClick={function a(){toParentCallback(hash.substring(1))}}>{hash}</Link>
                    })}
                </div>
            </div>
        );
};

const mapStateToProps = (state) => {
    return {
        images: state.images
    }
};

export default connect(mapStateToProps)(PostListItem);