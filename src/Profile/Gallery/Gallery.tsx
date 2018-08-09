import * as React from 'react';

import './Gallery.scss';
import Images from "../../Images/Images";

export default class Gallery extends React.Component<{images, onImageClick}> {

    public render() {
        return(
            <div className="main-container container-fluid">
            {this.props.images.map(image => {
                return <div key={image.key} className="gallery-image">
                            <Images  large={image.src} small={image.src} index={image.key} smallImageStyle={"small-image-gallery"} post={undefined}/>
                       </div>
                }
            )}
            </div>
        );
    }

}
