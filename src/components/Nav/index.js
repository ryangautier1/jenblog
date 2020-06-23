import React from 'react';

function Nav() {
  return (
    <nav className="min-w-full sm:px-12 sm:mt-3 fixed sm:static bottom-0 border-t sm:border-none">
      <ul className="flex flex-row justify-around sm:justify-start">
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer border-t-2 sm:border-b-2 sm:border-t-0 border-red-700">Youtube</li>
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer">Instagram</li>
        <li className="px-2 pb-2 pt-1 mx-2 text-md text-gray-700 cursor-pointer">About</li>
      </ul>
    </nav>
  )
}

export default Nav;