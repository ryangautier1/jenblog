import React, { useState, useEffect } from 'react';

function Nav() {
  const [tabState, setTabState] = useState("youtube-tab");

  useEffect(() => {
    document.getElementById("youtube-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("instagram-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
    document.getElementById("about-tab").classList.remove("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");

    document.getElementById(tabState).classList.add("border-t-2", "sm:border-b-2", "sm:border-t-0", "border-red-700");
  },[tabState]);

  const handleTabChange = (newTab) => {
    setTabState(newTab);
  }

  return (
    <nav className="min-w-full sm:px-12 sm:mt-3 fixed sm:static bottom-0 border-t sm:border-none">
      <ul className="flex flex-row justify-around sm:justify-start">
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="youtube-tab" onClick={() => {handleTabChange("youtube-tab")}}>Youtube</li>
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="instagram-tab" onClick={() => {handleTabChange("instagram-tab")}}>Instagram</li>
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer" id="about-tab" onClick={() => {handleTabChange("about-tab")}}>About</li>
      </ul>
    </nav>
  )
}

export default Nav;