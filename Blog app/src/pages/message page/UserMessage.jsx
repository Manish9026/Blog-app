import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react'
import './style.scss'
import { IoFilter, IoSearch } from 'react-icons/io5'
import { FaArrowLeft, FaBackspace, FaBackward, FaSearch } from 'react-icons/fa'
import { IoCall, IoSend } from 'react-icons/io5'
import { MdOutlineSearch, MdVideoCall } from 'react-icons/md'
import { FaRegSmile } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, setMessages, setMsgPage, setOnlineUsers, setReceiverId } from '../../sclice/userMessageSlice'
import { useSocket } from '../../context/SocketContext'
import Loder from '../../component/loader/Loder'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import DotLoader from '../profile page/loader/DotLoader'
import useFlexibleTextField from '../../custom hooks/useFlexibleTextField'
import useReactHooks from '../../custom hooks/useReactHooks'
import useScroll from '../../custom hooks/useScroll'

function checkDateStatus(dateString) {
    const days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        // date declaration
        const [givenDate,today,checkIfDate,yesterday]=[new Date(dateString),new Date(),new Date(),new Date(),new Date()]
        // logic of yesterday date
        yesterday.setDate(today.getDate() - 1);
      //  convert date to local string "DD/MM/YYYY" format
        checkIfDate.setDate(today.getDate()-(  today.getDay()));
        const [givenDateStr,todayStr,yesterdayStr]=[givenDate.toLocaleDateString(),today.toLocaleDateString(),yesterday.toLocaleDateString()];
        // logic of date chickig

        if(checkIfDate<=givenDate){
            if(givenDateStr==todayStr){
                return "today";
            }
            else if(givenDateStr==yesterdayStr){
                return "yesterday"
            }
            else{
            //   console.log ( givenDate.getDay())
                return days.filter((day,indx)=>{if(indx===givenDate.getDay()) return day
                }).toString()
            }
    
        }
        else{
            return givenDate.toLocaleDateString();
        }
    
    
      
    }

const getFormatedDate=({type,date}={})=>{
    if(type=="time"){
       const newDate= new Date(date)
       let hour=newDate.getHours();
       let min=newDate.getMinutes();
    //    console.log(hour,min);
       
       if(hour<=12 && hour>=1){
        if(hour==12){
        return `${hour}:${min} PM`
    
        }
        return `${hour}:${min} AM`
       }
       else if(hour===0){
        return `${12}:${min} AM`

       }
        else{
        return `${hour-12}:${min} PM`

       }

             
    }
    else if(type=="date"){
       return checkDateStatus(date)
    }


}
const UserMessage = () => {

const dispatch = useDispatch();
const {userInfo}=useSelector(state=>state.userAuth)
const socket=useSocket();

useEffect(() => {
if(userInfo?.userId)
socket.emit("userOnline",userInfo.userId)
socket.on("onlineUsers",(users)=>{
    // console.log("onlineUsers:",users);  
    dispatch(setOnlineUsers(users))     
})
//    socket.emit("userOnline",4
//    )

//    return()=>socket.disconnect();
},[userInfo])


    useEffect(() => {
        // window.addEventListener("resize", widthHandler)
        widthHandler()
        // return () => {
        //     window.removeEventListener("resize", widthHandler)
        // }
    }, [])
    const widthHandler = () => {
        if(window.innerWidth<=650){
        dispatch(setMsgPage(0))

    }
    }




  

    return (
        <section className="message-section">
            <MessageTop />

            {/* {
            
            window.innerWidth<=650?<MessageBody />:null
            } */}
            <Outlet/>
        </section>
    )
}

