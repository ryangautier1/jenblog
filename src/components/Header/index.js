import React from 'react';

function Header() {
  return (
    <header>
      <div className="min-w-full flex justify-between p-6">
        <h2 className="text-2xl text-red-700">Jen Blog</h2>
        <h2 className="text-2xl text-red-700">Logo here</h2>
      </div>
      <p className="text-gray-600 text-center italic px-4">
        "Some quote or phrase here would look nice maybe" - Jenny Benedict
      </p>
    </header>
  )
}

export default Header;