import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  // use state for setting active tab
  const [tabState, setTabState] = useState("home-tab");

  // when the tab state is updated, change the active tab on the page
  useEffect(() => {
    document.getElementById("youtube-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("instagram-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("home-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");

    document.getElementById(tabState).classList.add("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
  },[tabState]);

  // update tab state on click
  const handleTabChange = (newTab) => {
    setTabState(newTab);
  }

  return (
    <nav className="min-w-full sm:px-12 sm:mt-3 fixed sm:static bottom-0 border-t sm:rounded-none sm:border-none">
      <ul className="flex flex-row justify-around sm:justify-start">
        
        <Link to="/">
          <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="home-tab" onClick={() => {handleTabChange("home-tab")}}>Home</li>
        </Link>

        <Link to="/youtube">
          <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="youtube-tab" onClick={() => {handleTabChange("youtube-tab")}}>Youtube</li>
        </Link>

        <Link to="/instagram">
          <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="instagram-tab" onClick={() => {handleTabChange("instagram-tab")}}>Instagram</li>
        </Link>
        
      </ul>
    </nav>
  )
}

export default Nav;