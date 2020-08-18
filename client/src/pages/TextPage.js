import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import RelatedPosts from '../components/RelatedPosts';
import API from '../utils/API';


function TextPage(props) {
  let { id } = useParams();
  const [textState, setTextState] = useState(false);
  const { formatDates, userState, toggleModal } = props;
  const [jenBlogName, setJenBlogName] = useState(localStorage.getItem("jenBlogName"));
  const [commentState, setCommentState] = useState(false);
  const nameRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    API.getTextPostById(id).then(res => {
      formatDates(res.data, "single");
      setTextState(res.data);
      API.getTpCommentsByTp(id).then(comments => {

        formatDates(comments.data, "comments");

        if (comments.data) {
          setCommentState(comments.data[0].comments);
        }
      }).catch(() => {
        console.log("no comments");
      });
    }).catch(err => console.log(err))
  }, [id])

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

    // if there are no comments yet 
    if (!commentState) {
      API.postNewTpComment(
        {
          textpost: id,
          comments: [
            {
              author: jenBlogName,
              date: date,
              comment: commentRef.current.value
            }
          ]
        }
      ).then(() => {
        API.getTpCommentsByTp(id).then(comments => {
          formatDates(comments.data, "comments");
          setCommentState(comments.data[0].comments);
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
      API.updateTpComments(id, data).then(() => {
        API.getTpCommentsByTp(id).then(comments => {
          formatDates(comments.data, "comments");
          setCommentState(comments.data[0].comments);
          commentRef.current.value = "";
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    }
  }

  const deleteTextPost = () => {
    if (commentState) {
      API.deleteTextPost(id).then(() => {
        API.deleteTpComments(id).then(() => {
          toggleModal(id + "delete-modal");
          window.location.replace("/blog");
        }).catch((errr) => { console.log(errr) })
      }).catch((err) => { console.log(err) });
    }
    else {
      API.deleteTextPost(id).then(() => {
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
    <div>
      <Link to="/blog">
        <p className="mt-8 ml-4 sm:ml-8 text-gray-600 hover:text-gray-800 inline-block">
          <i className="fas fa-angle-double-left"></i>   Home
        </p>
      </Link>
      <main className="mt-4 mx-1 pb-2 sm:mx-16 xl:flex xl:flex-row xl:justify-around">
        <div className="flex-shrink-0 videos">

          <div key={id} className="mb-5 relative text-gray-700">
            {/* change true to check if user is logged in */}
            {userState ?
              <DeleteModal id={id} title={textState.title} toggleModal={toggleModal} deleteTextPost={deleteTextPost} type={"textpost"} />
              : <div></div>}
            {/* if the textpost has a title, print the title */}
            {textState.title ? <span className="text-lg sm:text-xl pl-2 sm:pl-0 lato">{textState.title}</span> : null}
            <br />
            <span className="text-gray-700 text-sm pl-2 sm:pl-0 lato">{textState.date}</span>
            <div className="tp-container mt-2">
              {textState.body}
            </div>
            <div className="mt-1 mb-3">
              {textState.caption}
            </div>

            {textState.tags ?
              <div className="flex flex-wrap flex-row mb-2">
                {textState.tags.map(item => {
                  return (
                    <div className="text-md text-gray-500" key={item}>
                      {textState.tags.indexOf(item) !== textState.tags.length - 1 ?
                        <span className="mr-1">#{item}</span>
                        :
                        <span>#{item}</span>}
                    </div>
                  )
                })}
              </div>
              : null
            }

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
                
                {commentState.length > 1 ?
                <div className="flex justify-between border-b border-gray-700 mb-2 pr-1 pb-1">
                  {commentState.length} Comments 
                  <i id={"arrow-" + id} 
                  className="fas fa-caret-square-up pt-1 cursor-pointer"
                  onClick={() => { toggleComments() }}></i>
                </div>
                :
                <div className="flex justify-between border-b border-gray-700 mb-2 pr-1 pb-1">
                  {commentState.length} Comment 
                  <i id={"arrow-" + id} 
                  className="fas fa-caret-square-up pt-1 cursor-pointer"
                  onClick={() => { toggleComments() }}></i>
                </div>}
                
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
        </div>

        <RelatedPosts tags={textState.tags} formatDates={formatDates} id={id}/>

      </main>
    </div>

  )

};

export default TextPage;