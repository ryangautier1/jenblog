import React, { useState, useEffect } from 'react';
// import headerGradient from '../../assets/gradient.png'
import API from '../../utils/API';
function Header() {
  const [userState, setUserState] = useState(false);
  useEffect(() => {
    API.getUserData().then(res => {
      setUserState(true);
    }).catch(err => {
      console.log("Not logged in");
      setUserState(false);})
  },[]);
  

  return (
    <header>
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Docs
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Examples
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Blog
      </a>
    </div>
    <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
    </div>
  </div>
</nav>
      {userState ? <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => API.logoutUser().then(() => {
              setUserState(false);
              window.location.reload();
            }).catch(err => console.log(err))}>
            Logout</button> : ""}
      {/* <div className="min-w-full mt-6">
        <img className="z-0 w-full h-16 sm:h-24 px-6 absolute top-0 mt-6" src={headerGradient} alt='Jen Blog Gradient'/>
        <div className="z-0 w-full h-16 sm:h-24 px-6 absolute top-0 mt-6 header-gradient" ></div>
        <div className="josefin absolute top-0 pt-1 mt-6 ml-10 z-10 flex flex-col header-caption">
          <p className="josefin text-3xl sm:text-5xl text-white leading-tight">Jen</p>
          <p className="josefin text-md sm:text-lg text-white">I post things.</p>
        </div>

        <div className="relative z-10 flex justify-between">
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div hidden sm:block"></div>
        </div>
      </div> */}
    </header>
  )
}

export default Header;