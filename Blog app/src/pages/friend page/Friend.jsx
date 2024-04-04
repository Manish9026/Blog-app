import React, { useEffect, useRef } from 'react'

import './friend.scss'
import { useDispatch, useSelector } from 'react-redux'
import { isVerified } from '../../sclice/authSlice/authSlice';
import { cnfFrndReq, getAllFrnd, getFriendPageData, getNotificData } from '../../sclice/friendSlice';
import { Link } from 'react-router-dom';
import Loder from '../../component/loader/Loder';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { Slide } from 'react-toastify';
const Friend = () => {

  const {slideStatus}=useSelector(state=>state.navSlider)
const {friends,notifiData,loading}=useSelector(state=>{return state.userFriend})
const containerRef=useRef();
const dispatch=useDispatch();
  useEffect(()=>{

dispatch(getAllFrnd({type:"self"}));
dispatch(getNotificData())


  },[])

  useEffect(()=>{
   window.addEventListener("resize",widthHandler)
   
    if(containerRef.current.offsetWidth>800){
      containerRef.current.classList.add("newContainer")
      console.log(containerRef.current.classList);
    }else{
      containerRef.current.classList.remove("newContainer")
    
    }
    console.log("sjds",containerRef.current.offsetWidth);

    return ()=>{window.removeEventListener('resize', widthHandler);}
  },[])

  const widthHandler=()=>{
    // console.log(containerRef.current.offsetWidth);
    if(containerRef.current.offsetWidth>800){
      containerRef.current.classList.add("newContainer")
      // console.log(containerRef.current.classList);
    }else{
      containerRef.current.classList.remove("newContainer")

    }

  }
  return (
    <div className="friend-section " ref={containerRef} onResize={()=>{console.log("hello");}}>

      {loading?<Loder/>:""}
    <div className="fd-container">
      <div className="fd-section">
        <div className="save-fd-heading">
          <div className="your-friends">your friends</div>
          <button className='more-btn'>see all friends</button>
        </div>
        <div className="save-fd-container" >{
          friends.length!=0?
          friends.map((friend,indx)=>{
            return (
             
              <Link to={`/single-friend?uid=${friend._id}`} className="save-fd" key={indx}>
            <div className="save-fd-img">
              <img className="manish-img-1" width={"100%"} height={"100%"} src={friend.profile.profileImage}/>
            </div>
            <div className="save-fd-txt">
              <div className="save-fd-name">{friend.userName}</div>
              <div className="save-fd-t">{friend.friends.friends.length} friends</div>
            </div>
          </Link>
        
            )
          }):<div> no friends </div>
          }
        </div>
      </div>
      <div className="fd-res-seciton">
        <div className="fd-req-heading">
          <div className="friend-requests">friend requests</div>
          <button className='more-btn'>see all request</button>
        </div>
        <div className="fd-req-container">
        { 
        notifiData.length!=0? 
        notifiData.map((notific,indx)=>{
          let {senderId,receiverId}=notific
          return (
            <div className="fd-req-card" key={indx}>
            <div className="req-card-img">
              <img className="fd-img" src={senderId.profile.profileImage}/>
            </div>
            <div className="fd-content-part">
              <div className="fd-req-name">
                <div className="name">{senderId.userName}</div>
              </div>
              <button className="confirm-btn" onClick={()=>dispatch(cnfFrndReq(senderId.userId))}>
                <div className="confirm">confirm</div>
              </button>
              <div className="remove-btn">
                <div className="remove">remove</div>
              </div>
            </div>
          </div>
          )
        }):<div>no friends request</div>
         }
        </div>
      </div>
      </div> 
      <div className="suj-fd-section">
        <div className="heading">
          <div className="people-you-may-know">People you may know</div>
        </div>
        <div className="sug-fd-container">
          <div className="frame-139">
            <div className="frame-140">
              <img className="manish-img-12" src="manish-img-11.png" />
            </div>
            <div className="frame-141">
              <div className="frame-149">
                <div className="manish-maurya">manish maurya</div>
              </div>
              <div className="frame-142">
                <div className="confirm">confirm</div>
              </div>
              <div className="frame-1422">
                <div className="remove">remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    {/* // */}
  </div>
  
  )
}

export default Friend