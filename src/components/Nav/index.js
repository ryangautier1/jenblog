import React from 'react';

function Nav() {
  return (
    <nav className="min-w-full sm:px-12 sm:mt-3 fixed sm:static bottom-0">
      <ul className="flex flex-row">
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer sm:border-b-2 sm:border-red-700">Youtube</li>
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer">Instagram</li>
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer">About</li>
      </ul>
    </nav>
  )
}

export default Nav;