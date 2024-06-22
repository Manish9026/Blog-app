import React, { useEffect, useRef, useState } from 'react'
import './createBlog.scss'
import { bg, uploadBg } from '../../assets/backgroundImg/background'
import { Outlet, useNavigate } from 'react-router-dom'
import { GrGallery } from "react-icons/gr";
import { MdOutlineAdd, MdOutlineAddPhotoAlternate, MdOutlineEmojiEmotions, MdPublic } from 'react-icons/md';
import { FaSortDown, FaXmark } from 'react-icons/fa6';
import { getSongUrl } from './getSongApi';
import { useDispatch, useSelector } from 'react-redux';
import { getSong } from '../../sclice/songSlice';
import { IoPlay } from 'react-icons/io5';
import { TiMediaPause } from "react-icons/ti";
import html2canvas from 'html2canvas';
import { createStory } from '../../sclice/storySlice';
import ProLoader from '../profile page/loader/ProLoder';
import { toast } from 'react-toastify';
const BlogSection = () => {

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true)
  return (
    <div
      className="ct-blog-container"
      style={{
        background: `url(${bg}) center`,
        backgroundSize: "cover",
        backgrounRepeat: "no-repeat",
      }}
    >
      {/* <div className="ct-heading">
    <div className="ct-txt">create own blog</div>
  </div> */}

      <div className="toggleBtn">
        <span className="btnTracker" style={isActive ? { left: "0" } : { left: "50%" }}></span>
        <button className="tglBtn" onClick={() => { navigate("/create/blog"); setIsActive(true) }}>blog</button>
        <button className="tglBtn" onClick={() => { navigate("/create/story"); setIsActive(0) }}>story</button>
      </div>

      {/* {
  isActive?<CreateBlog/>:<CreateStory/>
 } */}
      <Outlet />
      {/* <CreateBlog/> */}
    </div>

  )
}


import { AiOutlineGif } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import { FaUser } from "react-icons/fa";


// export const CreateBlog = () => {
//   return (
//     <div className="ct-form">
//       <label
//         className="ct-img"
//         style={{
//           background: `url(${uploadBg}) center`,
//           backgroundSize: "cover",
//           backgrounRepeat: "no-repeat",
//         }}
//         htmlFor='ctfile'
//       >
//         <input type="file" id='ctfile' style={{ display: "none" }} />

