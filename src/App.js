import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NoPackage from "./NoPackage";
import ReactSimpleChatbot from "./ReactSimpleChatbot";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/reactSimpleChatbot">ReactSimpleChatbot</Link>
            </li>
            <li>
              <Link to="/noPackage">NoPackage</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/noPackage">
            <NoPackage />
          </Route>
          <Route path="/reactSimpleChatbot">
            <ReactSimpleChatbot />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App