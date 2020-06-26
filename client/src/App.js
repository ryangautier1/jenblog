import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Youtube from './pages/Youtube';
import Instagram from './pages/Instagram';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Router>
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
        <Footer />
      </Router>
    </div>

  );
}

export default App;
