import React, { useEffect, useRef, useState } from 'react'
import './home.scss'
import { user } from '../../assets/home image/image'
import { FcNext } from "react-icons/fc";
import { MdPublic } from "react-icons/md";


const imageData=[
  ["https://res.cloudinary.com/dztzqqiex/image/upload/v1713925640/gqxcvheyh28qicrpnuhp.jpg","https://res.cloudinary.com/dztzqqiex/image/upload/v1713902478/oe3whawhuj4uy4hgttiz.jpg","https://res.cloudinary.com/dztzqqiex/image/upload/v1713894523/uf3voqqxwgyla39x7v70.jpg"],
  ["https://res.cloudinary.com/dztzqqiex/image/upload/v1713898889/qgbnorp0h75jaaopsblq.jpg","https://res.cloudinary.com/dztzqqiex/image/upload/v1713766639/osyno4vvvwfdzocdjvr6.jpg","https://res.cloudinary.com/dztzqqiex/image/upload/v1713763138/tdk0n8tl5gfzajkhtolv.jpg"]
]
const uploadedDate=(date)=>{
  const  currentDate=new Date()
  const createdDate=new Date(date)
  //  console.log(currentDate.getHours(),createdDate.getHours());
   if(createdDate.getHours()<currentDate.getHours()){
     return (currentDate.getHours() - createdDate.getHours()) + 'h ago';

   }
   else if(createdDate.getHours()==currentDate.getHours() ){
     if(currentDate.getMinutes() == createdDate.getMinutes()){

      return  currentDate.getSeconds() -createdDate.getSeconds() + "s ago";

     }
     return currentDate.getMinutes() - createdDate.getMinutes() + "m ago";
   }
   else{
     // return currentDate.getSeconds()

   }
 }

 const ProgressBar=({value,index})=>{

 
  return(


  
  <div className="progress" >
  <div className="progress-value" style={{width:value}}></div>
 
  
 

</div>
  )
 }
const ImageSlider=({story,userName,proPic,pos})=>{

  const [imgIndex,setImgIndex]=useState(0);
  const dispatch=useDispatch();


  return(
    <span className="card" onMouseEnter={()=>setImgIndex(prev=>{return ( prev + 1 ) % story.length})} onMouseLeave={()=>setImgIndex(0)} >
  <img src={story[imgIndex].image} alt="" onClick={()=>{dispatch(setStoryViewToggle(pos || 0))}} />



<span className="card-pro">
 <img src={proPic} alt="" style={{transition:".5s linear"}} />
 <span className='content'>
 <p>{userName}</p>
 <p>{uploadedDate(story[imgIndex].createdAt)}</p>
 </span>

 
</span>

</span>
  )

  // return(
  // )
}
const Home = () => {



  const {storyData,selfStoryData}=useSelector(state=>{return state.userStory})
  const {status}=useSelector(state=>{return state.global.storyViewToggle})
  const dispatch=useDispatch();
  console.log(storyData.length);

 
  return (

    
    status ? <StoryView/>:
   <section className="home-section">




    <div className="part1">
      <div className="header-section">
      <span className="heading">
 Your stories
</span>
<div className="story-container">

  {
    selfStoryData.length!=0 && <ImageSlider userName={"You"}  proPic={selfStoryData.profile.profileImage} story={selfStoryData.stories} />
  }
{

 storyData.length!=0 && storyData.map((item,indx)=>{
    return(


  <ImageSlider userName={item.userName} pos={indx} proPic={item.profile.profileImage} story={item.stories} key={indx} />
 





 )})
  }

  
  {
//   user.map((item,indx)=>{
//     return(
// <span className="card" key={indx}>
// <img src={item[1]} alt="" loading='lazy'/>
// <span className="card-pro">
//  <img src={item[2]} alt="" />
//  <span className='content'>
//  <p>{item[0]}</p> 
//  <p> post: 3:45 pm</p>
//  </span>

 
// </span>
// {/* <span className="card-foot">
//   <button>like</button>
// </span> */}

// </span>
//     )
//   })
  }


  <span className="end-sadow">
  <FcNext />
  </span>
</div>
      </div>


{
  user.map((item,index)=>{
return <PostContainer user={item} key={index}/>
  })
}
      


    </div>

    <SuggestedFrnd/>

   

   </section>
  )
}


const SuggestedFrnd=()=>{
  return(
    <div className="part2">
    <span className="heading">
      Your suggested friends
    </span>

      <span className="sug-era">
{ user.map((item,key)=>{

 return( <div className="card" key={key}>
  <span className='img-sec'>
  <img src={item[2]} alt="" />
  </span>
 
 <ul className='content'>
   <li>{item[0]}</li>
 <li>5k followers</li>
 </ul>
 <span className="btn-section">
   <button>follow</button>
   <button>add Friend</button>
 </span>
</div>)
})
      }
      </span>


    </div>
  )
}


import { SlLike } from "react-icons/sl";
import { BiSolidLike } from "react-icons/bi";

