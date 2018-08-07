import * as React from 'react';

import './Gallery.scss';

export default class Gallery extends React.Component<{images, onClick}> {

    constructor(props) {
        super(props);
    }

    public render() {
        return(
            <div className="main-container container-fluid">
            {this.props.images.map(image => {
                return <img key={image.key} src={image.src} width={image.width} height={image.height}
                            className="gallery-image" onClick={() => this.props.onClick(image.key)} />
                }
            )}
            </div>
        );
    }

}
