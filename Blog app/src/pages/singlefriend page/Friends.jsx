import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getAllFrnd } from '../../sclice/friendSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const Friends = () => {
    const location=useLocation();
    const queryParam=new URLSearchParams(location.search)
    const {friends}=useSelector(state=>{return state.userFriend})
    const {searchTxt}=useSelector(state=>{return state.global})
const dispatch=useDispatch()
useEffect(()=>{
   const param=queryParam.get("uid").split('/')[0];
    dispatch(getAllFrnd(param))
},[searchTxt])


  return (
    <div className="frndOptSection">
                        <div className="frndOptHeader">
                            <div className="frndHeading">
                                <div className="friends2">friends </div>
                                <div className="one20">{friends?friends.length : 0} </div>
                            </div>
                            <div className="frndSrhSection">
                                <BiSearch className="srhIcon" />
                                {/* <img  src="srh-icon0.svg" /> */}
                                <input type="search" className="srhField" placeholder="search friends " />
                            </div>
                        </div>
                        <div className="frndListSection">

                            {

                                friends?
                            friends.map((item,indx)=>{
 return(<div className="frndContainer" key={indx}>
 <div className="frndImg">
     <img
         className="iWantASocialbudyLogo3DRender11"
         src={item.profile.profileImage}
     />
 </div>
 <div className="frndName">
     <div className="username">{item.userName }</div>
 </div>
 <BsThreeDotsVertical className="moreIcon" />


</div>)
                            }):<div>not freinds</div>
                           }
                        </div>
                    </div>
  )
}

export default Friends