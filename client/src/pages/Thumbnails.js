import React, { useState, useEffect } from 'react';
// import LoadingVideo from '../components/LoadingVideo';
import Search from '../components/Search';
import VideoThumbnail from '../components/VideoThumbnail';
import TextThumbnail from '../components/TextThumbnail';
// import TextPost from '../components/TextPost';
import AdminModal from '../components/AdminModal';
import API from '../utils/API';

// custom styling is in App.css
function Thumbnails(props) {

  // set up state for storing post data
  const [postsData, setPostsData] = useState([]);
  const [ytCommentData, setYtCommentData] = useState([]);
  const [tpCommentData, setTpCommentData] = useState([]);
  const [postIdState, setPostIdState] = useState([]);
  // store count of each type of post on page
  const [skipYt, setSkipYt] = useState(0);
  const [skipTp, setSkipTp] = useState(0);
  // store whether the db has returned all videos and textposts
  const [allTpsLoaded, setAllTpsLoaded] = useState(false);
  const [allVidsLoaded, setAllVidsLoaded] = useState(false);


  const [userState, setUserState] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const { toggleModal } = props;

  // gather video data on load
  useEffect(() => {
    updatePage();
    API.getUserData().then(res => {
      setUserState(true);
    }).catch(err => {
      console.log("Not logged in");
      setUserState(false);
    })
  }, []);

  // run api calls and update state when searchstate changes
  useEffect(() => {
    setPostsData([]);
    updatePage();
  }, [props.searchState]);



  // this function gets video data from db, sorts by date, formats the dates and updates the state with the result
  const updatePage = () => {
    let limit = 8;
    setLoaded(false);
    setNoResults(false);
    API.getYtVideosByQuery(props.searchState, limit, skipYt).then(vids => {
      API.getYtComments().then(ytComments => {
        API.getTextPostsByQuery(props.searchState, limit, skipTp).then(posts => {
          API.getTpComments().then(tpComments => {
            // no results matched query
            if (vids.data.length === 0 && posts.data.length === 0) {
              setNoResults(true);
              setLoaded(true);
              return;
            }

            // update skip values
            let nYt = skipYt;
            setSkipYt(nYt + vids.data.length);
            let nTp = skipTp;
            setSkipYt(nTp + posts.data.length);

            //  check if vids.data and posts.data contain results that are already on the page
            let newVids = vids.data.filter(item => postIdState.indexOf(item._id) === -1);
            let newTps = posts.data.filter(item => postIdState.indexOf(item._id) === -1);
            if (newTps < limit) {
              setAllTpsLoaded(true);
            }
            if (newVids < limit) {
              setAllVidsLoaded(true);
            }
            if (allTpsLoaded && allVidsLoaded) {
              setLoaded(true);
              return;
            }

            console.log("all posts not loaded");
            let allPosts = newVids.concat(newTps);

            // sort the result by date descending
            allPosts.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });

            // put the dates in mm-dd-yyyy format
            formatDates(ytComments.data, "comment");
            formatDates(allPosts, "post")
            formatDates(tpComments.data, "comment");

            let currPosts = postsData;
            let newPosts = allPosts.concat(currPosts);

            // update the state
            setPostsData(newPosts);
            updatePostIds(newPosts);
            setYtCommentData(ytComments.data);
            setTpCommentData(tpComments.data);
            setLoaded(true);
          }).catch(err => console.log("error getting text post comments", err));
        }).catch(err => console.log("error getting text posts", err));
      }).catch(err => console.log("error getting youtube comments", err));
    }).catch(err => console.log("error getting youtube videos", err));
    // }
  }

  const updatePostIds = (obj) => {
    let newIds = [];
    obj.map(item => {
      // if the post id is not in the list of post ids yet
      if (postIdState.indexOf(item._id) === -1) {
        // push the id into the postIdState
        newIds.push(item._id);
      }
    });
    let currIds = postIdState;
    setPostIdState(currIds.concat(newIds));
  }

  // this function takes an array of objects each with a date key and formats the dates into mm-dd-yyyy format
  // for type === post, the dates are at data[i].date
  // for type === comments, the dates are at data[i].comments[j].date
  const formatDates = (data, type) => {
    if (type === "post") {
      for (let i = 0; i < data.length; i++) {
        let dateArr = data[i].date.split("-");
        dateArr = [dateArr[1], dateArr[2].substring(0, 2), dateArr[0]];
        data[i].date = dateArr.join("-");
      }
    }
    else {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].comments.length; j++) {
          let dateArr = data[i].comments[j].date.split("-");
          dateArr = [dateArr[1], dateArr[2].substring(0, 2), dateArr[0]];
          data[i].comments[j].date = dateArr.join("-");
        }
      }
    }
  }



  const updateComments = (video, data, commentRef) => {
    API.updateYtComments(video, data).then(() => {
      updatePage();
      commentRef.current.value = "";
    }).catch(err => { console.log(err) });
  }

  return (
    <main className="mt-8 sm:mx-6 md:mx-16 mx-2 pb-2 inner-shadow z-0">

      {/* if the posts are done loading */}
      {loaded && !noResults ?
        <div>
          <div className="w-full masonry animate__animated animate__fadeInUp">

            {postsData.map(item => {
              // check if item is a video
              if (item.video) {
                let comments = ytCommentData.filter(comment => comment.video === item._id);
                // check if video has comments
                if (comments[0] !== undefined) {
                  return (
                    <VideoThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} video={item.video} tags={item.tags} comments={comments[0].comments.length} />
                  )
                }
                else {
                  // video has no comments
                  return (
                    <VideoThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} tags={item.tags} video={item.video} />
                  )
                }
              }
              // check if item is a text post
              else if (item.body) {
                let comments = tpCommentData.filter(comment => comment.textpost === item._id);
                // check if text post has comments
                if (comments[0] !== undefined) {
                  return (
                    <TextThumbnail key={item._id} id={item._id} userState={userState} toggleModal={toggleModal} updateComments={updateComments} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} tags={item.tags} comments={comments[0].comments.length} />
                  )
                }
                else {
                  // text post with no comments
                  return (
                    <TextThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} tags={item.tags} />
                  )
                }
              }
            })
            }

          </div>
          {/* display load button */}
          {/* if all posts have not been loaded */}
          {!allTpsLoaded && !allTpsLoaded ?
            // if the page is not currently loading
            <button type="button"
              className="sm:text-xl text-lg load-more text-sm shadow border-2 border-red-500 hover:text-red-700 hover:border-red-700 focus:outline-none text-red-500 font-bold py-2 px-2 sm:px-4"
              onClick={() => { updatePage() }}>
              load more
      </button> :
            // if all posts have been loaded, remove load more button from page
            null}

        </div>
        :

        !loaded && !noResults ?
          // if the posts are not done loading
          <div className="w-full fixed top-0 left-0 h-full loading-page flex justify-center items-center z-0">
            <p className="lato text-gray-100 text-3xl">Loading...</p>
          </div>
          :
            // if the posts are done loading and there are no results
            <div>
              <p className="lato text-gray-700 text-3xl">No results :|</p>
            </div>
      }


    </main>
  )
}

export default Thumbnails;