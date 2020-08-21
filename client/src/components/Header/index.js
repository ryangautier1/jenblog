import React from 'react';
import { Link } from 'react-router-dom';
import AdminModal from '../AdminModal';
function Header(props) {
  const { toggleModal, userState, handleLogout } = props;

  const toggleNav = () => {
    document.getElementById("nav-area").classList.toggle("expanded");
    document.getElementsByTagName("nav")[0].classList.toggle("expanded-nav");
    if (document.getElementById("search")) {
      document.getElementById("search").classList.toggle("expanded-search");
    }
  }

  const toggleDots = (event) => {
    let dot1 = event.target.parentElement.children[0];
    let dot2 = event.target.parentElement.children[2];
    dot1.classList.toggle("w-0");
    dot1.classList.toggle("w-6");
    dot1.classList.toggle("border");

    dot2.classList.toggle("w-0");
    dot2.classList.toggle("w-6");
    dot2.classList.toggle("border");
  }

  return (
    <header className="flex flex-col">
      <div className="min-w-full py-2 px-4 flex flex-col z-20 fixed top-0 header-gradient" id="nav-area">
        <div className="flex flex-row min-w-full justify-between">

          <Link to={"/"} >
            <h1 className="text-3xl varta text-gray-100">blogATX</h1>
          </Link>

          <div className="border-2 border-gray-100 h-8 w-8 mt-1 flex-col flex justify-around py-1 items-center cursor-pointer"
            onClick={() => toggleNav()}>
            <div className=" border border-gray-100 w-4"></div>
            <div className=" border border-gray-100 w-4"></div>
            <div className=" border border-gray-100 w-4"></div>
          </div>

        </div>
        <nav className="lato text-gray-100 min-w-full text-center fixed text-lg">
          <ul>
            <li className="mb-2 text-center">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 dot"></div>
              <span className="inline-block cursor-pointer"
                onMouseOver={(event) => { toggleDots(event) }}
                onMouseOut={(event) => { toggleDots(event) }}>
                Home</span>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 dot"></div>
            </li>
            <li className="mb-2 text-center">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 dot"></div>
              <span className="inline-block cursor-pointer"
                onMouseOver={(event) => { toggleDots(event) }}
                onMouseOut={(event) => { toggleDots(event) }}>
                About</span>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 dot"></div>
            </li>
            <li className="mb-2 text-center">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 dot"></div>
              <span className="inline-block cursor-pointer"
                onMouseOver={(event) => { toggleDots(event) }}
                onMouseOut={(event) => { toggleDots(event) }}>
                Blog</span>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 dot"></div>
            </li>
            <li className="text-center">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 dot"></div>
              <span className="inline-block cursor-pointer"
                onMouseOver={(event) => { toggleDots(event) }}
                onMouseOut={(event) => { toggleDots(event) }}>
                Admin</span>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 dot"></div>
            </li>
          </ul>
        </nav>

      </div>


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
    </header>


  )
}

export default Header;