import * as React from 'react';
import * as Router from 'react-router';

import Signup from './Components/Signup';
import PostList from './Components/PostList';
import Navigation from "./Components/Navigation";
import Profile from "./Components/Profile";


export default (
    <Router.Route exact={true} path="/" render={history.pushState(this, 'redirection', '/posts')} component={Navigation} >
        <Router.Route path="posts" component={PostList} />
        <Router.Route path="signup" component={Signup} />
        <Router.Route path="profile" component={Profile} />
    </Router.Route>
);