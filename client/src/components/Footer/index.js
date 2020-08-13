import React from 'react';

function Footer() {
  return (
    <footer className="pt-3 text-gray-200 opacity-75 bg-gray-600">
      <div className="pt-4 flex flex-col justify-center">
        <p className="text-md sm:text-lg mb-1">
          Developed by Ryan Gautier
        </p>
        <div className="text-3xl sm:text-4xl">
          <a href="https://github.com/ryangautier1" target="_blank" rel="noreferrer noopener"
          className="mr-4 hover:text-gray-400">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/ryangautier1/" target="_blank" rel="noreferrer noopener"
          className="hover:text-gray-400">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;