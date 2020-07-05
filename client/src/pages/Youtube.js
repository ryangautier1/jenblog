import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import commentdata from '../data/comment-data.json';
import LoadingVideo from '../components/LoadingVideo';
import API from '../utils/API';

const Video = lazy(() => import('../components/Video'));

// custom styling is in App.css

function Youtube() {

// set up state for storing video data
const [youtubedata, setYoutubeData] = useState([]);
// gather video data on load
useEffect(() => {
  API.getYtVideos().then(res => {setYoutubeData(res.data)});
},[]);

// set up useRef for form values
const titleRef = useRef();
const videoRef = useRef();
const dateRef = useRef();
const captionRef = useRef();

const handleFormSubmit = (event) => {
  event.preventDefault();
  let formContent = {
    title: titleRef.current.value,
    date: dateRef.current.value,
    video: videoRef.current.value,
    caption: captionRef.current.value
  };
  // Need to add validateForm()
  // add video to db
  API.addVideo(formContent).then(() => {
    // update page, clear and close modal
    API.getYtVideos().then(res => {setYoutubeData(res.data)});
    clearModal();
    toggleModal("youtube-modal")
  }
    
  ).catch(err => console.log(err));
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

const clearModal = () => {
  titleRef.current.value = "";
  dateRef.current.value = "";
  videoRef.current.value = "";
  captionRef.current.value = "";
}

  
  let commentIds = []
  commentdata.map(item => {return commentIds.push(item._id)});
  console.log(commentIds);

  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos">

    {true ? 
    <div>
      <div className="text-center">
        <button
          className="mb-3 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          id="youtube-modal-open"
          onClick={() => toggleModal("youtube-modal")}>
          Add new
        </button>
      </div>
      <hr className="mb-3" />

      {/* modal background here */}
      <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id="youtube-modal-bg"></div>
      
      {/* modal here */}
      <div id="youtube-modal"
      className="fixed modal right-0 left-0 mx-auto border rounded-lg hidden bg-white z-20 p-5">
        <form className="mb-4">
          <label htmlFor="#titleinput">Title</label>
          <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200" 
            type="text"
            id="titleinput"
            ref={titleRef} />
            <label htmlFor="#dateinput">Date Uploaded</label>
          <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200" 
            type="date"
            id="dateinput"
            ref={dateRef} />
          <label htmlFor="#videolink">Link to video</label>
          <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200" 
            type="text"
            id="videolink"
            ref={videoRef} />
            <label htmlFor="#vaptioninput">Caption</label>
          <textarea className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200" 
            id="captioninput"
            ref={captionRef} />
        </form>
        <div className="flex flex-row">
          <button type="submit" className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(event) => handleFormSubmit(event)}>
            Submit</button>
          <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => toggleModal("youtube-modal")}>
            Close</button>
        </div>
        
      </div>

  </div>
  : <div></div>}


      {youtubedata.map(item => {
        if (commentIds.includes(item._id)) {
          let comments = commentdata.filter(comment => comment._id === item._id);
          console.log(comments[0]);
          return (
            <Suspense fallback={<LoadingVideo />} key={item.title}>
              <Video title={item.title} date={item.date} video={item.video} caption={item.caption} comments={comments[0]} />
            </Suspense>
          )
        }
        else {
          return (
            <Suspense fallback={<LoadingVideo />} key={item.title}>
              <Video title={item.title} date={item.date} video={item.video} caption={item.caption} />
            </Suspense>
          )
        }
       

      })}
    </main>
  )
}

export default Youtube;
