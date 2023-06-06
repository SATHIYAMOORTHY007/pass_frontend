import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
function Reset() {
  const params = useParams()
  const nav = useNavigate()
  const myformik = useFormik({
    initialValues: {
      pwd: '',
      conpwd: '',
    },

    validate: (values) => {
      let errors = {}
      if (!values.pwd) {
        errors.pwd = 'please enter your possword'
      }
      if (!values.conpwd) {
        errors.conpwd = 'please enter your possword'
      }
      if (values.pwd !== values.conpwd) {
        errors.conpwd = 'please enter your possword'
      }
    },
    onSubmit: async (values) => {
      try {
        const value = await axios.post(
          `http://localhost:4000/auth/resetpassword/${params.id}/${params.token}`,
          values,
          {
            headers: {
              access_token: window.sessionStorage.getItem('access_token'),
            },
          },
        )
        nav('/')
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={myformik.handleSubmit}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <div className="row">
              <div className="col-3">
                <label htmlFor="pwd">Password</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="pwd"
                  className="form-control"
                  onChange={myformik.handleChange}
                  values={myformik.values.pwd}
                  name="pwd"
                />
              </div>
            </div>
            <span style={{ color: 'red' }}>{myformik.errors.pwd}</span>
            <div className="row">
              <div className="col-3">
                <label htmlFor="conpwd">conform Password</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="conpwd"
                  className="form-control"
                  onChange={myformik.handleChange}
                  values={myformik.values.conpwd}
                  name="conpwd"
                />
              </div>
              <span style={{ color: 'red' }}>{myformik.errors.conpwd}</span>
            </div>
            <button
              id="forgot_password_button"
              type="submit"
              className="btn  btn-danger py-3 mt-3"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reset
