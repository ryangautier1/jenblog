import React from 'react';
import { Link } from 'react-router-dom';
import AdminModal from '../AdminModal';
function Header(props) {
  const { toggleModal, userState, handleLogout } = props;

  const toggleNav = () => {
    document.getElementById("nav-area").classList.toggle("expanded");
    if (document.getElementById("search")) {
      document.getElementById("search").classList.toggle("expanded-search");
    }
  }

  return (
    <header>
      <div className="min-w-full py-2 px-4 bg-white flex flex-row justify-between z-20 fixed top-0 header-gradient"
      id="nav-area">
      <Link to={"/"} >
        <h1 className="text-3xl varta text-gray-100">blogATX</h1>
      </Link>
        <div>
          {/* {userState ?
          // if the user is logged in, display admin modal and logout buttons
          <div className="flex flex-row">
            <AdminModal toggleModal={toggleModal} />
            <button type="button" className="ml-2 text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-2 px-2 sm:px-4"
              onClick={() => handleLogout()}>
              logout</button>
          </div>
            :
            // if the user is not logged in, display login button
            <Link to={"/admin"} >
              <button className="text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-2 px-4">
                sign in</button>
            </Link>} */}
            <div className="border-2 border-gray-100 h-8 w-8 mt-1 flex-col flex justify-around py-1 items-center cursor-pointer"
            onClick={() => toggleNav()}>
              <div className=" border border-gray-100 w-4"></div>
              <div className=" border border-gray-100 w-4"></div>
              <div className=" border border-gray-100 w-4"></div>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header;