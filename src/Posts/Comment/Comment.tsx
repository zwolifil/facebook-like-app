import * as React from 'react';
import {Link} from 'react-router';

import "./Comment.scss";
import {RoutingData} from "../../RoutingData";

class Comment extends React.Component<{id, comment, profile, imageProfile, toParentCallback}> {


    public render() {
        const {
            comment, profile, imageProfile
        } = this.props;

        const myProfile = RoutingData.profiles.find(el => el._id === profile);

        return (
            <div className="comment-parent list-group-item">
                <div className="headline">
                    <Link className="link-content" to={{
                        pathname: "/profiles/" + profile, state: {
                            _id: RoutingData.myProfile._id, name: RoutingData.myProfile.name,
                            description: RoutingData.myProfile.description, avatar: RoutingData.myProfile.avatar,
                            images: RoutingData.myProfile.images
                        }
                    }}>
                        <img className="avatar-logo" src={"http://localhost:8000/images/" + myProfile.avatar}
                             height={40}
                             width={40}/>
                        {myProfile.name}
                    </Link>
                    {RoutingData.myProfile._id === imageProfile ?
                        <button type="button" className="comment-delete" aria-label="Close" onClick={this.deleteComment}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        :
                        ""
                    }
                </div>
                <div className="comment-content">{comment}</div>

            </div>
        );
    }
    private deleteComment = () => {
        fetch('http://localhost:8000/comments/' + this.props.id, {
            method: 'delete',
            body: "",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(postMessage => {
                RoutingData.setComments(RoutingData.comments.filter(comment => comment._id !== this.props.id));
                this.props.toParentCallback();
            })
            .catch(err => console.log(err))
    }
}

export default Comment;