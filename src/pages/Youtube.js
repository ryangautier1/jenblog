import React from 'react';
import youtubedata from '../data/youtube-data.json';


// custom styling is in App.css

function Youtube() {
  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos">
      {youtubedata.map(item => {
        return (
          <div key={item.title} className="mb-5">
            <span className="text-lg sm:text-xl pl-2 sm:pl-0">{item.title}</span>
            <br />
            <span className="text-gray-600 text-sm pl-2 sm:pl-0">{item.date}</span>
            <div className="yt-container mt-2">
              <iframe className="lozad" data-src={item.video} title={item.title} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>
            </div>
            <div>
              {item.caption}
            </div>
          </div>
        )
      })}
    </main>
  )
}

export default Youtube;