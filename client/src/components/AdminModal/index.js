import React, { useRef } from 'react';
import API from '../../utils/API';


function AdminModal(props) {

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
      props.updatePage();
      clearModal();
      props.toggleModal("youtube-modal")
    }

    ).catch(err => console.log(err));
  }


  // this function clears the contents of the form in the modal
  const clearModal = () => {
    titleRef.current.value = "";
    dateRef.current.value = "";
    videoRef.current.value = "";
    captionRef.current.value = "";
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="mb-3 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          id="youtube-modal-open"
          onClick={() => props.toggleModal("youtube-modal")}>
          Add new
        </button>
      </div>
      <hr className="mb-3" />

      {/* modal background here */}
      <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id="youtube-modal-bg"></div>

      {/* modal here */}
      <div id="youtube-modal"
        className="fixed modal right-0 left-0 mx-auto border hidden bg-white z-20 p-5">
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
          <label htmlFor="#captioninput">Caption</label>
          <textarea className="mb-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200"
            id="captioninput"
            ref={captionRef} />
        </form>
        <div className="flex flex-row">
          <button type="submit" className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(event) => handleFormSubmit(event)}>
            Submit</button>
          <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => props.toggleModal("youtube-modal")}>
            Close</button>
        </div>

      </div>

    </div>
  )
}

export default AdminModal;