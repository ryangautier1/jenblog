import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  function handleResize() {
    let squareWidth = document.getElementById("home-img-1").clientWidth;
    // set height of img so the img is square
    document.getElementById("home-img-1").style.height = squareWidth + "px";
    document.getElementById("home-img-2").style.height = squareWidth + "px";
    document.getElementById("home-img-3").style.height = squareWidth + "px";

    // set position of text based on size of image
    // squareWidth*0.05 + "px" for top and bottom, squareWidth*0.1 + "px" for left and right
    document.getElementById("food-text-1").style.padding = squareWidth*0.05 + "px " + squareWidth*0.075 + "px";
    document.getElementById("food-text-2").style.padding = squareWidth*0.05 + "px " + squareWidth*0.075 + "px";
    document.getElementById("music-text").style.padding = squareWidth*0.05 + "px " + squareWidth*0.075 + "px";
  }

  useEffect(function setupResize() {
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
        <div className="relative lg:w-1/3 sm:w-1/2 w-full inline-block p-4" id="home-img-1">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1597976622/brenan-greene-HPZs4EXRFSU-unsplash_1_isa1mb.jpg"
            alt="pizza"
            onLoad={() => {handleResize()}}
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute top-0 left-0 text-xl font-extrabold text-gray-100" id="food-text-1">food.</p>
        </div>
        <div className="relative lg:w-1/3 sm:w-1/2 w-full inline-block p-4" id="home-img-3">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1598036169/hans-vivek-vja1liByt0Y-unsplash-min_nrvdge.jpg"
            alt="musicians"
            onLoad={() => {handleResize()}}
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute bottom-0 right-0 text-xl font-extrabold text-gray-100" id="music-text">music.</p>
        </div>
        <div className="relative lg:w-1/3 sm:w-1/2 w-full inline-block p-4" id="home-img-2">
          <img src="https://res.cloudinary.com/dbhnjg0zu/image/upload/v1597980390/mekht-GuvimT4IFok-unsplash_2_qljtl6.jpg"
            alt="breakfast food"
            onLoad={() => {handleResize()}}
            className="object-cover home-img animate__animated animate__fadeIn"
          />
          <span className="absolute top-0 border-4 border-gray-100 inner-border-img"></span>
          <p className="absolute top-0 left-0 text-xl font-extrabold text-gray-100" id="food-text-2">but mostly food.</p>
        </div>
      </div>

      <Link to="/blog">
        <button className=" mt-4 h-16 w-64 loading-page text-gray-100 text-xl relative font-bold">
          dive in
        </button>
      </Link>
    </div>
  )
}

export default Home;