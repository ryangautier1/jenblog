import React, { useRef, useState, createElement } from 'react';
import API from '../../utils/API';


function AdminModal(props) {
  const [modalState, setModalState] = useState("youtube");

  // set up useRef for form values
  const titleRef = useRef();
  const videoRef = useRef();
  const dateRef = useRef();
  const captionRef = useRef();
  const textpostRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (modalState === "youtube") {

      // get video link from video input
      
      // validate input fields
      if (titleRef.current.value === "") {
        console.log("YOu must enter a title");
        document.getElementById("titleinput").classList.remove("border-gray-200");
        document.getElementById("titleinput").classList.add("border-red-400");
        document.getElementById("titlewarning").classList.remove("hidden");
        return;
      }

      if (dateRef.current.value === "") {
        document.getElementById("dateinput").classList.remove("border-gray-200");
        document.getElementById("dateinput").classList.add("border-red-400");
        document.getElementById("datewarning").classList.remove("hidden");
        return;
      }

      if (videoRef.current.value === "") {
        document.getElementById("videoinput").classList.remove("border-gray-200");
        document.getElementById("videoinput").classList.add("border-red-400");
        document.getElementById("videowarning").classList.remove("hidden");
        return;
      }
      
      let formContent = {
        title: titleRef.current.value,
        date: dateRef.current.value,
        video: videoRef.current.value.split("=")[3].split("\"")[1],
      };

      if (captionRef.current.value !== "") {
        formContent.caption = captionRef.current.value
      }

      console.log("Submitted form");

      // Need to add validateForm()
      // add video to db
      // API.addVideo(formContent).then(() => {
      //   // update page, clear and close modal
      //   props.updatePage();
      //   clearModal();
      //   props.toggleModal("admin-modal")
      // }
  
      // ).catch(err => console.log(err));
    }
    else if (modalState === "text") {
      let formContent;
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
      
      API.addTextPost(formContent).then(console.log("success")).catch(err => console.log(err));

    }
    
  }

  const toggleInput = (value) => {
    setModalState(value)
  }


  // this function clears the contents of the form in the modal
  const clearModal = () => {
    titleRef.current.value = "";
    dateRef.current.value = "";
    videoRef.current.value = "";
    captionRef.current.value = "";
    textpostRef.current.value = "";
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="mb-3 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          id="admin-modal-open"
          onClick={() => props.toggleModal("admin-modal")}>
          Add new
        </button>
      </div>

      {/* modal background here */}
      <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id="admin-modal-bg"></div>

      {/* modal here */}
      <div id="admin-modal"
        className="fixed modal right-0 left-0 mx-auto border hidden bg-white z-20 p-5">
        <div className="flex flex-row mb-2 content-center h-10">
          {modalState === "youtube" ?
            <div className="mx-3 text-red-700 text-3xl cursor-pointer nav-icon" onClick={() => toggleInput("youtube")}>
              <i className="fab fa-youtube"></i>
            </div>
            :
            <div className="mx-3 text-gray-700 text-2xl cursor-pointer nav-icon" onClick={() => toggleInput("youtube")}>
              <i className="fab fa-youtube"></i>
            </div>}

          {modalState === "text" ?
            <div className="p-1 text-red-700 text-2xl cursor-pointer nav-icon" onClick={() => toggleInput("text")}>
              <i className="fas fa-quote-left"></i>
            </div>
            :
            <div className="p-1 text-gray-700 text-xl cursor-pointer nav-icon" onClick={() => toggleInput("text")}>
              <i className="fas fa-quote-left"></i>
            </div>}
        </div>
        <form className="mb-4">
          <label htmlFor="#titleinput">
            Title
            {modalState === "text" ? " (Optional)" : null}
          </label>
          <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
            type="text"
            id="titleinput"
            ref={titleRef} />
            <p className="hidden text-red-600 text-sm italic" id="titlewarning">You must enter a title</p>

          {modalState === "youtube" ?
            <div>
              <label htmlFor="#dateinput">Date Uploaded</label>
              <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                type="date"
                id="dateinput"
                ref={dateRef} />
              <p className="hidden text-red-600 text-sm italic" id="datewarning">You must enter a date</p>

              <label htmlFor="#videolink">Embed Code</label>
              <input className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                type="text"
                id="videolink"
                ref={videoRef} />
              <p className="hidden text-red-600 text-sm italic" id="embedwarning">You must enter a valid embed code</p>

              <label htmlFor="#captioninput">Caption (Optional)</label>
              <textarea className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                id="captioninput"
                ref={captionRef} />
            </div>

            :
            <div>
              <label htmlFor="#textpostinput">Body</label>
              <textarea className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
                id="textpostinput"
                ref={textpostRef} />
            </div>

          }

        </form>
        <div className="flex flex-row">
          <button type="submit" className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(event) => handleFormSubmit(event)}>
            Submit</button>
          <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => props.toggleModal("admin-modal")}>
            Close</button>
        </div>

      </div>

    </div>
  )
}

export default AdminModal;