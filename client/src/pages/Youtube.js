import React, { lazy, Suspense, useState, useEffect } from 'react';
import LoadingVideo from '../components/LoadingVideo';
import AdminModal from '../components/AdminModal';
import API from '../utils/API';

const Video = lazy(() => import('../components/Video'));

// custom styling is in App.css

function Youtube() {

// set up state for storing video data
const [youtubedata, setYoutubeData] = useState([]);
const [commentdata, setCommentData] = useState([]);
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
  API.getYtVideos().then(vids => {
    API.getYtComments().then(comments => {

    // sort the result by date descending
    vids.data.sort(function (a,b) {
        return new Date(b.date) - new Date(a.date);
      });

    // put the dates in mm-dd-yyyy format
    formatDates(vids.data, "video");
    formatDates(comments.data, "comment");

    // update the state
    setYoutubeData(vids.data);
    setCommentData(comments.data);
    })
  
  });
}

// this function takes an array of objects each with a date key and formats the dates into mm-dd-yyyy format
// for type === video, the dates are at data[i].date
// for type === comments, the dates are at data[i].comments[j].date
const formatDates = (data, type) => {
  if (type === "video"){
    for (let i=0; i<data.length; i++) {
      let dateArr = data[i].date.split("-");
      dateArr = [dateArr[1], dateArr[2].substring(0,2), dateArr[0]];
      data[i].date = dateArr.join("-");
    }
  }
  else {
    for (let i=0; i<data.length; i++) {
      for (let j=0; j<data[i].comments.length; j++) {
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
  : null}


      {youtubedata.map(item => {
        // check if video has comments
        let comments = commentdata.filter(comment => comment.video === item._id);
          if (comments) {
            return (
              <Suspense fallback={<LoadingVideo />} key={item._id}>
                <Video id={item._id} userState={userState} toggleModal={toggleModal} updateComments={updateComments} updatePage={updatePage} title={item.title} date={item.date} video={item.video} caption={item.caption} comments={comments[0]} />
              </Suspense>
            )
          }
        else {
          return (
            <Suspense fallback={<LoadingVideo />} key={item._id}>
              <Video id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} video={item.video} caption={item.caption} />
            </Suspense>
          )
        }
       

      })}
    </main>
  )
}

export default Youtube;
