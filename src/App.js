import './App.css'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Forgetpassword from './forgetpassword/Forgetpassword'
import Register from './registerForm/Register'
import Form from './form/Form'
import Reset from '../src/resetpassword/Reset'
function Auth({ children }) {
  const token = window.sessionStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/" />
  } else {
    return children
  }
}
function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword/:id/:token" element={<Reset />} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
