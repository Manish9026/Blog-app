import React, { useState } from 'react'
import './home.scss'
import { user } from '../../assets/home image/image'
import { FcNext } from "react-icons/fc";
import { MdPublic } from "react-icons/md";
const Home = () => {

  const {storyData}=useSelector(state=>{return state.userStory})
  const {status}=useSelector(state=>{return state.global.storyViewToggle})
  const dispatch=useDispatch();
  console.log(storyData.length);
  return (
   <section className="home-section">

{status && <StoryView/>}

    <div className="part1">
      <div className="header-section">
      <span className="heading">
 Your stories
</span>
<div className="story-container">
{

 storyData.length!=0 && storyData.map((item,indx)=>{
    return(
<span className="card" key={indx} onClick={()=>dispatch(setStoryViewToggle(indx))}>{
  item.stories.map((story,indx)=>{
return (
<img src={story.image} alt="" />

)
  })}
<span className="card-pro">
 <img src={item.profile.profileImage} alt="" />
 <span className='content'>
 <p>{item.userName}</p>
 <p>{new Date(storyData[0].stories[0].createdAt).getHours() + " h ago"}</p>
 </span>

 
</span>
{/* <span className="card-foot">
  <button>like</button>
</span> */}

</span>
    )
  })
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

  return(
    <div className='story-view'>




<div className="st-wrapper">


{
  storyData.map((item,index)=>{

    if(index>=pos){
      return(
        <div className="st-container">

        <div className="st-head st-move">
         <span className="img">
         <img src={item.profile.profileImage} alt="" />
         </span>
         
         <span className="content">
   
     <span><p>{item.userName}</p></span>
     <p>Post At:</p>
     <MdPublic />
     
   </span>
        </div>
   { item.stories.map((story,index)=>{
    return(
      <img src={story.image} alt="" className='st-img' key={index} />
    )
   })
       }
   
        <div className="st-foot">
         
         <span className="st-pro">
         <span className="img">
         <img src={item.profile.profileImage} alt="" />
         </span>
         
         <span className="content">
   
     <span><p>{item.userName}</p></span>
     <p>Post At:</p>
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