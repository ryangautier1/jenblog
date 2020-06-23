import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../src/components/Header';
import Nav from '../src/components/Nav';
import Youtube from '../src/pages/Youtube';

function App() {
  return (
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route exact path={["/", "/youtube"]}>
            <Youtube />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
