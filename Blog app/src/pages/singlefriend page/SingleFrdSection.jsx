
import { banner } from "../../assets/backgroundImg/background";
import { headerIcons } from "../../assets/images/headerIcons";
import "./style.scss";

import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, setLike, setDisLike } from "../../sclice/singleFriendSlice";
import Loder from "../../component/loader/Loder";
import { sndFrndReq } from "../../sclice/friendSlice";
import privious from "../../custom hooks/privious";
import MenuIcon from "../../component/menu-icon/MenuIcon";
import { showImage } from "../../sclice/globalSlice";
import { navRoute } from "../profile page/UserProfile";
 const  SingleFrdSection = ({ className, ...props }) => {
    // const history=useHistory();

    const location = useLocation();
    const [uid,setUid]=useState(); 
    const dispatch=useDispatch();
    const {userInfo,loading,frndStatus,likeStatus}=useSelector(state=>{return state.snglFrnd})


    const {searchTxt}=useSelector(state=>{return state.global})
const [reload,setReload]=useState(0)
const [menuActive,setMenuActive]=useState(1)
    useEffect(() => {
        const paramValue= new URLSearchParams(location.search).get("uid").split("/")[0]
        setUid(paramValue)

        console.log(location,"locaton");
        
        dispatch(getUserInfo(paramValue))
        window.scrollTo(0, 0);
    }, [searchTxt,reload,frndStatus,location])


    return (
        <div className="singleFrdSection">
{

           loading? <Loder/>:""
}
           { userInfo && <div className="snglFrdPro">
                <div className="snglFrdProBgImg">
                   
                    <img className="banner1" loading="lazy" src={userInfo.profile?userInfo.profile.coverImage?userInfo.profile.coverImage :banner:banner} />
                </div>
                <div className="snglFrdProNameContainer">
                    <div className="snglContf">
                        <div className="snglImg"  onClick={()=>dispatch(showImage(userInfo.profile.profileImage))}>
                            <div className="userImg">
                                <img
                                    alt="profile-image"
                                    src={userInfo.profile?userInfo.profile.profileImage:" "}
                                />
                            </div>
                        </div>
                        <div className="snglName">
                       
                            <div className="userName row-flex"><h4>{userInfo.userName} </h4>
                           
                             </div>
                            <div className="flex flex-1 text-xs gap-1">
                                <div className="center flex gap-1">{userInfo.like?userInfo.like.likeCount : 0} <p className="text-xs">likes</p> </div>
                                <div className=" flex-1 center gap-1">{userInfo.userFollowers} <p className="text-xs">Followers</p> </div>
                            </div>
                        </div>

                        { 
                            frndStatus=="unCheck"?
                            <button className="frnd-status-btn" onClick={async()=>{await dispatch(sndFrndReq(userInfo.userId));setReload(prev=>!prev)}}>Add friend</button>:frndStatus=="pending"?
                            <button className="frnd-status-btn"> send request</button>:<button className="frnd-status-btn">friends</button>
                            }
                        {/* <img className="more1" src={headerIcons.more} /> */}
                    </div>
                    <div className="flex gap-2 flex-wrap p-2 flex-1">
                       { 
                       !likeStatus?
                       <button className="sng-btn" onClick={async()=>{ await dispatch(setLike(userInfo.userId));setReload(prev=>!prev)}}>
                            <img className="size-[20px]" src={headerIcons.like} />
                            <p className="">Like </p>
                        </button>:
                        <button className="sng-btn"  onClick={async()=>{await dispatch(setDisLike(userInfo.userId));setReload(prev=>!prev)}}>
                            <img className="size-[20px]" src={headerIcons.like} />
                            <p className="">unLike </p>
                        </button>}
                        <button className="sng-btn" onClick={()=>{}}>
                            
                            <p className="follow">follow </p>
                        </button>
                        <button className="sng-btn">
                            <p className="message">message </p>
                        </button>
                    </div>
                </div>
            </div>}
            <div className="snglOptions">
                <div className="optionContainer">
                {
                            navRoute.map((route,indx)=>{
                                return(
                                    <NavLink  to={route[1]+`?uid=${uid}`} key={indx} 
                                    className={`option-btn ${({isActive, isPending})=>{
                                        if(isActive)
                                            return "active"
                                        else
                                            return ""
                                    }}`} end>
                                    <div className="opt-txt">{route[0]} </div>
                                </NavLink>
                                )
                            })
                        }
                    {/* <div className="option-btn">
                        <div className="opt-txt">friends </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">Blogs </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">photos </div>
                    </div>
                    <div className="option-btn">
                        <div className="opt-txt">About </div>
                    </div>
                    <div className="option-btn more" >
                        <img src={headerIcons.more1} width={"20px"} height={"20px"} />
                        <div className="opt-txt">More </div>
                    </div> */}
                    <div className="menu-icon" onClick={()=>setMenuActive(prev=>{return !prev})}>
                    <MenuIcon active={menuActive}  />

                    </div>
                    
                </div>
                <div className="optionOutletContainer">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default SingleFrdSection