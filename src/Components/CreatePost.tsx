import * as React from 'react';
import * as firebase from 'firebase';

export default class CreatePost extends React.Component<{toParentCallback}> {

    private postContent: string;
    private myFormRef: HTMLFormElement;
    private file: File;

    public render() {
        return (
            <div className="container">
                <h2 className="text-center align-self-center font-weight-bold">New thought</h2>
                <form ref={(el) => this.myFormRef = el} className="align-content-center w-100" onSubmit={this.onCreateClick} >
                    <div className="form-group">
                        <textarea className="form-control" cols={19} rows={5} placeholder="Your thought ..." onChange={event => this.postContent = event.target.value}/>
                    </div>
                    <input type="file" name="imgUploader" accept="image/*" onChange={this.handleFileUpload} />

                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }

    private handleFileUpload = ( event ) => {
        this.file = event.target.files[0];

    }

    private uploadDocumentRequest = ( file) => {
        const data = new FormData();
        data.append('imgUploader', file);

        fetch('http://localhost:8000/images', {
            method: 'post',
            body: data
        })
        .then(() => console.log(file.name))
        .catch(error => console.log(error.message));

    }

    private onCreateClick = (event) => {
        event.preventDefault();

        this.uploadDocumentRequest(
            this.file
        )

        fetch('http://localhost:8000/posts', {
            method: 'post',
            body: JSON.stringify({
                title: "/Images/" + this.file.name,
                content: this.postContent,
                author: firebase.auth().currentUser.displayName
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(() =>{
            this.props.toParentCallback(true);
        });

        this.myFormRef.reset();
    }
}
