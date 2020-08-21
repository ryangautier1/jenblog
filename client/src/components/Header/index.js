import React from 'react';
import { Link } from 'react-router-dom';
import AdminModal from '../AdminModal';
function Header(props) {
  const { toggleModal, userState, handleLogout } = props;

  const toggleNav = () => {
    if (window.innerWidth < 640) {
    document.getElementById("nav-area").classList.toggle("expanded");
    document.getElementsByTagName("nav")[0].classList.toggle("expanded-nav");
    document.getElementById("nav-modal-bg").classList.toggle("hidden");
    }
  }

  const toggleDots = (n) => {
    // toggle side bars on small screens
    if (window.innerWidth < 640) {
      let bar1 = document.getElementById("bar-" + n + "1");
      let bar2 = document.getElementById("bar-" + n + "2");
      bar1.classList.toggle("w-0");
      bar1.classList.toggle("w-6");
      bar1.classList.toggle("border");

      bar2.classList.toggle("w-0");
      bar2.classList.toggle("w-6");
      bar2.classList.toggle("border");
    }
    //on larger screens, toggle bottom border
    else {
      let bar = document.getElementById("bar-b-" + n);
      bar.classList.toggle("opacity-0");
      bar.classList.toggle("border");
    }
  }

  return (
    <header>

      <div className="modal-bg hidden opacity-50 z-30 bg-black fixed top-0 left-0"
        id="nav-modal-bg"
        onClick={() => { toggleNav() }}></div>

      <div className="min-w-full py-2 px-4 flex flex-col z-40 fixed top-0 header-gradient" id="nav-area">
        <div className="flex flex-row min-w-full justify-between">

          <Link to={"/"} >
            <h1 className="text-3xl varta text-gray-100">blogATX</h1>
          </Link>

          <div className="block sm:hidden border-2 border-gray-100 h-8 w-8 mt-1 flex-col flex justify-around py-1 items-center cursor-pointer"
            onClick={() => toggleNav()}>
            <div className=" border border-gray-100 w-4"></div>
            <div className=" border border-gray-100 w-4"></div>
            <div className=" border border-gray-100 w-4"></div>
          </div>

        </div>

        <nav className="sm:flex sm:flex-row sm:justify-end sm:pr-4 sm:pt-1 lato text-gray-100 min-w-full text-center fixed text-lg">
          <ul className="flex flex-col sm:flex-row">
            <li className="mb-2 text-center inline-block">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 nav-transition" id="bar-11"></div>
              <Link to={"/"} >
                <span className="inline-block cursor-pointer"
                  onMouseOver={() => { toggleDots("1") }}
                  onMouseOut={() => { toggleDots("1") }}
                  onClick={() => toggleNav()}>
                  Home
                  <div className="w-12 mb-1 opacity-0 bg-gray-100 absolute bottom-0 nav-transition" id="bar-b-1"></div>
                </span>
              </Link>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 nav-transition" id="bar-12"></div>
              <div className="w-0 bg-gray-100 absolute bottom-0 nav-transition" id="bar-b-1"></div>
            </li>
            <li className="mb-2 text-center inline-block">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 nav-transition" id="bar-21"></div>
              <Link to={"/about"} >
                <span className="inline-block cursor-pointer"
                  onMouseOver={() => { toggleDots("2") }}
                  onMouseOut={() => { toggleDots("2") }}
                  onClick={() => toggleNav()}>
                  About
                  <div className="w-12 mb-1 opacity-0 bg-gray-100 absolute bottom-0 nav-transition" id="bar-b-2"></div>
                </span>
              </Link>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 nav-transition" id="bar-22"></div>
            </li>
            <li className="mb-2 text-center inline-block">
              <div className="w-0 bg-gray-100 inline-block mr-5 mb-1 nav-transition" id="bar-31"></div>
              <Link to={"/blog"} >

                <span className="inline-block cursor-pointer"
                  onMouseOver={() => { toggleDots("3") }}
                  onMouseOut={() => { toggleDots("3") }}
                  onClick={() => toggleNav()}>
                  Blog
                  <div className="w-8 mb-1 opacity-0 bg-gray-100 absolute bottom-0 nav-transition" id="bar-b-3"></div>
                </span>
              </Link>
              <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 nav-transition" id="bar-32"></div>
            </li>

            {userState ?
              // if the user is logged in, display admin modal and logout buttons
              <li className="flex flex-row justify-around mr-5">
                <AdminModal toggleModal={toggleModal} />
                <button type="button" className="ml-2 text-sm shadow border-2 border-gray-100 hover:text-red-500 hover:bg-gray-100 focus:outline-none text-white font-bold py-1 px-2 sm:px-3"
                  onClick={() => handleLogout()}>
                  logout</button>
              </li>
              :
              // if the user is not logged in, display login button
              <li className="text-center inline-block">
                <div className="relative w-0 bg-gray-100 inline-block mr-5 mb-1 nav-transition" id="bar-41"></div>
                <Link to={"/admin"} >
                  <span className="inline-block cursor-pointer"
                    onMouseOver={() => { toggleDots("4") }}
                    onMouseOut={() => { toggleDots("4") }}
                    onClick={() => toggleNav()}>
                    Admin
                    <div className="w-12 mb-1 opacity-0 bg-gray-100 absolute bottom-0 nav-transition" id="bar-b-4"></div>

                  </span>
                </Link>
                <div className="w-0 bg-gray-100 inline-block ml-5 mb-1 nav-transition" id="bar-42"></div>
              </li>
            }

          </ul>
        </nav>

      </div>

    </header>


  )
}

export default Header;