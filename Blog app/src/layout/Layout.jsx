import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/home/Home'
import Header from '../component/hearder/Header'
import SideNav from '../component/hearder/SideNav'

import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
const [layoutState,setLayoutState]=useState(1)

useEffect(()=>{


},[])

  return (<>
{
   layoutState?<div className='destop-layout blog-app'>
   
   <Header/>
   <div className='outlet-container'>
   <SideNav/>

<div style={{width:"100%",height:"100%",position:"relative"}}>
   <ToastContainer
position="top-right"
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

/>


   <Outlet/>
   </div>
 

   </div>
   </div> 
   :
   <div className="mobile-layout">

<Home/>

   </div>
    
}
  </>


    
  )
}

export default Layout