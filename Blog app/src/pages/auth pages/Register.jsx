import React, { useEffect, useState } from 'react'
import './auth.scss'
import social from '../../assets/images/socialImg.jpg'
import { headerIcons } from '../../assets/images/headerIcons'
import { imageBuffer } from '../../utills/imageBuffer'
import { useDispatch, useSelector } from 'react-redux'
import { getLogin, getRegister, isVerified } from '../../sclice/authSlice/authSlice'
import Loder from '../../component/loader/Loder'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../index.scss'
import privious from '../../custom hooks/privious'
import axios from 'axios'
import { url } from '../../tools/serverURL'
import { IoCloseSharp } from 'react-icons/io5'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate,Outlet ,useLocation,redirect} from 'react-router-dom'



 const Register = () => {


const {loading,status}=useSelector(state=>state.userAuth)
const [methodChanger,setMethodChanger]=useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
const location=useLocation();

// console.log(location.state);

useEffect(()=>{
if(status){

if(location.state){

  navigate(-1)

//  navigate(location.state.prevUrl)

 return
}
navigate(-1)
   
}else{
  navigate("/auth/sign-in",{
    state:{
      prevUrl:location.state?location.state.prevUrl : '/'
    }
  })
}

},[status])


 
  return (
    <div
    className="auth-section"
    style={{
        background: `url(${social}) center`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"}
      }

  >

    {loading?<Loder/>:""}
    <div className="auth-container">
    {/* <button onClick={()=>onClickHandler()}> reload</button> */}
    

      <div className="key-login-container">
        <div className="logo-section  section1">
          <img className="auth-icons" src={headerIcons.google} />
          <p>login with google</p>
        </div>
        <div className="logo-section section2">
          <img className="auth-icons" src={headerIcons.fb} />
          <p>login with facebook</p>
        </div>
        <div className="logo-section section3">
          <img className="auth-icons" src={headerIcons.githup} />
          <p>login with github</p>
        </div>
        <div className="or">or</div>
        <div className="logo-section  section3">
          <img className="auth-icons" src={headerIcons.gmail} />
          <p>login with email</p>
        </div>
      </div>
{/* {
    authMethod=="sign-in"?
<Login/>:<SignUP/>


} */}
<Outlet/>

<button className='loginOther' onClick={()=>setMethodChanger(prev=>!prev)}>
 <p>Login with other</p>
  <FaArrowRight className='arrow-icon'/>
</button>

<div className="login-method" style={methodChanger?{display:"flex"}:{display:"none"}}>
  <div className='heading row-flex'>
    <p>login with</p>
    <span className='close-icon' onClick={()=>setMethodChanger(prev=>!prev)}>

    <IoCloseSharp className='icon'/>
    </span>
  </div>
  <div className="method-container">

  <span className="logo  section1">
    <img src={headerIcons.google} alt="" />
    <p>google</p>
  </span>
  <span className="logo section2">
    <img src={headerIcons.fb} alt="" />
    <p>facebook</p>

  </span> 
  <span className="logo section3">
    <img src={headerIcons.gmail} alt="" />
    <p>gmail</p>

  </span> 
  <span className="logo section3">
    <img src={headerIcons.githup} alt="" />
    <p>github</p>

  </span> 
  </div>
  
</div>
    </div>
  </div>
  
  
  )



}


   const SignUP=()=>{

  const dispatch=useDispatch();
  const [errorField,setErrorField]=useState({
    email:0,
    name:0,
    password:0,
    cnfPassword:0,
    image:0
  })
  
  const [formData,setformData]=useState({
    file:"",
    userName:"",
    userEmail:"",
    password:"",
    cnfPassword:"",

  })

let image;const onchangeHandler=async(e)=>{
e.preventDefault();
// console.log(e);
let {files,name,value}=e.target;
// console.log(files,name,value);

switch(name){
case 'userEmail':setErrorField({email:0})
break

case 'userName':setErrorField({name:0})
break

case 'password':setErrorField({password:0})
break

default: setErrorField({cnfPassword:0})


}

if(files){






setformData((prev)=>{ return {
...prev,[name]:files[0]
}})

}else{
setformData((prev)=>{return {
  ...prev,[name]:value
}})

}


}


const submitHandler=(e)=>{
e.preventDefault();


console.log(formData);
if(!formData.file){
setErrorField(prev=>{
return {
  ...prev,image:true

}})
toast("kindly upload your profile image")
}

else if(!formData.userName){
setErrorField(prev=>{
return {
  ...prev,name:true

}})
toast("please enter userName")
return
}
else if(!formData.userEmail){
setErrorField(prev=>{
return {
  ...prev,email:true

}})
toast("please enter userEmail")

return

}
else if(!formData.password){


setErrorField(prev=>{
return {
  ...prev,password:1

}})
toast("empty  password")
return 

}

else if(formData.password!=formData.cnfPassword){

setErrorField(prev=>{
return {
  ...prev,cnfPassword:1

}})
toast("please enter same password")

return

}

else{
// console.log(formData);
dispatch(getRegister(formData))
}




}


 
    return(
        <div className="register-section">
        <form className="input-section" >
          <label  htmlFor="fileUP" className={`profile-pk-field  wrong-in`} style={errorField.image?{backgroundColor:"rgba(255, 57, 30, 0.28)",borderColor:"rgba(249, 60, 94, 0.59)"}:{}}>
            <img className="user-icons" src={formData.file?URL.createObjectURL(formData.file) : headerIcons.avtar} alt='image' />
            <h5 className="upload ">upload</h5>
            <input type="file"  id='fileUP' style={{display:"none"}} name='file'  onChange={(e)=>{onchangeHandler(e)}}/>

          </label>
          <div className="frame-133">
            <div className="in-field-2 in-field " style={errorField.name?{backgroundColor:"rgba(255, 57, 30, 0.28)",borderColor:"rgba(249, 60, 94, 0.59)"}:{}} >
              <input className="input-text" value={formData.userName} placeholder='acountName' name='userName' onChange={(e)=>onchangeHandler(e)}/>
            </div>
            <div className="field-1 in-field" style={errorField.email?{backgroundColor:"rgba(255, 57, 30, 0.28)",borderColor:"rgba(249, 60, 94, 0.59)"}:{}}>
              <input className="input-text" value={formData.userEmail} placeholder='userEmail'name='userEmail' onChange={(e)=>onchangeHandler(e)}/>
            </div>
            <div className="in-field-3 in-field" style={errorField.password?{backgroundColor:"rgba(255, 57, 30, 0.28)",borderColor:"rgba(249, 60, 94, 0.59)"}:{}}>
              <input className="input-text" type='password' value={formData.password} placeholder='password' name='password' onChange={(e)=>onchangeHandler(e)} />
            </div>
            <div className="in-field-3 in-field" style={errorField.cnfPassword?{backgroundColor:"rgba(255, 57, 30, 0.28)",borderColor:"rgba(249, 60, 94, 0.59)"}:{}}>
              <input className="input-text" value={formData.cnfPassword} placeholder='confirm password' type='password'  name='cnfPassword' onChange={(e)=>onchangeHandler(e)}  />
            </div>
          </div>
          <div className="sub-btn" onClick={(e)=>submitHandler(e)}>
            <button className="submit">submit</button>
          </div>
        </form>
        <div className="login-link">
          <div className="already-account">already account ?</div>
          <Link to='/auth/sign-in' className="" >sign in</Link>
        </div>
      </div>
    )


}

const Login=()=>{

  const dispatch=useDispatch();
  const [formData,setFormData]=useState({
    userEmail:"",
    password:"",
    tc:0,
  })


  const onchangeHandler=(e)=>{
    let name=e.target.name,value=e.target.value

    setFormData((prev)=>{
      return {
        ...prev,[name]:value
      }
    })
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    // toast("hfhh")
// console.log(formData);
dispatch(getLogin(formData))

  }
    return(
        <div className="login-section">

  <div className="login-container">
    <div className="header">
      <div className="login-now">Login Now</div>
    </div>
    <div className=" input l-infield-container">
      <div className="l-in-field input">
        {/* <p className='in-heading'>userEmail</p> */}
        <input className="l-in-text" placeholder='userEmail' type='text' name='userEmail' value={formData.userEmail} onChange={(e)=>onchangeHandler(e)}/>
      </div>
      <div className="input l-in-field">
      {/* <p className='in-heading'>password</p> */}

        <input className="l-in-text" placeholder='password' type='password' name='password' value={formData.password} onChange={(e)=>onchangeHandler(e)}/>
      </div>
      <div className="term-conditon" name="tc" onClick={()=>setFormData(prev=>{ return {...prev,tc:!prev.tc}})}>

       <input type="checkbox" className="rectangle-4" name="" id="" readOnly />
        <div className="term-condition">term &amp; condition</div>
      </div>
      <div className="submit-btn" onClick={(e)=>onSubmit(e)}>
        <button className="submit">submit</button>
      </div>
    </div>
    
  </div>
  <div className="signup-link">
      <div className="create-new-account">create new account ?</div>
      <Link to="/auth/sign-up" className="sign-up" >sign up</Link>
    </div>
</div>

    )
}



export default Register
export {SignUP,Login}



// export default register