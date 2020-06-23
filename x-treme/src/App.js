import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/home';
import Collection from './components/collection';
import Example from './components/example';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">/home</Link>
            </li>
            <li>
              <Link to="/collection">/collection</Link>
            </li>
            <li>
              <Link to="/example">/example_do_not_remove</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/collection">
            <Collection />
          </Route>
          <Route path="/example">
            <Example />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}