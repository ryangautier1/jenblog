import React, { useRef, useState, useEffect } from 'react';
import API from '../../utils/API';


function AdminModal(props) {
  const [modalState, setModalState] = useState("youtube");
  const [tagsState, setTagsState] = useState([]);

  // set up useRef for form values
  const titleRef = useRef();
  const videoRef = useRef();
  const dateRef = useRef();
  const captionRef = useRef();
  const textpostRef = useRef();
  const tagsRef = useRef();

  useEffect(() => {
    // as tags are added, check width of tag area and adjust styling when it passes 300 px
    if (document.getElementById("tagsrow").clientWidth > 300) {
      document.getElementById("tagsrow").classList.remove("sm:ml-6");
      document.getElementById("tagsrow").classList.remove("sm:mt-0");
      document.getElementById("tagsrow").classList.add("w-full");
      document.getElementById("tagsrow").classList.add("mt-2");
    }
  }, [tagsState]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // for youtube video input
    if (modalState === "youtube") {
      // validate input fields
      // if title is blank, display warning
      if (titleRef.current.value === "") {
        document.getElementById("titleinput").classList.remove("border-gray-200");
        document.getElementById("titleinput").classList.add("border-red-400");
        document.getElementById("titlewarning").classList.remove("hidden");
        return;
      }
      // if date is blank, display warning
      if (dateRef.current.value === "") {
        document.getElementById("dateinput").classList.remove("border-gray-200");
        document.getElementById("dateinput").classList.add("border-red-400");
        document.getElementById("datewarning").classList.remove("hidden");
        return;
      }
      // if embed code is blank, display warning
      if (videoRef.current.value === "") {
        document.getElementById("videoinput").classList.remove("border-gray-200");
        document.getElementById("videoinput").classList.add("border-red-400");
        document.getElementById("videowarning").classList.remove("hidden");
        return;
      }

      // create form content object with user input
      let formContent = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        video: videoRef.current.value.split("src=\"")[1].split("\"")[0],
      };
      // grab caption input if there is a caption
      if (captionRef.current.value !== "") {
        formContent.caption = captionRef.current.value
      }
      // grab tag input
      // if the user typed a tag but didn't click the plus
      let tags = [];
      if (tagsRef.current.value !== "" && !tagsState.includes(tagsRef.current.value)) {
        tags = [tagsRef.current.value];
      }
      tags.push(...tagsState);
      // if there are tags at all, add them to the formContent object
      if (tags !== []) {
        formContent.tags = tags;
      }

      // add video to db
      API.addVideo(formContent).then(() => {
        // clear and close modal, load home page
        clearModal();
        props.toggleModal("admin-modal");
        window.location.replace('/');
      }

      ).catch(err => console.log(err));
    }

    // for text post input
    else if (modalState === "text") {
      let formContent;
      // validate input fields
      // if body is empty, display warning
      if (textpostRef.current.value === "") {
        document.getElementById("textpostinput").classList.remove("border-gray-200");
        document.getElementById("textpostinput").classList.add("border-red-400");
        document.getElementById("textpostwarning").classList.remove("hidden");
        return;
      }
      else {
        document.getElementById("textpostinput").classList.add("border-gray-200");
        document.getElementById("textpostinput").classList.remove("border-red-400");
        document.getElementById("textpostwarning").classList.add("hidden");
      }

      // create formContent object
      // if the user entered a title
      if (titleRef.current.value !== "") {
        formContent = {
          title: titleRef.current.value,
          date: Date.now(),
          body: textpostRef.current.value
        }
      }
      // if the user did not enter a title
      else {
        formContent = {
          date: Date.now(),
          body: textpostRef.current.value
        }
      }

      // grab tag input
      // if the user typed a tag but didn't click the plus
      let tags = [];
      if (tagsRef.current.value !== "" && !tagsState.includes(tagsRef.current.value)) {
        tags = [tagsRef.current.value];
      }
      tags.push(...tagsState);
      // if the user entered tags at all, add them to formContent
      if (tags !== []) {
        formContent.tags = tags;
      }

      API.addTextPost(formContent).then(() => {
        // clear and close modal, load home page
        clearModal();
        props.toggleModal("admin-modal");
        window.location.replace('/');
      }).catch(err => console.log(err));

    }

  }

  // this function updates the modal state to reflect whether the user clicked
  // the youtube icon or text post icon. it takes a string 'youtube' or 'text'
  // as input
  const toggleInput = (value) => {
    setModalState(value);
  }


  // this function clears the contents of the form in the modal
  const clearModal = () => {
    titleRef.current.value = "";
    if (modalState === "youtube") {
      dateRef.current.value = "";
      videoRef.current.value = "";
      captionRef.current.value = "";
    }
    if (modalState === "text") {
      textpostRef.current.value = "";
    }
    tagsRef.current.value = "";
    setTagsState([]);
  }

  // this function updates the tag state to remove a tag
  const removeTag = (tag) => {
    let newTags = tagsState.filter(item => item !== tag);
    setTagsState(newTags);
  }

  // this function updates the tag state to add a tag
  const addTag = () => {
    let tags = [...tagsState];
    if (!tags.includes(tagsRef.current.value) && tagsRef.current.value !== "") {
      tags.push(tagsRef.current.value);
    }
    setTagsState(tags);
    tagsRef.current.value = "";
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-1 px-2 sm:px-3"
          id="admin-modal-open"
          onClick={() => {
            props.toggleModal("admin-modal")
          }}>
          add new
        </button>
      </div>

      {/* modal background here */}
      <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id="admin-modal-bg"></div>

      {/* modal here */}
      <div id="admin-modal"
        className="fixed modal right-0 left-0 mx-auto border hidden bg-white z-20 p-5">
        <div className="flex flex-row mb-2 content-center h-10">
          {modalState === "youtube" ?
          // red text and large font if this icon is selected
            <div className="mx-3 text-red-700 text-3xl cursor-pointer nav-icon" onClick={() => toggleInput("youtube")}>
              <i className="fab fa-youtube"></i>
            </div>
            :
            // grey text and small font if this icon is not selected
            <div className="mx-3 text-gray-700 text-2xl cursor-pointer nav-icon" onClick={() => toggleInput("youtube")}>
              <i className="fab fa-youtube"></i>
            </div>}

          {modalState === "text" ?
            // red text and large font if this icon is selected
            <div className="p-1 text-red-700 text-2xl cursor-pointer nav-icon" onClick={() => toggleInput("text")}>
              <i className="fas fa-quote-left"></i>
            </div>
            :
            // grey text and small font if this icon is not selected
            <div className="p-1 text-gray-700 text-xl cursor-pointer nav-icon" onClick={() => toggleInput("text")}>
              <i className="fas fa-quote-left"></i>
            </div>}
        </div>
        <form className="mb-4">
          <label htmlFor="#titleinput">
            {/* label will say Subject if user is on textpost form, or title if on youtube form */}
            {modalState === "text" ? "Subject" : "Title"}
          </label>
          <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
            type="text"
            id="titleinput"
            ref={titleRef} />
            {/* warning hidden by default */}
          <p className="hidden text-red-600 text-sm italic" id="titlewarning">You must enter a title</p>

          {modalState === "youtube" ?
          // youtube inputs
            <div>
              <label htmlFor="#dateinput">Date Uploaded</label>
              <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                type="date"
                id="dateinput"
                ref={dateRef} />
                {/* warning hidden by default */}
              <p className="hidden text-red-600 text-sm italic" id="datewarning">You must enter a date</p>

              <label htmlFor="#videolink">Embed Code</label>
              <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                type="text"
                id="videolink"
                ref={videoRef} />
                {/* warning hidden by default */}
              <p className="hidden text-red-600 text-sm italic" id="embedwarning">You must enter a valid embed code</p>

              <label htmlFor="#captioninput">Caption (Optional)</label>
              <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                id="captioninput"
                ref={captionRef} />
            </div>

            :
            // textpost inputs
            <div>
              <label htmlFor="#textpostinput">Body</label>
              <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                id="textpostinput"
                ref={textpostRef} />
              <p className="hidden text-red-600 text-sm italic" id="textpostwarning">You must enter content for your post</p>
            </div>

          }
          {/* tags */}
          <div className="flex flex-row flex-wrap mb-2">
            <label htmlFor="#tagsinput" className="w-full">Tags</label>
            <br />
            <div className="relative tags">
              <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                type="text"
                id="tagsinput"
                ref={tagsRef} />
              <i className="fas fa-plus absolute right-0 bottom-0 mb-3 text-gray-600 mr-2"
                onClick={() => { addTag() }}></i>
            </div>

            {tagsState ?
            // is there are tags, they will be displayed here
              <div className="overflow-auto ml-0 sm:ml-6 sm:mt-0 mt-2 flex flex-row" id="tagsrow">
                {tagsState.map(tag => {
                  return (
                    <div className="mx-1 bg-gray-300 py-2 pr-1 pl-3 rounded-full whitespace-no-wrap" key={tag}>
                      {tag}
                      <i className="fas fa-times ml-2 mr-1 text-gray-500 cursor-pointer"
                        onClick={() => { removeTag(tag) }}></i>
                    </div>
                  )
                })
                }
              </div>
              :
              null}
          </div>
        </form>

        <div className="flex flex-row">
          {/* buttons */}
          <button type="submit" className="text-sm shadow border-2 border-red-500 hover:text-red-700 hover:border-red-700 focus:outline-none text-red-500 font-bold py-2 px-2 sm:px-4"
            onClick={(event) => handleFormSubmit(event)}>
            submit</button>
          <button type="button" className="ml-2 text-sm shadow bg-red-500 hover:bg-red-700 focus:outline-none text-gray-100 font-bold py-2 px-2 sm:px-4"
            onClick={() => {
              clearModal();
              props.toggleModal("admin-modal");
            }}>
            close</button>
        </div>

      </div>

    </div>
  )
}

export default AdminModal;