import React, { useState, useEffect } from 'react';
import headerGradient from '../../assets/gradient.png'
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
      <div className="min-w-full mt-6">
        <img className="z-0 w-full h-16 sm:h-24 px-6 absolute top-0 mt-6" src={headerGradient} alt='Jen Blog Gradient'/>
        <div className="z-0 w-full h-16 sm:h-24 px-6 absolute top-0 mt-6 header-gradient" ></div>
        <div className="josefin absolute top-0 pt-1 mt-6 ml-10 z-10 flex flex-col header-caption">
          {/* <p className="josefin text-3xl sm:text-5xl text-white leading-tight">Jen</p>
          <p className="josefin text-md sm:text-lg text-white">I post things.</p> */}
        </div>

        <div className="relative z-10 flex justify-between">
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div"></div>
          <div className="w-6 h-16 sm:h-24 header-div hidden sm:block"></div>
        </div>
        {userState ? <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => API.logoutUser().then(() => {
              setUserState(false);
              window.location.reload();
            }).catch(err => console.log(err))}>
            Logout</button> : ""}
        </div>
    </header>
  )
}

export default Header;