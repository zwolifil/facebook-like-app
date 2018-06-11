import * as React from 'react';

const PostListItem = ({post}) => {


    return (
            <div className="list-group-item m-1">
                <div className="text-left font-weight-bold">
                    {post.author}
                </div>
                {post.title !== "" ?
                    <img src={post.title}/>
                    :
                    ""
                }
                <div className="card-body text-left pl-0">
                    {post.content}
                </div>
            </div>
        );
};

export default PostListItem;