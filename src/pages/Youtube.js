import React from 'react';
import youtubedata from '../data/youtube-data.json';


function Youtube() {
  return (
    <div className="my-5 mx-12 videos">
      {youtubedata.map(item => {
        return (
          <div>
          {item.date}
            <br />
          <div key={item.title} className="yt-container">
            <iframe src={item.video} title={item.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
          </div>
          </div>
        )
      })}
    </div>
  )
}

export default Youtube;