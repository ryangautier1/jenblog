import React, { useRef, useState, useEffect } from 'react';
import API from '../../utils/API';


function Video(props) {
  const { id, title, date, video, caption, comments, updatePage, updateComments, toggleModal, userState } = props;
  const [jenBlogName, setJenBlogName] = useState(localStorage.getItem("jenBlogName"));
  const [commentState, setCommentState] = useState([]);
  const nameRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    if (comments) {
    // comments.comments.reverse();
    setCommentState(comments.comments.reverse())
  }}, [])

  const removeName = () => {
    // clear local storage
    localStorage.removeItem("jenBlogName");
    // update state
    setJenBlogName(localStorage.getItem("jenBlogName"));
  }

  const updateName = (event, input) => {
    event.preventDefault();
    if (input !== "") {
      // update local storage
      localStorage.setItem("jenBlogName", input);
      // update state
      setJenBlogName(localStorage.getItem("jenBlogName"));
      // clear text field
      nameRef.current.value = "";
    }
  }

  const handleCommentSubmit = (event, id) => {
    event.preventDefault();
    let today = new Date();
    let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    // console.log(commentRef.current.value, id, jenBlogName, date);

    // if there are no comments yet 
    if (!comments) {
      API.postYtNewComment(
        {
          video: id,
          comments: [
            {
              author: jenBlogName,
              date: date,
              comment: commentRef.current.value
            }
          ]
        }
      ).then(() => {
        updatePage();
        commentRef.current.value = "";
      }).catch(err => console.log(err));
    }
    else {
      let data = {
        author: jenBlogName,
        date: date,
        comment: commentRef.current.value
      }
      updateComments(id, data, commentRef);
    }
  }

  const deleteVideo = () => {
    API.deleteVideo(id).then(() => {
      API.deleteComments(comments._id).then(() => {
        updatePage();
        toggleModal(id + "video-modal");
      }).catch((errr) => { console.log(errr) })
    }).catch((err) => { console.log(err) });
  }

  let commentsOpen = true;
  const toggleComments = () => {
    if (commentsOpen) {
      document.getElementById("comments-section-" + id).classList.add("hidden");
      document.getElementById("arrow-" + id).classList.remove("fa-caret-square-up");
      document.getElementById("arrow-" + id).classList.add("fa-caret-square-down");
    }
    else {
      document.getElementById("comments-section-" + id).classList.remove("hidden");
      document.getElementById("arrow-" + id).classList.add("fa-caret-square-up");
      document.getElementById("arrow-" + id).classList.remove("fa-caret-square-down");
    }
    commentsOpen = !commentsOpen;
  }


  const toggleSubmitButton = () => {
    document.getElementById(id + "submit-button").classList.remove("hidden");
  }

  return (

    <div key={id} className="mb-5 relative text-gray-700">
      {/* change true to check if user is logged in */}
      {userState ?
        <div>
          <div className="absolute top-0 right-0 w-8 h-8 text-lg text-center text-white font-bold opacity-50 bg-black rounded-full cursor-pointer"
            onClick={() => toggleModal(id + "video-modal")}
          >X
          </div>

          {/* modal background here */}
          <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id={id + "video-modal-bg"}></div>

          {/* modal here */}
          <div id={id + "video-modal"}
            className="fixed modal right-0 left-0 mx-auto border hidden bg-white z-20 p-5">
            <p className="text-gray-700 mb-4">Are you sure you want to delete "{title}" and its comments?</p>
            <div className="flex flex-row">
              <button
                type="button"
                className="mr-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                onClick={() => { deleteVideo() }}>
                I'm Sure</button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => toggleModal(id + "video-modal")}>
                Nevermind</button>
            </div>

          </div>

        </div> : <div></div>}
      <span className="text-lg sm:text-xl pl-2 sm:pl-0 lato">{title}</span>
      <br />
      <span className="text-gray-700 text-sm pl-2 sm:pl-0 lato">{date}</span>
      <div className="yt-container mt-2">
        <iframe src={video} title={title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
      </div>
      <div className="mt-1 mb-3">
        {caption}
      </div>
      <hr />
      <form className="flex flex-col mt-3">
        {jenBlogName ?
          <div>
            <div className="flex flex-row">
              <div>Hello, {jenBlogName}!</div>
              <div className="ml-5 text-gray-500 cursor-pointer" onClick={removeName}>Not you?</div>
            </div>
            <div className="flex flex-row mt-1">
              <input className="appearance-none bg-transparent w-full py-2 px-4 text-gray-700 border-b leading-tight border-transparent focus:border-gray-600 focus:outline-none"
                type="text"
                onClick={toggleSubmitButton}
                placeholder="Add comment..."
                ref={commentRef} />
              <button className="hidden ml-2 shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                type="submit"
                id={id + "submit-button"}
                onClick={(event) => { handleCommentSubmit(event, id) }}>
                Submit
            </button>
            </div>
          </div>
          :
          <div>
            <p className="mb-1">Would you like to add a comment? Start by entering your name:</p>
            <div className="flex flex-row">
              <input className="appearance-none bg-transparent w-full py-2 px-4 text-gray-700 border-b leading-tight border-transparent focus:border-gray-600 focus:outline-none"
                type="text"
                onClick={toggleSubmitButton}
                placeholder="Your name here..."
                ref={nameRef} />
              <button className="hidden ml-2 shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
                type="submit"
                id={id + "submit-button"}
                onClick={(event) => { updateName(event, nameRef.current.value) }}>
                Submit
              </button>
            </div>

          </div>
        }


      </form>
      {commentState.length > 0 ?
        <div className="comments-section mx-4 mb-2 mt-5 p-2 varta">
          <div className="flex justify-between border-b border-gray-700 mb-2 pr-1 pb-1">{commentState.length} comments <i id={"arrow-" + id} className="fas fa-caret-square-up pt-1 cursor-pointer" onClick={() => { toggleComments() }}></i></div>
          <div id={"comments-section-" + id}>
            {commentState.map(item => {
              return (
                <div className="text-md text-gray-700 mb-3" key={item._id}>
                  <span className="font-bold mr-2">{item.author}</span>
                  <span className="text-sm">{item.date}</span>
                  <br />
                  {item.comment}
                </div>
              )
            })}
          </div>
        </div> : <div className="mt-2">Be the first to comment!</div>}
    </div>
  )

};

export default Video;