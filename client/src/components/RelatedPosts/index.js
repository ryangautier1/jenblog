import React from 'react';
import TextThubmnail from '../TextThumbnail';
import VideoThumbnail from '../VideoThumbnail';

function RelatedPosts(props) {
  return (
    <aside className="inline-block">
      <h1>You may also be interested in...</h1>
      {props.tags}
    </aside>
  )
}

export default RelatedPosts;