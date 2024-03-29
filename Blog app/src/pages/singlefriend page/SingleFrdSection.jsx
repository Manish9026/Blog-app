
import { banner } from "../../assets/backgroundImg/background";
import { headerIcons } from "../../assets/images/headerIcons";
import "./style.scss";

import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, setLike, setDisLike } from "../../sclice/singleFriendSlice";
import Loder from "../../component/loader/Loder";
import { sndFrndReq } from "../../sclice/friendSlice";
import privious from "../../custom hooks/privious";
export const SingleFrdSection = ({ className, ...props }) => {
    // const history=useHistory();
    const pivious=privious();
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search)
    const dispatch=useDispatch();
    const {userInfo,loading,frndStatus,likeStatus}=useSelector(state=>{return state.snglFrnd})
    const {searchTxt}=useSelector(state=>{return state.global})
const [reload,setReload]=useState(0)
    useEffect(() => {
        const paramValue=queryParam.get("uid").split("/")[0]
        // console.log(paramValue)
        dispatch(getUserInfo(paramValue))
    }, [searchTxt,reload,frndStatus])
//   location.

    // console.log(window.history.back);

    return (
        <div className="singleFrdSection">
{

           loading? <Loder/>:""
}
            <div className="snglFrdPro">
                <div className="snglFrdProBgImg">
                    <img className="banner1" src={banner} />
                </div>
                <div className="snglFrdProNameContainer">
                    <div className="snglContf">
                        <div className="snglImg">
                            <div className="userImg">
                                <img
                                    alt="profile-image"
                                    src={userInfo.profile?userInfo.profile.profileImage:" "}
                                />
                            </div>
                        </div>
                        <div className="snglName">
                       
                            <div className="userName row-flex"><h4>{userInfo.userName} </h4>
                            { 
                            frndStatus=="unCheck"?
                            <button className="frnd-status-btn" onClick={async()=>{await dispatch(sndFrndReq(userInfo.userId));setReload(prev=>!prev)}}>Add friend</button>:frndStatus=="pending"?
                            <button className="frnd-status-btn"> send request</button>:<button className="frnd-status-btn">friends</button>
                            }
                             </div>
                            <div className="snglFlowr">
                                <div className="five6Likes">{userInfo.like?userInfo.like.likeCount : 0} Likes </div>
                                <div className="one1KFollowers">{userInfo.userFollowers} Followers </div>
                            </div>
                        </div>
                        <img className="more1" src={headerIcons.more} />
                    </div>
                    <div className="frame154">
                       { 
                       !likeStatus?
                       <button className="snglLike" onClick={async()=>{ await dispatch(setLike(userInfo.userId));setReload(prev=>!prev)}}>
                            <img className="thumbUp1" src={headerIcons.like} />
                            <p className="like">Like </p>
                        </button>:
                        <button className="snglLike"  onClick={async()=>{await dispatch(setDisLike(userInfo.userId));setReload(prev=>!prev)}}>
                            <img className="thumbUp1" src={headerIcons.like} />
                            <p className="like">unLike </p>
                        </button>}
                        <button className="snglFollow" onClick={()=>{console.log(window.history.back())}}>
                            
                            <p className="follow">follow </p>
                        </button>
                        <button className="snglMessage">
                            <p className="message">message </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="snglOptions">
                <div className="optionContainer">
                    <div className="option-btn">
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
                    <div className="option-btn">
                        <img src={headerIcons.more1} width={"20px"} height={"20px"} />
                        <div className="opt-txt">More </div>
                    </div>
                </div>
                <div className="optionOutletContainer">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};