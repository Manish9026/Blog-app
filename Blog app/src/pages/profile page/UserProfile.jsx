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
import { getUserProfile, updateProfile, uploadLoader } from '../../sclice/userProfileSlice';
import { FaXmark } from 'react-icons/fa6';
import { url } from '../../tools/serverURL';
import DotLoader from './loader/DotLoader';
const UserProfile = () => {
    const { userInfo, loading, frndStatus, likeStatus } = useSelector(state => { return state.snglFrnd })
    const [menuActive, setMenuActive] = useState(1)
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.userAuth)
    const user = useSelector(state => { return state.userAuth.userInfo })
    const [file,setFile]=useState(null);
    const [proPic,setProPic]=useState(null);
    const [isVisible,setIsVisible]=useState(0);
    const location =useLocation();
    const navigate =useNavigate();
    const {uploadLoading}=useSelector(state=>{return state.userProfile})
    useEffect(() => {

        if (!status) {
            navigate("/auth/sign-in", {
                state: {
                    prevUrl: location.pathname
                }
            })
        } else {
          
            if(uploadLoading.status){
                dispatch(getUserInfo())
            }
        }
      
    }, [uploadLoading])
    useEffect(()=>{
   if(file){
    setIsVisible(1)
   }
   else{
    setIsVisible(0)
   }
    },[file])
    const ImagePopup=()=>{

        return(
            <section className='popupMainContainer'>
                 <div className="popupContainer fade-in">
                    <span className='icon' onClick={()=>setProPic(null)}><FaXmark/></span>
                <span className="imageContainer">
                   
                    <span className="img"><img src={URL.createObjectURL(proPic)} alt="" /></span>
                    
                </span>
                <span className="btnContainer">
                <label htmlFor="proPic" className='proBtn' >change</label>
                    <button className='proBtn' onClick={()=>{dispatch(updateProfile({type:"profilePic",file:proPic}));setProPic(null)}}>save</button>
                </span>
            </div>
            </section>
           
        )
    }                                     
    if (user.length != 0)
        return (
            <div className="profile-section">
                {

                    loading ? <Loder /> : ""
                }
               {
                proPic?<ImagePopup/>:""
               }
                
                <div className="snglFrdPro">
                    <div className="snglFrdProBgImg">
                        
                        {uploadLoading.coverPic && <DotLoader/>}
                        <input type="file" name="" onChange={(e)=>setFile(e.currentTarget.files[0])} id="coverPic" style={{ display: "none" }} />

                        <span className='upload-icon'>
                            <label htmlFor='coverPic' className='coverPic'>
                                <IoCamera className='icon' />
                                <p>edit cover image</p>
                            </label>
                            <span id="shds" style={{display:isVisible?"flex":"none"}} className="popup-box ">
                                <button onClick={()=>{
                                    setFile(null)
                                }}>cancel</button><button onClick={()=>{dispatch(updateProfile({type:"coverPic",file}));setFile(null)}}>submit</button>
                            </span>
                        </span>
                        <img className="banner1" src={file?URL.createObjectURL(file) : user.profile.coverImage || banner} />
                    </div>
                    <div className="snglFrdProNameContainer">
                        <div className="snglContf">
                            <div className="snglImg"  >
                                <div className="userImg">
                            { uploadLoading.pic && <DotLoader />}

                                    <input type="file" onChange={(e)=>setProPic(e.currentTarget.files[0])} style={{ display: "none" }} id='proPic' />
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

                            <button className="pro-btn" onClick={() => { }}>

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