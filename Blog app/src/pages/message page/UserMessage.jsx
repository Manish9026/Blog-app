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
// import { onlineUsers } from '../../socket oprations/messageSocket'
import { getAllFrnd } from '../../sclice/friendSlice'
import {io} from 'socket.io-client'
import { url } from '../../tools/serverURL'
import { useSocket } from '../../context/SocketContext'
// import { user } from '../../assets/home image/image'
import chatBg from '../../assets/backgroundImg/chatBg.jpg'
import Loder from '../../component/loader/Loder'


const getFormatedDate=({type,date}={})=>{
    if(type=="time"){
       const newDate= new Date(date)
       let hour=newDate.getHours();
       let min=newDate.getMinutes();
       if(hour<=12){
        return `${hour}:${min} AM`
       }else{
        return `${hour-12}:${min} PM`

       }

             
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
        window.addEventListener("resize", widthHandler)
        // widthHandler()
        return () => {
            window.removeEventListener("resize", widthHandler)
        }
    }, [])
    const widthHandler = () => {
        if(window.innerWidth<=650){
        dispatch(setMsgPage(0))

    }
    }




    const MessageBody = memo(() => {
        const {msgPage,onlineUsers,selectedUser} = useSelector(state => { return state.userMessage })
        const {isVisible,messages,loading}=msgPage;
        // const inputRef=useRef();
        const inputRef=useRef(null);
        const [messageData,setMessageData]=useState({
            message:"",
            file:null
        })
        // const dispatch=useDispatch()
        useEffect(() => {
        if(inputRef.current){
            inputRef.current.scrollIntoView({behavior:'smooth'})
           inputRef.current.style.height = 'auto'; // Reset height
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;    
        }
      console.log("hello");
      
        }, [messageData.message])
        
       useEffect(()=>{
        if(selectedUser)
        dispatch(getMessages(selectedUser?._id))
      
        socket.off("receiveMessage").on("receiveMessage",(data)=>{
            console.log("data",data);
            dispatch(setMessages(data))
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
            
            <div className="message-body relative h-full" style={isVisible ? { left: 0,display:"" } : { left: "-1000px" ,display:"none"}} >
                <div className="msg-head z-10 sticky top-[70px] ">
                    <span className='md-icons backIcon' onClick={() => dispatch(setMsgPage(0))}>
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
                 <div  className="msg-mid w-full h-full flex-col py-4  flex ">
                {messages && messages?.length!=0?
               
                messages.map((msgContainer,index)=>{

                    return(
                       
                        <div key={msgContainer?._id} className="message-wrapper border-b border-sky-900  items-center   flex-col flex w-full gap-2">
                         <div className="time">today</div>
                         <div className="msg-container flex gap-2 flex-col w-full">
                            {msgContainer?.messages.map((data,id)=>{
                                if(userInfo?.userId==data?.senderId)
                                return(
                                    <span className="sender relative flex w-full px-2 justify-end   min-h-[50px] ">
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
                                        bottom-[0px] right-2 text-[10px] text-sky-200'>4:30 Pm</p>
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
               :<div className='h-full flex-1 flex items-center justify-center  '> start chats</div>}
                     </div>



                <div className="msg-bottom">

                    <ul className="upload-btn">
                        <input type="file" name="" className='hide' onChange={(e)=>{setMessageData(prev=>({...prev,file:e.target.files[0]}))}} id="file" />
                        <li className='md-icons'><FaRegSmile /></li>
                        <label className='md-icons' htmlFor='file' >   <MdCloudUpload /> </label>



                    </ul>
                    {/* <div className="input-field" > */}
                        <textarea
                       value={messageData?.message}
                        onChange={(e)=>setMessageData(prev=>({...prev,message:e.target.value}))}
                        ref={inputRef}
                        rows={1}
                            className=""
                            placeholder="Type a message"
                        />
                      

                    {/* </div> */}
                  {messageData.message &&  <ul className='md-icons send' onClick={()=>{socket.emit("sendMessage",{data:messageData,receiverId:selectedUser?._id})

                        }}><IoSend /></ul>}
                
                </div>
            </div>
        )
        else{
            return(
                <div  className="absolute sm:relative  w-full bg-transparent  text-right flex items-center  justify-center text-white ">
                <p>now chat time</p>
                </div>
            )
        }
    })
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
                
            else setSilderChanger(0)
            }, 1000);
            

            return ()=>clearTimeout(timeout)

        },[window.innerWidth])
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

                <div className="t-body">
                    {
                        sliderChanger?
                        coupledData.map(users=>{
                            // console.log(users);
                            if(users.length!=0) 
                           return(<span className='container'>{  users.map((user,index)=>{

                                
                                return (
                                    <UserCard setReceiver={()=>{dispatch(setReceiverId(user?._id))}} key={index} user={user} onlineStatus={onlineUsers.includes(user?._id)}/>
                                )
                            })}
                            </span>)
                        })
                        :
                    
                     
                        friends.map((user, index) => {

                            return <UserCard key={index} user={user} onlineStatus={onlineUsers.includes(user?._id)}/>
                            
                        })
                       
                    
                    }
                
                </div>
            </div>
        )
    }
)
    const UserCard = memo(({user,onlineStatus,setReceiver}) => {


        
        return (
            <div className="user-card cursor-pointer" onClick={() =>{ dispatch(setMsgPage(1));dispatch(setReceiverId(user))}}>
                <span className='online-status' style={onlineStatus?{backgroundColor:""}:{background:"red"}}></span>
                <span className="card-img">

                    <img src={user?.profile?.profileImage} alt="" />
                </span>
                <span className="content">
                    <p>{user?.userName}</p>
                    <p>last message</p>
                    <p>last 2dago</p>
                </span>
            </div>
        )
    })
    return (
        <section className="message-section">
            <MessageTop />
            <MessageBody />
        </section>
    )
}



export default UserMessage