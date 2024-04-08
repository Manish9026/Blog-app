import React, { useEffect } from 'react'
import './style.scss'
import { navTitle } from '../../../assets/images/headerIcons'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navTogle } from '../../../sclice/navsliderSlice';
import { getUserInfo, logout } from '../../../sclice/authSlice/authSlice';
import { FaArrowRight } from 'react-icons/fa';

const MenuBar = () => {
    const {slideStatus}=useSelector(state=>{return state.navSlider})
  const {userInfo}=useSelector(state=>state.userAuth)

    const location=useLocation()

    const dispatch=useDispatch()
//    console.log(navTitle,slideStatus,userInfo);

   useEffect(()=>{
   
  dispatch(getUserInfo())
   },[location.pathname])
//    console.log("jhhg",userInfo);
    return (
        <section className={"menu-bar-section "}
        style={slideStatus?{transform:"translatex(0)"}:{transform:"translatex(-600px)"}} >
            <div className="top-section">
                <div className="pro-container">
                    <div className="like-box">
                        <p className="pro-txt">5 </p>
                        <h6 className="likes">Likes </h6>
                    </div>
                    <div className="follower-box">
                        <p className="pro-txt">5 </p>
                        <h6 className="followers">followers </h6>
                    </div>
                    <div className="user-name">{userInfo?userInfo.userName:<p>userName</p>} </div>
                    <div className="img-section">
                        <img className="manish-img-2" src={userInfo.profile?userInfo.profile.profileImage : ""} />
                    </div>
                </div>
                <div className="status-section">
                    <div className="status-box">
                        <div className="_23">23 </div>
                        <div className="friends">friends </div>
                    </div>
                    <div className="status-box2">
                        <div className="_23">23 </div>
                        <div className="blogs">Blogs </div>
                    </div>
                    <div className="status-box3">
                        <div className="_23">23 </div>
                        <div className="posts">posts </div>
                    </div>
                </div>

               {!(userInfo.length!=0 && userInfo)? 
                <div className="auth-btn">
                    <Link to={"/auth/sign-in"} state={{prevUrl:"/"}} className='loginBtn' onClick={()=>dispatch(navTogle("onclick"))}>
                    
                    <button>login now</button>
                    <FaArrowRight className='icon'/>
                    </Link>
                    
                </div>:""}


                <button className="close-icon" onClick={()=>dispatch(navTogle("onclick"))}>
                    X
                </button>
            </div>
            <div className="nav-titles-section">

                {
                    navTitle.map((title,indx)=>{
                        return(
                            <Link to={title[2]} state={{prevUrl:title[2]}} className="title-box" key={indx} 
                            onClick={()=>dispatch(navTogle("onclick"))}>
                    <div className="icon-section">
                        <img className="manish-img-2" src={title[0]} width={"100%"} height={"100%"}/>
                    </div>
                    <div className="title">
                        <div className="home">{title[1]} </div>
                    </div>
                   <ArrowIcon/>
                             </Link>
                        )
                    })

                }
                
            </div>
            <div className="bottom-section">
                <button className="logout-btn" onClick={()=>dispatch(logout())}>

                    <div className="logout">logout </div>
                </button>
            </div>
        </section>
    );



}

const ArrowIcon=()=>{
    return(
        <svg
  className="arrow-icon"
  width="15"
  height="20"
  viewBox="0 0 15 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M4.25 2.35564L14.1803 10L4.25 17.6444L4.25 2.35564Z"
    stroke="#2CF589"
    strokeOpacity="0.8"
  />
</svg>
    )
}
export default MenuBar