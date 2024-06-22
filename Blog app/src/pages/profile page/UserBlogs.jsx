import React from 'react'
import './style.scss'
import { BsEyeFill } from 'react-icons/bs'
import { MdOpenInNew, MdOutlineBuildCircle } from 'react-icons/md'
const UserBlogs = () => {
  return (
    <section className='user-Blog-section'>
       <header className='blogNav'>
        <span className='heading'>your blogs</span>
       </header>
       <div className='blogs-container'>

      {[2,3,4,5,5].map((indx)=>{
   
        return(  <span className="blog-card">
             <span key={indx} className="img">
            <img loading='lazy' src="https://res.cloudinary.com/dztzqqiex/image/upload/v1718972583/nekirho6kc3ettfhojkm.jpg" alt="" />
        </span>
        <span className="content">

           <ul style={{width:"100%"}}>
           <li><BsEyeFill className='icons'/> 1k</li>
           <li> <MdOutlineBuildCircle className='icons'/> 24 june 2024</li>
           </ul>
            <li className='openBtn'><MdOpenInNew className='icons'/> play now</li>
            
           
            
        </span>
    </span>
        )
      })}
        
       </div>


    </section>
  )
}

export default UserBlogs