import React from 'react';
import { Link } from 'react-router-dom';

function VideoThumbnail(props) {

  // grab video id from embed code
  // split by /
  let videoId = props.video.split("/");
  // id will be last item of array
  videoId = videoId[videoId.length - 1];

  let thumbnailSrc = "https://img.youtube.com/vi/" + videoId + "/0.jpg";

  return (
    <Link to={"/video/" + props.id}>
      <div className="thumbnail-card mb-4 cursor-pointer p-4">
        <img src={thumbnailSrc} alt={props.title} className="mb-2" />
        <h2 className="lato text-lg text-gray-900 text-bold">{props.title}</h2>
        <div className="text-md text-blue-700">{props.date}</div>
        {props.comments ? <div className="text-md text-gray-700">{props.comments} Comments</div> : null}
        {props.userState ?
          <div>
          </div>
          : null
        }
      </div>
    </Link>
  )
}

export default VideoThumbnail;