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

const router = (
    <Router>
      <Switch>
        <Route path="/index" component={Index} />
        <Route path="/blog" component={Blog} />
        <Redirect from="/" to="/index"/>
      </Switch>
    </Router>
)

export default router;