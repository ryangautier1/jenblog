import React from 'react';

function About() {

  return (
    <div className="mt-20 mb-10">
      <p className="lg:mx-48 mx-16 text-center text-lg md:text-xl varta">My name is Ryan Gautier and I made this blog site
      for a friend of mine. She is still preparing to upload her personal content to the site. In the meantime,
    I have filled it with some sample content. I hope you enjoy!</p>
      <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1598036169/hans-vivek-vja1liByt0Y-unsplash-min_nrvdge.jpg"
        alt="musicians"
        className="object-cover home-img about-img animate__animated animate__fadeIn px-3 md:px-16 mx-auto mt-4 pb-8"
      />
    </div>
  )
}

export default About;