const MessageTop = memo(() => {
    const {friends}=useSelector(state=>state.userFriend);
    
    const [coupledData,setCoupledData]=useState([])
    const {onlineUsers}=useSelector(state=>state.userMessage)
const [sliderChanger,setSilderChanger]=useState(1)

    
    const [search, setSearch] = useState({
        isActive: false,
        crossIsActive: false,
    })
const splitAray=(splitlen)=>{

let splitAray=[];
let length=friends.length;
for(let x=1; x<=length;x++){
if((x)%splitlen==0){
    // console.log("time",x);
    splitAray.push(friends.slice(x-splitlen,x))
    if(length-x<4){
        // console.log("exist");
        splitAray.push(friends.slice(x,length))
        return splitAray;
        
    }
    
}
if(length<splitlen){
    // console.log("exist");
    splitAray.push(friends.slice(0,length))
    return splitAray;
    
}
// splitAray.push()
}
return splitAray
}
    useEffect(()=>{

       const timeout= setTimeout(() => {
        if (window.innerWidth>=650){
            setCoupledData(splitAray(4))
            setSilderChanger(1)}
            
        else {setSilderChanger(0)
            setCoupledData(friends)
        }
        },500);
        return ()=>clearTimeout(timeout)

    },[friends,window.innerWidth])
    return (
        <div className="top-section">
            <div className="t-head">

                <h5 className='heading'>chat</h5>
                <span className="search">
                    <span className={"srh-field " + (search.isActive ? "srh-out" : "srh-in")} >
                        <input type="text" placeholder='search friends' />
                        <span className="md-icons srh-icon" onClick={() => setSearch(prev => ({ ...prev, isActive: !search.isActive }))}>
                            <IoSearch />
                        </span>
                    </span>

                    <span className="md-icons">
                        <IoFilter />
                    </span>
                </span>
            </div>

            <div className="t-body relative min-h-[100px]">

                {
                    sliderChanger?coupledData?.length==0 || !coupledData? <DotLoader dot_Color={"white"} dot_ShadowColor={"rgba(163, 187, 227, 0.992)"} loader_Style={{backgroundColor:"#cbd5f325",top:"0px",left:"0"}}/>:
                    coupledData.map((users,id)=>{
                        // console.log(users);
                        if(users.length!=0) 
                       return(<span key={id} className='container'>{  users.map((user,index)=>{

                            
                            return (
                                <UserCard setReceiver={()=>{dispatch(setReceiverId(user?._id))}} key={index} user={user} onlineStatus={onlineUsers.includes(user?._id)}/>
                            )
                        })}
                        </span>)
                    })
                    :
                
                 
                    coupledData.map((user, index) => {

                        return <UserCard key={index} user={user} onlineStatus={onlineUsers.includes(user?._id)}/>
                        
                    })
                   
                
                }
            
            </div>
        </div>
    )
}
)
const UserCard = memo(({user,onlineStatus,setReceiver}) => {
const dispatch=useDispatch()

    
    return (
        <Link to={`/user/message/${user?._id}`} className="user-card cursor-pointer" onClick={() =>{ dispatch(setMsgPage(1));dispatch(setReceiverId(user))}}>
            <span className='online-status' style={onlineStatus?{backgroundColor:""}:{background:"red"}}></span>
            <span className="card-img">

                <img src={user?.profile?.profileImage} alt="" />
            </span>
            <span className="content">
                <p>{user?.userName}</p>
                <p>last message</p>
                <p>last 2dago</p>
            </span>
        </Link>
    )
})
export  const MessageBody = memo(() => {
// react-states & useRef
const socket=useSocket();
const scrollBodyref=useRef(null);
const [messageData,setMessageData]=useState({
    message:"",
    file:null
})
const [scrollHeight,setScrollHeight]=useState(300);

// redux-states 
const {msgPage,onlineUsers,selectedUser} = useSelector(state => { return state.userMessage })
const {isVisible,messages,loading}=msgPage;
const {userInfo}=useSelector(state=>state.userAuth)
// custom hooks 
const {textareaRef}= useFlexibleTextField([messageData.message]);
const {dispatch,navigate}=useReactHooks();
const scrollBottm=useScroll('bottom', [messageData.message,selectedUser])


useEffect(()=>{
setScrollHeight(scrollBodyref.current?.clientHeight)
},[])  

    
   useEffect(()=>{
    if(selectedUser)
    dispatch(getMessages(selectedUser?._id))
    console.log(scrollBodyref.current);

    socket.off("receiveMessage").on("receiveMessage",({data,senderId,receiverId})=>{
        console.log("data",{data,senderId,receiverId});
        if(userInfo?.userId==senderId || userInfo?.userId==receiverId ){
        dispatch(setMessages(data))
    }



        setMessageData({message:"",file:null})

    })
    return ()=>{
        socket.removeListener("receiveMessage");
        socket.off("receiveMessage");
        socket.removeAllListeners("receiveMessage")
    }
   },[selectedUser]) 

    if(selectedUser)
    return (
        
        <div className="message-body font-sans  relative h-full" style={isVisible ? { left: 0,display:"" } : { left: "-1000px" ,display:"none"}} >
            <div className="msg-head z-10 sticky top-[70px] ">
                <span className='md-icons backIcon' onClick={() => {navigate("/user/message/");dispatch(setMsgPage(0))}}>
                    <FaArrowLeft />
                </span>
                <ul className="user-logo">
                    <li className='img'><img src={selectedUser?.profile?.profileImage} alt="" /></li>
                    <li>
                        <p className='text-slate-300 first-letter:uppercase'>{selectedUser?.userName}</p>
                       {Array.isArray(onlineUsers)?onlineUsers.find((user)=>user==selectedUser._id)?<p className='text-green-400'>online</p>: <p className='text-red-900'>offline</p>:null}
                    </li>
                </ul>

                <ul className="msg-head-nav">

                    <li className='md-icons'><MdVideoCall /></li>
                    <li className='md-icons' md-icons><IoCall /></li>
                    <li className='md-icons'><MdOutlineSearch /></li>



                </ul>
            </div>
            {loading &&
                <Loder style={{height:"100%"}}/>
            }
             <div  ref={scrollBodyref}  className="msg-mid flex-auto justify-start w-full h-full  flex-col py-4  flex overflow-hidden" >

             <div style={{height:`${scrollHeight}px`}} ref={scrollBottm}  className=" flex flex-col  overflow-auto relative">
            {messages && messages?.length!=0?
           
           
            messages.map((msgContainer,index)=>{

                return(
                   
                    <div key={msgContainer?._id} className="message-wrapper border-b border-sky-900 relative  items-center   flex-col flex w-full gap-2">
                     <div className="sticky top-[0px] time capitalize" >{getFormatedDate({type:"date",date:msgContainer?.createdAt})}</div>
                     <div className="  msg-container flex gap-2 flex-col w-full">
                        {msgContainer?.messages?.map((data,id)=>{
                            if(userInfo?.userId==data?.senderId)
                            return(
                                <span key={id} className="sender relative flex w-full px-2 justify-end pb-2   min-h-[50px] ">
                                <span className="msg h-full  max-w-[300px]  min-w-[150px] rounded-md  px-2 pb-3 bg-sky-600 opacity-70 flex items-center">
                                   {data?.message}
    
                                    <p className='absolute
                                    mb-[5px] sm:mb-[0]  bottom-[10px] right-[15px] text-[10px] text-sky-200'>{getFormatedDate({type:"time",date:data?.createdAt})}</p>
                                </span>
                            </span>
                        )
                        else{
                            return(
                                <span className="receiver flex justify-start    w-full px-2   min-h-[50px] ">
                                <div className="msg relative min-w-[150px] h-full max-w-[300px] rounded-md  px-2 pb-3 bg-cyan-700 flex items-center">
                                {data?.message}
    
                                    <p className='absolute
                                    bottom-[0px] right-2 text-[10px] text-sky-200'>{getFormatedDate({type:"time",date:data?.createdAt})}</p>
                                </div>
                            </span>
                            )
                        }
                        })
                       
                      }
                     </div>
                    </div>
                )
            })
           :<div className=' flex items-center h-full justify-center  '>&#128075; &#128075;   start chats</div>}

</div>
                 </div>



            <div className="msg-bottom  " >

                <ul className="upload-btn">
                    <input type="file" name="" className='hide' onChange={(e)=>{setMessageData(prev=>({...prev,file:e.target.files[0]}));console.log(messageData);
                    }} id="file" />
                    <li className='md-icons'><FaRegSmile /></li>
                    <label className='md-icons' htmlFor='file' >   <MdCloudUpload /> </label>



                </ul>
                {/* <div className="input-field" > */}
                    <textarea
                   value={messageData.message}
                    onChange={(e)=>setMessageData(prev=>({...prev,message:e.target.value}))
                }
                    ref={textareaRef}
                    rows={1}
                        className=" min-h-[40px]"
                        placeholder="Type a message"
                    />
                  

                {/* </div> */}
              {messageData.message &&  <ul className='md-icons send' onClick={()=>{if(messageData.message)(socket.emit("sendMessage",{data:messageData,receiverId:selectedUser?._id}))

                    }}><IoSend /></ul>}
            
            </div>
        </div>
    )
    else{
        return(
            <div  className="absolute sm:relative h-full  w-full bg-transparent  text-right flex items-center  justify-center text-white ">
            <p>now chat time</p>
            
            </div>
        )
    }
})

export default UserMessage