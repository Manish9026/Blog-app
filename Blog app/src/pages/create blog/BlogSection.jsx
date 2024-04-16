import React, { useRef, useState } from 'react'
import  './createBlog.scss'
import { bg, uploadBg } from '../../assets/backgroundImg/background'
import { Outlet, useNavigate } from 'react-router-dom'
import { GrGallery } from "react-icons/gr";
import { MdOutlineAdd } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import {  getSongUrl } from './getSongApi';
import { useDispatch, useSelector } from 'react-redux';
import { getSong } from '../../sclice/songSlice';
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

  const audioRef=useRef(null);
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
  // const [loading,setLoading]=useState(true)
  const [fieldValue,setFieldValue]=useState("")
// const [songData,setSongData]=useState({});
const [songAudio,setSongAudio]=useState({});

const {loading,songData}=useSelector(state=>{return state.songList})
const dispatch=useDispatch();
  const show = async(e,type) => {
   


    const node = e.parentNode;
    if (node.className == "select") {
    
  
     
        // const show = node.childNodes[0]
        const hide = node.childNodes[1]
        let {display} =hide.style;
        console.log(display);
        if(display=="none" || display.length==0 ){
          hide.style.display = "flex";
  
          if(type=="music"){
           
        dispatch(await getSong({srhQuery:"hindi song",offset:0,limit:20}))
         

          }
  
        }else{
          hide.style.display = "none";
  
        }
        // show.style.display = "none";
       
  
        // console.log(node);
        return node
    }
   return show(node)
  }

  const songHandler=async(e,id)=>{
//  let node = e.parentNode;
const url=await getSongUrl(id)
const audio=e.childNodes[2];
  // console.log(e,node);
  if(audioRef.current){

    audioRef.current.pause();
    audio.src=url;
    audio.play();
    audioRef.current=audio;
  }else{
    audio.src=url; 
    audio.play();
    audioRef.current=audio;
  }


  }
  console.log(loading,songData);
return (
  <section className='story-section'>
    <header><p>your Story</p></header>
   <div className="top-sec" onClick={()=>console.log(songData)}>
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
<span className='show-container' onClick={(e)=>show(e.currentTarget,"music")}>
        <span className='icon'>
        <MdOutlineAdd/>
        </span>
     
        <p>Add song</p>
      </span>

      <span className="hide-container hide">

  
    <div className="song-section">
    <span className="srch-section"  onFocus={(e)=>{console.log(e.currentTarget);e.currentTarget.childNodes[1].style.display="block"}}>
      <input  type="search" name="" value={fieldValue} onChange={async(e)=>{setFieldValue(e.target.value);dispatch(await getSong({srhQuery:e.target.value,offset:0,limit:20}))}} placeholder='search song' id="srh" />
      <FaXmark className='icon' onClick={(e)=>{setFieldValue("");e.currentTarget.style.display="none"}} />
    </span>
    <div className="card-section">
{ 
loading?
   <div className="card-section"> {
Array(5).fill(0).map((item,index)=>{
  return(
    <div className="card" key={index}>
  <span className='img circle'>
    <img src={""} alt="" />
  </span>
  <span className="content">
    <p className='box-skeleton'></p>
    <p className='box-skeleton'></p>
    {/* <p>{item.album.slice(0,10)}</p> */}
  </span>
  <audio src='' ></audio>
  </div>
  )
})}
</div>  

    
:
songData.items && 
songData.items.map((item,index)=>{
 // console.log(item);
 return(
   <div className="card" key={item.data.id} onClick={async(e)=>{songHandler(e.currentTarget,item.data.id)}}>
   <span className='img'>
     <img src={item.data.albumOfTrack.coverArt.sources[0].url} alt="" />
   </span>
   <span className="content">
     <p>{item.data.name.slice(0,15)}</p>
     <p>{item.data.artists.items[0].profile.name}</p>
     {/* <p>{item.album.slice(0,10)}</p> */}
   </span>
   <audio src='' ></audio>
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




export default BlogSection