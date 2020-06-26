import React from 'react';

function Login() {
  return (
    <div className="my-5 mx-auto ">
      <form>
        <label forHtml="username">Username</label>
        <input className="" id="username" type="text"></input>
        <label forHtml="password">Password</label>
        <input className="" id="password" type="password"></input>
        <button type="submit"></button>
      </form>
    </div>
  )
}

export default Login;