import * as firebase from 'firebase';

export default class Authorization {

    public static IS_LOGED = false;

    public static getToken() {
        firebase.auth().currentUser.getIdToken(true)
            .then(idToken => {
                fetch('http://localhost:8000/token', {
                    method: 'post',
                    body: JSON.stringify({
                        token: idToken
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    fetch('http://localhost:8000/token')
                        .then(tokenResponse => {
                            if (tokenResponse.status === 200) {
                                this.IS_LOGED = true;
                            }
                        })
                })


            });
    }
}