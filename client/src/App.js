import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
// import Home from './pages/Home';
import Youtube from './pages/Youtube';
// import Instagram from './pages/Instagram';
import Thumbnails from './pages/Thumbnails';
import './App.css';
import Login from './pages/Login';

function App() {
  
  

  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path={["/"]}>
            <Nav />
            {/* <Home /> */}
          </Route>
          <Route exact path={["/thumbnails"]}>
            <Nav />
            <Thumbnails />
          </Route>
          <Route exact path={["/youtube"]}>
            <Nav />
            <Youtube />
          </Route>
          <Route exact path={["/admin"]}>
            <Login />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
