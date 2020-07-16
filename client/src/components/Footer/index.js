import React from 'react';

function Footer() {
  return (
    <footer className="flex flex-row pt-3 text-gray-200 opacity-75 bg-gray-600 justify-around">
      <div className="pt-4 text-3xl sm:text-4xl flex justify-center w-6/12">
        <i class="fab px-4 fa-youtube"></i>
        <i class="fab px-4 fa-instagram"></i>
        <i class="fab px-4 fa-linkedin"></i>
      </div>
      <div className="pt-4 w-6/12 text-md sm:text-lg">
        <p>
          email@gmail.com
          <br />
          +1(555)-555-5555
        </p>
      </div>
    </footer>
  )
}

export default Footer;