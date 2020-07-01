import React from 'react';


function Video(props) {
  const { title, date, video, caption } = props;
  return (

    <div key={title} className="mb-5 relative">
      {true ? <div className="absolute top-0 right-0 w-8 h-8 text-lg text-center text-white font-bold opacity-50 bg-black rounded-full cursor-pointer">X</div> : <div></div>}
      <span className="text-lg sm:text-xl pl-2 sm:pl-0">{title}</span>
      <br />
      <span className="text-gray-600 text-sm pl-2 sm:pl-0">{date}</span>
      <div className="yt-container mt-2">
        <iframe src={video} title={title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
      </div>
      <div>
        {caption}
      </div>
    </div>
  )

};

export default Video;