import React from 'react';

function Nav() {
  return (
    <nav className="min-w-full">
      <ul className="flex flex-row">
        <li className="p-2 mx-2 text-md text-gray-700 border-b-2 border-red-700">Youtube</li>
        <li className="p-2 mx-2 text-md text-gray-700">Instagram</li>
        <li className="p-2 mx-2 text-md text-gray-700">About</li>
      </ul>
    </nav>
  )
}

export default Nav;