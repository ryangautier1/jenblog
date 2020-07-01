import React, { lazy, Suspense } from 'react';
import youtubedata from '../data/youtube-data.json';
import LoadingVideo from '../components/LoadingVideo';

const Video = lazy(() => import('../components/Video'));



// custom styling is in App.css
function Youtube() {

  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos">
      {youtubedata.map(item => {
        return (
          <Suspense fallback={<LoadingVideo />} key={item.title}>
            <Video title={item.title} date={item.date} video={item.video} caption={item.caption} />
          </Suspense>
        )

      })}
    </main>
  )
}

export default Youtube;