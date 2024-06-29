import React, { useEffect, useRef, useState } from 'react'
import './home.scss'
import { user } from '../../assets/home image/image'
import { FcNext } from "react-icons/fc";
import { MdAdd, MdPublic } from "react-icons/md";

import { MdOutlinePostAdd } from "react-icons/md";
import { LuGalleryHorizontalEnd } from "react-icons/lu";



const imageData = [
  ["https://res.cloudinary.com/dztzqqiex/image/upload/v1713925640/gqxcvheyh28qicrpnuhp.jpg", "https://res.cloudinary.com/dztzqqiex/image/upload/v1713902478/oe3whawhuj4uy4hgttiz.jpg", "https://res.cloudinary.com/dztzqqiex/image/upload/v1713894523/uf3voqqxwgyla39x7v70.jpg"],
  ["https://res.cloudinary.com/dztzqqiex/image/upload/v1713898889/qgbnorp0h75jaaopsblq.jpg", "https://res.cloudinary.com/dztzqqiex/image/upload/v1713766639/osyno4vvvwfdzocdjvr6.jpg", "https://res.cloudinary.com/dztzqqiex/image/upload/v1713763138/tdk0n8tl5gfzajkhtolv.jpg"]
]
const uploadedDate = (date) => {
  const currentDate = new Date()
  const createdDate = new Date(date)
  //  console.log(currentDate.getHours(),createdDate.getHours());
  if (createdDate.getHours() < currentDate.getHours()) {
    return (currentDate.getHours() - createdDate.getHours()) + 'h ago';

  }
  else if (createdDate.getHours() == currentDate.getHours()) {
    if (currentDate.getMinutes() == createdDate.getMinutes()) {

      return currentDate.getSeconds() - createdDate.getSeconds() + "s ago";

    }
    return currentDate.getMinutes() - createdDate.getMinutes() + "m ago";
  }
  else {
    // return currentDate.getSeconds()

  }
}

