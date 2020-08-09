import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminModal from '../AdminModal';
import API from '../../utils/API';
function Header(props) {
  const [userState, setUserState] = useState(false);
  const { toggleModal } = props;
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
      <div className="min-w-full py-2 px-4 bg-white flex flex-row justify-between z-20 relative header-gradient">
        <h1 className="text-3xl varta text-gray-100">blog site</h1>
        <div>
          {userState ?
          <div className="flex flex-row">

            <AdminModal toggleModal={toggleModal} />

            <button type="button" className="ml-2 text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-2 px-2 sm:px-4"
              onClick={() => API.logoutUser().then(() => {
                setUserState(false);
                window.location.reload();
              }).catch(err => console.log(err))}>
              logout</button>
          </div>            
            :
            <Link to={"/admin"} >
              <button className="text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-2 px-4">
                sign in</button>
            </Link>}
        </div>
      </div>
    </header>
  )
}

export default Header;