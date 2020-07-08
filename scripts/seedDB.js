const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/jenblog"
);

// const userSeed = [
//   {
//     username: "ryangautier",
//     password: "password123"
//   }
// ];

// const youtubeSeed = [
//   {
//     "title": "Making My Dog a Birthday Cake",
//     "date": "03/10/2019",
//     "video": "https://www.youtube.com/embed/KHCfr7qvkJs",
//     "caption": "My name is Jenny and this is what I have to say about this video. I recorded it and editted it, and here it is. So that's how that is. Thank you for coming to look and thanks and yeah."
//   },
//   {
//     "title": "Tie-Dying My Clothes with Bleach",
//     "date": "04/12/2019",
//     "video": "https://www.youtube.com/embed/7L7K9YYFn8E",
//     "caption": "My name is Jenny and this is what I have to say about this video. I recorded it and editted it, and here it is. So that's how that is. Thank you for coming to look and thanks and yeah."
//   },
//   {
//     "title": "Teaching My Dogs How to Swim",
//     "date": "04/15/2019",
//     "video": "https://www.youtube.com/embed/olONgK_CxG4",
//     "caption": "My name is Jenny and this is what I have to say about this video. I recorded it and editted it, and here it is. So that's how that is. Thank you for coming to look and thanks and yeah."
//   },
//   {
//     "title": "Come Watch More of My Favorite TikToks with Me",
//     "date": "05/10/2020",
//     "video": "https://www.youtube.com/embed/S79GcTt_8pc",
//     "caption": "My name is Jenny and this is what I have to say about this video. I recorded it and editted it, and here it is. So that's how that is. Thank you for coming to look and thanks and yeah."
//   },
//   {
//     "title": "Come Watch My Favorite TikToks with Me",
//     "date": "06/23/2020",
//     "video": "https://www.youtube.com/embed/TGr1IP-1e7E",
//     "caption": "My name is Jenny and this is what I have to say about this video. I recorded it and editted it, and here it is. So that's how that is. Thank you for coming to look and thanks and yeah."
//   }
// ]

const ytCommentSeed = [
  {
    video: "5f00dc0615cf100f1cdc54fd",
    comments: 
    [
      {
        author: "Megan",
        date: "05-30-2020",
        comment: "I'm Megan Thee Stallion and this is what I have to say."
      },
      {
        author: "Beyonce",
        date: "05-31-2020",
        comment: "I'm Beyonce and this is what I have to say."
      },
    ]
  },
  {
    video: "5f0115cc8cb6c93f18dfa97a",
    comments: 
    [
      {
        author: "Betty",
        date: "10-10-2019",
        comment: "I'm Betty."
      },
      {
        author: "Alice",
        date: "11-30-2019",
        comment: "I'm Alice."
      },
      {
        author: "Brad",
        date: "12-13-2019",
        comment: "I'm Brad."
      }
    ]
  }
]

// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.Youtube
//   .remove({})
//   .then(() => db.Youtube.collection.insertMany(youtubeSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.Youtube
//   .remove({})
//   .then(() => db.Youtube.collection.insertMany(youtubeSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

  db.ytComment
  .remove({})
  .then(() => db.ytComment.collection.insertMany(ytCommentSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });