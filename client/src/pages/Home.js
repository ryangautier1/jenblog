import React, { lazy, Suspense, useState, useEffect } from 'react';
import AdminModal from '../components/AdminModal';
import TextPost from '../components/TextPost'
import API from '../utils/API';

const Video = lazy(() => import('../components/Video'));

function Home() {

// set up state for storing video data
const [textpostdata, setTextpostData] = useState([]);
const [tpCommentdata, setTpCommentData] = useState([]);
const [userState, setUserState] = useState(false);
// const [jenBlogName, setJenBlogName] = useState();

// gather video data on load
useEffect(() => {
  updatePage();
  API.getUserData().then(res => {
    setUserState(true);
  }).catch(err => {
    console.log("Not logged in");
    setUserState(false);})
},[]);



// this function gets video data from db, sorts by date, formats the dates and updates the state with the result
const updatePage = () => {
  API.getTextPosts().then(posts => {
    API.getTpComments().then(comments => {

    // sort the result by date descending
    posts.data.sort(function (a,b) {
        return new Date(b.date) - new Date(a.date);
      });

    // put the dates in mm-dd-yyyy format
    formatDates(posts.data, "video");
    formatDates(comments.data, "comment");

    // update the state
    setTextpostData(posts.data);
    setTpCommentData(comments.data);
    })
  
  });
}

// this function takes an array of objects each with a date key and formats the dates into mm-dd-yyyy format
// for type === video, the dates are at data[i].date
// for type === comments, the dates are at data[i].comments[j].date
const formatDates = (data, type) => {
  if (type === "video"){
    for (let i = 0; i < data.length; i++) {
      let dateArr = data[i].date.split("-");
      dateArr = [dateArr[1], dateArr[2].substring(0,2), dateArr[0]];
      data[i].date = dateArr.join("-");
    }
  }
  else {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j<data[i].comments.length; j++) {
        let dateArr = data[i].comments[j].date.split("-");
        dateArr = [dateArr[1], dateArr[2].substring(0,2), dateArr[0]];
        data[i].comments[j].date = dateArr.join("-");
      }
    } 
  }
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
  
const updateComments = (video, data, commentRef) => {
  API.updateYtComments(video, data).then(() => {
    updatePage();
    commentRef.current.value = "";
  }).catch(err => {console.log(err)});
}
  

  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos inner-shadow">

    {userState ? 
    <AdminModal updatePage={updatePage} toggleModal={toggleModal}/>
  : <AdminModal updatePage={updatePage} toggleModal={toggleModal}/>
}


      {textpostdata.map(item => {
        // check if video has comments
        let comments = tpCommentdata.filter(comment => comment.video === item._id);
          if (comments) {
            return (
              <TextPost id={item._id} userState={userState} toggleModal={toggleModal} updateComments={updateComments} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} comments={comments[0]} />
            )
          }
        else {
          return (
            <TextPost id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} />
          )
        }
      })}
    </main>
  )
}

export default Home;