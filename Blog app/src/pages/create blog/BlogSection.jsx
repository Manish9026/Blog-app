import React, { useState } from 'react'
import  './createBlog.scss'
import { bg, uploadBg } from '../../assets/backgroundImg/background'
import { Outlet, useNavigate } from 'react-router-dom'
const BlogSection = () => {

  const navigate=useNavigate();
  const [isActive,setIsActive]=useState(true)
  return (
    <div
  className="ct-blog-container"
  style={{
    background: `url(${bg}) center`,
    backgroundSize: "cover",
    backgrounRepeat: "no-repeat",
  }}
>
  <div className="ct-heading">
    <div className="ct-txt">create own blog</div>
  </div>

  <div className="toggleBtn">
    <span className="btnTracker" style={isActive?{left:"0"}:{left:"50%"}}></span>
    <button className="tglBtn" onClick={()=>{navigate("/create/blog");setIsActive(true)} }>blog</button>
    <button className="tglBtn" onClick={()=>{navigate("/create/story");setIsActive(0)}}>story</button>
  </div>
 
 {/* {
  isActive?<CreateBlog/>:<CreateStory/>
 } */}
 <Outlet/>
 {/* <CreateBlog/> */}
</div>

  )
}
export const CreateBlog=()=>{
  return(
    <div className="ct-form">
    <label 
      className="ct-img"
      style={{
        background: `url(${uploadBg}) center`,
        backgroundSize: "cover",
        backgrounRepeat: "no-repeat",
      }}
      htmlFor='ctfile'
    >
      <input type="file" id='ctfile' style={{display:"none"}}/>

      <div   className="ct-blur">
        <div className="ct-img-txt">upload bolg image</div>
      </div>
    </label>
    <form className="ct-in-section">
      <div className="ct-in-field">
        <input className="title" type='text' placeholder="title" />
      </div>
      <div className="ct-in-field">
        <input className="blog-type"  type='text' placeholder="blog type" />
      </div>
      <div className="ct-content-field">
        <textarea className="ct-content-txt" type='text' placeholder="Create your blog" />
      </div>
      <div className="ct-btn-section">
        <button className="sub-btn">
          <p className="txt">submit</p>
        </button>
      </div>
    </form>
  </div>
  )
}
export const CreateStory=()=>{
return (
  <section>
    story section
  </section>
)
}

export default BlogSection