//         <div className="ct-blur">
//           <div className="ct-img-txt">upload bolg image</div>
//         </div>
//       </label>
//       <form className="ct-in-section">
//         <div className="ct-in-field">
//           <input className="title" type='text' placeholder="title" />
//         </div>
//         <div className="ct-in-field">
//           <input className="blog-type" type='text' placeholder="blog type" />
//         </div>
//         <div className="ct-content-field">
//           <textarea className="ct-content-txt" type='text' placeholder="Create your blog" />
//         </div>
//         <div className="ct-btn-section">
//           <button className="sub-btn">
//             <p className="txt">submit</p>
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
export const CreateBlog=()=>{
  const user = useSelector(state => { return state.userAuth.userInfo })
  // <MdPublic />
  const [isActive,setIsActive]=useState(0);

  const allowUser=[[<MdPublic/>,"public","public"],[<FaUsers />,"friends","friends"],[<FaUserFriends />,"specific Friends","customFriends"],[<FaUser />,"only me","self"]]
  const [postAllow,setPostAllow]=useState("friends")
  return (
    <section className='blogsPostSection'>

<header className='bgPost-header'>
  <span className="avtar">
    <img src={user.profile && user.profile.profileImage} alt="" />
  </span>
  <span className="bgName">
    <p>{user.userName || "userName"}</p>
    <span onClick={()=>setIsActive(prev=>!prev)} className='bg-select'>{allowUser.map((item)=>{
      if(item[2]==postAllow)return(
      
      <li className='center' >{item[0]}{item[1]}</li>
      )
    })} <FaSortDown className='icons'/> </span>

    <div className="select" style={isActive?{display:""}:{display:"none"}}>
      {allowUser.map((item)=>{
        return(
          <li className='option' onClick={()=>{setPostAllow(item[2]);setIsActive(prev=>!prev)}} value={item[2]}>{item[0]}{item[1]}</li>
        )
      })}
    </div>
  </span>
</header>

<div className="bgPostBody">

<label htmlFor='bgFile' className="upload-section">
  <input type="file" name="" id="bgFile"  style={{display:"none"}}/>
<MdOutlineAddPhotoAlternate />
add Photo & video
</label>
<span className="textField">
<textarea name="" id="" placeholder='your post' autoFocus></textarea>
<span className="bgAdditional">
<MdOutlineEmojiEmotions className='icons' />
<span className='gif'><AiOutlineGif  className='icons'/></span>

</span>
</span>

<div className="btn-section">
  <button>cancel</button>
  <button>save</button>
</div>


</div>
    </section>
  )
}
export const CreateStory = () => {


  const [formData, setFormData] = useState({
    songUrl: "",
    storyType: "public",
    title: ""
  });

  const audioRef = useRef([]);
  const [fieldValue, setFieldValue] = useState("")
  const [file, setFile] = useState();

  const { loading, songData } = useSelector(state => { return state.songList })
  const saveLoad = useSelector(state => { return state.userStory.loading })
  const uploadStatus = useSelector(state => { return state.userStory.status });

  useEffect(()=>{
    if(uploadStatus){
      setFile(null);
    }
  },[uploadStatus])

  
  const dispatch = useDispatch();

  const show = async (e, type) => {



    const node = e.parentNode;
    if (node.className == "select") {



      // const show = node.childNodes[0]
      const hide = node.childNodes[1]
      let { display } = hide.style;
      console.log(display);
      if (display == "none" || display.length == 0) {
        hide.style.display = "flex";

        if (type == "music") {

          dispatch(await getSong({ srhQuery: "hindi song", offset: 0, limit: 20 }))


        }

      } else {
        hide.style.display = "none";

      }
      return node
    }
    return show(node)
  }

  const songHandler = async (e, id, name) => {
    const url = await getSongUrl(id)
    const audio = e.childNodes[2];
    const player = e.childNodes[3];

    if (audioRef.current[0] && audioRef.current[0].id == audio.id) {

      if (audioRef.current[0].paused) {
        audioRef.current[0].play();
        play();
        // return
      }
      else {
        audioRef.current[0].pause();
        stop();
        // return

      }

    }
    else {
      stop()
      audioRef.current[0] && audioRef.current[0].pause();
      audio.src = url;
      audio.play();
      setFormData(prev => {
        return {
          ...prev, songUrl: url, title: name
        }
      })
      audioRef.current[0] = audio;
      audioRef.current[1] = player;
      play();
    }




  }
  const stop = () => {
    if (audioRef.current[1]) {
      audioRef.current[1].childNodes[0].style.display = "block";
      audioRef.current[1].childNodes[1].style.display = "none";
    }
  }
  const play = () => {
    if (audioRef.current[1]) {
      audioRef.current[1].childNodes[0].style.display = "none";
      audioRef.current[1].childNodes[1].style.display = "block";
    }
  }

  const convertElementToImage = async (elementId) => {


    const element = document.getElementById(elementId);
    if (element) {
      let imgData = "";
      await html2canvas(element).then(async (canvas) => {
        await canvas.toBlob((data) => {
          console.log(data);
          setFile(data)
          // imgData= data;
        });

        return imgData
      });
    }

  };

  const saveHandler = async () => {

    if (file) {
      await convertElementToImage("stFile");
      console.log(formData);
      await dispatch(createStory({ data: formData, storyImage: file }))

    }
else{
  toast.error("please upload image")
}
  }
  console.log(loading, songData);
  return (
    <section className='story-section'>
      <header ><p>your Story</p> <button className='btn' onClick={() => saveHandler()}> save story</button></header>
      {/* <Loader/> */}

      <label className="top-sec" id='stFile' >
        {

          saveLoad ? <span className='st-loader'><ProLoader /></span>  : <></>
        }

        <input type="file" name="" id="stFile" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
        {
          file ?
            <img src={URL.createObjectURL(file)} alt="" />

            :
            <ul className="title">
              <li><GrGallery className='icon' /></li>
              <li>Add photo</li>
            </ul>
        }
        <h1 style={{ position: "absolute", top: "20px", left: "10px" }}>sdhsdh</h1>
      </label>
      <div className="mid-sec">
        {/* <header><p>Attached text</p></header> */}
        <div className="select">

          <span className='show-container' onClick={(e) => show(e.currentTarget)}>
            <span className='icon'>
              <MdOutlineAdd />
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
          <span className='show-container' onClick={(e) => show(e.currentTarget, "music")}>
            <span className='icon'>
              <MdOutlineAdd />
            </span>

            <p>{formData.title ? formData.title : "Add song"}</p>
          </span>

          <span className="hide-container hide">


            <div className="song-section">
              <span className="srch-section" onFocus={(e) => { console.log(e.currentTarget); e.currentTarget.childNodes[1].style.display = "block" }}>
                <input type="search" name="" value={fieldValue} onChange={async (e) => { setFieldValue(e.target.value); dispatch(await getSong({ srhQuery: e.target.value, offset: 0, limit: 20 })) }} placeholder='search song' id="srh" />
                <FaXmark className='icon' onClick={(e) => { setFieldValue(""); e.currentTarget.style.display = "none" }} />
              </span>
              <div className="card-section">
                {
                  loading ?
                    <div className="card-section"> {
                      Array(5).fill(0).map((item, index) => {
                        return (
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
                    songData && songData.items &&
                    songData.items.map((item, index) => {
                      // console.log(item);
                      return (
                        <div className="card" key={item.data.id} onClick={async (e) => { songHandler(e.currentTarget, item.data.id, item.data.name) }}>
                          <span className='img'>
                            <img src={item.data.albumOfTrack.coverArt.sources[0].url} alt="" />
                          </span>
                          <span className="content">
                            <p>{item.data.name.slice(0, 15)}</p>
                            <p>{item.data.artists.items[0].profile.name}</p>
                            {/* <p>{item.album.slice(0,10)}</p> */}
                          </span>
                          <audio src='' id={item.data.id}></audio>

                          <span className='player'>
                            <IoPlay className='play' style={{ display: "block" }} onClick={(e) => { console.log("play"); }} />
                            <TiMediaPause className='pause' style={{ display: "none" }} />
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



const Loader = () => {
  return (
    <div class="rotat">
      <span className='play1' style={{ display: "block" }}>
        <IoPlay />
      </span>
    </div>
  )
}

export default BlogSection