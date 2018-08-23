import * as React from 'react';
import {Route} from 'react-router';

import Signup from './components/Signup/Signup';
import {PostListRedux} from './components/Posts/PostList/PostList';
import {NavigationApp} from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";
import Profiles from "./components/Profile/Profiles/Profiles";

export default(
        <Route exact={true} path="/" render={history.pushState(this, 'redirection', '/posts')} component={NavigationApp}>
            <Route path="posts" component={PostListRedux} />
            <Route path="signup" component={Signup}/>
            <Route path="profile" component={Profile}/>
            <Route path="profiles/:id" component={Profiles}/>
        </Route>
    );