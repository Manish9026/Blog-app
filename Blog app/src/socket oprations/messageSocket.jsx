import React, { memo, useEffect, useState } from 'react'
import useSocket from '../custom hooks/SocketIo'
import { useSelector } from 'react-redux'

export const messageSocket = () => {




}
export const onlineUsers =()=> {
  const {userInfo}=useSelector(state=>state.userAuth);
  console.log(userInfo);
  const io = useSocket();
  const [onlineUsers, setOnlineUsers] = useState("");
  useEffect(() => {
    if (userInfo.lenght!=0) {
      io.on("onlineUsers", (data) => {
        setOnlineUsers(data)
      })
    }

        
        return () => io.disconnect();
  }, [])


  // return onlineUsers
}