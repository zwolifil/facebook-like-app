import * as React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import "./Comment.scss";
import {setComments} from "../../../actions";

class Comment extends React.Component<{id, comment, profile, imageProfile, toParentCallback, profiles, myProfile, setComments, comments}> {


    public render() {
        const {
            comment, profile, imageProfile, profiles
        } = this.props;

        const myProfile = profiles.find(el => el._id === profile);

        return (
            <div className="comment-parent list-group-item">
                <div className="headline">
                    <Link className="link-content" to={{
                        pathname: "/profiles/" + profile, state: {
                            _id: this.props.myProfile._id, name: this.props.myProfile.name,
                            description: this.props.myProfile.description, avatar: this.props.myProfile.avatar,
                            images: this.props.myProfile.images
                        }
                    }}>
                        <img className="avatar-logo" src={"http://localhost:8000/images/" + myProfile.avatar}
                             height={40}
                             width={40}/>
                        {myProfile.name}
                    </Link>
                    {this.props.myProfile._id === imageProfile &&
                        <button type="button" className="comment-delete" aria-label="Close" onClick={this.deleteComment}>
                            <span aria-hidden="true">&times;</span>
                        </button>
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
                this.props.setComments(this.props.comments.filter(comment => comment._id !== this.props.id));
                this.props.toParentCallback();
            })
            .catch(err => console.log(err))
    }
}

const mapStateToProps = (state) => {
    return {
        profiles: state.profiles,
        comments: state.comments,
        myProfile: state.myProfile
    }
};

const mapDispatchToProps = { setComments };

export default connect(mapStateToProps, mapDispatchToProps)(Comment);