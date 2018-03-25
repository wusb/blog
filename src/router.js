import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import Index from "./page/index/index";
import Blog from "./page/blog/index";
import Article from './page/blog/article';
import Search from "./page/blog/search";

const router = (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:type" component={Blog} />
        <Route exact path="/article/:type/:articleId" component={Article} />
        <Route exact path="/search" component={Search} />
        <Redirect from="/" to="/"/>
      </Switch>
    </Router>
)

export default router;