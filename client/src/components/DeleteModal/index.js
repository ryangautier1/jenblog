import React from 'react';

function DeleteModal(props) {

  const { toggleModal, id, title, deleteVideo } = props;

  return (
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
    </div>
  )
}

export default DeleteModal;