import * as React from 'react';
import ModalImage from 'react-modal-image';
import FindHashtags from 'find-hashtags';
import {Link} from 'react-router';

import "./PostListItem.scss";

const PostListItem = ({post, toParentCallback}) => {


    return (
            <div className="list-group-item m-1 d-flex flex-column align-content-center">
                <div className="text-left font-weight-bold">
                    {post.author}
                </div>
                <div className="card-body text-left pl-0">
                    {post.content}
                </div>
                {post.image !== "" ?
                    <div id="parent">
                        <ModalImage className={"img-responsive"} small={post.image} large={post.image} />
                    </div>
                    :
                    ""
                }
                <div className="d-flex flex-row hash-div">
                    {FindHashtags(post.content).map(hash => {
                        return <a className="page-link" key={hash} onClick={function a(){toParentCallback(hash)}}>{hash}</a>
                    })}
                </div>
            </div>
        );
};

export default PostListItem;