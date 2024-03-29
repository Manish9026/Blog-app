import React, { useState } from 'react'
import { icons } from '../../assets/react-icons'
import SearchBar from '../searchbar/SearchBar'
import { Link, useSearchParams } from 'react-router-dom'
import { mainLogo } from '../../assets/backgroundImg/background'
import { MdOutlineMenu } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { navTogle } from '../../sclice/navsliderSlice'
import { NtficSection } from '../notification/NtficSection'
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
        <button className="search-icon" onClick={() => setSearchActive(prev => !prev)}>
          <icons.searchIcon className="icon l-txt" />
        </button>
        <button className="home-icon">
          <icons.homeIcon className="icon l-txt" src="home1.png" />
        </button>
        <button className="notification" onClick={()=>{setNotificActive(prev=>!prev)}}>
          <icons.bellIcon className="icon l-txt" src="notification1.png" />
          <div className="_5">5</div>
        </button>
        <Link to={"/create-blog"} className="h-title-btn">
          <div className="create-blog">create blog</div>
        </Link>
        <div className="h-title-btn">
          <div className="friends">friends</div>
        </div>
      </div>
   
      <SearchBar style={searchActive} />
     


      { notificActive ?
        <div className="bell-msg" style={{
        position: "absolute", backgroundColor: "", top: "55px", width: "100%", height: "50px"
      }}>

     
         
            <NtficSection /> 
        
      </div>:""
      }

    </div>
  )
}

export default SideNav