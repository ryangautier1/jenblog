import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
function Header() {
  const [userState, setUserState] = useState(false);
  useEffect(() => {
    API.getUserData().then(res => {
      setUserState(true);
    }).catch(err => {
      console.log("Not logged in");
      setUserState(false);
    })
  }, []);


  return (
    <header>
      <div className="min-w-full py-2 px-4 bg-white flex flex-row justify-between z-10 relative">
        <h1 className="text-3xl">Title</h1>
        {userState ? <button type="button" className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          onClick={() => API.logoutUser().then(() => {
            setUserState(false);
            window.location.reload();
          }).catch(err => console.log(err))}>
          Logout</button>
          :
          <Link to={"/admin"} >
            <button className="shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4">
              Sign in</button>
          </Link>}
      </div>
    </header>
  )
}

export default Header;