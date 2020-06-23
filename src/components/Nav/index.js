import React from 'react';

function Nav() {
  return (
    <nav className="min-w-full px-12 mt-3">
      <ul className="flex flex-row">
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer border-b-2 border-red-700">Youtube</li>
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer">Instagram</li>
        <li className="p-2 mx-2 text-md text-gray-700 cursor-pointer">About</li>
      </ul>
    </nav>
  )
}

export default Nav;