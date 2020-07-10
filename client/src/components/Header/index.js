import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png'
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
      <div className="min-w-full flex justify-between p-6">
        <h2 className="text-2xl text-red-700">Jen Blog</h2>
        <img className=" w-16" src={logo} alt='Jen Blog Logo'/>
        {userState ? <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={() => API.logoutUser().then(window.location.replace("/")).catch(err => console.log(err))}>
            Logout</button> : ""}
        </div>
      <p className="text-gray-500 text-center italic px-4">
        "Some quote or phrase here would look nice maybe" - Jenny Benedict
      </p>
    </header>
  )
}

export default Header;