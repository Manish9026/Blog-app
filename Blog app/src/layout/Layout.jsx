import React, { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/home/Home'
import Header from '../component/hearder/Header'
import SideNav from '../component/hearder/SideNav'

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuBar from '../component/hearder/mobileMenuBar/MenuBar'
import ImageShow from '../component/imageShow/ImageShow'
import Popup from '../component/popup/Popup'
 const Layout = () => {
const [layoutState,setLayoutState]=useState(1)
const widthRef=useRef();
useEffect(()=>{
window.addEventListener("resize",widthHandler)
widthHandler()
return()=>{
   window.removeEventListener("resize",widthHandler)
}

},[])
const widthHandler=()=>{
 if(widthRef.current.offsetWidth<650){
setLayoutState(0)
 }else{
setLayoutState(1)

 }
}

  return (<>

   <div className='destop-layout blog-app' ref={widthRef}>
      <ImageShow />
    
 {  layoutState?
   <Header/>:<MenuBar/>}
   <div className='outlet-container'>
   <SideNav/>

<div style={{width:"100%",height:"100%",position:"relative"}}>
<Popup/>
   <ToastContainer
position={layoutState?"top-right":"bottom-center"}
autoClose={5000}
limit={2}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
style={{position:"absolute",textTransform:"capitalize"}}
className={"Toastify"}
/>


   <Outlet/>
   </div>
 

   </div>
   </div> 

 

  </>


    
  )
}

export default Layout