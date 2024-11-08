import React, { useState } from 'react'
import { icons } from '../../assets/react-icons'
import SearchBar from '../searchbar/SearchBar'
import { Link, useSearchParams } from 'react-router-dom'
import { mainLogo } from '../../assets/backgroundImg/background'
import { MdOutlineAdd, MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { navTogle } from '../../sclice/navsliderSlice'
import { NtficSection } from '../notification/NtficSection'
import { FaUserFriends } from 'react-icons/fa'
const SideNav = () => {
  // const {slideStatus}=useSelector(state=>{return state.navSlider})
  const dispatch = useDispatch();
  const [searchActive, setSearchActive] = useState(0)
  const [notificActive, setNotificActive] = useState(0)
  // console.log(slideStatus);
  return (
    <div className="top-head-nav">
      <div className="logo-section">
        <span className="menu-icon row-flex" onClick={() => dispatch(navTogle("onClick"))}>

          <MdOutlineMenu className='icon' />
        </span>


        <img src={mainLogo} alt="" />
        {/* <div className="logo">logo</div> */}
      </div>
      <div className="h-nav-title">
        <span className="sideNavIcon" onClick={() => setSearchActive(prev => !prev)}>
          <icons.searchIcon className="icon" />
        </span>
        <Link to={"/"} className="sideNavIcon">
          <icons.homeIcon className="icon"/>
        </Link>
        <span className="sideNavIcon" onClick={()=>{setNotificActive(prev=>!prev)}}>
          <icons.bellIcon className="icon"  />
          <div className="num">5</div>
        </span>
        <Link to={"/create/blog"} className="h-title-btn">
          <MdOutlineAdd  className='size-[20px]'/>
         <p> blog</p>
        </Link>
        <Link to={"/friends"} className="h-title-btn p-2">
          <FaUserFriends className='size-[20px]'/>
         <p>Friends</p>
        </Link>
      </div>
   
      <SearchBar style={searchActive} />
     


      { notificActive ?
        <div className="bell-msg" style={{
        position: "absolute", backgroundColor: "", top: "70px", width: "100%", height: "50px"
      }}>

     
         
            <NtficSection /> 
        
      </div>:""
      }

    </div>
  )
}

export default SideNav