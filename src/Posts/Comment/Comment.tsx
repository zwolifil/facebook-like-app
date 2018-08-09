import * as React from 'react';
import {Link} from 'react-router';

import "./Comment.scss";
import {RoutingData} from "../../RoutingData";

const Comment = ({comment, profile}) => {

    return (
        <div className="comment-parent d-flex flex-column align-content-center">
            <div className="text-left font-weight-bold headline">
                <Link to={{pathname : "/profiles/" + profile, state: {_id: RoutingData.myProfile._id, name: RoutingData.myProfile.name,
                                                                        description: RoutingData.myProfile.description, avatar: RoutingData.myProfile.avatar,
                                                                        images: RoutingData.myProfile.images}}}>
                    {!RoutingData.myProfile.avatar.ifPrivate || profile === RoutingData.myProfile._id ?
                        <img className="avatar-logo" src={RoutingData.images.find(image => image.uid === RoutingData.myProfile.avatar.image).url} height={40}
                             width={40}/>
                        :
                        ""
                    }
                    {RoutingData.myProfile.name}
                </Link>
            </div>
            <div className="card-body text-left pl-0">
                {comment}
            </div>
        </div>
    );
};

export default Comment;