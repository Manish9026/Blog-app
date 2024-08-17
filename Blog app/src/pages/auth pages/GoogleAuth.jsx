import React from 'react'
import { headerIcons } from '../../assets/images/headerIcons'
import {useGoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'
import axios from 'axios'
import { urlLoader } from '../../utills/urlReload'
import { url } from '../../tools/serverURL'
import { useDispatch } from 'react-redux'
import { loginWithGoogle } from '../../sclice/authSlice/authSlice'


const GoogleAuth = ({mobileWindow}) => {

const dispatch=useDispatch();
  const googleResponse=async(result)=>{
      dispatch(loginWithGoogle(result.code))

  }
  const onGoogleLogin=useGoogleLogin({
    onSuccess:googleResponse,
    onError:googleResponse,
    flow:"auth-code"
  })
  return (
 
    <div className={(mobileWindow?"logo":"logo-section" )+ " section1"} onClick={()=>onGoogleLogin()}>
          <img className="auth-icons" src={headerIcons.google} />
         { mobileWindow?<p>google</p>:<p>login with google</p>}
        </div>
       
  )
}

export default GoogleAuth