import * as React from 'react';
import {Route} from 'react-router';

import Signup from './Signup/Signup';
import PostList from './Posts/PostList/PostList';
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";


export default (
    <Route exact={true} path="/" render={history.pushState(this, 'redirection', '/posts')} component={Navigation} >
        <Route path="posts" component={PostList} />
        <Route path="signup" component={Signup} />
        <Route path="profile" component={Profile} />
    </Route>
);