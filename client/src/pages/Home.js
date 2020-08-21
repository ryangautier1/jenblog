import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  useEffect(function setupResize() {
    function handleResize() {
      // set height of img so the img is square
      document.getElementById("home-img-1").style.height = document.getElementById("home-img-1").clientWidth + "px";
      document.getElementById("home-img-2").style.height = document.getElementById("home-img-2").clientWidth + "px";
      document.getElementById("home-img-3").style.height = document.getElementById("home-img-3").clientWidth + "px";

    }
    // resize on page load
    handleResize();
    window.addEventListener("resize", handleResize);
    return function cleanupResize() {
      window.removeEventListener('resize', handleResize);
    }
  });

  return (
    <div className="mt-20 p-5 mx-auto w-full flex flex-col items-center">
      <div className="flex flex-row flex-wrap justify-center">
        <div className="relative lg:w-1/3 w-1/2 inline-block p-4" id="home-img-1">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1597976622/brenan-greene-HPZs4EXRFSU-unsplash_1_isa1mb.jpg"
            alt="pizza"
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute top-0 left-0 text-xl font-extrabold text-gray-100 py-4 px-5">food.</p>
        </div>
        <div className="relative lg:w-1/3 w-1/2 inline-block p-4" id="home-img-3">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1598028448/hans-vivek-vja1liByt0Y-unsplash_llwfs2.jpg"
            alt="pizza"
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute bottom-0 right-0 text-xl font-extrabold text-gray-100 py-4 px-5">music.</p>
        </div>
        <div className="relative lg:w-1/3 w-1/2 inline-block p-4" id="home-img-2">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1597980390/mekht-GuvimT4IFok-unsplash_2_qljtl6.jpg"
            alt="pizza"
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute top-0 left-0 text-xl font-extrabold text-gray-100 py-4 px-5">but mostly food.</p>
        </div>
      </div>

      <Link to="/blog">
        <button className=" mt-4 h-16 w-64 loading-page text-gray-100 text-xl relative font-bold">
          dive in!
        {/* <span className="absolute top-0 border-gray-100 inner-border-btn h-12 border-2 m-2 block text-center"></span> */}
        </button>
      </Link>
    </div>
  )
}

export default Home;