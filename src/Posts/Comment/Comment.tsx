import * as React from 'react';
import {Link} from 'react-router';

import "./Comment.scss";
import {RoutingData} from "../../RoutingData";

const Comment = ({comment, profile}) => {

    const myProfile = RoutingData.profiles.find(el => el._id === profile);

    return (
        <div className="comment-parent list-group-item">
            <Link className="link-content" to={{pathname : "/profiles/" + profile, state: {_id: RoutingData.myProfile._id, name: RoutingData.myProfile.name,
                                                                        description: RoutingData.myProfile.description, avatar: RoutingData.myProfile.avatar,
                                                                        images: RoutingData.myProfile.images}}}>
                    <img className="avatar-logo" src={"http://localhost:8000/images/" + myProfile.avatar} height={40}
                             width={40}/>
                    {myProfile.name}
                </Link>
                <div className="comment-content">{comment}</div>

        </div>
    );
};

export default Comment;