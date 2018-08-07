import * as React from 'react';

import './Gallery.scss';

export default class Gallery extends React.Component<{images, onImageClick}> {

    public render() {
        return(
            <div className="main-container container-fluid">
            {this.props.images.map(image => {
                return <div key={image.key} style={{backgroundImage: 'url(' + image.src + ')'}}
                            className="gallery-image" onClick={() => this.props.onImageClick(image.key)} />
                }
            )}
            </div>
        );
    }

}
