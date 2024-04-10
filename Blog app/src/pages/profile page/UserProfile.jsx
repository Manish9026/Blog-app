import React, { useState ,useEffect} from 'react'
import './style.scss'
import { banner } from '../../assets/backgroundImg/background';
import { headerIcons } from '../../assets/images/headerIcons';
import {useDispatch,useSelector} from 'react-redux'
import MenuIcon from '../../component/menu-icon/MenuIcon';
import { Outlet, useLocation } from "react-router-dom";
import { IoAdd, IoCamera } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { isVerified } from '../../sclice/authSlice/authSlice';
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    const {userInfo,loading,frndStatus,likeStatus}=useSelector(state=>{return state.snglFrnd})
    const [menuActive,setMenuActive]=useState(1)
    const dispatch=useDispatch();
    const {status}=useSelector(state=>state.userAuth)
    const navigate=useNavigate();
    const location=useLocation();
useEffect(()=>{

    if(!status){
        console.log(location);
  navigate("/auth/sign-in",{
            state:{
                prevUrl:location.pathname
            }
        })
    }else{
        // api calling section
    }
},[])
    return (
        <div className="profile-section">
{

           loading? <Loder/>:""
}
            <div className="snglFrdPro">
                <div className="snglFrdProBgImg">
                <span className='upload-icon'>
                                    <IoCamera className='icon'/>
                                    <p>edit cover image</p>
                                    </span>
                    <img className="banner1" src={banner} />
                </div>
                <div className="snglFrdProNameContainer">
                    <div className="snglContf">
                        <div className="snglImg"  >
                            <div className="userImg">
                                <span className='upload-icon'>
                                    <IoCamera className='icon'/>
                                    </span>
                                <img
                                    alt="profile-image"
                                    src={""}
                                />
                            </div>
                        </div>
                        <div className="snglName">
                       
                            <div className="userName  column-flex row-flex"><h4>{"manish maurya"} </h4>
                            <h6>userName</h6>
                           
                             </div>
                           
                        </div>
                       
                        <img className="more1" src={headerIcons.more} />
                    </div>
                    <div className="frame154">
                       
                        <button className="pro-btn" onClick={()=>{console.log(window.history.back())}}>
                            
                          <IoAdd className='icon'/>  <p className="follow">add new story </p>
                        </button>
                        <button className="pro-btn">
                            <MdEdit className='icon'/><p className="message">edit profile </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="snglOptions">
                <div className="optionContainer">
                <div className="option-btn">
                        <div className="opt-txt">About </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">friends </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">Blogs </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">photos </div>
                    </div>
                  
                  
                    <div className="menu-icon" onClick={()=>setMenuActive(prev=>{return !prev})}>
                    <MenuIcon active={menuActive}  />

                    </div>
                    
                </div>
                <div className="optionOutletContainer">
                    {
                        status?
                    <Outlet/>:""
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProfile