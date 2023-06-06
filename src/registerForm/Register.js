import React, { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import axios from 'axios'

function Register() {
  const [loading, setloading] = useState(false)
  const navigator = useNavigate()

  const [data, setData] = useState('')
  const myformik = useFormik({
    initialValues: {
      username: '',
      email_id: '',
      pwd: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.username) {
        errors.username = 'please enter your name'
      }
      if (!values.email_id) {
        errors.email_id = 'please enter your email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)
      ) {
        errors.email_id = 'Invalid email address'
      }
      if (!values.pwd) {
        errors.pwd = 'please enter password'
      }
      return errors
    },
    onSubmit: async (values) => {
      setloading(true)
      try {
        const value = await axios.post(
          'http://localhost:4000/auth/register/',
          values,
          {
            headers: {
              access_token: window.sessionStorage.getItem('access_token'),
            },
          },
        )
        if (value.data.message) {
          setData(value.data.message)
          setloading(false)
          alert('success')
          navigator('/')
        } else {
          setData(value.data.message)
          setloading(false)
          navigator('/')
        }
      } catch (error) {
        setData(error.response.data.message)
        console.log('error ', error.response.data.message)
        setloading(false)
      }
    },
  })

  return (
    <>
      <div style={{ textAlign: 'center', fontSize: '2em' }}>Register Form</div>
      <div className="register-from">
        <form onSubmit={myformik.handleSubmit}>
          <div className="row ">
            <div className="col-2">
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </div>
            <div className="col-4 ">
              <input
                type="text"
                placeholder=""
                className={`form-control ${
                  myformik.errors.username ? 'is-invalid' : 'is-valid'
                }`}
                onChange={myformik.handleChange}
                values={myformik.values.username}
                name="username"
              />
              <span style={{ color: 'red' }}>{myformik.errors.username}</span>
            </div>
          </div>
          <div className="row form-row">
            <div className="col-2">
              <lable forhtml="email_id">E-mail</lable>
            </div>
            <div className="col-4">
              <input
                input="text"
                className={`formcontrol${
                  myformik.errors.email_id ? 'is-invalid' : 'is-valid'
                }`}
                placeholder="enter your email"
                onChange={myformik.handleChange}
                values={myformik.values.email_id}
                name="email_id"
              ></input>
            </div>
            <span style={{ color: 'red' }}>{myformik.errors.email_id}</span>
          </div>
          <div className="row form-row">
            <div className="col-2">
              <lable forhtml="password">password</lable>
            </div>
            <div className="col-4">
              <input
                className={`formcontrol${
                  myformik.errors.pwd ? 'is-invalid' : 'is-valid'
                }`}
                input="text"
                onChange={myformik.handleChange}
                values={myformik.values.pwd}
                name="pwd"
                placeholder="enter your password"
              ></input>
            </div>
            <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
          </div>

          <div className="row">
            <div className="col-10">
              <button
                type="sumbit"
                disabled={loading}
                value={loading ? 'submit' : 'submit'}
                className="btn mt-2 btn-primary"
              >
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register
