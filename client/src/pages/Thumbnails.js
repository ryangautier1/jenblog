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

  // set up state for storing video data
  const [postsData, setPostsData] = useState([]);
  const [ytCommentData, setYtCommentData] = useState([]);

  // set up state for storing text post data
  const [tpCommentData, setTpCommentData] = useState([]);
  const [userState, setUserState] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const {toggleModal} = props;

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
    setLoaded(false);
    setNoResults(false);
    API.getYtVideosByQuery(props.searchState).then(vids => {
      API.getYtComments().then(ytComments => {
        API.getTextPostsByQuery(props.searchState).then(posts => {
          API.getTpComments().then(tpComments => {
            // no results matched query
            if (vids.data.length === 0 && posts.data.length === 0) {
              setNoResults(true);
              setLoaded(true);
              return;
            }

            let allPosts = vids.data.concat(posts.data);

            // sort the result by date descending
            allPosts.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });

            // put the dates in mm-dd-yyyy format
            formatDates(ytComments.data, "comment");
            formatDates(allPosts, "post")
            formatDates(tpComments.data, "comment");

            // update the state
            setPostsData(allPosts);
            setYtCommentData(ytComments.data);
            setTpCommentData(tpComments.data);
            setLoaded(true);
          }).catch(err => console.log("error getting text post comments", err));
        }).catch(err => console.log("error getting text posts", err));
      }).catch(err => console.log("error getting youtube comments", err));
    }).catch(err => console.log("error getting youtube videos", err));
    // }
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

        :

        !loaded ? 
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