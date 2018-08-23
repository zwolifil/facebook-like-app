import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Gallery from '../Gallery/Gallery';
import './Profiles.scss';


class Profiles extends React.Component<{location, myProfile}, {isOpen, current, images}>{

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
        for(const image of this.props.location.state.images) {
            if(!image.ifPrivate || this.props.myProfile._id === this.props.location.state._id) {
                images.push({
                    src: "http://localhost:8000/images/" + image.image,
                    key: image.image,
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
            images
        } = this.state;
        return(
            <div className="container-fluid d-flex flex-column align-items-center mb-5">
                <div className="d-flex flex-row align-items-center justify-content-start w-50 mt-5">
                    <img src={"http://localhost:8000/images/" + location.state.avatar} className="mr-1" height={60} width={60} />
                    <h2>{location.state.name}</h2>
                </div>
                <div className="text-left mt-3 w-50 profile-description">
                    <h4>About me</h4>
                    <p>{location.state.description}</p>
                </div>
                <div className="w-75 mt-3">
                    <Gallery images={images} imageProfile={location.state._id} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        myProfile: state.myProfile
    }
};

export default connect(mapStateToProps)(Profiles);