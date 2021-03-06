import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function VideoThumbnail(props) {

  const { video, id, related, title, date, comments, tags } = props;

  // grab video id from embed code
  // split by /
  let videoId = video.split("/");
  // id will be last item of array
  videoId = videoId[videoId.length - 1];

  let thumbnailSrc = "https://img.youtube.com/vi/" + videoId + "/0.jpg";

  useEffect(function setupResize() {
    function handleResize() {
      // set height of img so the aspect ratio is 16:9
      document.getElementById("img-" + id).style.height = (document.getElementById("img-" + id).clientWidth * (9/16))+"px";
    }
    // resize on page load
    handleResize();
    window.addEventListener("resize", handleResize);
    return function cleanupResize() {
      window.removeEventListener('resize', handleResize);
    }
  });

  useEffect(() => {
    if (related) {
      document.getElementById("card-" + id).classList.add("related-card");
    }
  }, [related])


return (
  <Link to={"/video/" + id}>
    <div className="thumbnail-card mb-4 cursor-pointer p-3" id={"card-" + id}>
      <img src={thumbnailSrc} alt={title} id={"img-" + id} className="mb-2 responsive-img" />
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

export default VideoThumbnail;