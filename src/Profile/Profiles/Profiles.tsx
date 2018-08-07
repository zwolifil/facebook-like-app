import * as React from 'react';
import {browserHistory} from 'react-router';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';

import './Profiles.scss';


export default class Profiles extends React.Component<{location}, {isOpen, current, images}>{

    public constructor(props) {
        super(props);
        // this.props.location.state.images.map( image => this.IMAGES.push({src: "/Images/" + image,
        //     thumbnail: "/Images/" + image,
        //     thumbnailWidth: 320,
        //     thumbnailHeight: 212}));
        // const images = [];
        // for(const image of this.props.location.state.images) {
        //     images.push({src: "/Images/" + image,
        //         thumbnail: "/Images/" + image,
        //         thumbnailWidth: 320,
        //         thumbnailHeight: 212})
        // }
        this.state = {
            isOpen: false,
            current: 0,
            images: []
        };
    }

    public componentDidMount() {
        const images = [];
        for(const image of this.props.location.state.images) {
            images.push({src: "/Images/" + image,
                thumbnail: "/Images/" + image,
                width: 320,
                height: 212})
        }
        this.setState({images});
    }

    public render() {
        const {
            location
        } = this.props;
        const {
            images,
            isOpen,
            current
        } = this.state;
        return(
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center justify-content-start w-50 mt-5">
                    <img src={"/Images/" + location.state.avatar} className="mr-1" height={60} width={60} />
                    <h2>{location.state.name}</h2>
                </div>
                <hr className="profile-hr" />
                <div className="text-left mt-3 w-50 profile-description"><p>{location.state.description}</p></div>
                <div className="w-50 mt-3">
                    <Gallery photos={images} className="d-flex justify-content-center" onClick={this.openLightbox} />
                    <Lightbox
                        images={images}
                        isOpen={isOpen}
                        onClickPrev={this.onPrevClick}
                        onClickNext={this.onNextClick}
                        currentImage={current}
                        onClose={this.onClose}
                    />
                </div>
            </div>
        );
    }

    private openLightbox = (event, obj) => {
        this.setState({
            current: obj.index,
            isOpen: true,
        });
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