const ProgressBar = ({ value, index, id, next }) => {
  return (



    <div className="progress" onClick={() => { next(index) }}>
      <div className="progress-value" id={id} ></div>




    </div>
  )
}
const ImageSlider = ({ story, userName, proPic, pos }) => {

  const [imgIndex, setImgIndex] = useState(0);
  const dispatch = useDispatch();


  if (story.length != 0)
    return (
      <span className="card" onMouseEnter={() => setImgIndex(prev => { return (prev + 1) % story.length })} onMouseLeave={() => setImgIndex(0)} >
        <img src={story[imgIndex].image} alt="" onClick={() => { dispatch(setStoryViewToggle(pos || 0)) }} />



        <span className="card-pro">
          <img src={proPic} alt="" style={{ transition: ".5s linear" }} />
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



  const { storyData, selfStoryData } = useSelector(state => { return state.userStory })
  const { status } = useSelector(state => { return state.global.storyViewToggle })
  const dispatch = useDispatch();
  console.log(storyData.length);
  const { postState } = useSelector(state => { return state.userPost })

  return (


    status ? <StoryView /> :
      <section className="home-section">




        <div className="part1">
          <div className="header-section">
            <span className="heading">
              Your stories
            </span>
            <div className="story-container">
              <div className="bg-card">
                <span className='icon'>Add</span>
               <span className='crt-card'>
                <NavLink to={'/create/story'} className={"btn"}><LuGalleryHorizontalEnd className='icon'/>story</NavLink>
                <NavLink to={"/create/blog"}  className={"btn"}><MdOutlinePostAdd className='icon' /> post</NavLink>
               </span>
              </div>

              {
                 selfStoryData && selfStoryData.length != 0 && <ImageSlider userName={"You"} proPic={selfStoryData.profile.profileImage} story={selfStoryData.stories} />
              }
              {

                storyData.length != 0 && storyData.map((item, indx) => {
                  return (


                    <ImageSlider userName={item.userName} pos={indx} proPic={item.profile.profileImage} story={item.stories} key={indx} />






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
           postState.data.length!=0 && postState.data.map((user, index) => {
              return <PostContainer user={user} key={user._id} />
            })
          }



        </div>
        <input type="checkbox" name="" id="checked" className='checked' style={{display:"none"}} />
        <SuggestedFrnd />



      </section>
  )
}


const SuggestedFrnd = () => {
  const [isVisible,setIsVisible]=useState(false);
  return (
    <label htmlFor='checked' className="part2">
      <span className="heading">
        Your suggested friends
      </span>
      <span className="sug-era">
        {user.map((item, key) => {

          return (<div className="card" key={key}>
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


    </label>
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
import { addComment, getAllcomments } from '../../sclice/storySlice';
import { allowUser } from '../create blog/BlogSection';
import { NavLink } from 'react-router-dom';
const PostContainer = ({ user }) => {
  if (user)
    return (

      <div className="post-container">

        <div className="head-part">
          <span className="p-part1">
            <span className="img">
              <img src={user.userId.profile.profileImage} alt="" />
            </span>
            <span className="content">

              <span><p>{user.userId.userName}</p><button>follow</button></span>
              <p>Post At:{uploadedDate(user.createdAt)}</p>
              {
                allowUser.map((icon,indx) => {
                  if (user.postType == icon[2]) {
                    return (<span key={indx}>
                      {icon[0]}
                    </span>
                      
                    )
                  }
                })
              }

            </span>

          </span>
          <span className="p-part2"></span>

        </div>
        <div className="mid-part">

          <span className="content">
            {
              user.postMessage
            }
          </span>
          <span className='img-sec'>

          {user.postFiles.map((file, indx) => {
            if (file.type == "image")
              return (
                  <img src={file.url}  key={indx} alt="" />
              )
              else{
                return (
                  <span className='video-sec' key={indx}>
                    <video src={file.url} alt="" />
                  </span>
                )
              }
          })}
                </span>


          
        </div>
        <div className="bottom-part">
          <div className="bt-part1">
            <span>25k Likes </span>
            <span> <p>100k comments</p>
              <p>500k shares</p></span>

          </div>
          <div className="bt-part2">
            <span className="btn">{1 ?
              <SlLike className='icon' /> : <BiSolidLike className='icon' />} <p>like</p></span>
            <span className="btn">
              <FaRegComment className='icon' /><p>comment</p></span>
            <span className="btn"><PiShareFat className='icon' /> <p>share</p></span>
          </div>

        </div>
      </div>
    )
}

const StoryView = () => {
  const { storyData } = useSelector(state => { return state.userStory })
  const { pos } = useSelector(state => { return state.global.storyViewToggle })
  const dispatch = useDispatch();
  const [commentActive, setCommentActive] = useState(0);
  const [storyId, setStoryId] = useState("")
  const StoryViewCard = ({ story, userName, proPic }) => {
    const [stIndex, setStIndex] = useState(0)
    const [play, setPlay] = useState(0);
    const audioRef = useRef(0);
    const [playStatus, setPlayStatus] = useState(0)
    const onPlay = (audio) => {

      if (audio.src) {
        if (!audio.paused) {

          audio.pause()
          setPlayStatus(0)

        } else {
          audio.play()
          setPlayStatus(1)
        }
      }


    }

    const updateProgress = (audio) => {

      if (audio.src) {
        const progress = document.getElementById(audio.id);


        if (!audio.paused) {

          const duration = Math.floor(audio.duration);
          const current = Math.floor(audio.currentTime);
          progress.style.width = Math.floor((current / duration) * 100) + '%';

          if (current == duration) {
            setStIndex(prev => { return (prev + 1) % story.length })
          }
        }
      }

    }
    return (
      <div
        className={playStatus ? "st-container play" : "st-container pause"}
        onClick={(e) => { onPlay(audioRef.current); }}
        onMouseEnter={() => { setPlay(1); setPlayStatus(1); audioRef.current.play() }}
        onMouseLeave={() => { setPlay(0); setPlayStatus(0); audioRef.current.pause() }}
      >

        <div className="progress-container" onClick={(e) => e.stopPropagation()}>

          {
            story.map((item, key) => {
              return (
                <ProgressBar value={"0%"} id={item._id} index={key} next={(index) => { setStIndex(index) }} key={key} />
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

        <Play_pause status={playStatus} />
        <img src={story[stIndex].image} alt="" className='st-img' />{
          story[stIndex].songUrl &&
          <audio autoPlay={play} id={story[stIndex]._id} onTimeUpdate={(e) => { updateProgress(e.currentTarget) }} ref={audioRef} src={story[stIndex].songUrl}   ></audio>}




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

          <ul className="st-menu" onClick={(e) => { e.stopPropagation(); }}>
            <li><SlLike /></li>
            <li onClick={() => { setCommentActive(prev => !prev); setStoryId(story[stIndex]._id) }}><FaRegComment /></li>
            <li><PiShareFat /></li>
            <li>{1 ? <IoBookmarkOutline /> : <IoBookmark />}</li>
            <li><PiDotsThreeOutlineVerticalFill /></li>
          </ul>
        </div>
      </div>
    )
  }


  return (
    <div className='story-view'>




      <div className="st-wrapper">
        {
          storyData.map((item, index) => {

            if (index >= pos) {
              return (

                <StoryViewCard story={item.stories} userName={item.userName} proPic={item.profile.profileImage} key={item._id} />
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

      </div>{
        commentActive ?
          <CommentCard storyId={storyId} commentActive={commentActive} setActive={() => setCommentActive(0)} /> : ""
      }
      <span className='icon' onClick={() => dispatch(setStoryViewToggle(pos))}>

        <IoClose />
      </span>
    </div>
  )
}

const CommentCard = ({ storyId, commentActive, setActive }) => {
  const dispatch = useDispatch();
  console.log(storyId);
  const [cmtMessage, setCmtMessage] = useState("")
  const { data, status, loading } = useSelector(state => { return state.userStory.comments })
  const { addStatus } = useSelector(state => { return state.userStory.addComment })
  console.log("data", data, status);
  useEffect(() => {
    // console.log(addStatus,"jgh");
    // console.log(data,status);
    dispatch(getAllcomments(storyId))
  }, [addStatus])

  const submit = async () => {
    console.log(storyId, cmtMessage);
    await dispatch(addComment({ storyId, cmtMessage }))
  }
  if (status)
    return (
      <section className={`comment-section ${commentActive ? "active" : "deActive"}`} >
        <span className='icon' onClick={() => setActive()}>

          <IoClose />
        </span>
        <div className="st-head st-move">
          <span className="img">
            <img src={data.userImage} alt="" />
          </span>

          <span className="content">

            <span><p>{data.userName}</p></span>
            <p>Post At:{uploadedDate(data.createdAt)}</p>
            <MdPublic />

          </span>
        </div>

        <div className="message-section">

          <textarea name="" id="" placeholder='enter your message' onChange={(e) => setCmtMessage(e.target.value)}></textarea>
          <span className="btn-area">
            <button className='submit' onClick={() => { submit() }}>submit</button>
            <button className='cancel' onClick={() => console.log("cancel")}>cancel</button>
          </span>
        </div>

        <div className="recent-comment">
          <span className="heading">
            <p>recent comment ({data.cmtMessages.length})</p>
          </span>

          <span className="comm-container">


            {
              data.cmtMessages.length != 0 ?
                data.cmtMessages.map((item, indx) => {

                  if (indx % 2 == 0)
                    return (

                      <span className="re-card cd1">
                        <div className="st-head st-move">
                          <span className="img">
                            <img src={item.commentUserId.profile.profileImage} alt="" />
                          </span>

                          <span className="content">

                            <span><p>{item.commentUserId.userName}</p></span>
                            <p>{uploadedDate(item.updatedAt)}</p>


                          </span>
                        </div>
                        <div className="cd-message">
                          <p>{item.message}</p>
                        </div>
                      </span>
                    )
                  else {
                    return (

                      <span className="re-card cd2">
                        <div className="st-head st-move">
                          <span className="img">
                            <img src={item.commentUserId.profile.profileImage} alt="" />
                          </span>

                          <span className="content">

                            <span><p>{item.commentUserId.userName}</p></span>
                            <p>{uploadedDate(item.updatedAt)}</p>


                          </span>
                        </div>
                        <div className="cd-message">
                          <p>{item.message}</p>
                        </div>
                      </span>
                    )
                  }
                }) : <span className='empty-comment'><p>no comments</p> </span>
            }

          </span>
        </div>
      </section>
    )
}

const Play_pause = ({ status }) => {

  return (
    <span id="play-video" style={{ display: !status ? "flex" : "" }} className="video-play-button" >
      <span></span>
    </span>
  )
}
export default Home