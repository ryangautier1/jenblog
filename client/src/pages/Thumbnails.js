import React, { lazy, Suspense, useState, useEffect } from 'react';
// import LoadingVideo from '../components/LoadingVideo';
import Search from '../components/Search';
import VideoThumbnail from '../components/VideoThumbnail';
import TextThumbnail from '../components/TextThumbnail';
// import TextPost from '../components/TextPost';
import AdminModal from '../components/AdminModal';
import API from '../utils/API';

// const Video = lazy(() => import('../components/Video'));

// custom styling is in App.css

function Thumbnails() {

  // set up state for storing video data
  // const [youtubedata, setYoutubeData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [ytCommentData, setYtCommentData] = useState([]);

  // set up state for storing text post data
  // const [textpostdata, setTextpostData] = useState([]);
  const [tpCommentData, setTpCommentData] = useState([]);
  const [userState, setUserState] = useState(false);
  // const [jenBlogName, setJenBlogName] = useState();

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



  // this function gets video data from db, sorts by date, formats the dates and updates the state with the result
  const updatePage = () => {
    API.getYtVideos().then(vids => {
      API.getYtComments().then(ytComments => {
        API.getTextPosts().then(posts => {
          API.getTpComments().then(tpComments => {

            let allPosts = vids.data.concat(posts.data);

            console.log("all", allPosts)
            // sort the result by date descending
            allPosts.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });

            // vids.data.sort(function (a, b) {
            //   return new Date(b.date) - new Date(a.date);
            // });

            // put the dates in mm-dd-yyyy format
            // formatDates(vids.data, "post");
            formatDates(ytComments.data, "comment");
            formatDates(allPosts, "post")
            formatDates(tpComments.data, "comment");


            // update the state
            setPostsData(allPosts);
            setYtCommentData(ytComments.data);
            setTpCommentData(tpComments.data);
          })
        })
      })

    });
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

  let modalOpen = true;
  const toggleModal = (target) => {
    modalOpen = !modalOpen;
    if (modalOpen) {
      document.getElementById(target).classList.add("hidden");
      document.getElementById(target + "-bg").classList.add("hidden");
    } else {
      document.getElementById(target).classList.remove("hidden");
      document.getElementById(target + "-bg").classList.remove("hidden");
    }
  }

  const updateComments = (video, data, commentRef) => {
    API.updateYtComments(video, data).then(() => {
      updatePage();
      commentRef.current.value = "";
    }).catch(err => { console.log(err) });
  }

  return (
    <main className="mt-8 ml-6 mr-16 pb-2 inner-shadow flex flex-row justify-between">

      {/* <Search /> */}


      {userState ?
        <AdminModal updatePage={updatePage} toggleModal={toggleModal} />
        : null
      }

      <div className="w-full masonry">

        {postsData.map(item => {
          // check if item is a video
          if (item.video) {
            let comments = ytCommentData.filter(comment => comment.video === item._id);
            // check if video has comments
            if (comments[0] !== undefined) {
              return (
                <VideoThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} video={item.video} comments={comments[0].comments.length} />
              )
            }
            else {
              // video has no comments
              return (
                <VideoThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} video={item.video} />
              )
            }
          }
          // check if item is a text post
          else if (item.body) {
            let comments = tpCommentData.filter(comment => comment.textpost === item._id);
            // check if text post has comments
            if (comments) {
              return (
                <TextThumbnail key={item._id} id={item._id} userState={userState} toggleModal={toggleModal} updateComments={updateComments} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} comments={comments[0]} />
              )
            }
            else {
              // text post with no comments
              return (
                <TextThumbnail key={item._id} id={item._id} toggleModal={toggleModal} updatePage={updatePage} title={item.title} date={item.date} body={item.body} caption={item.caption} />
              )
            }
          }
        })
        }

      </div>

    </main>
  )
}

export default Thumbnails;