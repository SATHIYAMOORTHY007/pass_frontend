import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Home() {
  const navigator = useNavigate()
  function logout() {
    window.sessionStorage.clear('access_token')
    navigator('/')
  }
  return (
    <>
      <div className="row">
        <button className="btn btn-dark" onClick={() => logout()}>
          Logout
        </button>
        <div className="col">
          <h1> hello user</h1>
        </div>
      </div>
    </>
  )
}

export default Home
