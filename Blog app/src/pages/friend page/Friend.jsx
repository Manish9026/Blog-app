import React, { useEffect, useRef } from 'react'

import './friend.scss'
import { useDispatch, useSelector } from 'react-redux'
import { isVerified } from '../../sclice/authSlice/authSlice';
import { cnfFrndReq, getAllFrnd, getFriendPageData, getNotificData } from '../../sclice/friendSlice';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import Loder from '../../component/loader/Loder';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css/navigation';
// Import Swiper styles
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { Slide } from 'react-toastify';
import Title from '../../component/title/Title.jsx';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CiSquareQuestion } from "react-icons/ci";
import useReactHooks from '../../custom hooks/useReactHooks.jsx';
const Friend = () => {

  const {slideStatus}=useSelector(state=>state.navSlider)
const {friends,sendedRequest,receivedRequest,loading}=useSelector(state=>{return state.userFriend})
const containerRef=useRef();
const {dispatch,navigate,location}=useReactHooks();
const {status}=useSelector(state=>state.userAuth)
  useEffect(()=>{

    if(status){
      // dispatch(getAllFrnd({type:"self"}));
      // dispatch(getNotificData())
    }
    else{
      // console.log(location);
      navigate("/auth/sign-in",{
        state:{
            prevUrl:location.pathname
        }
    })
    }



  },[])

  useEffect(()=>{
   window.addEventListener("resize",widthHandler)
   
    if(containerRef.current.offsetWidth>800){
      containerRef.current.classList.add("newContainer")
      console.log(containerRef.current.classList);
    }else{
      containerRef.current.classList.remove("newContainer")
    
    }
    // console.log("sjds",containerRef.current.offsetWidth);

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

  const CardContainer=({headTitle="",data,btn1={title:"confirm",fn:()=>alert("dghs")},btn2={title:"cancel",fn:()=>alert("dghs")}})=>{
    console.log("data length",data.length);
    
    
    return (


      <div className="fd-res-seciton sm:min-w-[400px] h-full flex-1 px-2 ">
      <div  className="flex w-full  justify-center relative">
          <Title title={headTitle}/>   
          <span style={data.length<=2?{display:"none"}:{display:""}} className='absolute pointer  border border-sky-500   shadow-blue-300 more-btn flex rounded-[5px] px-2 top-1/2 right-[0px] translate-y-[-50%] items-center  justify-center '>

more <MdOutlineKeyboardArrowRight className='text-xl mt-[1px]' /></span>
        </div>

        {/* card detail */}
        <div className="fd-req-container relative h-full flex gap-2 overflow-auto">
       
       { 
       data.length!=0? 
       data.map((notific,indx)=>{
         let user=typeof(notific.senderId)=="object"?notific.senderId:notific.receiverId;
         return (
           <div className="fd-req-card bg-[#080D1F] relative  flex min-h-[200px] flex-col min-w-[150px] max-h-[250px] max-w-[180px] rounded-md p-2 border  " key={indx}>

           <div className="req-card-img flex border-b   p-b-1 h-[60%]">
             <img className="fd-img  w-full pb-1" src={user?.profile?.profileImage}/>
           </div>
           <div className="fd-content-part h-[30%] flex flex-1 flex-col justify-between">
             <div className="">
               <h6 className="name capitalize text-sm">{user?.userName}</h6>
             </div>
             <span className='flex gap-2 w-ful flex-wrap   capitalize items-center justify-between '>

              
             <button className="  px-[5px] hover:bg-blue-500 transition ease-in duration-300 text-[15px] active:scale-10 capitalize justify-center  rounded-[5px] flex  flex-1  border border-blue-500 " onClick={btn1.fn}>
               {btn1.title}
             </button>
             <button className=' px-[5px] duration-300 hover:bg-red-300 text-[15px] capitalize flex transition ease-in  flex-1 border-red-300 items-center justify-center rounded-[5px] border' onClick={btn2.fn}>
               {btn2.title}
             </button>
             </span>
           </div>
        
           
         </div>
         )

       }):<div className='flex px-2 w-full items-center gap-1 text-sm'>

       <CiSquareQuestion className='text-2xl text-yellow-500' />No request</div>
        }
    
       </div>
        
      </div>
      
    )
  }
  return (
    <div className="friend-section flex  flex-col min-h-full w-full " ref={containerRef} onResize={()=>{console.log("hello");}}>

      {loading?<Loder/>:""}
    <div className="fd-container p-2 flex justify-center  flex-wrap gap-2">

      {/* friends container */}
      <div className="fd-section px-2  flex w-full flex-wrap flex-col items-center justify-center">
        <div className="flex w-full p-2 justify-center relative">
          <Title title='Friends'/>
          <span style={friends.length>8?{display:""}:{display:"none"}}  className='absolute pointer  border border-sky-500   shadow-blue-300 more-btn flex rounded-[5px] px-2 top-1/2 right-[0px] translate-y-[-50%] items-center  justify-center '>

more <MdOutlineKeyboardArrowRight className='text-xl mt-[1px]' /></span>
        </div>
        <div className="save-fd-container justify-start items-center w-full flex-wrap flex  gap-2" >{
          friends.length!=0?
          friends.slice(0,8).map((friend,indx)=>{
            return (
             
              <Link to={`/single-friend?uid=${friend._id}`} className="max-w-[500px] w-full    flex-1 aspect-ratio-normal min-w-[200px] flex items-center gap-2 border-slate-200 border justify-start rounded-md p-1 capitalize" key={indx}>
            <div className="save-fd-img size-[50px] rounded-full overflow-hidden ">
              <img className="manish-img-1" width={"100%"} height={"100%"} src={friend.profile.profileImage}/>
            </div>
            <div className="save-fd-txt flex flex-col justify-start items-start">
              <div className="save-fd-name">{friend.userName}</div>
              <div className="save-fd-t">{friend.friends.friends.length} friends</div>
            </div>
          </Link>
        
            )
          }):<div> no friends </div>
          }
        </div>
      </div>
      {/* friends container end */}


     

      </div> 

          <div className="flex flex-wrap w-full justify-between px-2 py-1">


          
             {/* received Request container */}
           
      <CardContainer data={receivedRequest} headTitle='received Request' btn1={{title:"confirm",fn:()=>dispatch(cnfFrndReq(senderId.userId))}} btn2={{title:"cancel",fn:()=>alert("canceled")}}/>
               {/* received Request container end */}

{/* send requests container */}
               <CardContainer data={sendedRequest} headTitle='send request' btn1={{title:"remind",fn:()=>alert("remind")}} btn2={{title:"cancel",fn:()=>alert("canceled")}}/>
{/* send requests container  end*/}

          </div>

   
  
    {/* // */}
  </div>
  
  )
}

export default Friend