import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  // use state for setting active tab
  const [tabState, setTabState] = useState("home-tab");
  const [navState, setNavState] = useState(120)

  // on page load, set tab state based on current page
  useEffect(() => {
    if (window.location.pathname === "/") {
      setTabState("home-tab");
    }
    else {
      setTabState(window.location.pathname.substring(1) + "-tab");
    }
    // setNavState(document.getElementById("nav-area").offsetTop);

  }, []);

  // when the tab state is updated, change the active tab on the page
  useEffect(() => {
    document.getElementById("youtube-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("instagram-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("home-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");

    document.getElementById(tabState).classList.add("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
  }, [tabState]);

  // update tab state on click
  const handleTabChange = (newTab) => {
    setTabState(newTab);
  }

  const navStyle = "px-2 pb-2 mx-2 pt-1 text-md text-gray-700 cursor-pointer";

  window.addEventListener("scroll", function () {
    if (window.scrollY > navState) {
      if (window.innerWidth > 640) {
        document.getElementById("nav-area").classList.add("fixed", "top-0");
        document.getElementsByTagName("main")[0].classList.add("extra-margin");
      }
    }
    else {
      if (window.innerWidth > 640) {
        document.getElementById("nav-area").classList.remove("fixed", "top-0");
        document.getElementsByTagName("main")[0].classList.remove("extra-margin");
      }
    }
  })

  return (
    <div id="nav-area" className="z-10 w-full">
      <nav className="varta min-w-full my-nav sm:px-12 sm:pt-3 fixed sm:static bottom-0 sm:rounded-none border-none sm:bg-transparent z-10">
        <ul className="flex flex-row justify-around sm:justify-start">

          <Link to="/">
            <li className={navStyle} id="home-tab" onClick={() => { handleTabChange("home-tab") }}>Home</li>
          </Link>

          <Link to="/youtube">
            <li className={navStyle} id="youtube-tab" onClick={() => { handleTabChange("youtube-tab") }}>Youtube</li>
          </Link>

          <Link to="/instagram">
            <li className={navStyle} id="instagram-tab" onClick={() => { handleTabChange("instagram-tab") }}>Instagram</li>
          </Link>

        </ul>
      </nav>
      <div className="nav-page-effect h-16 bg-transparent z-0 absolute hidden sm:block"></div>
    </div>
  )
}

export default Nav;