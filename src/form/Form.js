import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
function Form() {
  const [isLoading, setLoading] = useState(false)
  const navigator = useNavigate()
  const [data, setData] = useState('')

  const myformik = useFormik({
    initialValues: {
      email_id: '',
      pwd: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.email_id) {
        errors.email_id = 'please enter email'
      }
      if (!values.pwd) {
        errors.pwd = 'please enter password'
      }
      return errors
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const value = await axios.post(
          'http://localhost:4000/auth/login/',
          values,
        )
        let token = value.data.token

        window.sessionStorage.setItem('access_token', token)
        navigator('/home')
      } catch (error) {
        alert('Not valid user')
        setData(error.response.data)
        setLoading(false)
      }
    },
  })

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Login Form</h1>

      <div className="container">
        <form onSubmit={myformik.handleSubmit}>
          <div className="row">
            <div className="col-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
            </div>
            <div className="col-4 mt-2">
              <input
                type="text"
                className={`form-control ${
                  myformik.errors.email_id ? 'is-invalid' : 'is-valid'
                }`}
                onChange={myformik.handleChange}
                values={myformik.values.email_id}
                name="email_id"
              />
              <span style={{ color: 'red' }}>{myformik.errors.email_id}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label htmlFor="email" className="form-label">
                password
              </label>
            </div>
            <div className="col-4 mt-2">
              <input
                type="password"
                className={`form-control ${
                  myformik.errors.pwd ? 'is-invalid' : 'is-valid'
                }`}
                onChange={myformik.handleChange}
                values={myformik.values.pwd}
                name="pwd"
              />
              <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Link to="/register">NewUser Register?</Link>
              <br />
              <Link to="/forgetpassword">Forget password?</Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="btn mt-2 btn-primary"
              >
                submit
              </button>
            </div>
          </div>
        </form>
        <div className="row"></div>
      </div>
    </>
  )
}

export default Form
