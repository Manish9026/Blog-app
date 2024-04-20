import React from 'react'
import './home.scss'
import { user } from '../../assets/home image/image'
import { FcNext } from "react-icons/fc";
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
  <span className="end-sadow">
  <FcNext />
  </span>
</div>
      </div>

      <PostContainer/>


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

const PostContainer=()=>{
  return(
    <div className="post-container">

<div className="head-part">
<span className="p-part1">
  <span className="img">
    <img src={user[0][2]} alt="" />
  </span>
<span className="content">

  <p>{user[0][0]}</p>
  <p>Post At:</p>
</span>

</span>
<span className="p-part2"></span>

</div>
<div className="mid-part">

</div>
<div className="bottom-part">

</div>
    </div>
  )
}
export default Home