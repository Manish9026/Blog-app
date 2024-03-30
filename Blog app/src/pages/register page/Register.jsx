import axios from "axios"
import React, { useState } from "react"
import { url } from "../../tools/serverURL"
import { useDispatch } from "react-redux"
import { isVerified } from "../../sclice/authSlice/authSlice"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
 const dispatch=useDispatch();

 
  const onButtonClick = () => {
    // Set initial error values to empty
    setNameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmPasswordError("")

    // Check if the user has entered all fields correctly
    if ("" === name) {
      setNameError("Please enter your name")
      return
    }

    if ("" === email) {
      setEmailError("Please enter your email")
      return
    }

    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    if ("" === password) {
      setPasswordError("Please enter a password")
      return
    }

    if (password.length < 8) {
      setPasswordError("The password must be 8 characters or longer")
      return
    }

    if ("" === confirmPassword) {
      setConfirmPasswordError("Please confirm your password")
      return
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("The passwords do not match")
      return
    }
    console.log(name,email,password)

    axios.post(`${url}/user/s1/register`,{userName:name,userEmail:email,password}).then(res=>{
        if(res.data.status){
            alert(res.data.message)
        }
    })

    // Handle successful registration here
  }

  return (
    <div className="Auth-form-content">
      <form noValidate>
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            placeholder="Enter your name here"
            onChange={(ev) => setName(ev.target.value)}
            type="text"
            className="form-control mt-1"
            id="name"
          />
          <label className="errorLabel">{nameError}</label>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            type="email"
            className="form-control mt-1"
            id="email"
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            type="password"
            className="form-control mt-1"
            id="password"
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPassword}
            placeholder="Confirm your password here"
            onChange={(ev) => setConfirmPassword(ev.target.value)}
            type="password"
            className="form-control mt-1"
            id="confirmPassword"
          />
          <label className="errorLabel">{confirmPasswordError}</label>
        </div>
        <div className="d-grid gap-2 mt-3">
          <input
            className="btn btn-primary"
            type="button"
            onClick={onButtonClick}
            value="Register"
          />
        </div>
        <p className="text-center mt-5">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
      </div>
  )
}
