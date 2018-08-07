import * as React from 'react';
import {browserHistory} from 'react-router';
import Lightbox from 'react-images';
import Gallery from '../Gallery/Gallery';

import './Profiles.scss';
import {RoutingData} from "../../RoutingData";


export default class Profiles extends React.Component<{location}, {isOpen, current, images}>{

    public constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            current: 0,
            images: []
        };
    }

    public componentDidMount() {
        const images = [];
        let i = 0;
        for(const image of this.props.location.state.images) {
            if(!image.ifPrivate || RoutingData.myProfile._id === this.props.location.state._id) {
                images.push({
                    src: "/Images/" + image.image,
                    key: i++,
                    width: 320,
                    height: 212
                })
            }
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
            <div className="container-fluid d-flex flex-column align-items-center mb-5">
                <div className="d-flex flex-row align-items-center justify-content-start w-50 mt-5">
                    {!location.state.avatar.ifPrivate || location.state._id === RoutingData.myProfile._id ?
                        <img src={"/Images/" + location.state.avatar.image} className="mr-1" height={60} width={60} />
                        :
                        ""
                    }
                    <h2>{location.state.name}</h2>
                </div>
                <div className="text-left mt-3 w-50 profile-description">
                    <h4>About me</h4>
                    <p>{location.state.description}</p>
                </div>
                <div className="w-75 mt-3">
                    <Gallery images={images} onImageClick={this.openLightbox} />
                    <Lightbox
                        backdropClosesModal={true}
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

    private openLightbox = (index) => {
        this.setState({
            current: index,
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