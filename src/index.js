import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Home';
import Contact from './Contact';
import NewBusiness from './NewBusiness';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/new-business">
          <NewBusiness />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
