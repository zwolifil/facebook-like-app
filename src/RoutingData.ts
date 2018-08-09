import * as firebase from "firebase";

export class RoutingData{
    public static profiles;
    public static posts;
    public static hashedPosts;
    public static myProfile;
    public static images;
    public static comments;

    public static getProfiles(profiles) {
        this.profiles = profiles;
        this.myProfile = profiles.filter(profile => profile._id === firebase.auth().currentUser.uid)[0];
    }

    public static setImages(images) {
        this.images = images;
    }

    public static setComments(comments) {
        this.comments = comments;
    }

    public static setHashedPosts(posts) {
        this.hashedPosts = posts;
    }

    public static getPosts(posts) {
        this.posts = posts;
    }

    public static setMyProfile(profile) {
        this.myProfile = profile;
    }
}