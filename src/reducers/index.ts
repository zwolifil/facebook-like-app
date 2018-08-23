import {combineReducers} from "redux";
import {myProfile, profiles} from "./profiles";
import {hashedPosts, posts} from "./posts";
import {comments} from "./comments";
import {images} from "./images";


export default combineReducers({
    profiles,
    posts,
    hashedPosts,
    comments,
    images,
    myProfile
});