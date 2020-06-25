import React from 'react';
import youtubedata from '../data/youtube-data.json';


function Youtube() {
  return (
    <main className="my-5 mx-1 sm:mx-16 videos">
      {youtubedata.map(item => {
        return (
          <div className="mr-2 sm:mr-0">
            <span className="text-xl">{item.title}</span>
            <br />
            <span className="text-gray-600 text-sm">{item.date}</span>
            <div key={item.title} className="yt-container">
              <iframe src={item.video} title={item.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Youtube;