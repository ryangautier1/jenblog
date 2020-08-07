import React, { useEffect, useState } from 'react';
import API from '../../utils/API'
import TextThumbnail from '../TextThumbnail';
import VideoThumbnail from '../VideoThumbnail';

function RelatedPosts(props) {

  const { tags, formatDates } = props;
  const [postsData, setPostsData] = useState([]);
  const [ytCommentData, setYtCommentData] = useState([]);
  const [tpCommentData, setTpCommentData] = useState([]);

  // on load, make api call for related posts based on tags
  useEffect(() => {
    if (tags !== undefined) {
      API.getYtVideosByQuery(tags).then(vids => {
        API.getYtComments().then(ytComments => {
          API.getTextPostsByQuery(tags).then(posts => {
            API.getTpComments().then(tpComments => {
              // // no results matched query
              // if (vids.data.length === 0 && posts.data.length === 0) {
              //   setNoResults(true);
              //   setLoaded(true);
              //   return;
              // }

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
    <aside className="inline-block flex lg:flex-col flex-row overflow-auto">
      <h1>You may also be interested in...</h1>

      {postsData.map(item => {
        // check if item is a video
        if (item.video) {
          let comments = ytCommentData.filter(comment => comment.video === item._id);
          // check if video has comments
          if (comments[0] !== undefined) {
            return (
              <VideoThumbnail key={item._id} id={item._id} title={item.title} date={item.date} video={item.video} tags={item.tags} comments={comments[0].comments.length} />
            )
          }
          else {
            // video has no comments
            return (
              <VideoThumbnail key={item._id} id={item._id} title={item.title} date={item.date} tags={item.tags} video={item.video} />
            )
          }
        }
        // check if item is a text post
        else if (item.body) {
          let comments = tpCommentData.filter(comment => comment.textpost === item._id);
          // check if text post has comments
          if (comments) {
            return (
              <TextThumbnail key={item._id} id={item._id} title={item.title} date={item.date} body={item.body} caption={item.caption} tags={item.tags} comments={comments[0]} />
            )
          }
          else {
            // text post with no comments
            return (
              <TextThumbnail key={item._id} id={item._id} title={item.title} date={item.date} body={item.body} caption={item.caption} tags={item.tags} />
            )
          }
        }
      })
      }
    </aside>
  )
}

export default RelatedPosts;