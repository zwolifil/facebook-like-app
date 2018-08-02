import * as React from 'react';
import ModalImage from 'react-modal-image';
import FindHashtags from 'find-hashtags';
import {Link} from 'react-router';

import "./PostListItem.scss";

const PostListItem = ({post, profile, toParentCallback}) => {

    return (
            <div className="list-group-item m-1 d-flex flex-column align-content-center">
                <div className="text-left font-weight-bold headline">
                    <Link to={{pathname : "/profiles/" + profile.name, state: {name: profile.name, description: profile.description, avatar: profile.avatar}}}>
                        <img className="avatar-logo" src={"/Images/" + profile.avatar} height={40} width={40} />
                    </Link>
                    {post.author}
                </div>
                <div className="card-body text-left pl-0">
                    {post.content}
                </div>
                {post.image !== "" ?
                    <div className="parent">
                        <ModalImage className={"img-responsive"} small={post.image} large={post.image} />
                    </div>
                    :
                    ""
                }
                <div className="d-flex flex-row hash-div">
                    {FindHashtags(post.content).map(hash => {
                        return <Link className="page-link" key={hash} onClick={function a(){toParentCallback(hash)}}>{hash}</Link>
                    })}
                </div>
            </div>
        );
};

export default PostListItem;