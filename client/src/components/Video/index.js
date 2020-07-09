import React, { useRef, useState } from 'react';
import API from '../../utils/API';


function Video(props) {
  const { id, title, date, video, caption, comments, updatePage, updateComments } = props;
  const [jenBlogName, setJenBlogName] = useState(localStorage.getItem("jenBlogName"));
  const nameRef = useRef();
  const commentRef = useRef();

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
    let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
    // console.log(commentRef.current.value, id, jenBlogName, date);

    // if there are no comments yet 
    if (!comments) {
      API.postNewComment(
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

  return (

    <div key={id} className="mb-5 relative text-gray-300">
      {/* change true to check if user is logged in */}
      {true ? <div className="absolute top-0 right-0 w-8 h-8 text-lg text-center text-white font-bold opacity-50 bg-black rounded-full cursor-pointer">X</div> : <div></div>}
      <span className="text-lg sm:text-xl pl-2 sm:pl-0">{title}</span>
      <br />
      <span className="text-gray-100 text-sm pl-2 sm:pl-0">{date}</span>
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
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            type="text"
            placeholder="Add comment..."
            ref={commentRef}/>
            <button className="ml-2 shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            onClick={(event) => {handleCommentSubmit(event, id)}}>
              Submit
            </button>
          </div>
        </div>
         : 
        <div>
          <p className="mb-1">Would you like to add a comment? Start by entering your name:</p>
          <div className="flex flex-row">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 w-full rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
            type="text"
            placeholder="Your name here..." 
            ref={nameRef} />
              <button className="ml-2 shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
               type="submit"
               onClick={(event) => {updateName(event, nameRef.current.value)}}>
                Submit
              </button>
          </div>
          
        </div>
        }
         
        
      </form>
      {comments ?
        <div className="rounded comments-section mx-4 mb-2 mt-5 p-2">
        {comments.comments.map(item => {
          return(
            <div className="text-md text-gray-200 mb-3" key={item._id}>
            <span className="font-bold mr-2">{item.author}</span>
            <span className="text-sm">{item.date}</span>
            <br />
              {item.comment}
            </div>
          )
        })}
      </div> : <div className="mt-2">Be the first to comment ^</div>}
    </div>
  )

};

export default Video;