import * as React from 'react';

const PostListItem = ({post}) => {

    return (
            <div className="list-group-item">
                <div className="card-header text-center font-weight-bold">
                    {post.author}
                </div>
                <div className="card-body text-justify">
                    {post.content}
                </div>
            </div>
        );
};

export default PostListItem;