import * as React from 'react';
import * as firebase from 'firebase';

export default class CreatePost extends React.Component {

    private postContent: string;
    private myFormRef: HTMLFormElement;

    public render() {
        return (
            <div className="container">
                <h2 className="text-center align-self-center font-weight-bold">New Post</h2>
                <form ref={(el) => this.myFormRef = el} className="align-content-center w-100" onSubmit={this.onCreateClick} >
                    <div className="form-group">
                        <label className="align-self-center">Message</label>
                        <textarea className="form-control" cols={20} rows={10} placeholder="Your thought ..." onChange={event => this.postContent = event.target.value}/>
                    </div>

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }

    private onCreateClick = (event) => {
        event.preventDefault();

        if(!firebase.auth().currentUser) {
            alert("You're not logged! You can't post!");
            return;
        }

        fetch('http://localhost:8000/posts', {
            method: 'post',
            body: JSON.stringify({
                content: this.postContent,
                author: firebase.auth().currentUser.email
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then();

        this.myFormRef.reset();
    }
}
