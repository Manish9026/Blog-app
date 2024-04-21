import React from 'react'
import './home.scss'
import { user } from '../../assets/home image/image'
import { FcNext } from "react-icons/fc";
import { MdPublic } from "react-icons/md";
const Home = () => {
  return (
   <section className="home-section">

    <div className="part1">
      <div className="header-section">
      <span className="heading">
 Your stories
</span>
<div className="story-container">
{
  user.map((item,indx)=>{
    return(
<span className="card" key={indx}>
<img src={item[1]} alt="" />
<span className="card-pro">
 <img src={item[2]} alt="" />
 <span className='content'>
 <p>{item[0]}</p>
 <p> post: 3:45 pm</p>
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
  user.map((item,indx)=>{
    return(
<span className="card" key={indx}>
<img src={item[1]} alt="" loading='lazy'/>
<span className="card-pro">
 <img src={item[2]} alt="" />
 <span className='content'>
 <p>{item[0]}</p> 
 <p> post: 3:45 pm</p>
 </span>

 
</span>
{/* <span className="card-foot">
  <button>like</button>
</span> */}

</span>
    )
  })
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
export default Home