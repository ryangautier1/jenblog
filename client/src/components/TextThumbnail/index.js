import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TextThumbnail(props) {

  const { id, body, date, title, comments, tags } = props;

  useEffect(() => {
    // check if text is too tall. If so, show fade out effect
    if (document.getElementById(id + "-text").clientHeight > 200) {
      document.getElementById(id + "-fade").classList.remove("hidden");
    }
  })

  return (
    <Link to={"/text/" + id}>
      <div className="thumbnail-card mb-4 cursor-pointer p-4">
        <p className="varta overflow-hidden text-thumbnail-body" id={id + "-text"}>{body}
        {/* fade out effect */}
          <span className="text-thumbnail-fade hidden" id={id + "-fade"}></span>
        </p>
        <h2 className="lato text-lg text-gray-900 text-bold">{title}</h2>
        <div className="text-md text-blue-700">{date}</div>
        {/* if there are comments */}
        {/* here, comments are passed from props and will be a number reflecting length of comments array */}
        {comments ? 
          // if there is more than one comment
          comments > 1 ?
          <div className="text-md text-gray-700">
            {comments} Comments</div>
            : 
            // if there is only one comment
            <div className="text-md text-gray-700">
            {comments} Comment</div>
            :
            // if there are no comments
            null}
        {tags ?
          <div className="flex flex-wrap flex-row">
            {tags.map(item => {
              return (
                <div className="text-md text-gray-500" key={item}>
                  {/* add margin if it is not the last tag */}
                  {tags.indexOf(item) !== tags.length - 1 ?
                   <span className="mr-1">#{item}</span> 
                   :
                   <span>#{item}</span>}
                </div>
              )
            })}
          </div>
          : null
        }
      </div>
    </Link>
  )
}

export default TextThumbnail;