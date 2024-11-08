import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getAllFrnd } from '../../sclice/friendSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { singleFrndLink, urlCreater } from '../../utills/links';


const Friends = () => {
    const location=useLocation();
    const queryParam=new URLSearchParams(location.search)
    const {searchTxt}=useSelector(state=>{return state.global})
const dispatch=useDispatch()
useEffect(()=>{
    const param=queryParam.get("uid")
    if(param)
param.split('/')[0];
    dispatch(getAllFrnd({userId:param,type:"other"}))
},[searchTxt,location])

  return (
    <FrndComp />
  )
}

export const FrndComp=()=>{
    const {friends}=useSelector(state=>{return state.userFriend})

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
     return(<div  className="frndContainer" key={indx}>
    <Link to={urlCreater({path:singleFrndLink,params:{uid:item?._id}})} className='flex gap-2 py-2  bg-slate-30'>
    <div className="frndImg w-[40px] h-[50px]">
         <img
             className="object-contain"
             src={item.profile.profileImage}
         />
     </div>
     <div className="frndName">
         <div className="username">{item.userName }</div>
     </div>
    </Link>
     <BsThreeDotsVertical className="moreIcon"  onClick={(e)=>e.stopPropagation()}/>
    
    
    </div>)
                                }):<div>not freinds</div>
                               }
                            </div>
                        </div>
      )
}
export default Friends