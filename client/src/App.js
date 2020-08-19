import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import VideoPage from './pages/VideoPage';
import TextPage from './pages/TextPage';
import Thumbnails from './pages/Thumbnails';
import API from './utils/API';
import './App.css';
import Login from './pages/Login';

function App() {

  const [searchState, setSearchState] = useState([]);
  const [userState, setUserState] = useState(false);


  useEffect(() => {
    API.getUserData().then(res => {
      setUserState(true);
    }).catch(err => {
      console.log("Not logged in");
      setUserState(false);
    })
  }, []);

  const handleLogout = () => {
    API.logoutUser().then(() => {
      setUserState(false);
      window.location.reload();
    }).catch(err => console.log(err));
  }

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
    setSearchState([value]);
    
    // below would allow a user to search with more than one term
    // let term = value;
    // if (!searchState.includes(term)) {
    //   setSearchState([...searchState, term]);
    // }
  }

  // this function updates the state to remove the item clicked
  const removeTerm = (term) => {
    let newTerms = searchState.filter(item => item !== term);
    setSearchState(newTerms);
  }

  let modalOpen = true;
  const toggleModal = (target) => {
    modalOpen = !modalOpen;
    if (modalOpen) {
      document.getElementById(target).classList.add("hidden");
      document.getElementById(target + "-bg").classList.add("hidden");
    } else {
      document.getElementById(target).classList.remove("hidden");
      document.getElementById(target + "-bg").classList.remove("hidden");
    }
  }

  return (
    <div>
      <Router>
        <Header toggleModal={toggleModal} userState={userState} handleLogout={handleLogout} />
        <Switch>
          <Route exact path={["/", "/blog"]}>
            <Search handleSearch={handleSearch} removeTerm={removeTerm} searchState={searchState} />
            <Thumbnails searchState={searchState} toggleModal={toggleModal} />
          </Route>
          <Route path={["/video/:id"]}>
            <VideoPage formatDates={formatDates} userState={userState} toggleModal={toggleModal} />
          </Route>
          <Route path={["/text/:id"]}>
            <TextPage formatDates={formatDates} userState={userState} toggleModal={toggleModal} />
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
