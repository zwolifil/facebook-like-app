import * as React from 'react';

import './Images.scss';
import Comment from "../Posts/Comment/Comment";
import {RoutingData} from "../RoutingData";


export default class Images extends React.Component<{small, large, post, smallImageStyle, index}, {imageClicked, commentAdded}> {

    private comment: string;
    private myInputRef: HTMLInputElement;

    public constructor(props) {
        super(props);
        this.state = {imageClicked: false, commentAdded: false};
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
                    this.state.imageClicked ?
                        this.onImageClick() : ""
                }
            </div>
        );
    }

    private onImageClick = () => {
        const filteredComments = RoutingData.comments.filter(comment => comment.idImage === this.props.index);

        return (
            <div className="fullscreen-image-wrapper" >
                <div className="fullscreen-opacity"  onClick={() => this.setState({imageClicked: false})} />
                <div className="content-wrapper">
                    <div className="content-wrapper-child">
                        <img src={this.props.large} className="fullscreen-image" onClick={() => this.setState({imageClicked: true})} />
                        <div className="comment-section-parent">
                            <button type="button" className="close" aria-label="Close" onClick={() => this.setState({imageClicked: false})}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <input ref={(el) => this.myInputRef = el} type="text" className="input-group-text m-2" placeholder="Write comment" onChange={event => {this.comment = event.target.value}} />
                            <button className='btn btn-primary' onClick={this.onCommentClick}>Send</button>
                            <div className="comment-section" >
                                {
                                    !filteredComments.length ?
                                        <p className="if-nothing-element">Be first to comment</p>
                                            :
                                        filteredComments.reverse().map(comment => {
                                            return <Comment key={comment._id} comment={comment.content} profile={comment.profile} />
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private onCommentClick = () => {
        fetch('http://localhost:8000/images/' +this.props.index + '/comments', {
            method: 'post',
            body: JSON.stringify({content: this.comment, profile: RoutingData.myProfile._id, idImage: this.props.index}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((postResponse) => postResponse.json())
                .then(postData => {
                    RoutingData.comments.push(postData);
                    this.setState({commentAdded: true});
                });

        this.myInputRef.value = "";
        this.comment = "";
    }

}