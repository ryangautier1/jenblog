import React, { lazy, Suspense } from 'react';
import youtubedata from '../data/youtube-data.json';
import commentdata from '../data/comment-data.json';
import LoadingVideo from '../components/LoadingVideo';

const Video = lazy(() => import('../components/Video'));



// custom styling is in App.css
function Youtube() {

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

  
  let commentIds = []
  commentdata.map(item => {commentIds.push(item._id)});
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
        <form>
          <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-200" type="text" />

        </form>
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => toggleModal("youtube-modal")}>
          Close</button>
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