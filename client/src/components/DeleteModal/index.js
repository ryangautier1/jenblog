import React from 'react';

function DeleteModal(props) {

  const { toggleModal, id, title, type, deleteVideo, deleteTextPost } = props;

  // use appropriate delete function based on type passed in props
  const handleDelete = () => {
    if (type === "video") {
      deleteVideo();
    }
    else if (type === "textpost") {
      deleteTextPost();
  }
}

  return (
    <div>
      {/* modal button */}
      <div className="absolute top-0 right-0 w-8 h-8 text-lg text-center text-white font-bold opacity-50 bg-black rounded-full cursor-pointer"
        onClick={() => toggleModal(id + "delete-modal")}
      >X
          </div>

      {/* modal background here */}
      <div className="modal-bg hidden opacity-50 z-10 bg-black fixed top-0 left-0" id={id + "delete-modal-bg"}></div>

      {/* modal here */}
      <div id={id + "delete-modal"}
        className="fixed delete-modal right-0 left-0 mx-auto border hidden bg-white z-20 p-5">
        {title ? 
        // if the post has a title, display the title in the warning message
        <p className="text-gray-700 mb-4">Are you sure you want to delete "{title}" and its comments?</p>
        : <p className="text-gray-700 mb-4">Are you sure you want to delete this post and its comments?</p>}
        {/* buttons */}
        <div className="flex flex-row">
          <button
            type="button"
            className="mr-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => { handleDelete() }}>
            I'm Sure</button>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => toggleModal(id + "delete-modal")}>
            Nevermind</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;