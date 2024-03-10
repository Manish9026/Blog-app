import React, { useState } from "react"
import './login.css'
import axios from 'axios'
import { url } from "../../tools/serverURL"
export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [checked,setChecked]=useState(0)
 const [status,setStatus]=useState(0)
  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError("")
    setPasswordError("")

    // Check if the user has entered both fields correctly
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

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer")
      return
    }

    alert(JSON.stringify({email,password,checked,url}))
    axios.post(`${url}/user/s1/login`,{userEmail:email,password,tc:checked},{withCredentials:true}).then(res=>{ if(res.data.status){
        alert(res.data.message)
        setStatus(1)
    }}).catch(err=>{
        console.log(err);
    })

    // Authentication calls will be made here...
  }

  return (
    
  
        <div className="Auth-form-content">
       { 
       status? <div className="container">

       <div>successfully login</div>
       <button onClick={()=>setStatus(0)}> logout</button>
       </div>  :
      <form>
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
         <input type="checkbox"  readOnly checked={checked} onClick={()=>setChecked(prev=>!prev)}/>
        </div>
        
        <br />
        <div className="d-grid gap-2 mt-3">
          <input
            className="btn btn-primary"
            type="button"
            onClick={onButtonClick}
            value={"Log in"}
          />
        </div>
        <div className="text-center mt-3">
          <p className="text-muted">
            Forgot{" "}
            <a href="/register">password?</a>
          </p>
        </div>
      </form>

        }
    </div>
   
  )
}