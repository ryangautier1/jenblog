import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import API from '../utils/API';


function VideoPage(props) {
  let { id } = useParams();
  const [videoState, setVideoState] = useState(false);
  const { formatDates, userState } = props;
  const [jenBlogName, setJenBlogName] = useState(localStorage.getItem("jenBlogName"));
  const [commentState, setCommentState] = useState(false);
  const nameRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    API.getVideoById(id).then(res => {
      formatDates(res.data, "single");
      setVideoState(res.data);
      API.getYtCommentsByVideo(id).then(comments => {

        formatDates(comments.data, "comments");

        if (comments.data) {
          setCommentState(comments.data[0]);
        }
      }).catch(() => {
        console.log("no comments")
        
      });
    }).catch(err => console.log(err))
  }, [])

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
    if (!commentState) {
      API.postNewYtComment(
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
        API.getYtCommentsByVideo(id).then(comments => {
          formatDates(comments.data, "comments");
          setCommentState(comments.data[0]);
          commentRef.current.value = "";
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
    else {
      let data = {
        author: jenBlogName,
        date: date,
        comment: commentRef.current.value
      }
      API.updateYtComments(id, data).then(() => {
        API.getYtCommentsByVideo(id).then(comments => {
          formatDates(comments.data, "comments");
          setCommentState(comments.data[0]);

          commentRef.current.value = "";
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  }

  const deleteVideo = () => {
    if (commentState) {
      API.deleteVideo(id).then(() => {
        API.deleteComments(commentState._id).then(() => {
          toggleModal(id + "delete-modal");
          window.location.replace("/blog");
        }).catch((errr) => { console.log(errr) })
      }).catch((err) => { console.log(err) });
    }
    else {
      API.deleteVideo(id).then(() => {
        toggleModal(id + "delete-modal");
        window.location.replace("/blog");
      }).catch((err) => { console.log(err) });
    }
  }

  let commentsOpen = false;
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
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos inner-shadow">


      <div key={id} className="mb-5 relative text-gray-700">
        {/* change true to check if user is logged in */}
        {true ?
          <DeleteModal id={id} title={videoState.title} toggleModal={toggleModal} deleteVideo={deleteVideo} type={"video"} />
          : <div></div>}
        <span className="text-lg sm:text-xl pl-2 sm:pl-0 lato">{videoState.title}</span>
        <br />
        <span className="text-gray-700 text-sm pl-2 sm:pl-0 lato">{videoState.date}</span>
        <div className="yt-container mt-2">
          <iframe src={videoState.video} title={videoState.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
        </div>
        <div className="mt-1 mb-3">
          {videoState.caption}
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
        {commentState ?
          <div className="comments-section mx-4 mb-2 mt-5 p-2 varta">
            <div className="flex justify-between border-b border-gray-700 mb-2 pr-1 pb-1">
              {commentState.comments.length} comments
                <i id={"arrow-" + id} className="fas fa-caret-square-down pt-1 cursor-pointer"
                onClick={() => { toggleComments() }}>
              </i>
            </div>
            <div id={"comments-section-" + id} className="hidden">
              {commentState.comments.map(item => {
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
    </main>

  )

};

export default VideoPage;