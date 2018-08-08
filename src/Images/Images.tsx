import * as React from 'react';

import './Images.scss';


export default class Images extends React.Component<{small, large}, {imageClicked}> {

    private comment: string;

    public constructor(props) {
        super(props);
        this.state = {imageClicked: false};
    }

    public render() {

        const {
            small
        } = this.props;

        return(
            <div className="parent-image">
                <div className="small-image-wrapper" onClick={() => this.setState({imageClicked: true})}>
                    <img src={small} className="small-image" />
                </div>
                {
                    this.state.imageClicked ?
                        this.onImageClick() : ""
                }
            </div>
        );
    }

    private onImageClick = () => {
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
                            <input type="text" className="input-group-text m-2" placeholder="Write comment" onChange={event => {this.comment = event.target.value}} />
                            <button className='submit-btn-text' onClick={() => this.onCommentClick}>Send</button>
                            <div className="comment-section list-group-item" >
                                <p className="if-nothing-element">Be first to comment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private onCommentClick() {

    }


}