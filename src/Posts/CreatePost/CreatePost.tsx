import * as React from 'react';
import * as firebase from 'firebase';
import './CreatePost.scss';

export default class CreatePost extends React.Component<{toParentCallback}> {

    private postContent: string;
    private myFormRef: HTMLFormElement;
    private file: File;

    public render() {
        return (
            <div className="container">
                <form ref={(el) => this.myFormRef = el} className="align-content-center w-100 setPost" onSubmit={this.onCreateClick} >
                    <div className="form-group">
                        <textarea className="form-control" cols={19} rows={5} placeholder="Your thought ..." onChange={event => this.postContent = event.target.value}/>
                        <hr className="create-post-hr" />
                    </div>
                    <div className="container-fluid d-flex flex-row justify-content-between btn-wrap">
                        <input type="file" name="file" id="file" className="inputFile" accept="image/*" onChange={this.handleFileUpload} />
                        <label htmlFor="file" className="input-file-icon-wrap">
                            <svg className="input-file-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
                            </svg>
                        </label>

                        <button type="submit" id="submit" className="btn">Submit</button>
                        <label htmlFor="submit" className="submit-btn-text">
                            Create
                        </label>
                    </div>
                </form>
            </div>
        )
    }

    private handleFileUpload = ( event ) => {
        this.file = event.target.files[0];

    }

    private uploadDocumentRequest = file => {
        const data = new FormData();
        data.append('file', file);

        fetch('http://localhost:8000/images', {
            method: 'post',
            body: data
        })
        .catch(error => console.log(error.message));

    }

    private onCreateClick = (event) => {
        event.preventDefault();

        if(this.file) {
            this.uploadDocumentRequest(
                this.file
            );

            this.onSendPost({
                image: "/Images/" + this.file.name,
                content: this.postContent,
                author: firebase.auth().currentUser.displayName
            });

        } else {
            this.onSendPost({
                content: this.postContent,
                author: firebase.auth().currentUser.displayName
            });
        }

        this.myFormRef.reset();
        this.file = undefined;
        this.postContent = undefined;
    }

    private onSendPost(post) {
        fetch('http://localhost:8000/posts', {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((postResponse) => postResponse.json())
            .then(postData => {
                this.props.toParentCallback(postData);
            });
    }
}
