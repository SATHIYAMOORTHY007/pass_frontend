import React, { useState } from 'react'
import '../forgetpassword/forgetpassword.css'
import { useFormik } from 'formik'
import axios from 'axios'
function Forgetpassword() {
  const [data, setData] = useState('')
  const myformik = useFormik({
    initialValues: {
      email_Id: '',
    },

    validate: (values) => {
      let errors = {}
      if (!values.email_Id) {
        errors.email_Id = 'please enter your email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_Id)
      ) {
        errors.email_Id = 'Invalid email address'
      }
    },
    onSubmit: async (values) => {
      try {
        const value = await axios.post(
          `https://pass-backend-37pg.onrender.com/auth/forgetpassword/`,
          values,
          {
            headers: {
              access_token: window.sessionStorage.getItem('access_token'),
            },
          },
        )
        const al = value.data

        if (value.data.message) {
          return alert('email doesnot Exists....')
        }
        alert(al)
        myformik.values.email_Id = ''
      } catch (err) {
        console.log(err)
      }
    },
  })
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5 col-md-10">
        <form className="shadow-lg" onSubmit={myformik.handleSubmit}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <div className="row">
              <div className="col-3">
                <label htmlFor="email_field">Enter Email</label>
              </div>
              <div className="col-6">
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  onChange={myformik.handleChange}
                  values={myformik.values.email_Id}
                  name="email_Id"
                />
              </div>
            </div>
            <span style={{ color: 'red' }}>{myformik.errors.email_Id}</span>
            <button
              id="forgot_password_button"
              type="submit"
              className="btn  btn-danger py-3 mt-3"
            >
              Send Email
            </button>
          </div>
        </form>
        {data}
      </div>
    </div>
  )
}

export default Forgetpassword
