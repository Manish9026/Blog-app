import React ,{useState}from 'react'
import './header.scss'
import { headerIcons, navTitle } from '../../assets/images/headerIcons'
import { Link, NavLink, useLocation} from 'react-router-dom'
import { useEffect } from 'react'
import { getUserInfo, logout } from '../../sclice/authSlice/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { navTogle } from '../../sclice/navsliderSlice'



import { TbLogout } from "react-icons/tb";

const Header = () => {
  const {slideStatus}=useSelector(state=>{return state.navSlider})
const location=useLocation()
  const {userInfo}=useSelector(state=>state.userAuth)
const [isActive,setIsActive]=useState(false);
const dispatch=useDispatch();

useEffect(()=>{

  dispatch(getUserInfo())
},[location.pathname])



const UserProfile=()=>{
  return(
    <div className="user-prp">
  
    <img className="prp-img" src={userInfo.profile.profileImage} />
  <ul className="prp-name-c">
    <li>Hello,</li>
    <li>{userInfo.userName}</li>
  </ul>
</div>

  )
}
  return (
    
    
    <div className="left-nav" style={slideStatus?{minWidth:"80px",flex:"0"}:{}} onMouseEnter={()=>dispatch(navTogle("hover"))} >
      <div className="ellipse-10"></div>
      <div className="top-nav">

      {
       userInfo.length!=0? <UserProfile/>
      :<div className="userAuth">
        <div className='iconContainer'>
          <img src={headerIcons.userIcons} />
        </div> 
          
{ isActive?<NavLink  to={"/auth/sign-in"} state={{prevUrl:"/"}} className={({ isActive, isPending })=>{setIsActive(!isActive)}} >

 <p>Login now</p>

</NavLink>:<NavLink  to={"/auth/sign-up"} state={{prevUrl:"/"}} className={({ isActive, isPending })=>{console.log(isActive); setIsActive(isActive)}} >
 <p>Sign-up</p>
</NavLink>}
</div>
        
       

      }
        </div>


      <div className="bottom-nav">

        {
          navTitle.map((item,indx)=>{

            return(
             <NavLink to={item[2]} style={{display:"flex",width:"100%"}} key={indx}  >
<div style={{width:"100%"}} className="nav-title" >
          
          <div className="iconContainer">
            {/* <img className="nav-icon" src={item[0]} /> */}
           { item[0] }
          </div>
         
          <ul className='menuText'>
            <li>{item[1]}</li>
          </ul>
        </div>
        </NavLink>
            )
          })
        
}
<div style={{display:"flex",width:"100%"}}  onClick={()=>dispatch(logout())}>
<div className="nav-title" style={{width:"100%"}}>
         <div className="iconContainer">
         <TbLogout />
          
         </div>
         <ul className='menuText'>
            <li>logout</li>
          </ul>
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