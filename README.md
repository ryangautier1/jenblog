# blog site

## Description
A friend of mine asked me to create a website for her so she could share her youtube content and some text posts with users on her own platform. She wanted her users to be able to add comments, but not have to create an account to do so. This website is a full stack MERN application that does just that.

## User Story
```
As a youtube blogger
I want a custom platform to share my content
So that my users' experiences with my content are more personal
```

## Features

- The admin may upload Youtube videos by providing the embed code. They may set the date to any date if they are uploading an old video. They may optionally include tags and a caption.
- The admin may upload text posts with optional title and tags.
- When creating a new post, the admin will be notified of errors that would prevent a successful post if there are any.
- Users may search all posts by keywords that appear anywhere in the post.
- Search terms may be singular or plural.
- When viewing an individual post, related posts will be displayed on the side or bottom of the page depending on the screen size. These posts are searched based on the individual post's tags.
- Users may comment on posts without having to create an account. Users must first enter their name, which is stored in local storage. Their name can be changed if they are on a shared device.

## About
tailwindcss was used for styling this application, and masonry.js was used to create the masonry layout. Animate.css was used to create some of the animations, and the loading gradient animation was created with the help of https://www.gradient-animator.com/. The favicon was created with the help of https://realfavicongenerator.net/.

This is a full stack MERN application.

In future builds, the admin will be able to post intagram posts as well


## Questions
Feel free to contact me at ryangautier2@gmail.com with any questions or comments!

## Gif of Application
![blogsite](./blogsite.gif)

