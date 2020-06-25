import React from 'react';
import youtubedata from '../data/youtube-data.json';


function Youtube() {
  return (
    <main className="mt-8 mx-1 sm:mx-16 videos">
      {youtubedata.map(item => {
        return (
          <div key={item.title} >
            <span className="text-md sm:text-xl pl-2 sm:pl-0">{item.title}</span>
            <br />
            <span className="text-gray-600 text-xs sm:text-sm pl-2 sm:pl-0">{item.date}</span>
            <div className="yt-container">
              <iframe src={item.video} title={item.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Youtube;