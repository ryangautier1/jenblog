import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../src/components/Header';
import Nav from '../src/components/Nav';
import Home from '../src/pages/Home';
import Youtube from '../src/pages/Youtube';
import Instagram from '../src/pages/Instagram';

function App() {
  return (
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route exact path={["/"]}>
            <Home />
          </Route>
          <Route exact path={["/instagram"]}>
            <Instagram />
          </Route>
          <Route exact path={["/youtube"]}>
            <Youtube />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
