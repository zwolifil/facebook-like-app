import * as React from 'react';
import {browserHistory} from 'react-router';

export default class Profiles extends React.Component<{location}, {}>{

    public render() {
        return(
            <div className="container-fluid d-flex flex-column align-items-center">
                <h2>{this.props.location.state.name}</h2>
                <div>{this.props.location.state.description}</div>
                <img src={"/Images/" + this.props.location.state.avatar} />
            </div>
        );
    }

}