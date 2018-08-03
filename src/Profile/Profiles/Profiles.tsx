import * as React from 'react';
import {browserHistory} from 'react-router';
import Lightbox from 'react-images';
import Gallery from 'react-grid-gallery';

import './Profiles.scss';


export default class Profiles extends React.Component<{location}, {isOpen, current}>{

    private IMAGES = [];

    public constructor(props) {
        super(props);
        this.state = {isOpen: false, current: 0};

    }

    public render() {

        this.props.location.state.images.map( image => this.IMAGES.push({src: "/Images/" + image,
            thumbnail: "/Images/" + image,
            thumbnailWidth: 320,
            thumbnailHeight: 212}));


        return(
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center justify-content-start w-50 mt-5">
                    <img src={"/Images/" + this.props.location.state.avatar} className="mr-1" height={60} width={60} />
                    <h2>{this.props.location.state.name}</h2>
                </div>
                <hr className="profile-hr" />
                <div className="text-left mt-3 w-50">{this.props.location.state.description}</div>
                <div className="w-50 mt-3">
                    <Gallery images={this.IMAGES} className="d-flex justify-content-center" />
                    <Lightbox
                        images={[{src: "/Images/" + this.props.location.state.avatar}, {src: "/Images/" + this.props.location.state.avatar},{src: "/Images/" + this.props.location.state.avatar}]}
                        isOpen={this.state.isOpen}
                        currentImage={this.state.current}
                        onClickPrev={this.onPrevClick}
                        onClickNext={this.onNextClick}
                        onClickImage={() => this.setState({isOpen: true})}
                        onClose={this.onClose}
                    />
                </div>
            </div>
        );
    }

    private onClose = () => {
        this.setState({isOpen: false});
    }

    private onNextClick = () => {
        this.setState({current: this.state.current+1})
    }

    private onPrevClick = () => {
        this.setState({current: this.state.current-1})
    }

}