import { FaRegComment } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setStoryViewToggle } from '../../sclice/globalSlice';
import { current } from '@reduxjs/toolkit';
const PostContainer=({user})=>{

  return(
    
<div className="post-container">

<div className="head-part">
<span className="p-part1">
  <span className="img">
    <img src={user[1]} alt="" />
  </span>
<span className="content">

  <span><p>{user[0]}</p><button>follow</button></span>
  <p>Post At:</p>
  <MdPublic />
  
</span>

</span>
<span className="p-part2"></span>

</div>
<div className="mid-part">

<span className="content">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed in quisquam saepe magnam doloribus! Porro voluptatibus facilis earum nam illum voluptate, rem fugiat iusto voluptas voluptates, eaque enim aperiam debitis ad odit laborum corporis!
</span>
<span className='img-sec'>
  <img src={user[2]} alt="" />

</span>
<span className='img-sec'>
  <img src={user[2]} alt="" />

</span>
</div>
<div className="bottom-part">
  <div className="bt-part1">
  <span>25k Likes </span>
  <span> <p>100k comments</p>
  <p>500k shares</p></span>

  </div>
  <div className="bt-part2">
  <span className="btn">{ 1?
<SlLike className='icon' /> :<BiSolidLike className='icon'/>} <p>like</p></span>
<span className="btn">
<FaRegComment className='icon' /><p>comment</p></span>
<span className="btn"><PiShareFat className='icon'/> <p>share</p></span>
  </div>

</div>
    </div>
  )
}

const StoryView=()=>{
  const {storyData}=useSelector(state=>{return state.userStory})
  const {pos}=useSelector(state=>{return state.global.storyViewToggle})
  const dispatch=useDispatch();


  const StoryViewCard=({story,userName,proPic})=>{
    const [stIndex,setStIndex]=useState(0)
    const audioRef=useRef(0);

    return(
      <div className="st-container">

<div className="progress-container">

{
  story.map((item,key)=>{
    return(
      <ProgressBar value={"50%"} index={key} key={key}/>
    )
  })
}
    </div>

      <div className="st-head st-move">
       <span className="img">
       <img src={proPic} alt="" />
       </span>
       
       <span className="content">
 
   <span><p>{userName}</p></span>
   <p>Post At:{uploadedDate(story[stIndex].createdAt)}</p>
   <MdPublic />
   
 </span>
      </div>


    <img src={story[stIndex].image}  alt="" className='st-img'  onClick={(e)=>{
    const audio=e.currentTarget.nextSibling;
    console.log(audio);
    const time=Math.floor(audio.duration - audio.currentTime)
    
    console.log(time);
    setTimeout(()=>{
setStIndex(prev=>{return (prev + 1) % story.length})
    },audio.duration*1000)
    if(audio.src){
      !audio.paused?audio.pause():audio.play()
    }
  }} />{
    story[stIndex].songUrl &&
    <audio ref={audioRef} src={story[stIndex].songUrl}  loop ></audio>}
  
 
     
 
      <div className="st-foot">
       
       <span className="st-pro">
       <span className="img">
       <img src={proPic} alt="" />
       </span>
       
       <span className="content">
 
   <span><p>{userName}</p></span>
   <p>Post At:{uploadedDate(story[stIndex].createdAt)}</p>
   <MdPublic />
   
 </span>
       </span>
 
       <ul className="st-menu">
       <li><SlLike/></li>
       <li><FaRegComment/></li>
       <li><PiShareFat/></li>
       <li>{1?<IoBookmarkOutline />:  <IoBookmark />}</li>
       <li><PiDotsThreeOutlineVerticalFill /></li>
       </ul>
      </div>
     </div>
    )
  }
  return(
    <div className='story-view'>




<div className="st-wrapper">




{
  storyData.map((item,index)=>{

    if(index>=pos){
      return(

        <StoryViewCard story={item.stories} userName={item.userName} proPic={item.profile.profileImage} key={item._id}/>
  //       <div className="st-container">

  //       <div className="st-head st-move">
  //        <span className="img">
  //        <img src={item.profile.profileImage} alt="" />
  //        </span>
         
  //        <span className="content">
   
  //    <span><p>{item.userName}</p></span>
  //    <p>Post At:{uploadedDate(item.stories[0].createdAt)}</p>
  //    <MdPublic />
     
  //  </span>
  //       </div>
  //  { item.stories.map((story,index)=>{
  //   return(<>
  //     <img src={story.image}  alt="" className='st-img' key={index} onClick={(e)=>{
  //     const audio=e.currentTarget.nextSibling;
  //     console.log(audio);
  //     if(audio.src){
  //       !audio.paused?audio.pause():audio.play()
  //     }
  //   }} />{
  //     story.songUrl &&
  //     <audio src={story.songUrl}  loop ></audio>}
  //     </>
  //   )
  //  })
  //      }
   
  //       <div className="st-foot">
         
  //        <span className="st-pro">
  //        <span className="img">
  //        <img src={item.profile.profileImage} alt="" />
  //        </span>
         
  //        <span className="content">
   
  //    <span><p>{item.userName}</p></span>
  //    <p>Post At:{uploadedDate(item.stories[0].createdAt)}</p>
  //    <MdPublic />
     
  //  </span>
  //        </span>
   
  //        <ul className="st-menu">
  //        <li><SlLike/></li>
  //        <li><FaRegComment/></li>
  //        <li><PiShareFat/></li>
  //        <li>{1?<IoBookmarkOutline />:  <IoBookmark />}</li>
  //        <li><PiDotsThreeOutlineVerticalFill /></li>
  //        </ul>
  //       </div>
  //      </div>
      )
    }

  })
   

}

</div>

<span className='icon' onClick={()=>dispatch(setStoryViewToggle(pos))}>

<IoClose />
</span>
    </div>
  )
}
export default Home