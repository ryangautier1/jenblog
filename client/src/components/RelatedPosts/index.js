import React, { useEffect, useState } from 'react';
import API from '../../utils/API'
import TextThumbnail from '../TextThumbnail';
import VideoThumbnail from '../VideoThumbnail';

function RelatedPosts(props) {

  const { tags, formatDates, id } = props;
  const [postsData, setPostsData] = useState([]);
  const [ytCommentData, setYtCommentData] = useState([]);
  const [tpCommentData, setTpCommentData] = useState([]);

  // on load, make api call for related posts based on tags
  useEffect(() => {
    if (tags !== undefined) {
      let limit = 3;
      API.getYtVideosByQuery(tags, limit).then(vids => {
        API.getYtComments().then(ytComments => {
          API.getTextPostsByQuery(tags, limit).then(posts => {
            API.getTpComments().then(tpComments => {

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
            }).catch(err => console.log("error getting text post comments", err));
          }).catch(err => console.log("error getting text posts", err));
        }).catch(err => console.log("error getting youtube comments", err));
      }).catch(err => console.log("error getting youtube videos", err));
    }
  }, [tags])

  return (
    <aside className="xl:ml-2">
      
      <h1 className="xl:text-center mb-2">You may also be interested in...</h1>
      
      <div className="flex xl:flex-col flex-row overflow-x-auto xl:overflow-hidden mx-5">
        {postsData.map(item => {
          if (item._id === id) {
            return null;
          }
          // check if item is a video
          if (item.video) {
            let comments = ytCommentData.filter(comment => comment.video === item._id);
            // check if video has comments
            if (comments[0] !== undefined) {
              return (
                <div className="related block mx-1 animate__animated animate__fadeIn" key={item._id}>
                  <VideoThumbnail id={item._id} title={item.title} date={item.date} video={item.video} tags={item.tags} related={true} comments={comments[0].comments.length} />
                </div>
              )
            }
            else {
              // video has no comments
              return (
                <div className="related block mx-1 animate__animated animate__fadeIn" key={item._id}>
                  <VideoThumbnail id={item._id} title={item.title} date={item.date} tags={item.tags} related={true} video={item.video} />
                </div>
              )
            }
          }
          // check if item is a text post
          else if (item.body) {
            let comments = tpCommentData.filter(comment => comment.textpost === item._id);
            // check if text post has comments
            if (comments[0] !== undefined) {
              return (
                <div className="related block mx-1 animate__animated animate__fadeIn" key={item._id}>
                  <TextThumbnail id={item._id} title={item.title} date={item.date} body={item.body} caption={item.caption} tags={item.tags} related={true} comments={comments[0].comments.length} />
                </div>
              )
            }
            else {
              // text post with no comments
              return (
                <div className="related block mx-1 animate__animated animate__fadeIn" key={item._id}>
                  <TextThumbnail id={item._id} title={item.title} date={item.date} body={item.body} caption={item.caption} related={true} tags={item.tags} />
                </div>
              )
            }
          }
        })
        }
      </div>
    </aside>
  )
}

export default RelatedPosts;