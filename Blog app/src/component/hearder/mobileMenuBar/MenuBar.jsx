import React, { useEffect } from 'react'
import './style.scss'
import { headerIcons, navTitle } from '../../../assets/images/headerIcons'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { navTogle } from '../../../sclice/navsliderSlice';
import { getUserInfo, logout } from '../../../sclice/authSlice/authSlice';
import { FaArrowRight, FaPowerOff } from 'react-icons/fa';
import { logo } from '../../../assets/react-icons';
import { FaXmark } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';

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


        <section onClick={()=>dispatch(navTogle("onclick"))} className={` m-nav-section capitalize ${slideStatus?"translate-x-[0]":"translate-x-[-100vw]"} gap-1 flex-col transtion-all duration-500 flex translate-0  w-full  h-[100vh] z-10 fixed`}>
            <div onClick={(e)=>e.stopPropagation()} className='w-[80%] bg-[#080D1F] primary-p flex-1'>


<div className="flex items-center justify-between relative ">
    <span className='flex items-end gap-1'><img src={logo.logo3} alt="" className='size-[40px] rounded-lg' />
    <h6>blog</h6></span>
  
  {/* <h6 onClick={()=>dispatch(getUserInfo())}>click</h6> */}

    {!(userInfo.length!=0 && userInfo)? 
     <div className="auth-btn">
         <Link to={"/auth/sign-in"} state={{prevUrl:"/"}} className='loginBtn' onClick={()=>dispatch(navTogle("onclick"))}>
        
         <button>login</button>
         <FaArrowRight className='icon'/>
         </Link>
  
     </div>:<span  onClick={()=>dispatch(logout())} className='relative center size-[30px] right-[20px] bg-slate-500/40  cursor-pointer transition-all duration-200 active:scale-50 rounded-md'><FaPowerOff /></span>}
    <span className=' absolute shadow-[inset_1px_0px_1px_1px]  shadow-slate-200/20 cursor-pointer right-[-20px] size-[30px] center bg-slate-900 rounded-full  grow-in' onClick={()=>dispatch(navTogle("onclick"))}><IoIosArrowForward/></span>
</div>


{(userInfo.length!=0 && userInfo)?<div className="top flex flex-col gap-2 w-full py-1 pb-3 min-h-[50px] border-b ">
        <div  className='flex capitalize flex gap-1'>
            <span className=' overflow-hidden'><img src={userInfo?.profile?.profileImage} alt="" className='rounded-lg size-[50px] object-fill' /></span>
            <span className=' flex flex-col justify-start'>
                <h6>{userInfo?.userName}</h6>
                {/* <h6 className='text-xs'>{userInfo?.userEmail}</h6> */}
                <span className='pl-1 gap-2 text-sm'>
                <p>{userInfo?.userFollowers || 0} followers</p></span>
            </span>

        </div>
        <div className=" flex flex-1 gap-2">
        <span className='top-box'><img src={headerIcons?.heart} alt="" className='' /> {userInfo?.totalLikes || 0}</span>
            <span className='top-box'><img src={headerIcons?.friendIcon} alt="" className='' /> {userInfo?.totalFriends}</span>
            <span className='top-box'><img src={headerIcons?.blog} alt="" className='' /> {userInfo?.totalPost || 0}</span>
        </div>

               
</div>:<div className='center min-h-[100px] border-b '>please login now</div>}


{/* middle */}
<div className="middle pt-1">
<div className="flex flex-col gap-1">

{
 navTitle.map((title,indx)=>{
     return(
         <NavLink to={title[2]} state={{prevUrl:title[2]}} className={`m-nav-title ${(({isActive})=>isActive && "bg-slate-200")}  ` } key={indx} 
         onClick={()=>dispatch(navTogle("onclick"))}>
 <div className="icon-section">
     {title[0]}
  
 </div>
 <div className="title">
     <div className="home">{title[1]} </div>
 </div>
{/* <ArrowIcon/> */}
          </NavLink>
     )
 })
}

</div>
</div>
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

        //  <section className={"menu-bar-section "}
        // style={slideStatus?{transform:"translatex(0)"}:{transform:"translatex(-650px)"}} >
        //     <div className="top-section">
        //         <div className="pro-container">
        //             <div className="like-box">
        //                 <p className="pro-txt">5 </p>
        //                 <h6 className="likes">Likes </h6>
        //             </div>
        //             <div className="follower-box">
        //                 <p className="pro-txt">5 </p>
        //                 <h6 className="followers">followers </h6>
        //             </div>
        //             <div className="user-name">{userInfo?userInfo.userName:<p>userName</p>} </div>
        //             <div className="img-section">
        //                 <img className="manish-img-2" src={userInfo.profile?userInfo.profile.profileImage : ""} />
        //             </div>
        //         </div>
        //         <div className="status-section">
        //             <div className="status-box">
        //                 <div className="_23">23 </div>
        //                 <div className="friends">friends </div>
        //             </div>
        //             <div className="status-box2">
        //                 <div className="_23">23 </div>
        //                 <div className="blogs">Blogs </div>
        //             </div>
        //             <div className="status-box3">
        //                 <div className="_23">23 </div>
        //                 <div className="posts">posts </div>
        //             </div>
        //         </div>

        //        {!(userInfo.length!=0 && userInfo)? 
        //         <div className="auth-btn">
        //             <Link to={"/auth/sign-in"} state={{prevUrl:"/"}} className='loginBtn' onClick={()=>dispatch(navTogle("onclick"))}>
                    
        //             <button>login now</button>
        //             <FaArrowRight className='icon'/>
        //             </Link>
                    
        //         </div>:""}


        //         <button className="close-icon" onClick={()=>dispatch(navTogle("onclick"))}>
        //             X
        //         </button>
        //     </div>
        //     <div className="nav-titles-section">

        //         {
        //             navTitle.map((title,indx)=>{
        //                 return(
        //                     <Link to={title[2]} state={{prevUrl:title[2]}} className="title-box" key={indx} 
        //                     onClick={()=>dispatch(navTogle("onclick"))}>
        //             <div className="icon-section">
        //                 {title[0]}
                        
        //             </div>
        //             <div className="title">
        //                 <div className="home">{title[1]} </div>
        //             </div>
        //            <ArrowIcon/>
        //                      </Link>
        //                 )
        //             })

        //         }
                
        //     </div>
        //     <div className="bottom-section">
        //         <button className="logout-btn" onClick={()=>dispatch(logout())}>

        //             <div className="logout">logout </div>
        //         </button>
        //     </div>
        // </section>
export default MenuBar