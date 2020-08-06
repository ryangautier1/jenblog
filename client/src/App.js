import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
// import Home from './pages/Home';
import Search from './components/Search';
import Youtube from './pages/Youtube';
// import Instagram from './pages/Instagram';
import VideoPage from './pages/VideoPage';
import TextPage from './pages/TextPage';
import Thumbnails from './pages/Thumbnails';
import './App.css';
import Login from './pages/Login';

function App() {
  
  const [searchState, setSearchState] = useState([]);

  // this function takes an array of objects each with a date key and formats the dates into mm-dd-yyyy format
  // for type === post, the dates are at data[i].date
  // for type === single, the dates are in data.date
  // for type === comments, the dates are at data[i].comments[j].date
  const formatDates = (data, type) => {
    if (type === "post") {
      for (let i = 0; i < data.length; i++) {
        let dateArr = data[i].date.split("-");
        dateArr = [dateArr[1], dateArr[2].substring(0, 2), dateArr[0]];
        data[i].date = dateArr.join("-");
      }
    }
    else if (type === "single") {
      let dateArr = data.date.split("-");
      dateArr = [dateArr[1], dateArr[2].substring(0, 2), dateArr[0]];
      data.date = dateArr.join("-");
    }
    else {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].comments.length; j++) {
          let dateArr = data[i].comments[j].date.split("-");
          dateArr = [dateArr[1], dateArr[2].substring(0, 2), dateArr[0]];
          data[i].comments[j].date = dateArr.join("-");
        }
      }
    }
  }

  // this function updates the state with user input and clears the search field
  const handleSearch = (event, value) => {
    event.preventDefault();
    let term = value;
    if (!searchState.includes(term)){
      setSearchState([...searchState, term]);
    }
  }

  // this function updates the state to remove the item clicked
  const removeTerm = (term) => {
    let newTerms = searchState.filter(item => item !== term);
    setSearchState(newTerms);
  }

  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path={["/"]}>
            {/* <Nav /> */}
            {/* <Home /> */}
          </Route>
          <Route exact path={["/blog"]}>
          {/* <Nav /> */}
            <Search handleSearch={handleSearch} removeTerm={removeTerm} searchState={searchState}/>
            <Thumbnails searchState={searchState} />
          </Route>
          <Route path={["/video/:id"]}>
            {/* <Nav /> */}
            <VideoPage formatDates={formatDates} userState={false} />
          </Route>
          <Route path={["/text/:id"]}>
            {/* <Nav /> */}
            <TextPage formatDates={formatDates} userState={false} />
          </Route>
          <Route exact path={["/youtube"]}>
            {/* <Nav /> */}
            <Youtube formatDates={formatDates} />
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
