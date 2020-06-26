import React from 'react';
import youtubedata from '../../data/youtube-data.json';


function Video() {
  return(
    <div>
    {youtubedata.map(item => {
      return(
        <div key={item.title} className="mb-5">
          <span className="text-lg sm:text-xl pl-2 sm:pl-0">{item.title}</span>
          <br />
          <span className="text-gray-600 text-sm pl-2 sm:pl-0">{item.date}</span>
          <div className="yt-container mt-2">
            <iframe src={item.video} title={item.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
          </div>
          <div>
            {item.caption}
          </div>
        </div>
      )
    })}
    </div>
      
    )};

export default Video;