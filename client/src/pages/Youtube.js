import React, { lazy, Suspense } from 'react';
import youtubedata from '../data/youtube-data.json';
import commentdata from '../data/comment-data.json';
import LoadingVideo from '../components/LoadingVideo';

const Video = lazy(() => import('../components/Video'));



// custom styling is in App.css
function Youtube() {
  let commentIds = []
  commentdata.map(item => {commentIds.push(item._id)});
  console.log(commentIds);

  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos">
      {youtubedata.map(item => {
        if (commentIds.includes(item._id)) {
          let comments = commentdata.filter(comment => comment._id === item._id);
          console.log(comments[0]);
          return (
            <Suspense fallback={<LoadingVideo />} key={item.title}>
              <Video title={item.title} date={item.date} video={item.video} caption={item.caption} comments={comments[0]} />
            </Suspense>
          )
        }
        else {
          return (
            <Suspense fallback={<LoadingVideo />} key={item.title}>
              <Video title={item.title} date={item.date} video={item.video} caption={item.caption} />
            </Suspense>
          )
        }
       

      })}
    </main>
  )
}

export default Youtube;