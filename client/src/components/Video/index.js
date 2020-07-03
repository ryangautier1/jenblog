import React from 'react';


function Video(props) {
  const { title, date, video, caption, comments} = props;
  return (

    <div key={title} className="mb-5 relative text-gray-300">
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
      <form className="flex flex-row mt-3">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400" type="text" placeholder="Add comment..." />
        <button class="ml-2 shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
          Submit
        </button>
      </form>
      {comments ?
        <div className="border rounded bg-black opacity-50 mx-4 mb-2 mt-5 p-2">
        {comments.comments.map(item => {
          return(
            <div className="text-md text-gray-100 mb-3">
            <span className="text-lg">{item.author}</span><br />
              {item.comment}
            </div>
          )
        })}
      </div> : <div>No comments</div>}
    </div>
  )

};

export default Video;