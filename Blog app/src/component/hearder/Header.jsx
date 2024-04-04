import React from 'react'
import './header.scss'
import { headerIcons, navTitle } from '../../assets/images/headerIcons'
import { Link, useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import { getUserInfo, logout } from '../../sclice/authSlice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { navTogle } from '../../sclice/navsliderSlice'

const Header = () => {
  const {slideStatus}=useSelector(state=>{return state.navSlider})
const location=useLocation()
  const {userInfo}=useSelector(state=>state.userAuth)
const navLinks=[
  "/",
  "/friends","saved-story","/user/message","/user/comments","history"
]
const dispatch=useDispatch();

useEffect(()=>{

  dispatch(getUserInfo())
},[location.pathname])



const UserProfile=()=>{
  return(
    <div className="user-prp">
  <div className="prp-icon">
    <img className="prp-img" src={userInfo.profile.profileImage} />
  </div>
  <div className="prp-name-c">
    <p className="prp-helo">Hello,</p>
    <p className="prp-name">{userInfo.userName}</p>
  </div>
</div>

  )
}
  return (
    
    
    <div className="left-nav" style={slideStatus?{minWidth:"82px",flex:"0"}:{}} onMouseEnter={()=>dispatch(navTogle("hover"))} >
      <div className="ellipse-10"></div>

      {
       userInfo.length!=0? <UserProfile/>
      :
      <div className="top-nav">
        <div className="user-icon">
          <img className={"male-user"} src={headerIcons.userIcons} />
        </div>   
 <Link  to={"/sign-up"} className="login-btn">
 <div className="s-ign-up">SIgn Up</div>
</Link>
        
       

      </div>
}

      <div className="bottom-nav">

        {
          navTitle.map((item,indx)=>{

            return(
             <Link to={item[2]} style={{display:"flex",width:"100%"}} key={indx}>
<div className="nav-title" style={{width:"100%"}}>
          <div className="title-icon" >
            <img className="nav-icon" src={item[0]} />
          </div>
          <div className="title-btn" >
            <div className="home">{item[1]}</div>
          </div>
        </div>
        </Link>
            )
          })
        
}
<div style={{display:"flex",width:"100%"}}  onClick={()=>dispatch(logout())}>
<div className="nav-title" style={{width:"100%"}}>
          <div className="title-icon" >
            <img className="nav-icon" src={headerIcons.logout} />
          </div>
          <div className="title-btn" >
            <div className="home">logout</div>
          </div>
        </div>
        </div>
      </div>
      <div className="ellipse-102"></div>
      <div className="ellipse-103"></div>
      <div className="ellipse-104"></div>
    </div>

  )
}





export default Header