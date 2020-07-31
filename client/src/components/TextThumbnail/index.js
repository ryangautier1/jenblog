import React from 'react';
import { Link } from 'react-router-dom';

function TextThumbnail(props) {

  return (
    <Link to={"/text/" + props.id}>
      <div className="thumbnail-card mb-4 cursor-pointer p-4">
        <p className="varta overflow-hidden text-thumbnail-body">{props.body}
          <div className="text-thumbnail-fade"></div>
        </p>
        <h2 className="lato text-lg text-gray-900 text-bold">{props.title}</h2>
        <div className="text-md text-blue-700">{props.date}</div>
        {/* {props.comments ? <div className="text-md text-gray-700">{props.comments} Comments</div> : null} */}
        {props.userState ?
          <div>
          </div>
          : null
        }
      </div>
    </Link>
  )
}

export default TextThumbnail;