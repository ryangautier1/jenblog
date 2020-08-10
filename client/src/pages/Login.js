import React, { useRef } from 'react';
import API from '../utils/API';

function Login() {

  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin(event) {
    event.preventDefault();
    API.loginUser({
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }).then(() => {
      console.log("logged in");
      window.location.replace("/");
    }).catch(err => {
      console.log("Couldn't log in... ", err);
    })
  }

  return (
    <form className="px-4 mx-auto mt-12 w-full max-w-md">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          <input 
            className="bg-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            id="username"
            type="text"
            placeholder="JennyBenedict"
            ref={usernameRef}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input 
            className="bg-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
            id="password"
            type="password"
            placeholder="******"
            ref={passwordRef}
          />
        </div>
      </div>        
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button className="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4"
              onClick={handleLogin}>
              Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;