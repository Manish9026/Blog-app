import React, { useState } from 'react'
import  './createBlog.scss'
import { bg, uploadBg } from '../../assets/backgroundImg/background'
import { Outlet, useNavigate } from 'react-router-dom'
import { GrGallery } from "react-icons/gr";
import { MdOutlineAdd } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
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

  const song=[
    {
      "title": "Shape of You",
      "artist": "Ed Sheeran",
      "album": "÷",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKrjZgKq_LBFPV0nXLdsxQTcio3I6NmSUxCpAl07M3hlGxsAkHV37U3OqFoQmUsdfWMY&usqp=CAU"
    },
    {
      "title": "Uptown Funk",
      "artist": "Mark Ronson ft. Bruno Mars",
      "album": "Uptown Special",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1glklRpgZ0hJoLqzZdyQRU6goo4mIlL7bd6LeDaGs3A&s"
    },
    {
      "title": "Closer",
      "artist": "The Chainsmokers ft. Halsey",
      "album": "Collage",
      "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1qBO9_29-Srd5d9KPhocsv-z-EXYYJ02HsjvJfnbUoxaFuYipyP0vVeXwEtqp5ZpO2k&usqp=CAU"
    }
  ]
  const [fieldValue,setFieldValue]=useState("")
return (
  <section className='story-section'>
    <header><p>your Story</p></header>
   <div className="top-sec">
 <ul className="title">
<li><GrGallery className='icon' /></li>
<li>Add photo</li>
 </ul>
   </div>
   <div className="mid-sec">
    {/* <header><p>Attached text</p></header> */}
    <div className="select">

    <span className='show-container' onClick={(e)=>show(e.currentTarget)}>
        <span className='icon'>
        <MdOutlineAdd/>
        </span>
     
        <p>Add Text</p>
      </span>

  <span className="hide-container hide">
  <span className='add-txt'>
        <input type="text" placeholder='text here' />
        <input type="button" value="add" />
      </span>

  </span>
   



    </div>
   
   

<div className="select">
<span className='show-container' onClick={(e)=>show(e.currentTarget)}>
        <span className='icon'>
        <MdOutlineAdd/>
        </span>
     
        <p>Add song</p>
      </span>

      <span className="hide-container hide">

  
    <div className="song-section">
    <span className="srch-section"  onFocus={(e)=>{console.log(e.currentTarget);e.currentTarget.childNodes[1].style.display="block"}}>
      <input  type="search" name="" value={fieldValue} onChange={(e)=>setFieldValue(e.target.value)} placeholder='search song' id="srh" />
      <FaXmark className='icon' onClick={(e)=>{setFieldValue("");e.currentTarget.style.display="none"}} />
    </span>
    <div className="card-section">

   
      {
 song.map((item,index)=>{
  return(
    <div className="card">
    <span className='img'>
      <img src={item.image_url} alt="" />
    </span>
    <span className="content">
    <p>Title:{item.title.slice(0,15)}</p>
      <p>Artist:{item.artist.slice(0,20)}</p>
      <p>{item.album.slice(0,10)}</p>
    </span>
    </div>
  )
 })
    
      }
        {
 song.map((item,index)=>{
  return(
    <div className="card">
    <span className='img'>
      <img src={item.image_url} alt="" />
    </span>
    <span className="content">
      <p>Title:{item.title.slice(0,15)}</p>
      <p>Artist:{item.artist.slice(0,20)}</p>
      <p>{item.album.slice(0,10)}</p>
    </span>
    </div>
  )
 })
    
      }
       </div>
     
    </div>
      </span>
</div>
   
   </div>
   <div className="bottom-sec"></div>
  </section>
)
}

const show = (e) => {
   


  const node = e.parentNode;
  if (node.className == "select") {
  

      // const show = node.childNodes[0]
      const hide = node.childNodes[1]
      let {display} =hide.style;
      console.log(display);
      if(display=="none" || display.length==0 ){
       hide.style.display = "flex";

      }else{
        hide.style.display = "none";

      }
      // show.style.display = "none";
     

      // console.log(node);
      return node
  }
 return show(node)
}


export default BlogSection