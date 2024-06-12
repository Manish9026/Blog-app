import React, { useState, useEffect } from 'react'
import './style.scss'
import '../singlefriend page/style.scss'
import { banner } from '../../assets/backgroundImg/background';
import { headerIcons } from '../../assets/images/headerIcons';
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '../../component/menu-icon/MenuIcon';
import { Outlet, useLocation } from "react-router-dom";
import { IoAdd, IoCamera } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { getUserInfo, isVerified } from '../../sclice/authSlice/authSlice';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from '../../sclice/userProfileSlice';
const UserProfile = () => {
    const { userInfo, loading, frndStatus, likeStatus } = useSelector(state => { return state.snglFrnd })
    const [menuActive, setMenuActive] = useState(1)
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.userAuth)
    const user = useSelector(state => { return state.userAuth.userInfo })
    const [file,setFile]=useState(null);
    const [isVisible,setIsVisible]=useState(0);
    const location =useLocation();
    const navigate =useNavigate();
    useEffect(() => {

        if (!status) {
            console.log(location);
            navigate("/auth/sign-in", {
                state: {
                    prevUrl: location.pathname
                }
            })
        } else {
            //  dispatch(getUserInfo())

        }
    }, [])
console.log(status);
    useEffect(()=>{
   if(file){
    setIsVisible(1)
console.log(file);
   }
   else{
    setIsVisible(0)
   }
    },[file])

    if (user.length != 0)
        return (
            <div className="profile-section">
                {

                    loading ? <Loder /> : ""
                }
                <div className="snglFrdPro">
                    <div className="snglFrdProBgImg">
                        <input type="file" name="" onChange={(e)=>setFile(e.currentTarget.files[0])} id="coverPic" style={{ display: "none" }} />

                        <span className='upload-icon'>
                            <label htmlFor='coverPic' className='coverPic'>
                                <IoCamera className='icon' />
                                <p>edit cover image</p>
                            </label>
                            <span id="shds" style={{display:isVisible?"flex":"none"}} className="popup-box ">
                                <button onClick={()=>{
                                    setFile(null)
                                }}>cancel</button><button>submit</button>
                            </span>
                        </span>
                        <img className="banner1" src={file?URL.createObjectURL(file) : user.profile.coverImage || banner} />
                    </div>
                    <div className="snglFrdProNameContainer">
                        <div className="snglContf">
                            <div className="snglImg"  >
                                <div className="userImg">
                                    <input type="file" style={{ display: "none" }} id='proPic' />
                                    <label htmlFor='proPic' className='upload-icon' >
                                        <IoCamera className='icon' />
                                    </label>
                                    <img
                                        alt="profile-image"
                                        src={user.profile.profileImage}
                                    />
                                </div>
                            </div>
                            <div className="snglName">

                                <div className="userName  column-flex row-flex"><h4>{user.userName} </h4>
                                    <h6>{user.userEmail}</h6>

                                </div>

                            </div>

                            <img className="more1" src={headerIcons.more} />
                        </div>
                        <div className="frame154">

                            <button className="pro-btn" onClick={() => { console.log(window.history.back()) }}>

                                <IoAdd className='icon' />  <p className="follow">add new story </p>
                            </button>
                            <button className="pro-btn">
                                <MdEdit className='icon' /><p className="message">edit profile </p>
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


                        <div className="menu-icon" onClick={() => setMenuActive(prev => { return !prev })}>
                            <MenuIcon active={menuActive} />

                        </div>

                    </div>
                    <div className="optionOutletContainer">
                        {
                            status ?
                                <Outlet /> : ""
                            // <Outlet />
                        }
                    </div>
                </div>
            </div>
        );
}

export default UserProfile