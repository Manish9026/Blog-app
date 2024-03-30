import React, { useEffect } from 'react'

import './friend.scss'
import { useDispatch, useSelector } from 'react-redux'
import { isVerified } from '../../sclice/authSlice/authSlice';
import { cnfFrndReq, getAllFrnd, getFriendPageData, getNotificData } from '../../sclice/friendSlice';
import { Link } from 'react-router-dom';
import Loder from '../../component/loader/Loder';
const Friend = () => {

const {friends,notifiData,loading}=useSelector(state=>{return state.userFriend})
const dispatch=useDispatch();
  useEffect(()=>{

dispatch(getAllFrnd({type:"self"}));
dispatch(getNotificData())

   
  },[])
  return (
    <div className="friend-section">

      {loading?<Loder/>:""}
    <div className="fd-container">
      <div className="fd-section">
        <div className="save-fd-heading">
          <div className="your-friends">your friends</div>
        </div>
        <div className="save-fd-container">{
          friends.length!=0?
          friends.map((friend,indx)=>{
            return (
              <Link to={`/single-friend?uid=${friend._id}`} className="save-fd" key={indx}>
            <div className="save-fd-img">
              <img className="manish-img-1" src={friend.profile.profileImage}/>
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
    </div>
  </div>
  
  )
}

export default Friend