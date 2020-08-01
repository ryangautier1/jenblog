import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TextThumbnail(props) {

  useEffect(() => {
    // check if text is too tall
    if (document.getElementById(props.id + "-text").clientHeight > 200) {
      document.getElementById(props.id + "-fade").classList.remove("hidden");
    }
    // console.log(document.getElementById(props.id + "-text").clientHeight);
  }, [])

  return (
    <Link to={"/text/" + props.id}>
      <div className="thumbnail-card mb-4 cursor-pointer p-4">
        <p className="varta overflow-hidden text-thumbnail-body" id={props.id + "-text"}>{props.body}
          <span className="text-thumbnail-fade hidden" id={props.id + "-fade"}></span>
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