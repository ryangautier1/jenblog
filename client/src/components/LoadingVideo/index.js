import React from 'react';
import './style.css';

function LoadingVideo() {
  return (

    <div className="mb-5">
      <span className="loading-title pl-2 sm:pl-0"></span>
      <br />
      <span className="loading-date pl-2 sm:pl-0"></span>
      <div className="loading-video mt-2"></div>
      <div className="loading-caption">
      </div>
    </div>
  )
};

export default LoadingVideo;