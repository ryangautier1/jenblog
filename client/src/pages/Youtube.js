import React, { lazy, Suspense } from 'react';
const Video = lazy(() => import ('../components/Video'));

// custom styling is in App.css
function Youtube() {

  return (
    <main className="mt-8 mx-1 pb-2 sm:mx-16 videos">
      <Suspense fallback={<h1>Loading</h1>}>
        <Video />
      </Suspense>
    </main>
  )
}

export default Youtube;