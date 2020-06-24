import React from 'react';
import youtubedata from '../data/youtube-data.json';


function Youtube() {
  return (
    <div className="my-5 mx-12">
      {youtubedata.map(item => {
        return (
          <div key={item.key}>
            {item.date}
            <br />
            <iframe width='843' height='474' src={item.video} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen={true}></iframe>"
          </div>
        )
      })}
    </div>
  )
}

export default Youtube;