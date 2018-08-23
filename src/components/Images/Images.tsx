import * as React from 'react';
import {connect} from 'react-redux';

import './Images.scss';
import Comment from "../Posts/Comment/Comment";
import {setComments} from '../../actions';


class Images extends React.Component<{small, large, post, smallImageStyle, index, comments, myProfile, setComments},
                                                    {imageClicked, commentAdded, commentDeleted, largeImageHeight}> {

    private comment: string;
    private myInputRef: HTMLInputElement;
    private LargeImage: HTMLImageElement;

    public constructor(props) {
        super(props);
        this.state = {imageClicked: false, commentAdded: false, commentDeleted: false, largeImageHeight: 0};
    }

    public render() {

        const {
            small
        } = this.props;

        return(
            <div className="parent-image">
                <div className="small-image-wrapper" onClick={() => this.setState({imageClicked: true})}>
                    <img src={small} className={this.props.smallImageStyle} />
                </div>
                {
                    this.state.imageClicked && this.onImageClick()
                }
            </div>
        );
    }

    private onImageClick = () => {
        const filteredComments = this.props.comments.filter(comment => comment.idImage === this.props.index);

        return (
            <div className="fullscreen-image-wrapper" >
                <div className="fullscreen-opacity"  onClick={() => this.setState({imageClicked: false})} />
                <div className="content-wrapper">
                    <div className="content-wrapper-child">
                        <img src={this.props.large} onLoad={() => this.setState({largeImageHeight: this.LargeImage.naturalHeight})}
                             ref={(el) => this.LargeImage = el} className="fullscreen-image" onClick={() => this.setState({imageClicked: true})} />
                        {this.state.largeImageHeight &&
                            <div className="comment-section-parent" style={{height: this.state.largeImageHeight}}>
                                <button type="button" className="close" aria-label="Close"
                                        onClick={() => this.setState({imageClicked: false})}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <input ref={(el) => this.myInputRef = el} type="text" className="input-group-text m-2"
                                       placeholder="Write comment"
                                       onChange={event => {
                                           this.comment = event.target.value
                                       }} onKeyUp={this.onCommentClick}/>
                                <div className="comment-section">
                                    {
                                        !filteredComments.length ?
                                            <p className="if-nothing-element">Be first to comment</p>
                                            :
                                            filteredComments.reverse().map(comment => {
                                                return <Comment key={comment._id} id={comment._id}
                                                                comment={comment.content} profile={comment.profile}
                                                                imageProfile={this.props.post._idProfile ? this.props.post._idProfile : this.props.post}
                                                                toParentCallback={() => this.setState({commentDeleted: true})}/>
                                            })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    };

    private onCommentClick = (event) => {
        if (event.keyCode === 13) {
            fetch('http://localhost:8000/images/' + this.props.index + '/comments', {
                method: 'post',
                body: JSON.stringify({
                    content: this.comment,
                    profile: this.props.myProfile._id,
                    idImage: this.props.index
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((postResponse) => postResponse.json())
                .then(postData => {
                    const tmpComments = this.props.comments;
                    tmpComments.push(postData);
                    this.props.setComments(tmpComments);
                    this.setState({commentAdded: true});
                });

            this.myInputRef.value = "";
            this.comment = "";
        }
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        myProfile: state.myProfile
    }
};

const mapDispatchToProps = {setComments};

export default connect(mapStateToProps, mapDispatchToProps)(Images);