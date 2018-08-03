import * as firebase from "firebase";

export class RoutingData{
    public static profiles;
    public static posts;
    public static myProfile;

    public static getProfiles(profiles) {
        this.profiles = profiles;
        this.myProfile = profiles.filter(profile => profile._id === firebase.auth().currentUser.uid)[0];
        console.log(firebase.auth());
        console.log(this.myProfile);
    }

    public static getPosts(posts) {
        this.posts = posts;
    }

    public static setMyProfile(profile) {
        this.myProfile = profile;
    }
}